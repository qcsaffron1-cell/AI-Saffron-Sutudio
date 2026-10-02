import React, { useState, useRef } from "react";
import {
  Sparkles,
  Volume2,
  Play,
  Pause,
  Download,
  Code2,
  CheckCircle2,
  RefreshCw,
  Sliders,
  FileText,
  User,
  Zap,
  Loader2,
} from "lucide-react";
import { AVAILABLE_VOICES, PRESENTATION_SECTIONS } from "../data/presentationData";
import { fetchGeminiTtsAudio } from "../services/ttsService";

interface VoiceStudioProps {
  activeVoice: string;
  onVoiceChange: (voice: string) => void;
}

const STYLE_PRESETS = [
  {
    name: "สารคดีองค์กรหรูหรา (Corporate Documentary)",
    prompt:
      "A warm, articulate, highly prestigious Thai corporate documentary narrator speaking Thai with exceptional clarity, steady pacing, and genuine authority for Saffron Laboratories (S-Lab).",
  },
  {
    name: "เปิดตัวสกินแคร์ระดับไฮเอนด์ (Luxury Skincare Launch)",
    prompt:
      "A soft, elegant, alluring Thai narrator voice. Refined, soothing, and premium tone suitable for high-end cosmetic formulations and beauty science.",
  },
  {
    name: "วิทยาศาสตร์และความแม่นยำสูง (Scientific & R&D Precision)",
    prompt:
      "An authoritative, clear, and methodical scientific presenter speaking Thai. Emphasizing clinical stability, cleanroom standards, and meticulous quality control.",
  },
  {
    name: "มั่นใจ กระฉับกระเฉง ทันสมัย (Modern & Dynamic Innovation)",
    prompt:
      "An energetic, confident, and inspiring voice. High clarity and engaging momentum for modern OEM cosmetics manufacturing.",
  },
];

export const VoiceStudio: React.FC<VoiceStudioProps> = ({ activeVoice, onVoiceChange }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [customStyle, setCustomStyle] = useState<string>(STYLE_PRESETS[0].prompt);
  const [inputText, setInputText] = useState<string>(
    PRESENTATION_SECTIONS[0].scriptText
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioSource, setAudioSource] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleGenerateAndPlay = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const res = await fetchGeminiTtsAudio(inputText, activeVoice, customStyle);
      setAudioUrl(res.audioUrl);
      setAudioSource(res.source);

      if (audioRef.current) {
        audioRef.current.src = res.audioUrl;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาดในการสังเคราะห์เสียงด้วย gemini-3.8-flash-tts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `S-Lab_Gemini3.8TTS_${activeVoice}_${Date.now()}.wav`;
    a.click();
  };

  const loadChapterText = (idx: number) => {
    setInputText(PRESENTATION_SECTIONS[idx].scriptText);
  };

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Flagship Audio Model Integration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Voice Studio: <span className="text-teal-300 font-mono">gemini-3.8-flash-tts</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              ระบบแปลงข้อความเป็นเสียงบรรยายสารคดี (Text-to-Speech) คุณภาพเสียงระดับสตูดิโอ 24kHz mono 16-bit WAV
              ออกแบบมาเพื่อการนำเสนอภาพลักษณ์องค์กร แซฟฟรอน แลบบอราทอรี่ส์ (เอส-แลบ)
              พร้อมรองรับการสั่งปรับท่วงทำนองเสียงผ่าน Speech Metadata
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <Code2 className="w-4 h-4 text-teal-400" />
              <span>{showCode ? "ซ่อน SDK Code" : "ดูโค้ด SDK @google/genai"}</span>
            </button>
          </div>
        </div>

        {/* Code Snippet Drawer */}
        {showCode && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-teal-400">
                Server-side Implementation (server.ts)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Model: gemini-3.8-flash-tts</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build" } }
});

const response = await ai.models.generateContent({
  model: "gemini-3.8-flash-tts",
  contents: [{
    role: "user",
    parts: [{
      text: "${inputText.slice(0, 40)}...",
      speechMetadata: {
        style: "${customStyle.slice(0, 50)}..."
      }
    }]
  }],
  config: {
    responseModalities: ["AUDIO"],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: "${activeVoice}" }
      }
    }
  }
});

// Returns uncompressed 24kHz mono WAV:
const wavBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;`}
            </pre>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Text Input and Chapter Selectors */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Script Chapter Buttons */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-400" />
                โหลดสคริปต์สปอตทางการของ เอส-แลบ (7 บท)
              </span>
              <span className="text-xs text-slate-500">คลิกเพื่อใส่ข้อความ</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESENTATION_SECTIONS.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => loadChapterText(idx)}
                  className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700/60 text-left text-xs transition-all hover:border-teal-500/40"
                >
                  <p className="font-semibold text-teal-300 truncate">{sec.category}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{sec.timeRange}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-200">
                ข้อความภาษาไทยที่ต้องการให้ AI บรรยาย (Thai Narration Text)
              </label>
              <span className="text-xs text-slate-500 font-mono">{inputText.length} ตัวอักษร</span>
            </div>

            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="พิมพ์ข้อความภาษาไทยที่ต้องการให้สังเคราะห์เสียง..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent leading-relaxed"
            />

            {/* Error banner */}
            {error && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-xs text-red-300">
                {error}
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>โมเดลพร้อมใช้งาน:</span>
                <span className="text-slate-200 font-mono font-medium">gemini-3.8-flash-tts</span>
              </div>

              <button
                onClick={handleGenerateAndPlay}
                disabled={isLoading || !inputText.trim()}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold shadow-lg shadow-teal-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>กำลังสร้างเสียงด้วย AI...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-slate-950" />
                    <span>สร้างและเล่นเสียงบรรยาย (TTS)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Audio Player Card (Visible when audioUrl ready) */}
          {audioUrl && (
            <div className="rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/40 p-5 shadow-xl animate-fade-in">
              <audio
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleTogglePlay}
                    className="p-3.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md shadow-teal-500/30 transition-transform active:scale-95 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
                  </button>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white">เสียงบรรยายพร้อมเล่น</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {activeVoice}
                      </span>
                      {audioSource === "cache" && (
                        <span className="text-[10px] text-teal-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          (จากแคช)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      รูปแบบไฟล์: 24kHz Mono WAV (RIFF Uncompressed)
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Download className="w-4 h-4 text-teal-400" />
                    <span>ดาวน์โหลดไฟล์ WAV</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Voice Personas & Speech Style Prompting */}
        <div className="space-y-6">
          {/* Voice Persona Selection */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-teal-400" />
              <span>เลือกผู้บรรยาย (Voice Personas)</span>
            </h3>

            <div className="space-y-2.5">
              {AVAILABLE_VOICES.map((v) => {
                const isSelected = activeVoice === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => onVoiceChange(v.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-teal-500/15 border-teal-500 text-white shadow-sm"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm">{v.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            v.gender === "Female"
                              ? "bg-pink-500/20 text-pink-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {v.gender === "Female" ? "เสียงหญิง" : "เสียงชาย"}
                        </span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Speech Style Tuning (Speech Metadata Prompt) */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>รูปแบบท่วงทำนองเสียง (Style Metadata)</span>
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              กำหนดบุคลิกน้ำเสียงให้กับ gemini-3.8-flash-tts
            </p>

            <div className="space-y-2 mb-3">
              {STYLE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPresetIndex(idx);
                    setCustomStyle(preset.prompt);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all ${
                    selectedPresetIndex === idx
                      ? "bg-amber-500/15 border border-amber-500/40 text-amber-200 font-medium"
                      : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800/80"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={customStyle}
              onChange={(e) => setCustomStyle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="ปรับแต่งคำสั่งสไตล์เสียงเป็นภาษาอังกฤษ..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
