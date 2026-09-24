'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';
import { DEFAULT_EQUIPMENT_RATES, EquipmentRate } from '@/lib/defaultEquipmentRates';

export default function CalculatorPage() {
  const [weeklyMiles, setWeeklyMiles] = useState<number>(2800);
  const [ratePerMile, setRatePerMile] = useState<number>(3.15);
  const [dispatchFeePct, setDispatchFeePct] = useState<number>(5.0);
  const [equipmentRates, setEquipmentRates] = useState<EquipmentRate[]>(DEFAULT_EQUIPMENT_RATES);

  useEffect(() => {
    async function loadRates() {
      try {
        const res = await fetch('/api/equipment-rates');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.rates) && json.rates.length > 0) {
            setEquipmentRates(json.rates);
            const dryVan = json.rates.find((r: EquipmentRate) => r.equipment_type.toLowerCase().includes('dry van'));
            if (dryVan) {
              const num = parseFloat(dryVan.rate_per_mile.replace(/[^0-9.]/g, ''));
              if (!isNaN(num)) setRatePerMile(num);
            }
          }
        }
      } catch (err) {
        console.warn('Fallback to default equipment rates:', err);
      }
    }
    loadRates();
  }, []);

  const parseRateNum = (equip: string, fallback: number) => {
    const item = equipmentRates.find((r) => r.equipment_type.toLowerCase().includes(equip.toLowerCase()));
    if (!item) return fallback;
    const match = item.rate_per_mile.match(/\$?([0-9]+\.?[0-9]*)/);
    return match ? parseFloat(match[1]) : fallback;
  };

  const presets = [
    { label: "Dry Van (53')", rate: parseRateNum("Dry Van", 3.15) },
    { label: "Reefer", rate: parseRateNum("Reefer", 4.90) },
    { label: "Flatbed", rate: parseRateNum("Flatbed", 4.85) },
    { label: "Power Only", rate: parseRateNum("Power Only", 3.80) },
    { label: "Box Truck (26')", rate: parseRateNum("Box Truck", 1.75) },
  ];

  const grossWeekly = weeklyMiles * ratePerMile;
  const dispatchFee = (grossWeekly * dispatchFeePct) / 100;
  const netEarnings = grossWeekly - dispatchFee;
  const annualGross = grossWeekly * 50;

  return (
    <div className="py-12 space-y-16 bg-[#F8FAFC]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <Calculator className="w-4 h-4" />
          <span>Interactive Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A]">
          Gross Earnings & RPM Calculator
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base">
          Calculate your potential weekly gross revenue and dispatch take-home pay based on your target miles and average rate per mile.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
          
          {/* Quick Equipment Presets */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Quick Select Equipment Average:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setRatePerMile(p.rate)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    Math.abs(ratePerMile - p.rate) < 0.05
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {p.label} (${p.rate.toFixed(2)}/mi)
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 bg-slate-900/90 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-200">Target Weekly Miles</label>
                <span className="text-amber-400 font-extrabold text-lg">{weeklyMiles.toLocaleString()} mi</span>
              </div>
              <input
                type="range"
                min={1000}
                max={4000}
                step={50}
                value={weeklyMiles}
                onChange={(e) => setWeeklyMiles(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-200">Average Rate Per Mile ($/mi)</label>
                <span className="text-emerald-400 font-extrabold text-lg">${ratePerMile.toFixed(2)} / mi</span>
              </div>
              <input
                type="range"
                min={1.50}
                max={5.50}
                step={0.05}
                value={ratePerMile}
                onChange={(e) => setRatePerMile(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>$1.50/mi (Box Truck)</span>
                <span>$3.15/mi (Dry Van)</span>
                <span>$4.90/mi (Reefer)</span>
                <span>$5.50/mi</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-200">Dispatch Fee (%)</label>
                <span className="text-amber-400 font-extrabold text-base">{dispatchFeePct.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={5.0}
                max={7.0}
                step={0.5}
                value={dispatchFeePct}
                onChange={(e) => setDispatchFeePct(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Calculated Revenue Breakdown</div>
            <div className="flex justify-between text-slate-300 text-sm">
              <span>Gross Weekly Revenue:</span>
              <strong className="text-amber-400 text-lg">${grossWeekly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="flex justify-between text-slate-300 text-sm">
              <span>OTR Dispatch Fee ({dispatchFeePct}%):</span>
              <strong className="text-rose-400">-${dispatchFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-extrabold">
              <span className="text-emerald-400">Net Weekly Carrier Take-Home:</span>
              <span className="text-emerald-400 text-2xl">${netEarnings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-sm shadow-xl">
              <span>Lock In High RPM Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
