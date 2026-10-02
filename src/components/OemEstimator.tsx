import React, { useState } from "react";
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  PackageCheck,
  FileCheck2,
} from "lucide-react";

interface ProductType {
  id: string;
  name: string;
  description: string;
  baseCostPerUnit: number;
  fdaCategory: string;
}

const PRODUCT_TYPES: ProductType[] = [
  {
    id: "serum",
    name: "เซรั่มบำรุงผิวเข้มข้น (Facial Treatment Serum)",
    description: "เนื้อสัมผัสบางเบา ซึมไว รองรับสารออกฤทธิ์เปปไทด์ และไฮยาลูรอน",
    baseCostPerUnit: 65,
    fdaCategory: "เครื่องสำอางบำรุงผิวหน้า (อย.)",
  },
  {
    id: "cream",
    name: "ครีมบำรุงฟื้นฟูผิว (Barrier Restoring Cream)",
    description: "สูตรผสม Homogenizer เนื้อเนียนละเอียด ซึมซาบลึก ไม่เหนียวเหนอะหนะ",
    baseCostPerUnit: 75,
    fdaCategory: "เครื่องสำอางบำรุงผิวหน้า (อย.)",
  },
  {
    id: "sunscreen",
    name: "กันแดดไฮบริด SPF50+ PA++++ (UV Sunscreen Shield)",
    description: "ผ่านการทดสอบ In-Vitro SPF เนื้อน้ำนม ไม่วอก ไม่เป็นคราบ",
    baseCostPerUnit: 85,
    fdaCategory: "เครื่องสำอางป้องกันแสงแดด (อย.)",
  },
  {
    id: "cleanser",
    name: "เจล/โฟมล้างหน้าสูตรอ่อนโยน (Gentle Amino Cleanser)",
    description: "ค่า pH 5.5 อ่อนโยนต่อเกราะป้องกันผิว ปราศจากสารซัลเฟต",
    baseCostPerUnit: 45,
    fdaCategory: "เครื่องสำอางทำความสะอาดผิวหน้า (อย.)",
  },
];

const QUANTITY_TIERS = [
  { units: 500, discountPct: 0, label: "500 ชิ้น (ทดลองตลาด / เริ่มต้น)" },
  { units: 1000, discountPct: 10, label: "1,000 ชิ้น (ยอดนิยม)" },
  { units: 3000, discountPct: 20, label: "3,000 ชิ้น (สเกลธุรกิจ)" },
  { units: 5000, discountPct: 28, label: "5,000 ชิ้น (ผลิตล็อตใหญ่ คุ้มค่าสูงสุด)" },
];

export const OemEstimator: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("serum");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1000);
  const [activeIngredientGrade, setActiveIngredientGrade] = useState<number>(15); // added cost per unit
  const [packagingTypeCost, setPackagingTypeCost] = useState<number>(25); // packaging cost
  const [includeFdaFiling, setIncludeFdaFiling] = useState<boolean>(true);
  const [includeStabilityTesting, setIncludeStabilityTesting] = useState<boolean>(true);

  const product = PRODUCT_TYPES.find((p) => p.id === selectedProduct)!;
  const tier = QUANTITY_TIERS.find((t) => t.units === selectedQuantity)!;

  const baseUnitCost = (product.baseCostPerUnit + activeIngredientGrade + packagingTypeCost);
  const discountedUnitCost = Math.round(baseUnitCost * (1 - tier.discountPct / 100));
  const productionTotal = discountedUnitCost * selectedQuantity;

  const fdaFee = includeFdaFiling ? 3500 : 0;
  const stabilityFee = includeStabilityTesting ? 6000 : 0;
  const grandTotal = productionTotal + fdaFee + stabilityFee;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 sm:p-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
          <Calculator className="w-4 h-4" />
          <span>OEM / ODM Feasibility & Budget Calculator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          คำนวณงบประมาณและระยะเวลาสร้างแบรนด์กับ เอส-แลบ (S-Lab)
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          ประมาณการต้นทุนการผลิตตามมาตรฐาน อย. กระทรวงสาธารณสุข โดย แซฟฟรอน แลบบอราทอรี่ส์
          ครอบคลุมตั้งแต่กระบวนการ R&D, การทดสอบความคงตัว, การยื่นจดแจ้ง อย., การผลิต และการบรรจุ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form Config */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Product Type */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
            <label className="text-sm font-bold text-white mb-3 block">
              1. เลือกประเภทผลิตภัณฑ์ที่ต้องการผลิต
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCT_TYPES.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedProduct === p.id
                      ? "bg-indigo-950/40 border-indigo-500 text-white shadow-md shadow-indigo-500/10"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">{p.name}</h4>
                    {selectedProduct === p.id && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{p.description}</p>
                  <div className="mt-2 text-[10px] text-teal-300 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3" />
                    {p.fdaCategory}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Order Quantity */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
            <label className="text-sm font-bold text-white mb-3 block">
              2. จำนวนการผลิต (MOQ & Batch Size)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {QUANTITY_TIERS.map((q) => (
                <button
                  key={q.units}
                  onClick={() => setSelectedQuantity(q.units)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedQuantity === q.units
                      ? "bg-teal-500/20 border-teal-400 text-teal-200 font-bold"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <span className="text-lg font-extrabold block text-white">
                    {q.units.toLocaleString()}
                  </span>
                  <span className="text-[11px] block text-slate-400">ชิ้น</span>
                  {q.discountPct > 0 && (
                    <span className="mt-1 inline-block text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded">
                      ประหยัด {q.discountPct}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Ingredient Grade & Packaging */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <label className="text-sm font-bold text-white mb-2 block">
                3. เกรดสารสกัดออกฤทธิ์ (Actives)
              </label>
              <select
                value={activeIngredientGrade}
                onChange={(e) => setActiveIngredientGrade(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={10}>Standard Botanical (+10 บาท/ชิ้น)</option>
                <option value={15}>Premium Bio-Ferment / Peptides (+15 บาท/ชิ้น)</option>
                <option value={25}>Eco-Cert Organic / Clinical Strength (+25 บาท/ชิ้น)</option>
              </select>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <label className="text-sm font-bold text-white mb-2 block">
                4. รูปแบบบรรจุภัณฑ์ (Packaging)
              </label>
              <select
                value={packagingTypeCost}
                onChange={(e) => setPackagingTypeCost(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={15}>หลอดพลาสติกเคลือบลามิเนต (+15 บาท/ชิ้น)</option>
                <option value={25}>ขวดดรอปเปอร์แก้ว / กระปุกอะคริลิก (+25 บาท/ชิ้น)</option>
                <option value={35}>ขวดหัวปั๊มสูญญากาศ Airless Pump (+35 บาท/ชิ้น)</option>
              </select>
            </div>
          </div>

          {/* Regulatory & Lab Testing Options */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
            <label className="text-sm font-bold text-white block">
              5. บริการทางกฎหมายและทดสอบทางห้องปฏิบัติการ
            </label>
            <label className="flex items-center space-x-3 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFdaFiling}
                onChange={(e) => setIncludeFdaFiling(e.target.checked)}
                className="w-4 h-4 rounded text-teal-500 focus:ring-teal-400 bg-slate-950 border-slate-700"
              />
              <span>ยื่นจดแจ้งเครื่องสำอาง อย. กระทรวงสาธารณสุข (+3,500 บาท ครบวงจร)</span>
            </label>

            <label className="flex items-center space-x-3 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeStabilityTesting}
                onChange={(e) => setIncludeStabilityTesting(e.target.checked)}
                className="w-4 h-4 rounded text-teal-500 focus:ring-teal-400 bg-slate-950 border-slate-700"
              />
              <span>ทดสอบความคงตัวสูตร & บรรจุภัณฑ์ (Stability & Compatibility Test) (+6,000 บาท)</span>
            </label>
          </div>
        </div>

        {/* Right 1 Col: Summary & Timeline */}
        <div className="space-y-6">
          {/* Estimated Cost Summary Card */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/60 border border-indigo-500/40 p-6 shadow-2xl">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4">
              สรุปประมาณการงบประมาณ (Estimated Budget)
            </h3>

            <div className="space-y-3 pb-4 border-b border-slate-800">
              <div className="flex justify-between text-xs text-slate-400">
                <span>จำนวนผลิต</span>
                <span className="font-semibold text-white">{selectedQuantity.toLocaleString()} ชิ้น</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>ต้นทุนประมาณการต่อชิ้น</span>
                <span className="font-bold text-teal-300 text-sm">{discountedUnitCost} บาท / ชิ้น</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>ค่าเนื้อสูตร + บรรจุภัณฑ์</span>
                <span className="text-slate-200">{productionTotal.toLocaleString()} บาท</span>
              </div>
              {includeFdaFiling && (
                <div className="flex justify-between text-xs text-slate-400">
                  <span>ค่าบริการจดแจ้ง อย.</span>
                  <span className="text-slate-200">3,500 บาท</span>
                </div>
              )}
              {includeStabilityTesting && (
                <div className="flex justify-between text-xs text-slate-400">
                  <span>ค่าทดสอบความคงตัวในแล็บ</span>
                  <span className="text-slate-200">6,000 บาท</span>
                </div>
              )}
            </div>

            <div className="pt-4 mb-6">
              <span className="text-xs text-slate-400 block">งบประมาณรวมทั้งสิ้น</span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-amber-300">
                ฿{grandTotal.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">
                * ราคายังไม่รวมภาษีมูลค่าเพิ่ม (VAT 7%)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-teal-400">
                <ShieldCheck className="w-4 h-4" />
                <span>การันตีมาตรฐานการผลิต อย.</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                ผลิตภายใต้การควบคุมของนักวิทยาศาสตร์เครื่องสำอาง แซฟฟรอน แลบบอราทอรี่ส์ (เริ่มดำเนินการ พ.ศ. 2544)
              </p>
            </div>
          </div>

          {/* Project Timeline Card */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              แผนกำหนดการพัฒนาและผลิต (Timeline)
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </div>
                <div>
                  <p className="font-semibold text-white">พัฒนาสูตรตัวอย่าง (R&D Samples)</p>
                  <p className="text-slate-400 text-[11px]">ใช้เวลาประมาณ 7–14 วันทำการ</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </div>
                <div>
                  <p className="font-semibold text-white">ทดสอบความคงตัว & ยื่นจด อย.</p>
                  <p className="text-slate-400 text-[11px]">ใช้เวลาประมาณ 14–30 วันทำการ</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </div>
                <div>
                  <p className="font-semibold text-white">ผลิตในห้อง Cleanroom & บรรจุ</p>
                  <p className="text-slate-400 text-[11px]">ใช้เวลาประมาณ 15–20 วันทำการ</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  4
                </div>
                <div>
                  <p className="font-semibold text-white">ตรวจสอบ QC ปลายทาง & จัดส่ง</p>
                  <p className="text-slate-400 text-[11px]">ส่งมอบถึงมือลูกค้าอย่างเรียบร้อย</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
