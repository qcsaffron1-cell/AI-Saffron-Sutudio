import React, { useState } from "react";
import {
  PRESENTATION_SECTIONS,
  AVAILABLE_VOICES,
} from "../data/presentationData";
import {
  Clock,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Cpu,
  Layers,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { fetchGeminiTtsAudio } from "../services/ttsService";

interface ChapterDossierProps {
  onPlayInSectionPlayer: (index: number) => void;
  activeVoice: string;
}

export const ChapterDossier: React.FC<ChapterDossierProps> = ({
  onPlayInSectionPlayer,
  activeVoice,
}) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const currentAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleQuickPlayAudio = async (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();

    // If already playing this chapter, pause
    if (playingIndex === idx && currentAudioRef.current) {
      currentAudioRef.current.pause();
      setPlayingIndex(null);
      return;
    }

    try {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }

      setLoadingIndex(idx);
      const sec = PRESENTATION_SECTIONS[idx];
      const res = await fetchGeminiTtsAudio(sec.scriptText, activeVoice);

      const audio = new Audio(res.audioUrl);
      currentAudioRef.current = audio;

      audio.onended = () => setPlayingIndex(null);
      audio.onpause = () => setPlayingIndex(null);

      await audio.play();
      setPlayingIndex(idx);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dossier Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Comprehensive Factory & Process Dossier</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              เอกสารข้อมูลเชิงลึก 7 หมวดกระบวนการผลิต (S-Lab Dossier)
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
              รายละเอียดกระบวนการผลิตตามสคริปต์ทางการของ แซฟฟรอน แลบบอราทอรี่ส์ (เริ่มดำเนินการปี 2544)
              พร้อมข้อมูลทางเทคนิค มาตรฐานการตรวจรับรองของ อย. และการทดสอบเพื่อความปลอดภัยสูงสุด
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700/80 shrink-0">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs text-slate-300">
              เสียงบรรยาย: <strong className="text-teal-300">{activeVoice}</strong> (Gemini 3.8 Flash TTS)
            </span>
          </div>
        </div>
      </div>

      {/* Chapters Accordion / Card List */}
      <div className="space-y-4">
        {PRESENTATION_SECTIONS.map((sec, idx) => {
          const isExpanded = expandedIndex === idx;
          const isCurrentlyPlaying = playingIndex === idx;
          const isCurrentlyLoading = loadingIndex === idx;

          return (
            <div
              key={sec.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "bg-slate-900/90 border-teal-500/40 shadow-xl"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="flex items-center justify-between p-5 cursor-pointer select-none"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-teal-400 text-sm">
                    0{idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                        {sec.timeRange}
                      </span>
                      <span className="text-xs text-slate-400">|</span>
                      <span className="text-xs text-slate-400 font-medium">{sec.englishTitle}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {sec.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Quick Play Audio Button */}
                  <button
                    onClick={(e) => handleQuickPlayAudio(idx, e)}
                    disabled={isCurrentlyLoading}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
                    title="ฟังเสียงบรรยายด้วย gemini-3.8-flash-tts"
                  >
                    {isCurrentlyLoading ? (
                      <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                    ) : isCurrentlyPlaying ? (
                      <Pause className="w-4 h-4 text-teal-400 fill-teal-400" />
                    ) : (
                      <Play className="w-4 h-4 text-teal-400 fill-teal-400" />
                    )}
                    <span className="hidden sm:inline">
                      {isCurrentlyLoading ? "สร้างเสียง..." : isCurrentlyPlaying ? "หยุดชั่วคราว" : "ฟังเสียง AI"}
                    </span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayInSectionPlayer(idx);
                    }}
                    className="p-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 transition-colors"
                    title="ไปที่เวทีพรีเซนเทชัน"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-6 animate-fade-in">
                  {/* Script verbatim block */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-teal-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        บทพากย์ทางการ (Official Narration Script)
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ความยาว {sec.durationSeconds} วินาที
                      </span>
                    </div>
                    <div className="space-y-2">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-sm text-slate-300 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Highlights & Technical Specs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Key Highlights */}
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        จุดเด่นและมาตรฐานในขั้นตอนนี้
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {sec.keyHighlights.map((kh, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                            <span>{kh}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Specifications */}
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        ข้อมูลทางเทคนิคและการควบคุม (Specs)
                      </h4>
                      <div className="space-y-2">
                        {sec.specs.map((sp, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60 last:border-0">
                            <span className="text-slate-400">{sp.label}</span>
                            <span className="font-semibold text-slate-200 text-right">{sp.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
