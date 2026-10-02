import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Load environment variables from .env file if present
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security and CORS middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// JSON body parsing with reasonable size limit
app.use(express.json({ limit: "15mb" }));

// In-memory cache for generated TTS audio to ensure instant replay and low latency
const ttsCache = new Map<string, { audioBase64: string; mimeType: string }>();

// Helper to get GoogleGenAI client with runtime API key
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// -------------------------------------------------------------
// Health Check Endpoint (For Cloud Run, Render, Railway, Docker)
// -------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Saffron Laboratories (S-Lab) API",
    version: "1.0.0",
    uptimeSeconds: Math.floor(process.uptime()),
    hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY?.trim()),
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// Text-to-Speech API route using gemini-3.8-flash-tts
// -------------------------------------------------------------
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voiceName = "Kore", style } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text is required in request body" });
    }

    const trimmedText = text.trim();
    if (!trimmedText) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    const cacheKey = `${voiceName}_${trimmedText.slice(0, 100)}_${trimmedText.length}`;

    // Return cached audio if already generated
    if (ttsCache.has(cacheKey)) {
      const cached = ttsCache.get(cacheKey)!;
      return res.json({
        ...cached,
        model: "gemini-3.8-flash-tts",
        voiceName,
        cached: true,
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error:
          "GEMINI_API_KEY is not configured on the server. Please set GEMINI_API_KEY environment variable.",
        requiresKey: true,
      });
    }

    const defaultStyle =
      "A warm, articulate, highly prestigious Thai corporate documentary narrator. Professional tone, clear cadence, emphasizing cosmetic excellence, laboratory precision, and consumer trust.";

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: trimmedText,
              speechMetadata: {
                style: style || defaultStyle,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            // Available voices: 'Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const part = candidate?.content?.parts?.[0];
    const base64Audio = part?.inlineData?.data;

    if (!base64Audio) {
      return res.status(500).json({ error: "No audio content returned from model" });
    }

    const payload = {
      audioBase64: base64Audio,
      mimeType: part?.inlineData?.mimeType || "audio/wav",
    };

    // Cache the result
    ttsCache.set(cacheKey, payload);

    return res.json({
      ...payload,
      model: "gemini-3.8-flash-tts",
      voiceName,
      cached: false,
    });
  } catch (error: any) {
    console.error("[S-Lab] TTS generation error:", error);
    return res.status(500).json({
      error: error?.message || "Failed to generate speech with gemini-3.8-flash-tts",
      details: String(error),
    });
  }
});

// -------------------------------------------------------------
// App configuration and voice metadata endpoint
// -------------------------------------------------------------
app.get("/api/config", (req, res) => {
  res.json({
    hasApiKey: Boolean(process.env.GEMINI_API_KEY?.trim()),
    model: "gemini-3.8-flash-tts",
    company: {
      nameTh: "แซฟฟรอน แลบบอราทอรี่ส์ (เอส-แลบ)",
      nameEn: "Saffron Laboratories (S-Lab)",
      establishedBe: 2544,
      establishedCe: 2001,
      certification: "สำนักงานคณะกรรมการอาหารและยา กระทรวงสาธารณสุข (Thai FDA)",
      type: "OEM Cosmetic & Skincare Manufacturer",
    },
    availableVoices: [
      {
        id: "Kore",
        name: "Kore",
        description: "เสียงหญิง อบอุ่น สง่างาม ชัดถ้อยชัดคำ (แนะนำสำหรับสารคดีและพรีเซนต์องค์กร)",
        gender: "Female",
      },
      {
        id: "Zephyr",
        name: "Zephyr",
        description: "เสียงหญิง นุ่มนวล ทันสมัย เข้าถึงง่าย",
        gender: "Female",
      },
      {
        id: "Puck",
        name: "Puck",
        description: "เสียงชาย มีชีวิตชีวา มั่นใจ เป็นธรรมชาติ",
        gender: "Male",
      },
      {
        id: "Charon",
        name: "Charon",
        description: "เสียงชาย นุ่มลึก ภูมิฐาน น่าเชื่อถือ",
        gender: "Male",
      },
      {
        id: "Fenrir",
        name: "Fenrir",
        description: "เสียงชาย สุขุม หนักแน่น ทรงพลัง",
        gender: "Male",
      },
    ],
  });
});

// -------------------------------------------------------------
// 404 Handler for undefined API routes (Must return JSON, not HTML)
// -------------------------------------------------------------
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.url}` });
});

// -------------------------------------------------------------
// Frontend Static File Serving & Vite Development Mode
// -------------------------------------------------------------
async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;
  const distPath = path.resolve(__dirname, "dist");
  const distIndexExists = fs.existsSync(path.resolve(distPath, "index.html"));

  const isProduction =
    process.env.NODE_ENV === "production" ||
    (distIndexExists && process.env.NODE_ENV !== "development");

  if (!isProduction) {
    // Development mode: Vite middleware
    console.log("[S-Lab] Starting in DEVELOPMENT mode with Vite middleware...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built React SPA from dist directory
    console.log(`[S-Lab] Starting in PRODUCTION mode serving from: ${distPath}`);
    app.use(express.static(distPath));

    // Fallback for React Router / SPA refresh
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`);
    console.log(`  S-Lab (Saffron Laboratories) Node.js Web Server   `);
    console.log(`  URL: http://localhost:${PORT}                     `);
    console.log(`  Mode: ${isProduction ? "PRODUCTION" : "DEVELOPMENT"}`);
    console.log(`  Gemini API Key: ${process.env.GEMINI_API_KEY ? "CONFIGURED" : "NOT SET"}`);
    console.log(`====================================================`);
  });
}

startServer();
