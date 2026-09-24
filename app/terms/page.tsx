'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="py-12 space-y-12 bg-[#F8FAFC]">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700">
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Main Website</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
          Terms of Service & Representation Agreement
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Effective Date: January 1, 2026 • OTR Dispatch
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card text-xs text-slate-700 leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[#0F172A]">1. Dispatch Representation Services</h2>
          <p>
            OTR Dispatch acts as an authorized independent dispatching agent providing dedicated logistics coordination for licensed motor carriers with active FMCSA registration (USDOT / MC).
          </p>
          <p>
            Under this non-exclusive agreement, OTR Dispatch searches premier load boards, negotiates top-paying Rate Confirmations with reputable freight brokers, and manages back-office paperwork on behalf of the carrier.
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-[#0F172A]">2. Zero Forced Dispatch Policy</h2>
          <p>
            The carrier retains 100% right of refusal on any load offered by OTR Dispatch. Drivers and fleet owners are never required or pressured into accepting any rate, load weight, or lane destination.
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-[#0F172A]">3. Broker Rate Confirmation & Direct Carrier Billing</h2>
          <p>
            All load bookings and Rate Confirmations are secured directly between licensed freight brokers and the contracted carrier. Brokers remit freight payments directly to the carrier's factoring company or designated bank account.
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-[#0F172A]">4. SMS / A2P 10DLC Communications Agreement</h2>
          <p>
            By providing your phone number, you consent to receive SMS notifications regarding load tenders, Rate Cons, and dispatch updates. You may opt out at any time by replying STOP.
          </p>
        </div>
      </section>
    </div>
  );
}
