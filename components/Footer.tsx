'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Phone, Mail, MapPin, ShieldCheck, FileCheck, ExternalLink, Clock, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Column 1: Company Overview & Badges */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/30">
                <Truck className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-white">
                  SWIFTWAY<span className="text-amber-500">LOGISTICS</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
                  Freight & Logistics Desk
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated truck dispatching services for Owner-Operators and Fleet Owners across all 48 lower states. We negotiate top Rate Cons, eliminate deadhead miles, and handle all factoring paperwork.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>USDOT #3891402 | MC #1428590</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>24/7/365 Dispatch & Load Desk</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500">›</span> Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500">›</span> About Our Team
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500">›</span> Dispatch Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500">›</span> Carrier Onboarding Setup
                </Link>
              </li>
              <li>
                <Link href="/fleets" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500">›</span> Owner-Operators & Fleets
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500">›</span> Gross RPM & Earnings Calculator
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500">›</span> FMCSA Compliance & Rate Cons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500">›</span> Contact Operations Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Equipment & Lanes Covered */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Equipment & Lanes
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between bg-slate-900/40 p-2 rounded border border-slate-800/80">
                <span className="text-slate-200 font-medium">Dry Van 53'</span>
                <span className="text-emerald-400 font-bold">$3.15/mi avg</span>
              </li>
              <li className="flex items-center justify-between bg-slate-900/40 p-2 rounded border border-slate-800/80">
                <span className="text-slate-200 font-medium">Reefer (Temp Controlled)</span>
                <span className="text-emerald-400 font-bold">$3.85/mi avg</span>
              </li>
              <li className="flex items-center justify-between bg-slate-900/40 p-2 rounded border border-slate-800/80">
                <span className="text-slate-200 font-medium">Flatbed & Step Deck</span>
                <span className="text-emerald-400 font-bold">$3.65/mi avg</span>
              </li>
              <li className="flex items-center justify-between bg-slate-900/40 p-2 rounded border border-slate-800/80">
                <span className="text-slate-200 font-medium">Power Only</span>
                <span className="text-emerald-400 font-bold">$2.95/mi avg</span>
              </li>
              <li className="flex items-center justify-between bg-slate-900/40 p-2 rounded border border-slate-800/80">
                <span className="text-slate-200 font-medium">Box Truck 26'</span>
                <span className="text-emerald-400 font-bold">$2.80/mi avg</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Dispatch Line */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Dispatch Hotline
            </h3>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
              <a 
                href="tel:+923119811007" 
                className="flex items-center gap-3 text-white hover:text-amber-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">24/7 Toll-Free Line</div>
                  <div className="text-base font-extrabold text-white">+92 311 9811007</div>
                </div>
              </a>

              <a 
                href="mailto:dispatch@swiftwaylogistics.com" 
                className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">dispatch@swiftwaylogistics.com</span>
              </a>

              <div className="flex items-start gap-3 text-xs text-slate-400 pt-1 border-t border-slate-800">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>742 Logistics Parkway, Suite 400<br />Dallas, TX 75201</span>
              </div>
            </div>
          </div>

        </div>

        {/* FMCSA Disclaimer Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed space-y-1">
              <p className="font-bold text-slate-200 uppercase tracking-wide">
                FMCSA Regulatory & Legal Dispatch Disclaimer
              </p>
              <p>
                SwiftWay Logistics LLC acts strictly as an authorized independent dispatching agent representing licensed Motor Carriers holding active FMCSA operating authority (USDOT / MC). We provide load booking, broker negotiation, invoicing, and rate confirmation processing under carrier-dispatcher representation agreements (49 CFR Part 371 compliant). SwiftWay Logistics LLC is not a freight broker and does not hold or tender freight under its own authority.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 SwiftWay Logistics LLC.{' '}
            <a 
              href="https://facebook.com/musaddaqfaridtahir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-400 underline transition-colors"
            >
              All Rights Reserved
            </a>
            . Dedicated Freight Logistics.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/compliance" className="hover:text-slate-300 transition-colors">
              Carrier Representation Rules
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
