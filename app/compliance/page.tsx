'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="py-12 space-y-16 bg-[#F8FAFC]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Industry Compliance & Standards</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A]">
          Carrier Protection & Rate Con Transparency
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base">
          Understand your carrier representation rights, broker transparency standards, and complete rate verification.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-card space-y-6">
          <h2 className="text-2xl font-bold text-[#0F172A]">Carrier Representation Standards</h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Every load dispatched through OTR Dispatch adheres to strict operational standards protecting carrier profitability and independence.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>100% Rate Con Transparency:</strong> You receive the unaltered original Rate Confirmation issued directly by the licensed freight broker.</span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>No Forced Dispatch:</strong> The carrier retains 100% final right of refusal on any load offered by the dispatcher.</span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Direct Broker Payment:</strong> Freight brokers pay your carrier bank account or factoring company directly. OTR Dispatch never touches your gross revenue.</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] text-white p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Carrier-First Professional Standards</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            OTR Dispatch operates with total transparency. We verify broker credit scores, ensure prompt factoring submission, and safeguard your operational independence on every mile you haul.
          </p>
        </div>
      </section>
    </div>
  );
}
