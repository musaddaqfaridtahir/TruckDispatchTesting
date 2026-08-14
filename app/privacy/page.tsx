'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-12 space-y-12 bg-[#F8FAFC]">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700">
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Main Website</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
          Privacy Policy & Carrier Data Protection
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Effective Date: January 1, 2026 • SwiftWay Logistics LLC
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card text-xs text-slate-700 leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[#0F172A]">1. Information We Collect</h2>
          <p>
            To provide freight dispatching services, SwiftWay Logistics LLC collects carrier information including Company Name, Contact Person, Phone Number, Email Address, USDOT/MC Numbers, W-9 Tax Forms, and Certificate of Insurance (COI) records.
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-[#0F172A]">2. Zero Data Sale Pledge</h2>
          <p>
            SwiftWay Logistics LLC strictly pledges NEVER to sell, rent, or trade your carrier records, driver contact information, or equipment details to third-party advertisers. Your information is used exclusively for load booking and broker setup.
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-[#0F172A]">3. Data Security & Storage</h2>
          <p>
            All submitted carrier documents (W9, MC Grant Letter, COI) are stored in encrypted databases behind secure authentication layers to prevent unauthorized access.
          </p>
        </div>
      </section>
    </div>
  );
}
