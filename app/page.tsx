'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Truck, ShieldCheck, DollarSign, TrendingUp, FileText, 
  PhoneCall, CheckCircle2, ChevronRight, Calculator, Clock, 
  Zap, Package, Box, Layers, Sliders, ArrowRight, Award, HelpCircle
} from 'lucide-react';
import DispatchModal from '@/components/DispatchModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Interactive Calculator state
  const [weeklyMiles, setWeeklyMiles] = useState<number>(2500);
  const [ratePerMile, setRatePerMile] = useState<number>(3.40);
  const [dispatchFeePct, setDispatchFeePct] = useState<number>(5.0);

  // Calculated values
  const grossWeeklyRevenue = weeklyMiles * ratePerMile;
  const dispatchFeeAmount = (grossWeeklyRevenue * dispatchFeePct) / 100;
  const netCarrierEarnings = grossWeeklyRevenue - dispatchFeeAmount;
  const annualGrossRevenue = grossWeeklyRevenue * 50; // 50 working weeks

  // Live Load Board Ticker Data
  const loadTicker = [
    { origin: 'Dallas, TX', dest: 'Atlanta, GA', equip: "53' Dry Van", rate: '$3,550', rpm: '$3.80/mi', status: 'Booked' },
    { origin: 'Chicago, IL', dest: 'Columbus, OH', equip: 'Reefer', rate: '$2,950', rpm: '$4.20/mi', status: 'Dispatched' },
    { origin: 'Houston, TX', dest: 'Phoenix, AZ', equip: 'Flatbed', rate: '$4,350', rpm: '$3.65/mi', status: 'Booked' },
    { origin: 'Atlanta, GA', dest: 'Memphis, TN', equip: 'Box Truck', rate: '$1,950', rpm: '$3.10/mi', status: 'In Transit' },
    { origin: 'Savannah, GA', dest: 'Charlotte, NC', equip: 'Power Only', rate: '$2,450', rpm: '$3.40/mi', status: 'Booked' },
  ];

  // Truck types data
  const truckTypes = [
    {
      title: "Dry Van (53')",
      desc: "General palletized freight & consumer goods across high-density national corridors.",
      payload: "Up to 45,000 lbs",
      avgRpm: "$3.15 - $3.65 / mi",
      icon: Truck,
      tag: "High Demand",
    },
    {
      title: "Reefer (Temperature-Controlled)",
      desc: "Produce, meats, & temperature-sensitive cargo requiring continuous reefer log monitoring.",
      payload: "Up to 43,500 lbs",
      avgRpm: "$3.60 - $4.35 / mi",
      icon: Package,
      tag: "Top RPM",
    },
    {
      title: "Flatbed & Step Deck",
      desc: "Building materials, steel coils, machinery, overdimensional & pipe loads.",
      payload: "Up to 48,000 lbs",
      avgRpm: "$3.40 - $4.10 / mi",
      icon: Layers,
      tag: "Premium Freight",
    },
    {
      title: "Box Truck (26' Straight Truck)",
      desc: "Expedited LTL, regional dock-to-dock, and local distribution loads.",
      payload: "Up to 10,000 lbs",
      avgRpm: "$2.60 - $3.25 / mi",
      icon: Box,
      tag: "Fast Turnaround",
    },
    {
      title: "Power Only",
      desc: "Tractor-only hauling of pre-loaded trailers, Amazon relay, & drayage units.",
      payload: "Tractor Unit Only",
      avgRpm: "$2.85 - $3.35 / mi",
      icon: ShieldCheck,
      tag: "Drop & Hook",
    },
  ];

  // 4-Step Process Workflow
  const steps = [
    {
      number: "01",
      title: "Sign Agreement",
      desc: "Complete our standard Carrier-Dispatcher Representation Agreement online in under 5 minutes with no long-term lock-in.",
      badge: "Fast 5-Min Setup",
    },
    {
      number: "02",
      title: "Search Loads",
      desc: "Your dedicated dispatcher scans DAT One, Truckstop, and private broker networks for premium freight matching your lane preferences.",
      badge: "A-Rated Brokers Only",
    },
    {
      number: "03",
      title: "Confirm Rate Con",
      desc: "Review original Rate Confirmation details (gross rate, pickup/delivery window, detention terms). You have 100% final approval.",
      badge: "Zero Forced Dispatch",
    },
    {
      number: "04",
      title: "Drive & Get Paid",
      desc: "Hit the road while we submit your BOLs and Rate Cons straight to your factoring company for same-day QuickPay funding.",
      badge: "Same-Day Invoicing",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0F172A] text-white pt-12 pb-24 overflow-hidden border-b border-slate-800">
        
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-inner">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>FMCSA Compliant Dispatch • US Owner-Operators & Fleets</span>
              </div>

              {/* Direct Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Maximized Gross, <span className="text-amber-500 underline decoration-amber-500/40 underline-offset-8">Zero Dispatch Stress</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Dedicated truck dispatchers handling top-paying Rate Cons, broker credit checks, factoring setup, and 24/7 route planning. Keep 100% control of your rig with zero forced dispatch.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-xl shadow-amber-600/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 border border-amber-500/50 text-base"
                >
                  <FileText className="w-5 h-5" />
                  <span>Get Started Now</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <a
                  href="tel:+923119811007"
                  className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-3 transition-all text-base"
                >
                  <PhoneCall className="w-5 h-5 text-amber-500" />
                  <span>Call Dispatch: +92 311 9811007</span>
                </a>
              </div>

              {/* Dynamic Stats Ticker Bar */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center lg:text-left">
                  <div className="text-2xl font-black text-amber-500">$3.40/mi</div>
                  <div className="text-[11px] text-slate-400 font-medium">Avg Freight Rate</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center lg:text-left">
                  <div className="text-2xl font-black text-white">24/7</div>
                  <div className="text-[11px] text-slate-400 font-medium">Dedicated Dispatchers</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center lg:text-left">
                  <div className="text-2xl font-black text-emerald-400">98.6%</div>
                  <div className="text-[11px] text-slate-400 font-medium">On-Time Load Match</div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center lg:text-left">
                  <div className="text-2xl font-black text-amber-400">&lt; 5%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Deadhead Ratio</div>
                </div>
              </div>

            </div>

            {/* Right Feature Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-live-dot"></div>
                    <span className="text-sm font-bold text-white uppercase tracking-wide">Live Dispatch Desk</span>
                  </div>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    Active Desk
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-slate-800/60 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400">Average Rate Per Mile Index:</span>
                    <span className="font-bold text-emerald-400">$3.15 - $4.25 / mi</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Assigned Dispatcher:</span>
                      <span className="font-bold text-white">Dedicated 1-on-1</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Broker Vetting:</span>
                      <span className="font-bold text-emerald-400">Carrier411 & RTS Credit</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Factoring Integration:</span>
                      <span className="font-bold text-amber-400">Same-Day QuickPay</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Start Onboarding Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LIVE LOAD TICKER BANNER */}
      <section className="bg-slate-900 text-white py-3 border-y border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="bg-amber-600 text-slate-950 font-black text-xs px-3 py-1 rounded shrink-0 uppercase tracking-widest flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Live Bookings</span>
          </div>

          <div className="overflow-hidden relative w-full">
            <div className="animate-ticker space-x-8 text-xs font-mono">
              {loadTicker.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded border border-slate-700">
                  <span className="text-amber-400 font-bold">{item.origin} → {item.dest}</span>
                  <span className="text-slate-400">({item.equip})</span>
                  <span className="text-emerald-400 font-bold">{item.rate}</span>
                  <span className="text-slate-300">[{item.rpm}]</span>
                  <span className="text-xs bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">{item.status}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & TRUCK TYPES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            All Equipment Divisions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
            Truck Types We Dispatch
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Specialized freight dispatching tailored to your specific trailer specs and target lanes across all 48 lower states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {truckTypes.map((truck, idx) => {
            const IconComponent = truck.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {truck.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A]">{truck.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                      {truck.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Capacity Payload:</span>
                    <span className="font-semibold text-slate-900">{truck.payload}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Target Rate Index:</span>
                    <span className="font-bold text-emerald-600">{truck.avgRpm}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE WEEKLY GROSS EARNINGS CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls & Sliders */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
                  <Sliders className="w-4 h-4" />
                  <span>Interactive Revenue Estimator</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Weekly Gross Earnings Calculator
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Adjust the sliders below to calculate your estimated weekly gross revenue and dispatch take-home earnings.
                </p>
              </div>

              <div className="space-y-6 bg-slate-900/90 p-6 rounded-2xl border border-slate-800">
                
                {/* Slider 1: Weekly Miles */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <label className="text-slate-200">Weekly Target Miles</label>
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
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>1,000 mi</span>
                    <span>2,500 mi</span>
                    <span>4,000 mi</span>
                  </div>
                </div>

                {/* Slider 2: Average Rate Per Mile */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <label className="text-slate-200">Average Rate Per Mile ($/mi)</label>
                    <span className="text-emerald-400 font-extrabold text-lg">${ratePerMile.toFixed(2)} / mi</span>
                  </div>
                  <input
                    type="range"
                    min={2.00}
                    max={4.50}
                    step={0.05}
                    value={ratePerMile}
                    onChange={(e) => setRatePerMile(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>$2.00/mi</span>
                    <span>$3.25/mi</span>
                    <span>$4.50/mi</span>
                  </div>
                </div>

                {/* Slider 3: Dispatch Fee % */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <label className="text-slate-200">Dispatch Fee Percentage (%)</label>
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
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>5.0% (Standard)</span>
                    <span>6.0%</span>
                    <span>7.0%</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Output Display Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0B1120] to-slate-900 p-8 rounded-2xl border border-slate-700 space-y-6 shadow-xl">
              
              <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Estimated Output</span>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Live Result
                </span>
              </div>

              {/* Main Revenue Number */}
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium">Estimated Weekly Gross Revenue</div>
                <div className="text-4xl sm:text-5xl font-black text-amber-400">
                  ${grossWeeklyRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-slate-400 pt-1">
                  Annualized Gross: <span className="font-bold text-white">${annualGrossRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Gross Weekly Revenue:</span>
                  <span className="font-bold text-white">${grossWeeklyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>SwiftWay Logistics Fee ({dispatchFeePct}%):</span>
                  <span className="font-bold text-rose-400">-${dispatchFeeAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-extrabold">
                  <span className="text-emerald-400">Carrier Gross Take-Home:</span>
                  <span className="text-emerald-400 text-lg">${netCarrierEarnings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Lock In These Earnings</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* 4. PROCESS WORKFLOW SECTION */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              How Our Dispatch Workflow Works
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              From carrier representation agreement to your first high-paying Rate Con on the road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4 relative flex flex-col justify-between hover:border-amber-500/50 transition-colors group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-amber-500">{step.number}</span>
                    <span className="text-[10px] font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/80 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step {step.number} Verified</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Start Onboarding Application</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* DISPATCH MODAL INSTANCE */}
      <DispatchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
