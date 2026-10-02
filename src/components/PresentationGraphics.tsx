import React from "react";

interface GraphicProps {
  theme: "intro" | "rd" | "prep" | "team" | "production" | "logistics" | "outtro";
  isPlaying: boolean;
}

export const PresentationGraphic: React.FC<GraphicProps> = ({ theme, isPlaying }) => {
  switch (theme) {
    case "intro":
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950/60 p-6">
          {/* Ambient glow */}
          <div className="absolute w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none -top-10 -left-10" />
          <div className="absolute w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none -bottom-10 -right-10" />

          <svg viewBox="0 0 800 450" className="w-full h-full max-h-[380px] drop-shadow-2xl">
            {/* Background Grid */}
            <defs>
              <linearGradient id="introGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="800" height="450" fill="url(#grid)" />

            {/* Architectural Building / Lab Silhouette */}
            <rect x="180" y="110" width="440" height="230" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
            <rect x="200" y="130" width="400" height="190" rx="12" fill="#020617" stroke="#334155" strokeWidth="1" />

            {/* Glowing Lab Windows / Cleanroom modules */}
            <g opacity="0.85">
              {[0, 1, 2].map((row) =>
                [0, 1, 2, 3].map((col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={230 + col * 90}
                    y={150 + row * 55}
                    width="70"
                    height="40"
                    rx="6"
                    fill="#0f2b38"
                    stroke="#14b8a6"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  >
                    {isPlaying && (
                      <animate
                        attributeName="opacity"
                        values="0.4;0.9;0.4"
                        dur={`${2 + col * 0.4}s`}
                        repeatCount="indefinite"
                      />
                    )}
                  </rect>
                ))
              )}
            </g>

            {/* Center Prestige Shield & Logo */}
            <circle cx="400" cy="225" r="70" fill="#020617" stroke="url(#introGrad)" strokeWidth="3" />
            <circle cx="400" cy="225" r="58" fill="#0f172a" stroke="#0d9488" strokeWidth="1" strokeDasharray="4 3" />
            <text x="400" y="218" textAnchor="middle" fill="#5eead4" fontSize="32" fontWeight="800" fontFamily="sans-serif">
              S-LAB
            </text>
            <text x="400" y="242" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500" letterSpacing="2">
              EST. 2544 (2001)
            </text>

            {/* Floating Trust Badges */}
            <g transform="translate(130, 260)">
              <rect width="180" height="50" rx="25" fill="#091e28" stroke="#14b8a6" strokeWidth="1.5" />
              <circle cx="28" cy="25" r="14" fill="#14b8a6" fillOpacity="0.2" />
              <path d="M 22 25 L 26 29 L 34 21" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
              <text x="52" y="24" fill="#ffffff" fontSize="11" fontWeight="700">มาตรฐาน อย.</text>
              <text x="52" y="38" fill="#94a3b8" fontSize="9">กระทรวงสาธารณสุข</text>
            </g>

            <g transform="translate(490, 260)">
              <rect width="180" height="50" rx="25" fill="#1e1808" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="28" cy="25" r="14" fill="#f59e0b" fillOpacity="0.2" />
              <text x="28" y="30" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="800">25</text>
              <text x="52" y="24" fill="#ffffff" fontSize="11" fontWeight="700">ประสบการณ์ 25+ ปี</text>
              <text x="52" y="38" fill="#cbd5e1" fontSize="9">ผู้ผลิต OEM เชี่ยวชาญ</text>
            </g>

            {/* Top Brand Name */}
            <text x="400" y="70" textAnchor="middle" fill="#f8fafc" fontSize="26" fontWeight="700">
              แซฟฟรอน แลบบอราทอรี่ส์ (Saffron Laboratories)
            </text>
            <text x="400" y="94" textAnchor="middle" fill="#94a3b8" fontSize="13">
              โรงงานผลิตเครื่องสำอางรูปแบบ OEM มาตรฐานกระทรวงสาธารณสุข
            </text>
          </svg>
        </div>
      );

    case "rd":
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950/40 to-slate-900 p-6">
          <svg viewBox="0 0 800 450" className="w-full h-full max-h-[380px] drop-shadow-2xl">
            <defs>
              <linearGradient id="flaskLiquid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Bench table */}
            <line x1="80" y1="360" x2="720" y2="360" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="120" y1="360" x2="120" y2="420" stroke="#1e293b" strokeWidth="8" />
            <line x1="680" y1="360" x2="680" y2="420" stroke="#1e293b" strokeWidth="8" />

            {/* Stability Testing Chamber */}
            <g transform="translate(100, 140)">
              <rect width="180" height="215" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <rect x="15" y="20" width="150" height="135" rx="4" fill="#020617" stroke="#1e293b" />
              {/* Digital Screen */}
              <rect x="25" y="30" width="130" height="30" rx="4" fill="#0369a1" fillOpacity="0.2" />
              <text x="90" y="50" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="700" fontFamily="monospace">
                STABILITY 45°C
              </text>
              {/* Shelves with cosmetic test bottles */}
              <line x1="20" y1="95" x2="160" y2="95" stroke="#334155" strokeWidth="2" />
              <rect x="35" y="70" width="18" height="25" rx="2" fill="#2dd4bf" fillOpacity="0.7" />
              <rect x="65" y="66" width="22" height="29" rx="3" fill="#38bdf8" fillOpacity="0.7" />
              <rect x="100" y="68" width="18" height="27" rx="2" fill="#fbbf24" fillOpacity="0.7" />
              <rect x="130" y="72" width="16" height="23" rx="2" fill="#a78bfa" fillOpacity="0.7" />

              <line x1="20" y1="140" x2="160" y2="140" stroke="#334155" strokeWidth="2" />
              <rect x="40" y="115" width="20" height="25" rx="2" fill="#2dd4bf" fillOpacity="0.7" />
              <rect x="75" y="112" width="24" height="28" rx="2" fill="#f43f5e" fillOpacity="0.7" />
              <rect x="115" y="115" width="20" height="25" rx="2" fill="#38bdf8" fillOpacity="0.7" />

              <text x="90" y="185" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">
                การทดสอบความคงตัว
              </text>
              <text x="90" y="200" textAnchor="middle" fill="#64748b" fontSize="9">
                Stability & Shelf-Life Test
              </text>
            </g>

            {/* Center: Erlenmeyer Flask Formulation & Chemical Bonding */}
            <g transform="translate(340, 160)">
              {/* Chemical Bonds floating */}
              <circle cx="60" cy="-30" r="14" fill="#042f2e" stroke="#14b8a6" strokeWidth="2" />
              <text x="60" y="-25" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">R&D</text>
              <circle cx="130" cy="-10" r="12" fill="#042f2e" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="130" y="-6" textAnchor="middle" fill="#7dd3fc" fontSize="9">pH 5.5</text>
              <line x1="72" y1="-24" x2="120" y2="-12" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 3" />

              {/* Erlenmeyer Flask */}
              <path
                d="M 45 40 L 45 70 L 10 185 Q 5 200 25 200 L 95 200 Q 115 200 110 185 L 75 70 L 75 40 Z"
                fill="#0f172a"
                stroke="#5eead4"
                strokeWidth="2.5"
              />
              {/* Liquid */}
              <path
                d="M 18 170 Q 60 160 102 170 L 95 198 L 25 198 Z"
                fill="url(#flaskLiquid)"
              />
              {/* Bubbles */}
              {isPlaying && (
                <>
                  <circle cx="45" cy="180" r="3" fill="#ffffff" opacity="0.8">
                    <animate attributeName="cy" values="185;165" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="70" cy="182" r="4" fill="#ffffff" opacity="0.8">
                    <animate attributeName="cy" values="188;162" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
              {/* Pipette Dropper */}
              <rect x="56" y="0" width="8" height="50" rx="3" fill="#cbd5e1" stroke="#475569" />
              <path d="M 60 50 L 60 90" stroke="#2dd4bf" strokeWidth="3" strokeDasharray="6 4">
                {isPlaying && <animate attributeName="strokeDashoffset" values="0;20" dur="0.8s" repeatCount="indefinite" />}
              </path>
            </g>

            {/* Right: Packaging Compatibility Testing Module */}
            <g transform="translate(520, 140)">
              <rect width="180" height="215" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              {/* Packaging Test Glass Chamber */}
              <rect x="20" y="25" width="140" height="130" rx="6" fill="#020617" stroke="#475569" />
              {/* Cosmetic Bottles under test */}
              <g transform="translate(45, 50)">
                <rect x="0" y="15" width="30" height="65" rx="5" fill="#f8fafc" stroke="#94a3b8" />
                <rect x="8" y="0" width="14" height="15" rx="2" fill="#d97706" />
                <line x1="0" y1="45" x2="30" y2="45" stroke="#0d9488" strokeWidth="1.5" />
              </g>
              <g transform="translate(95, 60)">
                <ellipse cx="20" cy="40" rx="22" ry="16" fill="#f8fafc" stroke="#94a3b8" />
                <rect x="3" y="15" width="34" height="25" fill="#f1f5f9" />
                <rect x="1" y="8" width="38" height="8" rx="2" fill="#f59e0b" />
              </g>

              {/* Status Badge */}
              <rect x="30" y="125" width="120" height="20" rx="10" fill="#f59e0b" fillOpacity="0.2" />
              <text x="90" y="139" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                COMPATIBILITY PASS
              </text>

              <text x="90" y="185" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600">
                ทดสอบความเข้ากันได้บรรจุภัณฑ์
              </text>
              <text x="90" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">
                Packaging Interaction & Leakage
              </text>
            </g>

            {/* Stage Title */}
            <text x="400" y="60" textAnchor="middle" fill="#2dd4bf" fontSize="16" fontWeight="700" letterSpacing="1">
              RESEARCH & DEVELOPMENT (R&D)
            </text>
            <text x="400" y="85" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700">
              การพัฒนาสูตรเฉพาะ การทดสอบความคงตัว และบรรจุภัณฑ์
            </text>
          </svg>
        </div>
      );

    case "prep":
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6">
          <svg viewBox="0 0 800 450" className="w-full h-full max-h-[380px] drop-shadow-2xl">
            {/* Title */}
            <text x="400" y="60" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="700" letterSpacing="1">
              BATCH PREPARATION & WEIGHING
            </text>
            <text x="400" y="85" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700">
              การเตรียมวัตถุดิบ การชั่งตวงแม่นยำสูง และการผสมสุญญากาศ
            </text>

            {/* Weighing Station Left */}
            <g transform="translate(100, 140)">
              <rect width="260" height="220" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
              <rect x="25" y="20" width="210" height="35" rx="6" fill="#0369a1" fillOpacity="0.25" />
              <text x="130" y="42" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="700">
                สถานีชั่งตวงวัตถุดิบ (PRECISION SCALE)
              </text>

              {/* Digital Scale Base */}
              <rect x="40" y="160" width="180" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <rect x="70" y="170" width="120" height="20" rx="3" fill="#020617" />
              <text x="130" y="185" textAnchor="middle" fill="#4ade80" fontSize="14" fontFamily="monospace" fontWeight="bold">
                1,500.000 g
              </text>

              {/* Scale Plate & Raw Material Jar */}
              <line x1="80" y1="150" x2="180" y2="150" stroke="#cbd5e1" strokeWidth="4" />
              <rect x="95" y="85" width="70" height="65" rx="8" fill="#14b8a6" fillOpacity="0.25" stroke="#2dd4bf" strokeWidth="2" />
              <rect x="105" y="75" width="50" height="12" rx="3" fill="#cbd5e1" />
              <text x="130" y="125" textAnchor="middle" fill="#5eead4" fontSize="11" fontWeight="bold">Active-99</text>

              <text x="130" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">
                ระบบชั่งน้ำหนักมาตรฐานคาลิเบรชันสากล
              </text>
            </g>

            {/* Conveyor Arrow */}
            <g transform="translate(385, 230)">
              <path d="M 0 0 L 25 0 M 20 -6 L 26 0 L 20 6" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Homogenizer Tank Right */}
            <g transform="translate(430, 130)">
              <rect width="280" height="235" rx="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
              <rect x="25" y="15" width="230" height="30" rx="6" fill="#0f2b38" />
              <text x="140" y="35" textAnchor="middle" fill="#2dd4bf" fontSize="12" fontWeight="700">
                ถังผสมสุญญากาศ VACUUM HOMOGENIZER
              </text>

              {/* Tank Body (Stainless Steel Look) */}
              <rect x="65" y="65" width="150" height="110" rx="12" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 65 170 Q 140 195 215 170 Z" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

              {/* Motor & Shaft */}
              <rect x="125" y="45" width="30" height="22" rx="3" fill="#334155" stroke="#64748b" />
              <line x1="140" y1="67" x2="140" y2="150" stroke="#cbd5e1" strokeWidth="4" />
              {/* Blades */}
              <path d="M 120 145 L 160 145 M 125 155 L 155 155" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

              {/* Observation Window */}
              <circle cx="140" cy="105" r="24" fill="#020617" stroke="#2dd4bf" strokeWidth="2" />
              <path d="M 122 108 Q 140 98 158 108" stroke="#38bdf8" strokeWidth="2" fill="none" />

              {/* Control Panel details */}
              <text x="140" y="210" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">
                ความเร็วรอบ 3,500 RPM | ปราศจากฟองอากาศ
              </text>
              <text x="140" y="224" textAnchor="middle" fill="#64748b" fontSize="9">
                Stainless 316L Food & Cosmetic Grade
              </text>
            </g>
          </svg>
        </div>
      );

    case "team":
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950/30 to-indigo-950/40 p-6">
          <svg viewBox="0 0 800 450" className="w-full h-full max-h-[380px] drop-shadow-2xl">
            {/* Title */}
            <text x="400" y="55" textAnchor="middle" fill="#a5b4fc" fontSize="16" fontWeight="700" letterSpacing="1">
              DEDICATED PERSONNEL & QUALITY CULTURE
            </text>
            <text x="400" y="80" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700">
              เบื้องหลังผลิตภัณฑ์ทุกชิ้น คือทีมงานที่ใส่ใจในทุกรายละเอียด
            </text>

            {/* Three key pillars cards */}
            {/* 1. R&D Scientists */}
            <g transform="translate(80, 120)">
              <rect width="190" height="240" rx="12" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5" />
              <circle cx="95" cy="65" r="32" fill="#134e4a" stroke="#2dd4bf" strokeWidth="2" />
              {/* Lab Coat / Scientist icon */}
              <circle cx="95" cy="55" r="14" fill="#f1f5f9" />
              <path d="M 75 88 C 75 72 115 72 115 88 Z" fill="#ffffff" />
              <text x="95" y="125" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700">ฝ่ายวิจัยและพัฒนา</text>
              <text x="95" y="145" textAnchor="middle" fill="#5eead4" fontSize="12" fontWeight="600">R&D Scientists</text>
              <line x1="30" y1="160" x2="160" y2="160" stroke="#1e293b" />
              <text x="95" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11">ออกแบบสูตรเฉพาะบุคคล</text>
              <text x="95" y="198" textAnchor="middle" fill="#94a3b8" fontSize="11">ทดสอบประสิทธิผลสูตร</text>
              <text x="95" y="216" textAnchor="middle" fill="#94a3b8" fontSize="11">เชี่ยวชาญสารสกัดสากล</text>
            </g>

            {/* 2. Production Engineers */}
            <g transform="translate(305, 120)">
              <rect width="190" height="240" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="95" cy="65" r="32" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
              {/* Cleanroom Operator Masked */}
              <circle cx="95" cy="55" r="14" fill="#f1f5f9" />
              <rect x="88" y="55" width="14" height="7" rx="1" fill="#38bdf8" />
              <path d="M 75 88 C 75 72 115 72 115 88 Z" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" />
              <text x="95" y="125" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700">ฝ่ายการผลิต</text>
              <text x="95" y="145" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="600">Production Team</text>
              <line x1="30" y1="160" x2="160" y2="160" stroke="#1e293b" />
              <text x="95" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11">ควบคุมเครื่องจักรสากล</text>
              <text x="95" y="198" textAnchor="middle" fill="#94a3b8" fontSize="11">ระบบ Cleanroom ISO</text>
              <text x="95" y="216" textAnchor="middle" fill="#94a3b8" fontSize="11">กระบวนการผสมไร้รอยต่อ</text>
            </g>

            {/* 3. QA / QC Officers */}
            <g transform="translate(530, 120)">
              <rect width="190" height="240" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="95" cy="65" r="32" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
              <path d="M 85 65 L 92 72 L 106 58" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
              <text x="95" y="125" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700">ฝ่ายควบคุมคุณภาพ</text>
              <text x="95" y="145" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="600">QA / QC Officers</text>
              <line x1="30" y1="160" x2="160" y2="160" stroke="#1e293b" />
              <text x="95" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11">ตรวจวิเคราะห์เชื้อจุลินทรีย์</text>
              <text x="95" y="198" textAnchor="middle" fill="#94a3b8" fontSize="11">สุ่มตรวจ In-process QC</text>
              <text x="95" y="216" textAnchor="middle" fill="#94a3b8" fontSize="11">ตรวจสอบสเปกก่อนส่งมอบ</text>
            </g>

            {/* Quote Banner */}
            <rect x="180" y="380" width="440" height="38" rx="19" fill="#020617" stroke="#334155" />
            <text x="400" y="404" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="500">
              "เพราะเราเชื่อว่า คุณภาพของผลิตภัณฑ์ เกิดขึ้นจากคุณภาพของทุกกระบวนการ"
            </text>
          </svg>
        </div>
      );

    case "production":
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950/50 to-slate-900 p-6">
          <svg viewBox="0 0 800 450" className="w-full h-full max-h-[380px] drop-shadow-2xl">
            {/* Title */}
            <text x="400" y="55" textAnchor="middle" fill="#2dd4bf" fontSize="16" fontWeight="700" letterSpacing="1">
              CONTROLLED CLEANROOM & MANUFACTURING
            </text>
            <text x="400" y="80" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700">
              มาตรฐานความสะอาด ระบบควบคุมอุณหภูมิ และเทคโนโลยีการบรรจุ
            </text>

            {/* Cleanroom Wall Frame */}
            <rect x="60" y="110" width="680" height="260" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

            {/* Ceiling HEPA Airflow Diffusers */}
            <g>
              {[120, 260, 400, 540, 680].map((x) => (
                <g key={x} transform={`translate(${x - 30}, 112)`}>
                  <rect width="60" height="12" rx="2" fill="#334155" />
                  {isPlaying && (
                    <line x1="30" y1="12" x2="30" y2="45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3">
                      <animate attributeName="strokeDashoffset" values="0;12" dur="1s" repeatCount="indefinite" />
                    </line>
                  )}
                </g>
              ))}
            </g>

            {/* Automated Conveyor Filling Line */}
            <g transform="translate(100, 240)">
              {/* Conveyor track */}
              <rect x="0" y="50" width="600" height="20" rx="4" fill="#1e293b" stroke="#475569" />
              {/* Conveyor rollers */}
              {[30, 90, 150, 210, 270, 330, 390, 450, 510, 570].map((rx) => (
                <circle key={rx} cx={rx} cy="60" r="5" fill="#64748b" />
              ))}

              {/* Moving bottles */}
              {[70, 160, 250, 340, 430, 520].map((bx, i) => (
                <g key={bx} transform={`translate(${bx}, 10)`}>
                  {/* Bottle body */}
                  <rect x="0" y="10" width="24" height="40" rx="3" fill="#f8fafc" stroke="#94a3b8" />
                  <rect x="5" y="0" width="14" height="10" rx="2" fill="#0d9488" />
                  {/* Fill level */}
                  <rect x="2" y={22 - (i % 2) * 5} width="20" height={26 + (i % 2) * 5} rx="1" fill="#2dd4bf" fillOpacity="0.75" />
                </g>
              ))}

              {/* Filling Nozzle Head */}
              <g transform="translate(245, -70)">
                <rect width="34" height="45" rx="4" fill="#334155" stroke="#64748b" />
                <line x1="17" y1="45" x2="17" y2="78" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                {isPlaying && (
                  <path d="M 17 78 L 17 95" stroke="#2dd4bf" strokeWidth="3" strokeDasharray="4 2">
                    <animate attributeName="strokeDashoffset" values="0;12" dur="0.6s" repeatCount="indefinite" />
                  </path>
                )}
                <circle cx="17" cy="22" r="5" fill="#4ade80" />
              </g>

              {/* Capping Head */}
              <g transform="translate(425, -50)">
                <rect width="34" height="35" rx="4" fill="#475569" stroke="#64748b" />
                <rect x="10" y="35" width="14" height="25" rx="2" fill="#cbd5e1" />
              </g>
            </g>

            {/* Digital Cleanroom Environmental Monitor */}
            <g transform="translate(100, 140)">
              <rect width="210" height="60" rx="8" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5" />
              <text x="15" y="25" fill="#94a3b8" fontSize="10">CLEANROOM CLASS 100K</text>
              <text x="15" y="45" fill="#2dd4bf" fontSize="16" fontWeight="bold" fontFamily="monospace">
                22.4°C | 52% RH
              </text>
              <rect x="155" y="20" width="40" height="18" rx="4" fill="#065f46" />
              <text x="175" y="33" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">PASS</text>
            </g>

            {/* In-process QC Check Banner */}
            <g transform="translate(500, 140)">
              <rect width="200" height="60" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="15" y="25" fill="#fbbf24" fontSize="10" fontWeight="bold">IN-PROCESS QC (IPQC)</text>
              <text x="15" y="44" fill="#f8fafc" fontSize="12">ตรวจสอบทุกล็อตการผลิต</text>
            </g>

            <text x="400" y="405" textAnchor="middle" fill="#94a3b8" fontSize="12">
              "เพราะเราเชื่อว่าคุณภาพที่ดี ต้องเริ่มต้นตั้งแต่กระบวนการผลิต"
            </text>
          </svg>
        </div>
      );

    case "logistics":
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 p-6">
          <svg viewBox="0 0 800 450" className="w-full h-full max-h-[380px] drop-shadow-2xl">
            {/* Title */}
            <text x="400" y="55" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="700" letterSpacing="1">
              STORAGE, PACKAGING & LOGISTICS
            </text>
            <text x="400" y="80" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700">
              การจัดเก็บในคลังควบคุมอุณหภูมิ และการจัดส่งที่ปลอดภัยถึงมือลูกค้า
            </text>

            {/* Warehouse Shelving Left */}
            <g transform="translate(80, 130)">
              <rect width="290" height="230" rx="10" fill="#0f172a" stroke="#059669" strokeWidth="2" />
              <rect x="20" y="15" width="250" height="30" rx="6" fill="#064e3b" fillOpacity="0.4" />
              <text x="145" y="35" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="700">
                คลังจัดเก็บควบคุมอุณหภูมิ (&lt; 25°C)
              </text>

              {/* Storage Racks */}
              <line x1="30" y1="120" x2="260" y2="120" stroke="#334155" strokeWidth="3" />
              <line x1="30" y1="180" x2="260" y2="180" stroke="#334155" strokeWidth="3" />

              {/* Cartons Shelf 1 */}
              {[40, 95, 150, 205].map((cx) => (
                <g key={cx} transform={`translate(${cx}, 70)`}>
                  <rect width="45" height="48" rx="4" fill="#78350f" stroke="#b45309" />
                  <line x1="22" y1="70" x2="22" y2="118" stroke="#d97706" />
                  <rect x="8" y="10" width="28" height="15" rx="2" fill="#f8fafc" opacity="0.8" />
                </g>
              ))}

              {/* Cartons Shelf 2 */}
              {[40, 95, 150, 205].map((cx) => (
                <g key={cx} transform={`translate(${cx}, 130)`}>
                  <rect width="45" height="48" rx="4" fill="#78350f" stroke="#b45309" />
                  <rect x="8" y="10" width="28" height="15" rx="2" fill="#f8fafc" opacity="0.8" />
                </g>
              ))}

              <text x="145" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">
                ระบบจัดการสต็อก First-In First-Out (FIFO) & Lot Tracking
              </text>
            </g>

            {/* Delivery Dispatch Right */}
            <g transform="translate(410, 130)">
              <rect width="310" height="230" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <rect x="20" y="15" width="270" height="30" rx="6" fill="#064e3b" fillOpacity="0.4" />
              <text x="155" y="35" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="700">
                การกระจายสินค้าถึงปลายทางลูกค้า (SAFE DISPATCH)
              </text>

              {/* Delivery Truck Graphic */}
              <g transform="translate(40, 75)">
                {/* Truck Cabin */}
                <path d="M 140 30 L 190 30 L 210 65 L 210 90 L 140 90 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <path d="M 155 40 L 185 40 L 198 62 L 155 62 Z" fill="#38bdf8" fillOpacity="0.4" />
                {/* Cargo Container */}
                <rect x="0" y="10" width="140" height="80" rx="4" fill="#042f2e" stroke="#14b8a6" strokeWidth="2" />
                <text x="70" y="55" textAnchor="middle" fill="#5eead4" fontSize="12" fontWeight="bold">S-LAB LOGISTICS</text>
                {/* Wheels */}
                <circle cx="35" cy="95" r="14" fill="#020617" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="105" cy="95" r="14" fill="#020617" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="175" cy="95" r="14" fill="#020617" stroke="#94a3b8" strokeWidth="3" />
              </g>

              {/* Status checklist */}
              <g transform="translate(30, 185)">
                <circle cx="15" cy="15" r="8" fill="#10b981" fillOpacity="0.2" />
                <path d="M 11 15 L 14 18 L 19 12" fill="none" stroke="#34d399" strokeWidth="2" />
                <text x="32" y="19" fill="#f8fafc" fontSize="11" fontWeight="600">
                  บรรจุภัณฑ์กันกระแทก & ซีลป้องกันการเปิด
                </text>
              </g>
              <text x="155" y="218" textAnchor="middle" fill="#94a3b8" fontSize="10">
                พร้อมส่งมอบผลิตภัณฑ์ให้ถึงมือลูกค้าอย่างเรียบร้อย
              </text>
            </g>
          </svg>
        </div>
      );

    case "outtro":
    default:
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950/60 to-amber-950/40 p-6">
          <svg viewBox="0 0 800 450" className="w-full h-full max-h-[380px] drop-shadow-2xl">
            {/* Title */}
            <text x="400" y="55" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="700" letterSpacing="1">
              OUR PROMISE & COMMITMENT
            </text>
            <text x="400" y="80" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700">
              แซฟฟรอน แลบบอราทอรี่ส์ (เอส-แลบ) เคียงข้างทุกความสำเร็จ
            </text>

            {/* Glowing Showcase of Completed Cosmetic Products */}
            <g transform="translate(240, 110)">
              {/* Product 1: Luxury Serum Dropper */}
              <g transform="translate(0, 50)">
                <rect x="25" y="45" width="45" height="105" rx="8" fill="#042f2e" stroke="#2dd4bf" strokeWidth="2" />
                <rect x="38" y="22" width="19" height="23" rx="3" fill="#cbd5e1" stroke="#94a3b8" />
                <ellipse cx="47" cy="18" rx="8" ry="7" fill="#f59e0b" />
                <rect x="33" y="70" width="29" height="45" rx="3" fill="#0f766e" />
                <text x="47" y="92" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">SERUM</text>
              </g>

              {/* Product 2: Centerpiece Premium Moisturizer Cream Jar */}
              <g transform="translate(110, 80)">
                <ellipse cx="50" cy="70" rx="46" ry="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <rect x="4" y="25" width="92" height="50" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <rect x="0" y="10" width="100" height="18" rx="5" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="50" y="55" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">S-CREAM</text>
                <text x="50" y="68" textAnchor="middle" fill="#cbd5e1" fontSize="9">OEM LUXURY</text>
              </g>

              {/* Product 3: Sunscreen / Treatment Pump */}
              <g transform="translate(250, 40)">
                <rect x="25" y="45" width="45" height="115" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <rect x="38" y="22" width="19" height="23" rx="3" fill="#cbd5e1" />
                <path d="M 47 22 L 47 10 L 65 10" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
                <rect x="33" y="70" width="29" height="50" rx="3" fill="#312e81" />
                <text x="47" y="95" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">SPF 50+</text>
              </g>
            </g>

            {/* Bottom Statement Card */}
            <g transform="translate(130, 310)">
              <rect width="540" height="85" rx="14" fill="#020617" stroke="#14b8a6" strokeWidth="1.5" />
              <text x="270" y="36" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700">
                "เราใส่ใจในทุกขั้นตอนของการผลิต เพื่อสร้างผลิตภัณฑ์ที่มีคุณภาพ"
              </text>
              <text x="270" y="58" textAnchor="middle" fill="#5eead4" fontSize="14" fontWeight="600">
                และตอบโจทย์ความต้องการของลูกค้า
              </text>
              <text x="270" y="76" textAnchor="middle" fill="#94a3b8" fontSize="11">
                แซฟฟรอน แลบบอราทอรี่ส์ (เริ่มดำเนินการ พ.ศ. 2544)
              </text>
            </g>
          </svg>
        </div>
      );
  }
};
