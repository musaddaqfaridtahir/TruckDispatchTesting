'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, 
  Truck, Package, Layers, Box, RefreshCw 
} from 'lucide-react';
import { DEFAULT_RATES, RateItem } from '@/lib/defaultRates';

const equipmentIcons: Record<string, React.ElementType> = {
  "53' Dry Van": Truck,
  "Reefer (Temp-Controlled)": Package,
  "Flatbed": Layers,
  "Step Deck": Layers,
  "Box Truck (26')": Box,
};

export default function Pricing() {
  const [rates, setRates] = useState<RateItem[]>(DEFAULT_RATES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeBillingMode, setActiveBillingMode] = useState<'percentage' | 'flat'>('percentage');

  const fetchRates = async (showRefreshState = false) => {
    if (showRefreshState) setIsRefreshing(true);
    try {
      const res = await fetch('/api/rates', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.rates) && json.rates.length > 0) {
          setRates(json.rates);
        }
      }
    } catch (err) {
      console.warn('Using default rates fallback:', err);
    } finally {
      setIsLoading(false);
      if (showRefreshState) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <section id="pricing" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Live Rates</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            No Upfront Fees. <span className="text-amber-500">Pay Only When You Haul.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400">
            Choose between flexible percentage-based dispatch per load or predictable weekly flat-rate pricing. Updated in real-time.
          </p>

          {/* Toggle Switch */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 inline-flex shadow-inner">
              <button
                type="button"
                onClick={() => setActiveBillingMode('percentage')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeBillingMode === 'percentage'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Percentage Plan (% Per Load)
              </button>
              <button
                type="button"
                onClick={() => setActiveBillingMode('flat')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeBillingMode === 'flat'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Weekly Flat-Rate Plan ($)
              </button>
            </div>

            <button
              onClick={() => fetchRates(true)}
              disabled={isRefreshing}
              title="Refresh rates from database"
              className="p-2 text-slate-400 hover:text-amber-400 transition-colors bg-slate-900 border border-slate-800 rounded-lg text-xs inline-flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
              <span className="hidden sm:inline">Refresh Rates</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rates.map((rate, index) => {
            const Icon = equipmentIcons[rate.equipment_type] || Truck;
            const isFeatured = index === 0;

            return (
              <div
                key={rate.equipment_type || index}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/80 shadow-2xl shadow-amber-500/10'
                    : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {rate.badge && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-md">
                    {rate.badge}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {rate.equipment_type}
                      </h3>
                      <p className="text-[11px] text-slate-400">Independent Dispatch Rate</p>
                    </div>
                  </div>

                  {/* Price display based on active billing toggle */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      {activeBillingMode === 'percentage' ? 'Percentage Per Booked Load' : 'Predictable Flat Fee'}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400">
                        {activeBillingMode === 'percentage' ? rate.rate_percentage : rate.flat_fee}
                      </span>
                      <span className="text-xs text-slate-400">
                        {activeBillingMode === 'percentage' ? 'gross rate con' : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                      <span>
                        {activeBillingMode === 'percentage' 
                          ? `Alternative: ${rate.flat_fee}` 
                          : `Alternative: ${rate.rate_percentage} per load`}
                      </span>
                      {rate.avg_rpm && (
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {rate.avg_rpm}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                    {rate.description || 'Top Rate Con negotiations, credit vetting, and back-office invoicing.'}
                  </p>

                  {/* Bullet features */}
                  <div className="pt-3 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Dedicated 1-on-1 dispatcher</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Rate Con negotiation & Detention collection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Same-day Factoring & Invoicing paperwork</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>No forced dispatch — 100% load refusal right</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>No long-term contracts (cancel anytime)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <Link
                    href={`/onboarding?equipment=${encodeURIComponent(rate.equipment_type)}`}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      isFeatured
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>Get Dispatched Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee */}
        <div className="mt-14 max-w-4xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Risk-Free Dispatch Guarantee</h4>
              <p className="text-xs text-slate-400">Zero upfront deposit. You only pay after we book and you deliver.</p>
            </div>
          </div>
          <Link
            href="/onboarding"
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-md"
          >
            Start Carrier Setup
          </Link>
        </div>

      </div>
    </section>
  );
}
