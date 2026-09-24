'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lock, KeyRound, ShieldCheck, CheckCircle2, AlertCircle, 
  Save, RefreshCw, ArrowLeft, Sliders, Truck, DollarSign, 
  Percent, Snowflake, Layers, Zap, Box, ExternalLink, Sparkles, X 
} from 'lucide-react';
import { DEFAULT_EQUIPMENT_RATES, EquipmentRate } from '@/lib/defaultEquipmentRates';
import { DEFAULT_RATES, RateItem } from '@/lib/defaultRates';

export default function AdminRatesPage() {
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [savedPassword, setSavedPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // Equipment & Lanes Rates (Supabase: equipment_rates)
  const [equipmentRates, setEquipmentRates] = useState<EquipmentRate[]>(DEFAULT_EQUIPMENT_RATES);
  const [isSavingEquipment, setIsSavingEquipment] = useState<boolean>(false);
  const [equipmentToast, setEquipmentToast] = useState<string | null>(null);

  // Dispatch Fee Matrix (Supabase: rates)
  const [feeRates, setFeeRates] = useState<RateItem[]>(DEFAULT_RATES);
  const [isSavingFees, setIsSavingFees] = useState<boolean>(false);
  const [feeStatus, setFeeStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check stored auth session
  useEffect(() => {
    const cachedPin = sessionStorage.getItem('otr_admin_pin');
    if (cachedPin) {
      setSavedPassword(cachedPin);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch current equipment rates and fee matrix
  const loadAllRates = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Equipment & Lanes Rates (table: equipment_rates)
      const eqRes = await fetch('/api/equipment-rates', { cache: 'no-store' });
      if (eqRes.ok) {
        const eqJson = await eqRes.json();
        if (eqJson.success && Array.isArray(eqJson.rates) && eqJson.rates.length > 0) {
          setEquipmentRates(eqJson.rates);
        }
      }

      // 2. Fetch Dispatch Fee Matrix (table: rates)
      const feeRes = await fetch('/api/rates', { cache: 'no-store' });
      if (feeRes.ok) {
        const feeJson = await feeRes.json();
        if (feeJson.success && Array.isArray(feeJson.rates) && feeJson.rates.length > 0) {
          setFeeRates(feeJson.rates);
        }
      }
    } catch (err) {
      console.warn('Could not fetch rates, using fallback defaults:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllRates();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      const entered = passwordInput.trim();
      const testRes = await fetch('/api/equipment-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: entered, action: 'verify_password' }),
      });

      if (testRes.status === 401) {
        setAuthError('Invalid Admin Passcode/PIN. Please check ADMIN_PASSWORD.');
        setIsLoading(false);
        return;
      }

      setSavedPassword(entered);
      sessionStorage.setItem('otr_admin_pin', entered);
      setIsAuthenticated(true);
    } catch (err: any) {
      setAuthError('Connection error validating passcode: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('otr_admin_pin');
    setSavedPassword('');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Equipment & Lanes handler
  const handleEquipmentRateChange = (index: number, value: string) => {
    setEquipmentRates((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rate_per_mile: value };
      return updated;
    });
  };

  // "Save All Rates" - Upserts into Supabase equipment_rates & revalidates cache
  const handleSaveAllEquipmentRates = async () => {
    setIsSavingEquipment(true);
    setEquipmentToast(null);

    try {
      const res = await fetch('/api/equipment-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: savedPassword,
          rates: equipmentRates,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        alert(json.error || 'Failed to update equipment rates in Supabase.');
        return;
      }

      // Exact prompt required success banner/toast message:
      setEquipmentToast('Rates updated successfully live on the website!');
      if (json.rates) {
        setEquipmentRates(json.rates);
      }
    } catch (err: any) {
      alert('Network error saving equipment rates: ' + err.message);
    } finally {
      setIsSavingEquipment(false);
    }
  };

  // Fee matrix handlers
  const handleFeeRateChange = (index: number, field: 'rate_percentage' | 'flat_fee', value: string) => {
    setFeeRates((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSaveFeeRates = async () => {
    setIsSavingFees(true);
    setFeeStatus(null);

    try {
      const res = await fetch('/api/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: savedPassword,
          rates: feeRates,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setFeeStatus({
          type: 'error',
          message: json.error || 'Failed to update rates table in Supabase.',
        });
        return;
      }

      setFeeStatus({
        type: 'success',
        message: 'Dispatch fee matrix updated successfully live on the website!',
      });
      if (json.rates) setFeeRates(json.rates);
    } catch (err: any) {
      setFeeStatus({
        type: 'error',
        message: 'Network error saving rates: ' + err.message,
      });
    } finally {
      setIsSavingFees(false);
    }
  };

  // Equipment icon helper
  const getEquipmentIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('dry van')) return Truck;
    if (t.includes('reefer')) return Snowflake;
    if (t.includes('flatbed')) return Layers;
    if (t.includes('power')) return Zap;
    if (t.includes('box')) return Box;
    return Truck;
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-black text-white">OTR Dispatch Admin</h1>
            <p className="text-xs text-slate-400">Equipment Rates & Live Pricing Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Passcode / PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter ADMIN_PASSWORD..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Default: <code className="text-amber-400">otrdispatch2026</code> (configured via <code>ADMIN_PASSWORD</code> env)
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? 'Verifying PIN...' : 'Access Rates Console'}
            </button>
          </form>

          <div className="pt-2 flex justify-center gap-4 text-xs text-slate-500">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              ← Return Home
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-amber-400 transition-colors">
              Carrier Lead Desk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  Admin Rates Console
                </span>
                <span className="text-xs text-slate-500">Supabase Connected</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Equipment & Lanes Rates</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllRates}
              disabled={isLoading}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 font-semibold flex items-center gap-2 transition-colors"
              title="Refresh from Database"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-500' : ''}`} />
              <span>Reload</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold transition-colors"
            >
              Lock Console
            </button>
          </div>
        </div>

        {/* Instant Success Banner / Toast */}
        {equipmentToast && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-bold flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="font-extrabold text-white text-base">{equipmentToast}</p>
                <p className="text-xs text-emerald-300 font-normal mt-0.5">
                  Live cache revalidated on Homepage (Truck Types cards) and Footer (Equipment & Lanes).
                </p>
              </div>
            </div>
            <button
              onClick={() => setEquipmentToast(null)}
              className="p-1 rounded-lg hover:bg-emerald-500/20 text-emerald-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Database Info Banner */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Sliders className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Connected Supabase Table: <code className="text-amber-400 font-mono">equipment_rates</code> (columns: <code className="text-slate-300">equipment_type, rate_per_mile, updated_at</code>)
            </span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-amber-400 hover:underline font-semibold flex items-center gap-1 shrink-0"
          >
            <span>View Live Homepage</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* SECTION 1: Equipment & Lanes Rate Editor */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-500" />
                <span>Equipment & Lanes Rate Per Mile Editor</span>
              </h2>
              <p className="text-xs text-slate-400">
                Update market average rate per mile for each equipment division. Updates reflect instantly across the public site.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
              Public Display Linked
            </span>
          </div>

          {/* Form listing each equipment type */}
          <div className="space-y-4">
            {equipmentRates.map((item, idx) => {
              const IconComp = getEquipmentIcon(item.equipment_type);
              return (
                <div
                  key={item.equipment_type || idx}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
                >
                  {/* Equipment Type Display */}
                  <div className="flex items-center gap-3.5 min-w-[240px]">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white">{item.equipment_type}</h3>
                      <p className="text-[11px] text-slate-500">Live Rate Per Mile</p>
                    </div>
                  </div>

                  {/* Editable Input for rate_per_mile */}
                  <div className="w-full sm:w-auto flex-grow max-w-md">
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <span>Rate Per Mile (e.g. $3.15/mi avg or $1.50 to $1.95/mi avg)</span>
                    </label>
                    <input
                      type="text"
                      value={item.rate_per_mile}
                      onChange={(e) => handleEquipmentRateChange(idx, e.target.value)}
                      placeholder="$0.00/mi avg"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-500 font-bold"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row with "Save All Rates" Button */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Saving performs an upsert into Supabase <code className="text-slate-400 font-mono">equipment_rates</code> and revalidates Next.js cached pages.
            </p>

            <button
              onClick={handleSaveAllEquipmentRates}
              disabled={isSavingEquipment}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSavingEquipment ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving All Rates...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save All Rates</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* SECTION 2: Dispatch Fee Matrix (Percentage & Flat Fees) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Percent className="w-5 h-5 text-amber-500" />
              <span>Dispatch Service Fee Matrix</span>
            </h2>
            <p className="text-xs text-slate-400">
              Update dispatch fee percentages and flat fees configured in Supabase table <code className="text-amber-400 font-mono">rates</code>.
            </p>
          </div>

          {feeStatus && (
            <div
              className={`p-4 rounded-2xl border text-sm font-semibold flex items-start gap-3 transition-all ${
                feeStatus.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              {feeStatus.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p>{feeStatus.message}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {feeRates.map((item, idx) => (
              <div
                key={item.equipment_type || idx}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors"
              >
                <div className="min-w-[200px] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">{item.equipment_type}</span>
                    {item.badge && (
                      <span className="text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate max-w-sm">
                    {item.description || 'Dedicated freight dispatch support'}
                  </p>
                </div>

                <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow max-w-lg">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                      <Percent className="w-3 h-3 text-amber-500" />
                      <span>Rate Percentage (e.g. 5% - 7%)</span>
                    </label>
                    <input
                      type="text"
                      value={item.rate_percentage}
                      onChange={(e) => handleFeeRateChange(idx, 'rate_percentage', e.target.value)}
                      placeholder="e.g. 5% - 7%"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <span>Flat Weekly Fee (e.g. $250 / week)</span>
                    </label>
                    <input
                      type="text"
                      value={item.flat_fee}
                      onChange={(e) => handleFeeRateChange(idx, 'flat_fee', e.target.value)}
                      placeholder="e.g. $250 / week"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500 font-bold"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Changes update Supabase table <code className="text-slate-400 font-mono">rates</code> and refresh public pricing tables.
            </p>

            <button
              onClick={handleSaveFeeRates}
              disabled={isSavingFees}
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSavingFees ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving Fee Matrix...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Fee Matrix</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center text-xs text-slate-500 space-x-4">
          <Link href="/admin" className="hover:text-amber-400 transition-colors">
            Carrier Onboarding Management
          </Link>
          <span>•</span>
          <Link href="/services" className="hover:text-amber-400 transition-colors">
            Public Services & Rates
          </Link>
          <span>•</span>
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Live Home Page
          </Link>
        </div>

      </div>
    </div>
  );
}
