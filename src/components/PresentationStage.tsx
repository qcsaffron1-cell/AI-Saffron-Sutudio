import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Download,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { PRESENTATION_SECTIONS, AVAILABLE_VOICES, TOTAL_DURATION_SECONDS } from "../data/presentationData";
import { PresentationGraphic } from "./PresentationGraphics";
import { fetchGeminiTtsAudio } from "../services/ttsService";

interface PresentationStageProps {
  currentSectionIndex: number;
  onSelectSection: (index: number) => void;
  activeVoice: string;
  onVoiceChange: (voice: string) => void;
}

export const PresentationStage: React.FC<PresentationStageProps> = ({
  currentSectionIndex,
  onSelectSection,
  activeVoice,
  onVoiceChange,
}) => {
  const currentSection = PRESENTATION_SECTIONS[currentSectionIndex];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [audioSource, setAudioSource] = useState<"gemini" | "cache" | "idle">("idle");
  const [audioProgress, setAudioProgress] = useState<number>(0); // 0 to 1
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Play audio for current section
  const handlePlaySection = async () => {
    try {
      setAudioError(null);

      // If we already have the audio element and it is just paused, resume it
      if (audioRef.current && currentAudioUrl && !audioRef.current.ended) {
        await audioRef.current.play();
        setIsPlaying(true);
        return;
      }

      setIsLoadingAudio(true);
      const stylePrompt =
        "A warm, articulate, highly prestigious Thai corporate documentary narrator speaking Thai with exceptional clarity, steady pacing, and genuine authority for Saffron Laboratories (S-Lab).";

      const res = await fetchGeminiTtsAudio(currentSection.scriptText, activeVoice, stylePrompt);
      setCurrentAudioUrl(res.audioUrl);
      setAudioSource(res.source === "cache" ? "cache" : "gemini");

      if (audioRef.current) {
        audioRef.current.src = res.audioUrl;
        audioRef.current.playbackRate = playbackRate;
        audioRef.current.volume = isMuted ? 0 : volume;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err: any) {
      console.error("Audio playback error:", err);
      setAudioError(err.message || "ไม่สามารถสังเคราะห์เสียงด้วย gemini-3.8-flash-tts ได้");
      setIsPlaying(false);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlaySection();
    }
  };

  // Auto clean up or change section audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveSentenceIndex(0);
    setAudioProgress(0);
    setCurrentAudioUrl(null);
    setAudioError(null);
  }, [currentSectionIndex, activeVoice]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const progress = audio.currentTime / audio.duration;
        setAudioProgress(progress);

        // Calculate sentence index for teleprompter karaoke highlight
        const paragraphs = currentSection.paragraphs;
        if (paragraphs.length > 0) {
          const index = Math.min(
            Math.floor(progress * paragraphs.length),
            paragraphs.length - 1
          );
          setActiveSentenceIndex(index);
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(1);
      // Auto advance to next section if not the last
      if (currentSectionIndex < PRESENTATION_SECTIONS.length - 1) {
        setTimeout(() => {
          onSelectSection(currentSectionIndex + 1);
        }, 1200);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSectionIndex, currentSection.paragraphs]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
      setIsFullscreen(false);
    }
  };

  // Download WAV file
  const handleDownloadWav = () => {
    if (!currentAudioUrl) {
      // Trigger fetch first then download
      setIsLoadingAudio(true);
      fetchGeminiTtsAudio(currentSection.scriptText, activeVoice)
        .then((res) => {
          const a = document.createElement("a");
          a.href = res.audioUrl;
          a.download = `S-Lab_${currentSection.category}_gemini-3.8-flash-tts_${activeVoice}.wav`;
          a.click();
        })
        .catch((e) => setAudioError(e.message))
        .finally(() => setIsLoadingAudio(false));
      return;
    }

    const a = document.createElement("a");
    a.href = currentAudioUrl;
    a.download = `S-Lab_${currentSection.category}_gemini-3.8-flash-tts_${activeVoice}.wav`;
    a.click();
  };

  // Current presentation time in mm:ss based on section start + progress
  const currentGlobalSeconds =
    currentSection.startSeconds + audioProgress * currentSection.durationSeconds;

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all ${
        isFullscreen ? "p-4 sm:p-8 flex flex-col justify-between" : ""
      }`}
    >
      <audio ref={audioRef} />

      {/* Top Bar inside Stage */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-sm z-20">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            {currentSection.timeRange}
          </span>
          <span className="text-sm font-medium text-slate-200">
            {currentSection.title}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {/* TTS Model Badge */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-teal-500/30 text-teal-300">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-teal-400" />
            <span className="font-semibold">gemini-3.8-flash-tts</span>
          </div>

          {/* Voice Selector */}
          <select
            value={activeVoice}
            onChange={(e) => onVoiceChange(e.target.value)}
            className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
          >
            {AVAILABLE_VOICES.map((v) => (
              <option key={v.id} value={v.id}>
                เสียง: {v.name} ({v.gender === "Female" ? "หญิง" : "ชาย"})
              </option>
            ))}
          </select>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="เต็มจอ"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Visual Display (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
        <PresentationGraphic theme={currentSection.visualTheme} isPlaying={isPlaying} />

        {/* Live Audio Visualizer Overlay on bottom right of the screen */}
        {isPlaying && (
          <div className="absolute top-4 right-4 flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-teal-500/40 text-teal-300 text-xs shadow-lg animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span className="font-medium">กำลังบรรยายด้วยเสียง AI</span>
            <div className="flex items-end space-x-0.5 h-3.5 ml-1">
              <span className="w-1 bg-teal-400 rounded-full wave-bar" style={{ animationDelay: "0ms" }} />
              <span className="w-1 bg-teal-400 rounded-full wave-bar" style={{ animationDelay: "200ms" }} />
              <span className="w-1 bg-teal-400 rounded-full wave-bar" style={{ animationDelay: "400ms" }} />
              <span className="w-1 bg-teal-400 rounded-full wave-bar" style={{ animationDelay: "150ms" }} />
            </div>
          </div>
        )}

        {/* Big Center Play Button if paused */}
        {!isPlaying && (
          <button
            onClick={handlePlaySection}
            disabled={isLoadingAudio}
            className="group absolute flex flex-col items-center justify-center p-6 rounded-full bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 backdrop-blur-md text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-teal-500/30 cursor-pointer"
          >
            {isLoadingAudio ? (
              <Loader2 className="w-12 h-12 text-teal-300 animate-spin" />
            ) : (
              <Play className="w-12 h-12 text-teal-300 fill-teal-300 ml-1 group-hover:text-white group-hover:fill-white transition-colors" />
            )}
            <span className="mt-2 text-xs font-semibold text-teal-200">
              {isLoadingAudio ? "กำลังสร้างเสียงบรรยาย..." : "กดเพื่อฟังเสียงบรรยาย AI"}
            </span>
          </button>
        )}

        {/* Error notification banner */}
        {audioError && (
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-red-950/90 border border-red-500/40 text-red-200 text-xs backdrop-blur-md flex items-center justify-between">
            <span>{audioError}</span>
            <button
              onClick={() => setAudioError(null)}
              className="ml-2 text-red-300 hover:text-white underline font-medium"
            >
              ปิด
            </button>
          </div>
        )}
      </div>

      {/* Synchronized Subtitles / Teleprompter Box */}
      <div className="bg-slate-900/95 border-t border-slate-800 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>บทบรรยายไทย (Teleprompter / Subtitles)</span>
            {audioSource === "cache" && (
              <span className="text-[10px] text-teal-400 font-normal px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                (แคชเสียงพร้อมเล่นทันที)
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500">
            หมวดที่ {currentSectionIndex + 1} จาก {PRESENTATION_SECTIONS.length}
          </span>
        </div>

        <div className="min-h-[70px] flex flex-col justify-center">
          <p className="text-sm sm:text-base md:text-lg font-medium text-slate-200 leading-relaxed">
            {currentSection.paragraphs.map((p, idx) => {
              const isActive = isPlaying && idx === activeSentenceIndex;
              return (
                <span
                  key={idx}
                  className={`inline-block mr-2 transition-all duration-300 ${
                    isActive
                      ? "text-teal-300 font-bold bg-teal-950/50 px-1.5 py-0.5 rounded border-l-2 border-teal-400 shadow-sm"
                      : "text-slate-300"
                  }`}
                >
                  {p}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      {/* Global Interactive Timeline Scrub Bar */}
      <div className="px-5 pt-3 pb-1 bg-slate-900 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
          <span>{formatTime(currentGlobalSeconds)}</span>
          <span className="text-slate-500">ความยาวทั้งหมด {formatTime(TOTAL_DURATION_SECONDS)} (04:24)</span>
        </div>

        {/* Multi-chapter progress bar */}
        <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden flex cursor-pointer">
          {PRESENTATION_SECTIONS.map((sec, idx) => {
            const widthPct = (sec.durationSeconds / TOTAL_DURATION_SECONDS) * 100;
            const isCurrent = idx === currentSectionIndex;
            const isPast = idx < currentSectionIndex;

            return (
              <div
                key={sec.id}
                onClick={() => onSelectSection(idx)}
                style={{ width: `${widthPct}%` }}
                className={`relative h-full border-r border-slate-950 transition-colors group ${
                  isCurrent
                    ? "bg-slate-700"
                    : isPast
                    ? "bg-teal-700/60 hover:bg-teal-600/70"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
                title={`${sec.title} (${sec.timeRange})`}
              >
                {/* Active progress inside the current section */}
                {isCurrent && (
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400"
                    style={{ width: `${audioProgress * 100}%` }}
                  />
                )}
                {isPast && <div className="h-full bg-teal-500/80" />}
              </div>
            );
          })}
        </div>

        {/* Section Jump Quick Tabs */}
        <div className="grid grid-cols-7 gap-1 mt-2 text-[10px] sm:text-xs">
          {PRESENTATION_SECTIONS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => onSelectSection(idx)}
              className={`py-1 px-1 rounded truncate text-center transition-all ${
                idx === currentSectionIndex
                  ? "bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <span className="hidden sm:inline">[{sec.timeRange.split("–")[0]}] </span>
              <span>{sec.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 bg-slate-950 border-t border-slate-800">
        {/* Left: Previous / Play / Next */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => onSelectSection(Math.max(0, currentSectionIndex - 1))}
            disabled={currentSectionIndex === 0}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="บทก่อนหน้า"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleTogglePlay}
            disabled={isLoadingAudio}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 active:scale-95 transition-all cursor-pointer"
          >
            {isLoadingAudio ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-slate-950" />
            ) : (
              <Play className="w-5 h-5 fill-slate-950" />
            )}
            <span className="text-sm">
              {isLoadingAudio ? "สร้างเสียง AI..." : isPlaying ? "พักเสียง" : "เล่นเสียง AI"}
            </span>
          </button>

          <button
            onClick={() =>
              onSelectSection(
                Math.min(PRESENTATION_SECTIONS.length - 1, currentSectionIndex + 1)
              )
            }
            disabled={currentSectionIndex === PRESENTATION_SECTIONS.length - 1}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="บทถัดไป"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Playback Speed & Volume */}
        <div className="flex items-center space-x-3 sm:space-x-5 text-xs text-slate-300">
          {/* Speed Selector */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">ความเร็ว:</span>
            <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setPlaybackRate(rate);
                    if (audioRef.current) audioRef.current.playbackRate = rate;
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    playbackRate === rate
                      ? "bg-teal-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Volume Mute */}
          <button
            onClick={() => {
              const newMuted = !isMuted;
              setIsMuted(newMuted);
              if (audioRef.current) audioRef.current.volume = newMuted ? 0 : volume;
            }}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Right: Download Audio WAV */}
        <button
          onClick={handleDownloadWav}
          disabled={isLoadingAudio}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-teal-300 transition-colors cursor-pointer"
          title="ดาวน์โหลดไฟล์เสียงบรรยายของบทนี้เป็น WAV คุณภาพสูง"
        >
          <Download className="w-4 h-4 text-teal-400" />
          <span>โหลดไฟล์เสียง (WAV)</span>
        </button>
      </div>
    </div>
  );
};
