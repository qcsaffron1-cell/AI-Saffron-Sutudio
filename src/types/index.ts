export interface PresentationSection {
  id: string;
  timeRange: string;
  startSeconds: number;
  endSeconds: number;
  durationSeconds: number;
  title: string;
  englishTitle: string;
  category: string;
  scriptText: string;
  paragraphs: string[];
  keyHighlights: string[];
  specs: { label: string; value: string }[];
  visualTheme: "intro" | "rd" | "prep" | "team" | "production" | "logistics" | "outtro";
}

export interface VoiceOption {
  id: string;
  name: string;
  gender: "Female" | "Male";
  description: string;
  personaTh: string;
}

export interface AudioPlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentSectionIndex: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  isLoadingAudio: boolean;
  isGeneratingTts: boolean;
  error: string | null;
  activeVoice: string;
}
