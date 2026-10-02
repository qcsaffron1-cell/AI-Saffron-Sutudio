import React from "react";
import { ShieldCheck, Sparkles, Heart } from "lucide-react";
import { COMPANY_INFO } from "../data/presentationData";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-900 bg-slate-950/80 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-semibold text-slate-300">
            {COMPANY_INFO.nameTh} ({COMPANY_INFO.brandTh})
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>เริ่มดำเนินการเมื่อปี พ.ศ. {COMPANY_INFO.establishedYearBe}</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            มาตรฐาน อย. กระทรวงสาธารณสุข
          </span>
        </div>

        <div className="flex items-center space-x-2 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>ขับเคลื่อนเสียงบรรยาย AI ด้วย</span>
          <span className="text-teal-300 font-mono font-medium">gemini-3.8-flash-tts</span>
        </div>
      </div>
    </footer>
  );
};
