'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ChevronDown, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const faqs = [
    {
      question: "Do you force dispatch drivers on unwanted loads?",
      answer: "Never. OTR Dispatch operates under a strict 100% Zero Forced Dispatch policy. You maintain final approval over every Rate Con, delivery window, and lane destination.",
    },
    {
      question: "How do factoring payments and QuickPay work?",
      answer: "Brokers pay you directly or pay your factoring company (RTS, WEX, OTR Solutions, etc.). Upon delivery, send us your signed BOL and we process the invoice packet same-day.",
    },
    {
      question: "What documents do I need to start dispatching?",
      answer: "You need an active FMCSA MC/USDOT authority, a signed W-9 tax form, and a Certificate of Insurance (COI) listing $100,000 cargo and $1,000,000 auto liability coverage.",
    },
    {
      question: "Is there any long-term contract or sign-up fee?",
      answer: "No. You pay only when we book loads for your rig under our simple 5% - 7% per-load agreement. You can stop or pause dispatch services at any time.",
    },
  ];

  return (
    <div className="py-12 space-y-16 bg-[#F8FAFC]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <Phone className="w-4 h-4" />
          <span>24/7 Operations Desk</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A]">
          Contact OTR Dispatch Operations
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm">
          Have questions about our dispatch service, rate per mile averages, or carrier representation setup? Contact our team anytime.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Phone & Lines */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0F172A] text-white p-8 rounded-3xl space-y-6 border border-slate-800 shadow-xl">
            <h2 className="text-xl font-bold border-b border-slate-800 pb-3">Direct Dispatch Hotlines</h2>

            <div className="space-y-4">
              <a href="tel:+12812030890" className="flex items-start gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">24/7 Dispatch Hotline</div>
                  <div className="text-lg font-extrabold text-white">+1 (281) 203-0890</div>
                </div>
              </a>

              <a href="mailto:dispatch@otrdispach.us" className="flex items-start gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dispatch Operations Email</div>
                  <div className="text-xs font-bold text-white">dispatch@otrdispach.us</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Physical Office & Load Desk</div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    742 Logistics Parkway, Suite 400<br />Dallas, TX 75201
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-card">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">Quick Driver Inquiry</h2>
          <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4 text-xs">
            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl font-bold text-center">
                Thank you! An OTR Dispatch dispatcher will call your phone number shortly.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Your Name" className="w-full bg-slate-50 border p-3 rounded-xl" />
                  <input type="tel" required placeholder="Phone Number" className="w-full bg-slate-50 border p-3 rounded-xl" />
                </div>
                <input type="text" placeholder="MC or USDOT Number" className="w-full bg-slate-50 border p-3 rounded-xl font-mono" />
                <textarea rows={4} placeholder="How can our dispatch team help your business?" className="w-full bg-slate-50 border p-3 rounded-xl"></textarea>
                <button type="submit" className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs">
                  Send Message To Dispatch Desk
                </button>
              </>
            )}
          </form>
        </div>

      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-2xl font-bold text-center text-[#0F172A]">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-amber-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
