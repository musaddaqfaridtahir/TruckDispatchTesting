'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Truck, FileText, CheckCircle2, ShieldCheck, 
  ArrowRight, ArrowLeft, Upload, AlertCircle, Phone, Lock, FileUp, Sparkles, Check 
} from 'lucide-react';

interface OnboardingFormData {
  // Step 1: Carrier & Fleet Info
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  mcDotNumber: string;
  powerUnitsCount: string;
  homeBaseCityState: string;

  // Step 2: Equipment & Lanes
  equipmentType: string;
  maxPayloadCapacity: string;
  preferredLanes: string;
  minTargetRpm: string;

  // Step 3: Document Checklist Flags
  hasMcAuthorityLetter: boolean;
  hasW9Form: boolean;
  hasCoiCertificate: boolean;

  // Step 4: Terms Agreement
  agreeToTerms: boolean;
  agreeToSms: boolean;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  const [formData, setFormData] = useState<OnboardingFormData>({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    mcDotNumber: '',
    powerUnitsCount: '1 Owner-Operator',
    homeBaseCityState: '',

    equipmentType: "53' Dry Van",
    maxPayloadCapacity: '45,000 lbs',
    preferredLanes: 'Texas Triangle, Midwest Corridors',
    minTargetRpm: '3.40',

    hasMcAuthorityLetter: true,
    hasW9Form: true,
    hasCoiCertificate: true,

    agreeToTerms: false,
    agreeToSms: true,
  });

  const equipmentOptions = [
    "53' Dry Van",
    "Reefer 53' (Temp Control)",
    "Flatbed 48' / Step Deck",
    "Power Only",
    "Box Truck 26'",
  ];

  const handleInputChange = (field: keyof OnboardingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.companyName || !formData.contactPerson || !formData.phone || !formData.mcDotNumber) {
        setSubmitError('Please fill in Company Name, Contact Person, Phone, and MC/DOT Number.');
        return;
      }
    }
    setSubmitError('');
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setSubmitError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      setSubmitError('You must agree to the Carrier Representation Agreement terms.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(result.error || 'Failed to submit onboarding packet. Please try again.');
      }
    } catch (err: any) {
      setSubmitError('Network error submitting carrier packet. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 space-y-12 bg-[#F8FAFC]">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>FMCSA Carrier Onboarding</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A]">
          Carrier & Driver Setup Packet
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm">
          Complete our 4-step carrier representation agreement to start getting high-paying Rate Cons.
        </p>
      </section>

      {/* Main Multi-Step Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Step Indicator */}
          <div className="bg-[#0F172A] p-6 text-white grid grid-cols-4 gap-2 border-b border-slate-800 text-center">
            {[1, 2, 3, 4].map((stepNum) => (
              <div 
                key={stepNum}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                  currentStep === stepNum
                    ? 'bg-amber-600 text-white shadow-md'
                    : currentStep > stepNum
                    ? 'bg-slate-800 text-emerald-400'
                    : 'bg-slate-900 text-slate-500'
                }`}
              >
                Step {stepNum}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
            
            {submitError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submitSuccess ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-[#0F172A]">Welcome To SwiftWay Logistics!</h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Your carrier setup packet has been received. A senior dispatcher will contact you within 15 minutes to verify your USDOT/MC authority.
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                >
                  <span>Return To Main Website</span>
                </Link>
              </div>
            ) : (
              <>
                {/* STEP 1: CARRIER & FLEET INFO */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-amber-600" />
                      <span>Step 1: Carrier & Fleet Information</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Company Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Patriot Freight LLC"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Contact Person *</label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+92 311 9811007"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="carrier@domain.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">MC / USDOT Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. MC #1489201"
                          value={formData.mcDotNumber}
                          onChange={(e) => handleInputChange('mcDotNumber', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Home Base (City, State)</label>
                        <input
                          type="text"
                          placeholder="Dallas, TX"
                          value={formData.homeBaseCityState}
                          onChange={(e) => handleInputChange('homeBaseCityState', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: EQUIPMENT & LANES */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <Truck className="w-5 h-5 text-amber-600" />
                      <span>Step 2: Equipment & Preferred Lanes</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Primary Equipment Type</label>
                        <select
                          value={formData.equipmentType}
                          onChange={(e) => handleInputChange('equipmentType', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
                        >
                          {equipmentOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Target Minimum RPM ($/mi)</label>
                        <input
                          type="text"
                          placeholder="3.40"
                          value={formData.minTargetRpm}
                          onChange={(e) => handleInputChange('minTargetRpm', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-slate-700">Preferred Driving Regions / Lanes</label>
                        <input
                          type="text"
                          placeholder="e.g. Texas Triangle, Midwest, Southeast Regional"
                          value={formData.preferredLanes}
                          onChange={(e) => handleInputChange('preferredLanes', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: DOCUMENT CHECKLIST */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-600" />
                      <span>Step 3: Document Readiness Checklist</span>
                    </h2>

                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasMcAuthorityLetter}
                          onChange={(e) => handleInputChange('hasMcAuthorityLetter', e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                        />
                        <span className="font-semibold text-slate-800">MC / USDOT Authority Grant Letter Available</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasW9Form}
                          onChange={(e) => handleInputChange('hasW9Form', e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                        />
                        <span className="font-semibold text-slate-800">Signed W-9 Tax Form (2025/2026 Revision)</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasCoiCertificate}
                          onChange={(e) => handleInputChange('hasCoiCertificate', e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                        />
                        <span className="font-semibold text-slate-800">Certificate of Insurance (COI) with $100k Cargo & $1M Auto Liability</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 4: REVIEW & SUBMIT */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amber-600" />
                      <span>Step 4: Representation Terms Confirmation</span>
                    </h2>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={formData.agreeToTerms}
                          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 mt-0.5"
                        />
                        <span className="text-slate-700 leading-relaxed">
                          I confirm that <strong>{formData.companyName || 'Motor Carrier'}</strong> holds an active FMCSA operating authority and hereby authorizes SwiftWay Logistics LLC to act as our independent dispatching agent for broker load negotiations and Rate Con processing.
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreeToSms}
                          onChange={(e) => handleInputChange('agreeToSms', e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 mt-0.5"
                        />
                        <span className="text-slate-700 leading-relaxed">
                          I consent to receiving SMS dispatch updates, load tenders, and Rate Con notifications at <strong>{formData.phone || 'provided number'}</strong>.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Bottom Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
                    >
                      <span>Continue To Step {currentStep + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting Carrier Packet...' : 'Submit Carrier Onboarding'}
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            )}

          </form>
        </div>
      </section>

    </div>
  );
}
