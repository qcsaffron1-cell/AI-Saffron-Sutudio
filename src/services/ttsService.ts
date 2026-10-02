/**
 * Service for Text-To-Speech powered by Gemini 3.8 Flash TTS (gemini-3.8-flash-tts)
 */

interface TtsResponse {
  audioBase64: string;
  mimeType: string;
  model: string;
  voiceName: string;
  cached?: boolean;
}

const memoryAudioCache = new Map<string, string>(); // key -> object URL

export async function fetchGeminiTtsAudio(
  text: string,
  voiceName: string = "Kore",
  style?: string
): Promise<{ audioUrl: string; source: "gemini" | "cache" | "fallback" }> {
  const cacheKey = `gemini_tts_${voiceName}_${text.trim()}`;

  // 1. Check in-memory audio object URL cache
  if (memoryAudioCache.has(cacheKey)) {
    return {
      audioUrl: memoryAudioCache.get(cacheKey)!,
      source: "cache",
    };
  }

  // 2. Request server-side Gemini 3.8 Flash TTS endpoint
  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voiceName,
        style,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `Server responded with HTTP ${res.status}`);
    }

    const data: TtsResponse = await res.json();
    if (!data.audioBase64) {
      throw new Error("Missing audio payload in response");
    }

    // Convert base64 into a Blob and Object URL
    const binaryString = atob(data.audioBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: data.mimeType || "audio/wav" });
    const audioUrl = URL.createObjectURL(blob);

    memoryAudioCache.set(cacheKey, audioUrl);

    return {
      audioUrl,
      source: "gemini",
    };
  } catch (err: any) {
    console.warn("Gemini 3.8 Flash TTS request failed:", err);
    throw err;
  }
}

/**
 * Fallback synthesizer using browser Web Speech API for emergency offline / no-key cases
 */
export function playWebSpeechFallback(
  text: string,
  onEnd?: () => void,
  rate = 1.0
): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "th-TH";
  utterance.rate = rate;

  // Try to pick a Thai voice if available
  const voices = window.speechSynthesis.getVoices();
  const thaiVoice = voices.find((v) => v.lang.startsWith("th"));
  if (thaiVoice) {
    utterance.voice = thaiVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopWebSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
