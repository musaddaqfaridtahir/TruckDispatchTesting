'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Building2, ShieldCheck, DollarSign, FileText, Download, 
  Search, Filter, CheckCircle2, Clock, XCircle, UserCheck, Lock, 
  Eye, Edit3, MessageSquare, ArrowLeft, Key, ChevronRight, AlertCircle, RefreshCw, Loader2 
} from 'lucide-react';

// Carrier Lead Interface
interface CarrierLead {
  id: string;
  carrier_id?: string;
  companyName: string;
  company_name?: string;
  contactPerson: string;
  contact_person?: string;
  phone: string;
  email: string;
  mcNumber: string;
  mc_dot_number?: string;
  equipmentType: string;
  equipment_type?: string;
  powerUnits: string;
  power_units_count?: string;
  homeBase: string;
  home_base?: string;
  preferredLanes: string;
  preferred_lanes?: string;
  targetRpm: string;
  min_target_rpm?: string;
  status: 'New' | 'Contacted' | 'Onboarded' | 'Rejected';
  dateSubmitted: string;
  created_at?: string;
  assignedDispatcher: string;
  assigned_dispatcher?: string;
  notes: string[];
  documents: {
    mcLetter: boolean;
    w9Form: boolean;
    coiCertificate: boolean;
  };
}

export default function AdminDashboardPage() {
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Data & Fetching State
  const [leads, setLeads] = useState<CarrierLead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>('');

  // Filtering & Search state
  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'Contacted' | 'Onboarded' | 'Rejected'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Lead Modal State
  const [selectedLead, setSelectedLead] = useState<CarrierLead | null>(null);
  const [newNoteInput, setNewNoteInput] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Fetch real-time carrier data from backend API
  const fetchCarriers = async () => {
    setIsLoading(true);
    setFetchError('');
    try {
      const res = await fetch('/api/carriers', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && Array.isArray(data.carriers)) {
        // Map backend properties
        const mapped: CarrierLead[] = data.carriers.map((item: any) => ({
          id: item.carrier_id || item.id || `SWIFT-${Math.floor(100000 + Math.random() * 900000)}`,
          companyName: item.company_name || item.companyName || 'Unknown LLC',
          contactPerson: item.contact_person || item.contactPerson || 'Driver',
          phone: item.phone || '(800) 555-0000',
          email: item.email || 'carrier@domain.com',
          mcNumber: item.mc_dot_number || item.mcNumber || 'MC #000000',
          equipmentType: item.equipment_type || item.equipmentType || "53' Dry Van",
          powerUnits: item.power_units_count || item.powerUnits || '1 Owner-Operator',
          homeBase: item.home_base || item.homeBase || 'Dallas, TX',
          preferredLanes: item.preferred_lanes || item.preferredLanes || 'Nationwide',
          targetRpm: item.min_target_rpm || item.targetRpm || '3.25',
          status: item.status || 'New',
          dateSubmitted: item.created_at ? new Date(item.created_at).toISOString().replace('T', ' ').substring(0, 16) : 'Just now',
          assignedDispatcher: item.assigned_dispatcher || item.assignedDispatcher || 'Unassigned',
          notes: Array.isArray(item.notes) ? item.notes : ['Carrier profile submitted via onboarding form.'],
          documents: item.documents || { mcLetter: true, w9Form: true, coiCertificate: true },
        }));

        setLeads(mapped);
      } else {
        setFetchError(data.error || 'Failed to load carriers.');
      }
    } catch (err: any) {
      setFetchError('Network error loading carriers database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCarriers();
    }
  }, [isAuthenticated]);

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'swiftway2026' || passwordInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Use "swiftway2026" or "admin" to enter.');
    }
  };

  // Filter leads based on active tab and search query
  const filteredLeads = leads.filter((lead) => {
    const matchesTab = activeTab === 'All' || lead.status === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      lead.companyName.toLowerCase().includes(q) ||
      lead.contactPerson.toLowerCase().includes(q) ||
      lead.mcNumber.toLowerCase().includes(q) ||
      lead.equipmentType.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  // Calculate Metrics
  const totalLeads = leads.length;
  const pendingVerification = leads.filter((l) => l.status === 'New').length;
  const activeCarriers = leads.filter((l) => l.status === 'Onboarded').length;
  const totalBookedGross = "$148,500";

  // Update Status & Persist
  const handleUpdateStatus = async (id: string, newStatus: 'New' | 'Contacted' | 'Onboarded' | 'Rejected') => {
    setIsUpdating(true);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => prev ? { ...prev, status: newStatus } : null);
    }

    try {
      await fetch('/api/carriers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrierId: id, status: newStatus }),
      });
    } catch (err) {
      console.error('Failed to persist status change:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Assign Dispatcher
  const handleAssignDispatcher = async (id: string, dispatcherName: string) => {
    setIsUpdating(true);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, assignedDispatcher: dispatcherName } : l)));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => prev ? { ...prev, assignedDispatcher: dispatcherName } : null);
    }

    try {
      await fetch('/api/carriers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrierId: id, assignedDispatcher: dispatcherName }),
      });
    } catch (err) {
      console.error('Failed to persist dispatcher assignment:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Add Internal Note
  const handleAddNote = async () => {
    if (!selectedLead || !newNoteInput.trim()) return;
    const timeStamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const formattedNote = `[${timeStamp}] ${newNoteInput.trim()}`;
    
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: [...l.notes, formattedNote] } : l))
    );
    setSelectedLead((prev) => prev ? { ...prev, notes: [...prev.notes, formattedNote] } : null);
    setNewNoteInput('');

    try {
      await fetch('/api/carriers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrierId: selectedLead.id, note: formattedNote }),
      });
    } catch (err) {
      console.error('Failed to persist note:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-white text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-600/20 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">SwiftWay Logistics Admin Portal</h1>
            <p className="text-xs text-slate-400">Enter internal passcode to manage real-time carrier database.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Passcode (Use "swiftway2026" or "admin")</label>
              <input
                type="password"
                required
                placeholder="Enter access code..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 font-semibold text-center">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              Unlock Real-Time Console
            </button>
          </form>

          <div className="pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 bg-[#F8FAFC] min-h-screen">
      
      {/* TOP HEADER */}
      <section className="bg-[#0F172A] text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SwiftWay Logistics Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Carrier Onboarding Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchCarriers}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Sync DB</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-bold transition-colors"
            >
              Lock Console
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* OVERVIEW METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Driver Leads</div>
              <div className="text-3xl font-extrabold text-[#0F172A]">
                {isLoading ? <div className="h-8 w-16 bg-slate-200 animate-pulse rounded"></div> : totalLeads}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">Real-Time Sync</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Verification</div>
              <div className="text-3xl font-extrabold text-amber-600">
                {isLoading ? <div className="h-8 w-16 bg-slate-200 animate-pulse rounded"></div> : pendingVerification}
              </div>
              <div className="text-[11px] text-amber-600 font-semibold">Requires MC Audit</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Onboarded Fleets</div>
              <div className="text-3xl font-extrabold text-emerald-600">
                {isLoading ? <div className="h-8 w-16 bg-slate-200 animate-pulse rounded"></div> : activeCarriers}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">Active Hauling</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Gross Revenue</div>
              <div className="text-3xl font-extrabold text-[#0F172A]">{totalBookedGross}</div>
              <div className="text-[11px] text-slate-500 font-semibold">Booked Rate Cons</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* CARRIER LEADS TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {(['All', 'New', 'Contacted', 'Onboarded', 'Rejected'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-[#0F172A] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab} ({tab === 'All' ? leads.length : leads.filter((l) => l.status === tab).length})
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by MC # or Company Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#0F172A] focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                  <span>Fetching carrier submissions from database...</span>
                </span>
              </div>

              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 bg-slate-100 animate-pulse rounded-xl flex items-center justify-between px-4">
                  <div className="h-4 w-40 bg-slate-200 rounded"></div>
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                  <div className="h-8 w-20 bg-slate-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-600">No carrier submissions found matching your search or status filter.</p>
              <button
                onClick={() => { setActiveTab('All'); setSearchQuery(''); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0F172A] text-white">
                    <th className="p-3.5 rounded-tl-lg font-bold">Company & Contact</th>
                    <th className="p-3.5 font-bold">MC / DOT #</th>
                    <th className="p-3.5 font-bold">Equipment Division</th>
                    <th className="p-3.5 font-bold">Status Dropdown</th>
                    <th className="p-3.5 font-bold">Assigned Dispatcher</th>
                    <th className="p-3.5 font-bold">Docs</th>
                    <th className="p-3.5 rounded-tr-lg font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-[#0F172A] text-sm">{lead.companyName}</div>
                        <div className="text-slate-500 text-[11px]">{lead.contactPerson} • {lead.phone}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          {lead.mcNumber}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-amber-700">{lead.equipmentType}</div>
                        <div className="text-[10px] text-slate-500">{lead.powerUnits}</div>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                            lead.status === 'New'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : lead.status === 'Contacted'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : lead.status === 'Onboarded'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Onboarded">Onboarded</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      <td className="p-3.5 font-medium text-slate-800">
                        {lead.assignedDispatcher}
                      </td>

                      <td className="p-3.5">
                        <div className="flex gap-1 text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded font-mono ${lead.documents.mcLetter ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>MC</span>
                          <span className={`px-1.5 py-0.5 rounded font-mono ${lead.documents.w9Form ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>W9</span>
                          <span className={`px-1.5 py-0.5 rounded font-mono ${lead.documents.coiCertificate ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>COI</span>
                        </div>
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Manage</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

      {/* SELECTED CARRIER MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-3xl shadow-2xl text-white overflow-hidden my-8">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                    {selectedLead.companyName}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Ticket ID: <span className="font-mono text-amber-400">{selectedLead.id}</span> • Submitted: {selectedLead.dateSubmitted}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Change Carrier Status:</div>
                  <div className="flex gap-2 mt-1">
                    {(['New', 'Contacted', 'Onboarded', 'Rejected'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedLead.id, st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          selectedLead.status === st
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Assign Senior Dispatcher:</div>
                  <select
                    value={selectedLead.assignedDispatcher}
                    onChange={(e) => handleAssignDispatcher(selectedLead.id, e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 mt-1"
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="David Miller (Senior)">David Miller (Senior)</option>
                    <option value="Alex Reed (Flatbed Desk)">Alex Reed (Flatbed Desk)</option>
                    <option value="Sarah K. (Power Desk)">Sarah K. (Power Desk)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-xs">
                <div><span className="text-slate-400">Contact Person:</span> <strong className="text-white block mt-0.5">{selectedLead.contactPerson}</strong></div>
                <div><span className="text-slate-400">Phone Number:</span> <strong className="text-white block mt-0.5">{selectedLead.phone}</strong></div>
                <div><span className="text-slate-400">Email Address:</span> <strong className="text-white block mt-0.5">{selectedLead.email}</strong></div>
                <div><span className="text-slate-400">USDOT / MC Number:</span> <strong className="text-amber-400 font-mono block mt-0.5">{selectedLead.mcNumber}</strong></div>
                <div><span className="text-slate-400">Equipment Type:</span> <strong className="text-emerald-400 block mt-0.5">{selectedLead.equipmentType} ({selectedLead.powerUnits})</strong></div>
                <div><span className="text-slate-400">Target Minimum RPM:</span> <strong className="text-emerald-400 block mt-0.5">${selectedLead.targetRpm} / mile</strong></div>
              </div>
            </div>

            <div className="bg-slate-900 px-6 py-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
