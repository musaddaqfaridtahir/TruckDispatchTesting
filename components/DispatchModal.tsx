'use client';

import React, { useState } from 'react';
import { X, Truck, CheckCircle2, ShieldCheck, Phone, ArrowRight, DollarSign } from 'lucide-react';

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DispatchModal({ isOpen, onClose }: DispatchModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mcNumber: '',
    phone: '',
    email: '',
    equipment: 'Dry Van 53',
    trucks: '1 Owner-Operator',
    preferredLanes: 'Nationwide / Open',
    minRPM: '3.00',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl text-white overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center shadow-md shadow-amber-600/30">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Carrier Dispatch Onboarding Setup
              </h2>
              <p className="text-xs text-slate-400">
                Start booking high-RPM freight with zero forced dispatch.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-10 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white">Setup Request Received!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Our Senior Senior Logistics Dispatcher is reviewing your MC/DOT <span className="text-amber-400 font-bold">#{formData.mcNumber || 'Submitted'}</span> and checking premium load matches in your lanes.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Equipment Type:</span>
                  <span className="font-bold text-amber-400">{formData.equipment}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Target Min RPM:</span>
                  <span className="font-bold text-emerald-400">${formData.minRPM} / mile</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Desk:</span>
                  <span className="font-semibold text-white">24/7 Priority Lane Team</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-lg shadow-lg transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name / Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Trucking LLC Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vance Hauling LLC"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">USDOT or MC Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="MC # / USDOT #"
                    value={formData.mcNumber}
                    onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (SMS Ready) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 311 9811007"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="carrier@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Equipment Type *</label>
                  <select
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Dry Van 53">Dry Van 53'</option>
                    <option value="Reefer 53">Reefer (Temp Control)</option>
                    <option value="Flatbed / Step Deck">Flatbed / Step Deck</option>
                    <option value="Power Only">Power Only</option>
                    <option value="Hotshot 40">Hotshot 40' Gooseneck</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Fleet Count *</label>
                  <select
                    value={formData.trucks}
                    onChange={(e) => setFormData({ ...formData, trucks: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="1 Owner-Operator">1 Owner-Operator</option>
                    <option value="2-5 Power Units">2-5 Power Units</option>
                    <option value="6-10 Fleets">6-10 Fleets</option>
                    <option value="10+ Fleet Division">10+ Fleet Division</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Minimum RPM ($/mi)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                    <input
                      type="text"
                      placeholder="3.25"
                      value={formData.minRPM}
                      onChange={(e) => setFormData({ ...formData, minRPM: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Home Base / Preferred Hauling Lanes</label>
                <input
                  type="text"
                  placeholder="e.g. Based out of Dallas TX, prefer Midwest & Southeast runs"
                  value={formData.preferredLanes}
                  onChange={(e) => setFormData({ ...formData, preferredLanes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>No upfront fees. 5-7% standard dispatch rate per booked Rate Con.</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-amber-600/25 flex items-center gap-2"
                >
                  <span>Submit Carrier Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
