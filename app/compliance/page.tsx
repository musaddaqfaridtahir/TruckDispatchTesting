'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="py-12 space-y-16 bg-[#F8FAFC]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>FMCSA Legal Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A]">
          FMCSA Compliance & Rate Con Auditing
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base">
          Understand your rights under FMCSA 49 CFR Part 371 carrier representation rules and broker transparency laws.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-card space-y-6">
          <h2 className="text-2xl font-bold text-[#0F172A]">Carrier Representation Agreement Rules</h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Every load booked through SwiftWay Logistics is governed by a legally binding Carrier-Dispatcher Representation Agreement under FMCSA guidelines.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>100% Rate Con Transparency:</strong> You receive the unaltered original Rate Confirmation issued by the licensed freight broker.</span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>No Forced Dispatch:</strong> The Motor Carrier retains 100% right of refusal on any load offered by the dispatcher.</span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Direct Payment:</strong> Freight brokers pay your carrier bank account or factoring company directly. SwiftWay Logistics never handles your freight money.</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] text-white p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>FMCSA Broker Vs. Dispatcher Distinction</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            SwiftWay Logistics LLC operates strictly as an authorized independent dispatching agent representing licensed Motor Carriers. SwiftWay Logistics LLC is not a freight broker and does not hold or tender freight under its own authority.
          </p>
        </div>
      </section>
    </div>
  );
}
