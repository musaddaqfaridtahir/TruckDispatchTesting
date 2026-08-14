'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, Phone, ShieldCheck, Clock, Menu, X, ArrowRight, FileText, Calculator } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Fleets', href: '/fleets' },
    { name: 'RPM Calculator', href: '/calculator' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Onboarding', href: '/onboarding' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Ticker & Info Bar */}
      <div className="bg-[#0B1120] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              DISPATCH DESK ACTIVE: <span className="text-white font-medium">Accepting New Owner-Operators & Fleets</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              FMCSA Verified Dispatcher & Carrier Agent
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              24/7 Emergency Load Desk Support
            </span>
            <a 
              href="tel:+923119811007" 
              className="flex items-center gap-1.5 text-white font-bold hover:text-amber-400 transition-colors bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span>+92 311 9811007</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-[#0F172A] text-white transition-all duration-300 ${scrolled ? 'shadow-xl bg-[#0F172A]/95 backdrop-blur-md py-3' : 'py-4'} border-b border-slate-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white flex items-center gap-1">
                SWIFTWAY<span className="text-amber-500">LOGISTICS</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
                Freight & Logistics Desk
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/onboarding"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-amber-400 bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/80 transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Onboard</span>
            </Link>

            <button
              onClick={onOpenModal}
              className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs px-4 py-2.5 shadow-md shadow-amber-600/25 transition-all duration-200 flex items-center gap-2 border border-amber-500/50"
            >
              <FileText className="w-4 h-4" />
              <span>Get Dispatched</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/onboarding"
              className="sm:hidden bg-amber-600 text-white px-3 py-1.5 rounded text-xs font-bold"
            >
              Onboard
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 mt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
              <a
                href="tel:+923119811007"
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-slate-700 text-sm"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Call Dispatch: +92 311 9811007</span>
              </a>
              
              <Link
                href="/onboarding"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shadow-lg text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Complete Carrier Onboarding</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
