'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, ShieldCheck, DollarSign, Clock, PhoneCall, 
  ChevronRight, CheckCircle2, Award, Zap, HelpCircle, ArrowRight 
} from 'lucide-react';
import Pricing from '@/components/Pricing';

export default function ServicesPage() {
  const services = [
    {
      title: "Rate Negotiation & Carrier Setup Packets",
      desc: "Our dispatch team aggressively negotiates top dollar with freight brokers on DAT One and Truckstop load boards. We handle all Carrier Setup Packets (COI, W9, Authorities) so you never waste time filling out paperwork at truck stops.",
      features: [
        "Broker credit check via RTS & Carrier411",
        "Direct Rate Con negotiation & email confirmation",
        "Carrier Packet submission within 15 minutes",
        "Full transparency — you receive raw Rate Con",
      ],
      icon: DollarSign,
      badge: "High RPM Focus",
    },
    {
      title: "Dedicated 24/7 Dispatching & Route Optimization",
      desc: "Get paired with a 1-on-1 dedicated dispatcher who knows your home base, preferred driving lanes, target minimum rate per mile, and home time requirements. We map out multi-leg trips to minimize empty deadhead miles.",
      features: [
        "Personal 1-on-1 dispatcher assignment",
        "Triangulated load strategy to eliminate deadhead",
        "24/7 after-hours driver emergency hotline",
        "No forced dispatch — 100% final refusal right",
      ],
      icon: Clock,
      badge: "24/7 Load Desk",
    },
    {
      title: "Invoicing, Factoring Setup & Collections Assistance",
      desc: "Once a load is delivered, send us your signed Bill of Lading (BOL). We generate clean invoices and submit them straight to your factoring company (or broker QuickPay) for fast same-day funding.",
      features: [
        "Same-day invoice submission to RTS, WEX, OTR Solutions & factoring banks",
        "Lumper fee & detention pay collection requests",
        "TONU (Truck Ordered Not Used) compensation claims",
        "Clean weekly gross earnings reporting",
      ],
      icon: FileText,
      badge: "Same-Day QuickPay",
    },
    {
      title: "FMCSA Safety & DOT Compliance Monitoring",
      desc: "Stay compliant with federal trucking guidelines. We track your HOS (Hours of Service) availability, keep your USDOT/MC profile updated, and assist with biennial MCS-150 filings and IFTA reporting guidance.",
      features: [
        "Independent carrier representation agreement",
        "DOT audit prep & safety record maintenance",
        "Annual MCS-150 update reminders",
        "Certificate of Insurance (COI) holder updates",
      ],
      icon: ShieldCheck,
      badge: "DOT Audit Ready",
    },
  ];

  return (
    <div className="py-12 space-y-20 bg-[#F8FAFC]">
      
      {/* 1. HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <Award className="w-4 h-4" />
          <span>Professional Carrier Services</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
          Comprehensive Freight & Carrier Dispatching Services
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          From high-paying rate con negotiations to factoring paper setup, OTR Dispatch acts as your full-service back office so you can focus entirely on driving safely.
        </p>
      </section>

      {/* 2. DETAILED SERVICE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#0F172A]">{service.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="font-bold text-slate-800 uppercase tracking-wider mb-2">Key Service Deliverables:</div>
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DYNAMIC PRICING STRUCTURE SECTION */}
      <Pricing />

      {/* 4. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready To Increase Your Weekly Gross Revenue?
          </h2>
          <p className="text-amber-100 max-w-2xl mx-auto text-xs sm:text-sm">
            Complete our 5-minute online onboarding packet today and get assigned to your dedicated dispatcher.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/onboarding"
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Complete Online Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+12812030890"
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/30 flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Speak With Dispatcher: +1 (281) 203-0890</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
