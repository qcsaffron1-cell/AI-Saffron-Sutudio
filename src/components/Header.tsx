import React from "react";
import { Sparkles, ShieldCheck, Clock, Volume2, Beaker, FileText, Calculator, Building2 } from "lucide-react";
import { COMPANY_INFO } from "../data/presentationData";

interface HeaderProps {
  activeTab: "presentation" | "dossier" | "studio" | "estimator" | "about";
  onTabChange: (tab: "presentation" | "dossier" | "studio" | "estimator" | "about") => void;
  isPlaying: boolean;
  activeVoice: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  isPlaying,
  activeVoice,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => onTabChange("presentation")}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 via-cyan-500 to-amber-400 p-[2px] shadow-lg shadow-teal-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-black bg-gradient-to-r from-teal-300 via-cyan-200 to-amber-300 bg-clip-text text-transparent">
                  S
                </span>
              </div>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500"></span>
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>เอส-แลบ</span>
                  <span className="text-slate-400 font-normal text-sm sm:text-base">|</span>
                  <span className="text-teal-300 font-semibold">{COMPANY_INFO.nameTh}</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span className="text-slate-300">เริ่มดำเนินการ พ.ศ. {COMPANY_INFO.establishedYearBe}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  มาตรฐาน อย. กระทรวงสาธารณสุข
                </span>
              </p>
            </div>
          </div>

          {/* Right Status Badge */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-teal-500/30 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span className="text-slate-300 font-medium">AI เสียงบรรยาย:</span>
              <span className="text-teal-300 font-mono font-semibold">gemini-3.8-flash-tts</span>
              <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono text-[10px]">
                {activeVoice}
              </span>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>ความยาววิดีโอ 04:24</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
          <button
            onClick={() => onTabChange("presentation")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === "presentation"
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <Volume2 className="w-4 h-4 text-teal-400" />
            <span>มัลติมีเดียพรีเซนเทชัน (04:24)</span>
          </button>

          <button
            onClick={() => onTabChange("dossier")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === "dossier"
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>ข้อมูล 7 ขั้นตอนการผลิต (Dossier)</span>
          </button>

          <button
            onClick={() => onTabChange("studio")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === "studio"
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Voice Studio (gemini-3.8-flash-tts)</span>
          </button>

          <button
            onClick={() => onTabChange("estimator")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === "estimator"
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span>คำนวณงบผลิต OEM (Estimator)</span>
          </button>

          <button
            onClick={() => onTabChange("about")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === "about"
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>เกี่ยวกับ เอส-แลบ (ก่อตั้ง 2544)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
