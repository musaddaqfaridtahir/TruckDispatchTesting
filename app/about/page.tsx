'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, ShieldCheck, Award, TrendingUp, CheckCircle2, 
  Truck, Clock, DollarSign, Star, FileText, ArrowRight 
} from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    {
      title: "100% Rate Con Transparency",
      desc: "You receive the original Rate Confirmation document directly from the freight broker. We never take hidden cuts, margin shaving, or kickbacks.",
      icon: FileText,
    },
    {
      title: "High RPM Lane Focus",
      desc: "Our dispatchers analyze daily DAT One and Truckstop load board averages to place your rig in high-paying lanes ($3.20+ / mile).",
      icon: TrendingUp,
    },
    {
      title: "Zero Forced Dispatch",
      desc: "You are the boss of your truck. If a rate, load weight, or delivery window does not match your preference, you have full right of refusal.",
      icon: ShieldCheck,
    },
    {
      title: "24/7 Carrier Support Desk",
      desc: "Flat tires, lumper delays, detention pay requests, or after-hours receiver check-ins — our team is always on call for your driver.",
      icon: Clock,
    },
  ];

  const driverReviews = [
    {
      name: "Marcus Vance",
      company: "Vance Express LLC",
      equipment: "53' Dry Van",
      home: "Dallas, TX",
      weeklyGross: "$8,950 / wk",
      rating: 5,
      review: "OTR Dispatch changed the game for my 1-truck operation. They got me out of $2.20 cheap freight and built a consistent Midwest route averaging $3.45/mile.",
    },
    {
      name: "Derrick & Sarah Miller",
      company: "ColdLine Hauling LLC",
      equipment: "Reefer (Temp Controlled)",
      home: "Atlanta, GA",
      weeklyGross: "$11,200 / wk",
      rating: 5,
      review: "Running produce requires quick response times. OTR Dispatch handles all factoring packets and COI updates so we just drive and collect QuickPay.",
    },
    {
      name: "Antoine Jackson",
      company: "Jackson Heavy Freight",
      equipment: "Flatbed & Step Deck",
      home: "Birmingham, AL",
      weeklyGross: "$10,400 / wk",
      rating: 5,
      review: "No forced dispatch is 100% real with OTR Dispatch. If a steel load doesn't pay $3.50+, my dispatcher keeps searching until we get the right Rate Con.",
    },
    {
      name: "Carlos Reyes",
      company: "Reyes Relay Logistics",
      equipment: "Power Only",
      home: "Phoenix, AZ",
      weeklyGross: "$7,800 / wk",
      rating: 5,
      review: "I run Power Only across the Southwest. OTR Dispatch keeps my deadhead under 40 miles per trip. Best 5% investment I have made for my business.",
    },
    {
      name: "Terry Jenkins",
      company: "TJ Expedited Transport",
      equipment: "Box Truck 26'",
      home: "Charlotte, NC",
      weeklyGross: "$6,900 / wk",
      rating: 5,
      review: "Finding solid dock loads for a 26' box truck is tough on public load boards. OTR Dispatch has direct relationships with expedited freight brokers.",
    },
    {
      name: "Samir & Harpreet Singh",
      company: "Singh Brothers Freight Inc",
      equipment: "3 Dry Vans",
      home: "Fresno, CA",
      weeklyGross: "$27,500 / wk (3 Trucks)",
      rating: 5,
      review: "Managing 3 drivers was overwhelming until we assigned them to OTR Dispatch. Each driver gets a dedicated dispatcher who plans their backhauls in advance.",
    },
  ];

  return (
    <div className="py-12 space-y-20 bg-[#F8FAFC]">
      
      {/* 1. HERO & STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold border border-amber-500/30">
                <Users className="w-4 h-4" />
                <span>About OTR Dispatch</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Built By Freight Veterans For <span className="text-amber-500">American Truckers</span>
              </h1>

              <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <p>
                  OTR Dispatch was founded by veteran freight dispatchers and former logistics managers who realized independent owner-operators were losing thousands of dollars every month to cheap freight, long deadhead miles, and aggressive broker tactics.
                </p>
                <p>
                  Navigating the US freight market requires more than just refreshing DAT One or Truckstop load boards. It requires strategic route planning, aggressive rate con negotiations, broker credit checks, and prompt factoring paperwork handling.
                </p>
                <p>
                  Today, OTR Dispatch represents hundreds of owner-operators and small fleet owners across all 48 lower states. We operate as your dedicated back office, keeping your wheels turning at maximum Rate Per Mile while you maintain 100% authority over your truck.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/onboarding"
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Partner With OTR Dispatch Today</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+12812030890"
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Call Operations: +1 (281) 203-0890</span>
                </a>
              </div>
            </div>

            {/* Right Metric Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-3">
                  OTR Dispatch Operating Track Record
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-amber-500">48 States</div>
                    <div className="text-[11px] text-slate-400">US Nationwide Lanes</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-emerald-400">$3.40/mi</div>
                    <div className="text-[11px] text-slate-400">Avg Overall RPM</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-white">500+</div>
                    <div className="text-[11px] text-slate-400">Carriers Represented</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-amber-400">&lt; 5%</div>
                    <div className="text-[11px] text-slate-400">Deadhead Ratio</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. CORE VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Our Guiding Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
            Why Owner-Operators Stay With OTR Dispatch
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            We operate as an extension of your trucking business with complete financial integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const IconComponent = val.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{val.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. VERIFIED DRIVER REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Verified Driver Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Real Carrier Results & Feedback
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Real carrier feedback from independent drivers hauling across the United States.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {driverReviews.map((rev, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {rev.weeklyGross}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-white text-sm">{rev.name}</div>
                  <div className="text-amber-400 font-medium">{rev.company}</div>
                  <div className="text-slate-400 text-[11px]">
                    {rev.equipment} • {rev.home}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 text-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-xl transition-all"
            >
              <span>Join OTR Dispatch Carrier Network</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
