'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Users, DollarSign, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';

export default function FleetsPage() {
  const fleetsList = [
    {
      title: "Solo Owner-Operators (1 Truck)",
      desc: "Maximum individual focus for independent drivers who want high RPM freight, zero forced dispatch, and full home-time control.",
      perks: ["Dedicated 1-on-1 dispatcher", "Triangulated lane backhauls", "Same-day factoring setup"],
    },
    {
      title: "Small Fleet Owners (2 - 10 Trucks)",
      desc: "Streamlined multi-driver coordination. We assign dedicated dispatchers per driver while providing the fleet owner with consolidated weekly revenue reports.",
      perks: ["Consolidated weekly invoicing", "Dedicated dispatcher per rig", "Volume discount pricing"],
    },
    {
      title: "Power-Only & Fleet Leasing Units",
      desc: "Specialized load search for tractor-only operators hauling pre-loaded trailers, Amazon relay, and regional drop-and-hook freight.",
      perks: ["Low deadhead round trips", "Drop & hook quick turns", "Flexible driving schedules"],
    },
  ];

  return (
    <div className="py-12 space-y-20 bg-[#F8FAFC]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <Truck className="w-4 h-4" />
          <span>Fleet Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A]">
          Owner-Operators & Fleet Solutions
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Whether you are an independent driver running 1 truck or a fleet owner managing 10 rigs, SwiftWay Logistics provides custom dispatch solutions tailored to your operational scale.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleetsList.map((fleet, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-extrabold text-lg">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">{fleet.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{fleet.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                {fleet.perks.map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#0F172A] text-white p-10 rounded-3xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Ready to Dispatch Your Fleet?</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Contact our operations manager today or complete the online onboarding packet.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/onboarding" className="px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs">
              Onboard Fleet Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
