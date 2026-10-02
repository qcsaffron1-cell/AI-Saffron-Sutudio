import { GoogleGenAI } from "@google/genai";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "15mb" }));

// Server-side Gemini initialization as mandated by gemini-api guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// In-memory cache for generated TTS audio to ensure instant replay and low latency
const ttsCache = new Map<string, { audioBase64: string; mimeType: string }>();

// Text-to-Speech API route using gemini-3.8-flash-tts
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voiceName = "Kore", style } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text is required" });
    }

    const trimmedText = text.trim();
    const cacheKey = `${voiceName}_${trimmedText.slice(0, 100)}_${trimmedText.length}`;

    if (ttsCache.has(cacheKey)) {
      const cached = ttsCache.get(cacheKey)!;
      return res.json({
        ...cached,
        model: "gemini-3.8-flash-tts",
        voiceName,
        cached: true,
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is not configured in environment.",
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
            // Prebuilt voices: 'Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'
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
    console.error("TTS generation error:", error);
    return res.status(500).json({
      error: error?.message || "Failed to generate speech with gemini-3.8-flash-tts",
      details: String(error),
    });
  }
});

// App status and voice metadata endpoint
app.get("/api/config", (req, res) => {
  res.json({
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
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
      { id: "Kore", name: "Kore", description: "เสียงหญิง อบอุ่น สง่างาม ชัดถ้อยชัดคำ (แนะนำสำหรับสารคดีและพรีเซนต์องค์กร)", gender: "Female" },
      { id: "Zephyr", name: "Zephyr", description: "เสียงหญิง นุ่มนวล ทันสมัย เข้าถึงง่าย", gender: "Female" },
      { id: "Puck", name: "Puck", description: "เสียงชาย มีชีวิตชีวา มั่นใจ เป็นธรรมชาติ", gender: "Male" },
      { id: "Charon", name: "Charon", description: "เสียงชาย นุ่มลึก ภูมิฐาน น่าเชื่อถือ", gender: "Male" },
      { id: "Fenrir", name: "Fenrir", description: "เสียงชาย สุขุม หนักแน่น ทรงพลัง", gender: "Male" },
    ],
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";
  const PORT = Number(process.env.PORT) || 3000;

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[S-Lab Server] Ready on http://localhost:${PORT}`);
  });
}

startServer();
