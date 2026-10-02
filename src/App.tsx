import React, { useState } from "react";
import { Header } from "./components/Header";
import { PresentationStage } from "./components/PresentationStage";
import { ChapterDossier } from "./components/ChapterDossier";
import { VoiceStudio } from "./components/VoiceStudio";
import { OemEstimator } from "./components/OemEstimator";
import { AboutCompany } from "./components/AboutCompany";
import { Footer } from "./components/Footer";
import { PRESENTATION_SECTIONS } from "./data/presentationData";
import { Sparkles, ShieldCheck, PlayCircle, Layers, Cpu, Award } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "presentation" | "dossier" | "studio" | "estimator" | "about"
  >("presentation");
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [activeVoice, setActiveVoice] = useState<string>("Kore");

  const handleSelectSectionFromAnywhere = (index: number) => {
    setCurrentSectionIndex(index);
    setActiveTab("presentation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isPlaying={false}
        activeVoice={activeVoice}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Quick Announcement Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-indigo-950/50 border border-teal-500/30 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  OEM COSMETIC LEADER
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="text-xs text-amber-300 font-medium">เริ่มดำเนินการ พ.ศ. 2544 (2001)</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">
                แซฟฟรอน แลบบอราทอรี่ส์ (เอส-แลบ) | รับรองมาตรฐาน อย. กระทรวงสาธารณสุข
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("presentation")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "presentation"
                  ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>รับชมพรีเซนเทชัน</span>
            </button>

            <button
              onClick={() => setActiveTab("studio")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "studio"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ห้องเสียง AI (TTS)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Multimedia Presentation */}
        {activeTab === "presentation" && (
          <div className="space-y-8 animate-fade-in">
            {/* The 16:9 Presentation Stage Player */}
            <PresentationStage
              currentSectionIndex={currentSectionIndex}
              onSelectSection={setCurrentSectionIndex}
              activeVoice={activeVoice}
              onVoiceChange={setActiveVoice}
            />

            {/* Section Overview Cards Below Stage */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <span>สารบัญ 7 บทการผลิต (คลิกเพื่อข้ามไปยังช่วงเวลาที่ต้องการ)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ความยาวรวม 04:24 นาที ตามสคริปต์ทางการ แซฟฟรอน แลบบอราทอรี่ส์
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("dossier")}
                  className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
                >
                  ดูข้อมูลเชิงลึกทั้งหมด &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PRESENTATION_SECTIONS.map((sec, idx) => {
                  const isCurrent = idx === currentSectionIndex;
                  return (
                    <div
                      key={sec.id}
                      onClick={() => setCurrentSectionIndex(idx)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isCurrent
                          ? "bg-teal-500/15 border-teal-500 text-white shadow-sm"
                          : "bg-slate-950 border-slate-800/80 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-teal-400 font-semibold">
                          {sec.timeRange}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          0{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-100 truncate">
                        {sec.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate mt-1">
                        {sec.englishTitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Factory & Process Dossier */}
        {activeTab === "dossier" && (
          <div className="animate-fade-in">
            <ChapterDossier
              onPlayInSectionPlayer={handleSelectSectionFromAnywhere}
              activeVoice={activeVoice}
            />
          </div>
        )}

        {/* Tab 3: Dedicated AI Voice Studio (gemini-3.8-flash-tts) */}
        {activeTab === "studio" && (
          <div className="animate-fade-in">
            <VoiceStudio
              activeVoice={activeVoice}
              onVoiceChange={setActiveVoice}
            />
          </div>
        )}

        {/* Tab 4: OEM Feasibility & Cost Estimator */}
        {activeTab === "estimator" && (
          <div className="animate-fade-in">
            <OemEstimator />
          </div>
        )}

        {/* Tab 5: About Company */}
        {activeTab === "about" && (
          <div className="animate-fade-in">
            <AboutCompany />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
