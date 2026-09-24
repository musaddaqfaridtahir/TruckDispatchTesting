'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, User, Phone, Mail, Truck, Layers, 
  Upload, FileText, CheckCircle2, AlertCircle, ArrowRight, 
  ShieldCheck, Clock, X, Paperclip, Sparkles, Send 
} from 'lucide-react';

interface FileState {
  file: File | null;
  error?: string;
}

export default function OnboardingPage() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [equipmentType, setEquipmentType] = useState("53' Dry Van");
  const [truckCount, setTruckCount] = useState('1');
  const [notes, setNotes] = useState('');

  // Files state
  const [mcCertificate, setMcCertificate] = useState<File | null>(null);
  const [coiCertificate, setCoiCertificate] = useState<File | null>(null);
  const [w9Form, setW9Form] = useState<File | null>(null);
  const [voidCheque, setVoidCheque] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);

  const equipmentOptions = [
    "53' Dry Van",
    "Reefer (Temp-Controlled)",
    "Flatbed",
    "Step Deck",
    "Box Truck (26')",
    "Power Only",
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(selected.type) && !selected.name.match(/\.(pdf|jpe?g|png)$/i)) {
        setSubmitError('Invalid file type. Only PDF, JPG, JPEG, or PNG files are supported.');
        return;
      }
      if (selected.size > 15 * 1024 * 1024) {
        setSubmitError('File is too large. Maximum size per file is 15MB.');
        return;
      }
      setSubmitError('');
      setter(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Validation
    if (!companyName.trim() || !contactPerson.trim() || !phone.trim() || !email.trim()) {
      setSubmitError('Please complete all required contact details.');
      return;
    }

    if (!mcCertificate) {
      setSubmitError('MC Authority Certificate is required.');
      return;
    }

    if (!coiCertificate) {
      setSubmitError('Certificate of Insurance (COI) is required.');
      return;
    }

    if (!w9Form) {
      setSubmitError('W-9 Form is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('companyName', companyName);
      data.append('contactPerson', contactPerson);
      data.append('phone', phone);
      data.append('email', email);
      data.append('equipmentType', equipmentType);
      data.append('truckCount', truckCount);
      data.append('notes', notes);

      data.append('mcCertificate', mcCertificate);
      data.append('coiCertificate', coiCertificate);
      data.append('w9Form', w9Form);
      if (voidCheque) {
        data.append('voidCheque', voidCheque);
      }

      const res = await fetch('/api/carrier-onboarding', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setSubmitError(json.error || 'Failed to submit onboarding packet.');
        return;
      }

      setSubmitSuccess(json);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitError('Network or server error submitting packet: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Confirmation Screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Packet Received Successfully
            </span>
            <h1 className="text-3xl font-black text-slate-900">Welcome to OTR Dispatch!</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your carrier onboarding packet for <strong>{companyName}</strong> has been transmitted to our operations desk.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Reference Packet ID:</span>
              <span className="font-mono font-bold text-slate-900">{submitSuccess.packetId || 'OTR-VERIFIED'}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Equipment:</span>
              <span className="font-semibold text-slate-900">{equipmentType} ({truckCount} Unit(s))</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Documents Attached:</span>
              <span className="font-semibold text-emerald-600">
                {submitSuccess.carrier?.filesAttached?.length || 3} Files Uploaded
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Direct Hotline:</span>
              <a href="tel:+12812030890" className="font-bold text-amber-600 hover:underline">
                +1 (281) 203-0890
              </a>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-amber-50 rounded-xl p-4 border border-amber-200 text-amber-900">
            <Clock className="w-4 h-4 inline mr-1.5 text-amber-600" />
            Our Senior Freight Dispatcher will review your credentials and call <strong>{phone}</strong> within 2 hours to confirm your lane preferences and start booking high-paying loads.
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Return to Homepage
            </Link>
            <a
              href="tel:+12812030890"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-colors"
            >
              Call Dispatch Hotline
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast-Track Carrier Setup (5 Minutes)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Carrier Onboarding & Setup
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Partner with OTR Dispatch today. Upload your operating documents and start hauling top-dollar freight with zero forced dispatch and same-day rate con turnaround.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Sign-Up Fees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Load Refusal Right</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Same-Day Factoring Invoicing</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {submitError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          
          {/* Section 1: Carrier & Contact Information */}
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-lg font-black text-slate-900">Carrier & Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Carrier Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Carrier / Company Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lone Star Hauling LLC"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <Building2 className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Contact Person *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Fleet Owner"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Direct Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 (281) 203-0890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Dispatch & Factoring Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. dispatch@yourcarrier.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Fleet & Equipment Specifications */}
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-lg font-black text-slate-900">Fleet & Equipment Profile</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Equipment Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Equipment Type *
                </label>
                <select
                  value={equipmentType}
                  onChange={(e) => setEquipmentType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors font-semibold"
                >
                  {equipmentOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Truck Count */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Available Truck / Power Units Count *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={truckCount}
                  onChange={(e) => setTruckCount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Special Instructions / Preferred Lanes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Lanes, Regions, or Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Prefer Midwest to Southeast lanes, no East Coast, max payload 44k lbs."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Document Uploads */}
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">Required Document Packet</h2>
                  <p className="text-[11px] text-slate-500">Formats accepted: .pdf, .jpg, .jpeg, .png (Max 15MB each)</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 1. MC Authority Certificate */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>MC Authority Certificate *</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Required
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Official FMCSA Operating Authority Certificate</p>

                {mcCertificate ? (
                  <div className="flex items-center justify-between bg-white border border-emerald-300 p-2.5 rounded-xl text-xs text-emerald-800">
                    <span className="truncate max-w-[200px] font-semibold">📎 {mcCertificate.name}</span>
                    <button
                      type="button"
                      onClick={() => setMcCertificate(null)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-4 cursor-pointer bg-white transition-colors group">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-600 mb-1" />
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-600">Choose File</span>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setMcCertificate)}
                    />
                  </label>
                )}
              </div>

              {/* 2. Certificate of Insurance (COI) */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>Certificate of Insurance (COI) *</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Required
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">$100k Cargo & $1M Auto Liability coverage certificate</p>

                {coiCertificate ? (
                  <div className="flex items-center justify-between bg-white border border-emerald-300 p-2.5 rounded-xl text-xs text-emerald-800">
                    <span className="truncate max-w-[200px] font-semibold">📎 {coiCertificate.name}</span>
                    <button
                      type="button"
                      onClick={() => setCoiCertificate(null)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-4 cursor-pointer bg-white transition-colors group">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-600 mb-1" />
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-600">Choose File</span>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setCoiCertificate)}
                    />
                  </label>
                )}
              </div>

              {/* 3. W-9 Form */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>W-9 Tax Form (Signed) *</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Required
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Current year signed W-9 with Carrier TIN/EIN</p>

                {w9Form ? (
                  <div className="flex items-center justify-between bg-white border border-emerald-300 p-2.5 rounded-xl text-xs text-emerald-800">
                    <span className="truncate max-w-[200px] font-semibold">📎 {w9Form.name}</span>
                    <button
                      type="button"
                      onClick={() => setW9Form(null)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-4 cursor-pointer bg-white transition-colors group">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-600 mb-1" />
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-600">Choose File</span>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setW9Form)}
                    />
                  </label>
                )}
              </div>

              {/* 4. Void Cheque / Notice of Assignment (Optional) */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>Void Cheque / Factoring NOA</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                    Optional
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">For direct ACH payouts or factoring company NOA</p>

                {voidCheque ? (
                  <div className="flex items-center justify-between bg-white border border-emerald-300 p-2.5 rounded-xl text-xs text-emerald-800">
                    <span className="truncate max-w-[200px] font-semibold">📎 {voidCheque.name}</span>
                    <button
                      type="button"
                      onClick={() => setVoidCheque(null)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-4 cursor-pointer bg-white transition-colors group">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-600 mb-1" />
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-600">Choose File</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setVoidCheque)}
                    />
                  </label>
                )}
              </div>

            </div>
          </div>

          {/* Submission Authorization Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Independent Dispatch Service Authorization</span>
            </div>
            <p>
              By submitting this onboarding packet, you authorize <strong>OTR Dispatch</strong> to provide dedicated freight dispatching, rate negotiations, and administrative back-office support for your equipment with zero forced dispatch.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Uploading Documents & Submitting Packet...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Carrier Packet & Get Dispatched</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Back link */}
        <div className="text-center">
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors">
            ← Back to OTR Dispatch Overview
          </Link>
        </div>

      </div>
    </div>
  );
}
