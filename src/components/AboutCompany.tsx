import React from "react";
import {
  Building2,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { COMPANY_INFO } from "../data/presentationData";

export const AboutCompany: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/50 to-slate-900 border border-teal-500/30 p-6 sm:p-10 overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">
            <Building2 className="w-4 h-4" />
            <span>ESTABLISHED SINCE 2544 (2001)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {COMPANY_INFO.nameTh}
          </h2>
          <p className="text-base sm:text-lg font-semibold text-teal-300 mt-1">
            {COMPANY_INFO.brandTh} | {COMPANY_INFO.nameEn}
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            โรงงานผลิตเครื่องสำอางรูปแบบ OEM ชั้นนำของประเทศไทยที่ได้รับรองมาตรฐานจากคณะกรรมการอาหารและยา กระทรวงสาธารณสุข
            เริ่มดำเนินการตั้งแต่ปี พ.ศ. 2544 มุ่งมั่นส่งมอบผลิตภัณฑ์คุณภาพสูงด้วยการผสานกำลังของบุคลากรผู้เชี่ยวชาญ เทคโนโลยีการผลิตระดับสากล และระบบการควบคุมคุณภาพที่เข้มงวด
          </p>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-center">
          <span className="text-3xl sm:text-4xl font-black text-teal-400 block font-mono">2544</span>
          <span className="text-xs text-slate-400 mt-1 block">ปีที่เริ่มดำเนินการ (พ.ศ.)</span>
        </div>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-center">
          <span className="text-3xl sm:text-4xl font-black text-cyan-400 block font-mono">25+</span>
          <span className="text-xs text-slate-400 mt-1 block">ปีแห่งความเชี่ยวชาญ OEM</span>
        </div>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-center">
          <span className="text-3xl sm:text-4xl font-black text-amber-400 block font-mono">100%</span>
          <span className="text-xs text-slate-400 mt-1 block">มาตรฐาน อย. รับรอง</span>
        </div>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-center">
          <span className="text-3xl sm:text-4xl font-black text-indigo-400 block font-mono">1,000+</span>
          <span className="text-xs text-slate-400 mt-1 block">สูตรที่พัฒนาและขึ้นทะเบียน</span>
        </div>
      </div>

      {/* Pillars & Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">มาตรฐานรับรองถูกต้อง</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            ได้รับรองมาตรฐานจากคณะกรรมการอาหารและยา กระทรวงสาธารณสุข (อย.) มั่นใจได้ในความปลอดภัยของทุกอนุภาคเนื้อสัมผัส
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">การวิจัยและพัฒนาล้ำสมัย</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            ทีมวิจัย R&D ทดสอบความคงตัว (Stability Testing) และความเข้ากันได้ของบรรจุภัณฑ์ เพื่อให้ผลิตภัณฑ์คงประสิทธิภาพตลอดอายุการเก็บรักษา
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">ใส่ใจทุกรายละเอียด</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            เพราะเราเชื่อว่า "คุณภาพของผลิตภัณฑ์ เกิดขึ้นจากคุณภาพของทุกกระบวนการ และคุณภาพที่ดี ต้องเริ่มต้นตั้งแต่กระบวนการผลิต"
          </p>
        </div>
      </div>

      {/* Contact & Consultation Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">
              ปรึกษาพัฒนาสูตรและผลิตเครื่องสำอาง OEM
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              ทีมงานฝ่ายวิจัยและพัฒนา พร้อมร่วมวางแผนสูตรเฉพาะและคำนวณงบประมาณเบื้องต้นฟรี
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200">
              <Mail className="w-4 h-4 text-teal-400" />
              <span>qc.saffron1@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>รับรองมาตรฐาน อย. กระทรวงสาธารณสุข</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
