import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BellRing, 
  ChevronDown, 
  Sun, 
  Moon, 
  CheckCircle2, 
  MapPin
} from 'lucide-react';

export default function WardenDashboard({ 
  complaints, 
  onWardenAction,
  theme,
  setTheme,
  onBackToHome,
  initialExpandedId = null
}) {
  const [expandedDetails, setExpandedDetails] = useState(
    initialExpandedId ? { [initialExpandedId]: true } : {}
  );
  const [toastNotice, setToastNotice] = useState('');
  const [noteInputs, setNoteInputs] = useState({});

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNudge = (id) => {
    onWardenAction(id, {
      type: 'NUDGE_SUPERVISOR',
      auditMessage: 'Hostel B Warden Desk nudged Maintenance Supervisor to expedite store part requisition.'
    });
    showSuccess("Supervisor nudged! Priority alert sent to maintenance unit.");
  };

  const handleAddNote = (id) => {
    const note = noteInputs[id];
    if (!note || !note.trim()) return;

    onWardenAction(id, {
      type: 'ADD_NOTE',
      note: note.trim(),
      auditMessage: `Hostel B Warden Office Directive: "${note.trim()}"`
    });

    setNoteInputs(prev => ({ ...prev, [id]: '' }));
    showSuccess("Official Warden Directive attached to request audit log.");
  };

  const showSuccess = (msg) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(''), 3500);
  };

  const totalDelayed = complaints.filter(c => c.delayActive).length;
  const totalReopened = complaints.filter(c => c.currentStageV2?.includes('Reopened') || c.studentVerificationStatus === 'Reopened').length;
  const totalActive = complaints.filter(c => c.currentStageV2 !== 'Verified Resolved').length;

  return (
    <div 
      data-theme={theme}
      className="min-h-screen theme-page-bg transition-colors duration-150"
    >
      {/* Toast Alert */}
      {toastNotice && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold py-2 px-5 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Centered Mobile-First Container (max-w-[500px] mx-auto px-5 py-6 sm:px-6 sm:py-8) */}
      <div className="max-w-[500px] w-full mx-auto px-5 py-6 sm:px-6 sm:py-8">
        
        {/* Top App Bar (rounded-[20px] p-5 sm:p-6 mb-6) */}
        <div className="theme-card rounded-[20px] p-5 sm:p-6 mb-6 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={onBackToHome}
              className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center btn-outline-neutral text-xs"
              title="Return to Perspectives"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight theme-text-primary leading-tight truncate">
                Hostel Warden Console
              </h1>
              <p className="text-[11px] theme-text-secondary font-mono mt-0.5 truncate">
                Hostel B Warden Office · SLA Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="w-8 h-8 rounded-xl flex items-center justify-center btn-outline-neutral text-xs"
              title="Toggle Light/Dark"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Top KPI Summary Strips (grid-cols-3 gap-3 sm:gap-4 mb-6, each p-3.5 sm:p-4 rounded-2xl text-center) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 text-center">
          <div className="p-3.5 sm:p-4 rounded-2xl theme-card border border-amber-300 dark:border-amber-900/60 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] text-amber-700 dark:text-amber-400 block font-semibold mb-0.5 truncate">Delayed</span>
            <span className="text-lg sm:text-xl text-amber-900 dark:text-amber-300 font-mono font-bold">{totalDelayed}</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl theme-card border border-rose-300 dark:border-rose-900/60 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] text-rose-700 dark:text-rose-400 block font-semibold mb-0.5 truncate">Not Resolved</span>
            <span className="text-lg sm:text-xl text-rose-900 dark:text-rose-300 font-mono font-bold">{totalReopened}</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl theme-card shadow-2xs">
            <span className="text-[10px] sm:text-[11px] theme-text-secondary block font-semibold mb-0.5 truncate">All Active</span>
            <span className="text-lg sm:text-xl theme-text-primary font-mono font-bold">{totalActive}</span>
          </div>
        </div>

        {/* Exception Cards (space-y-5) */}
        <div className="space-y-5">
          {complaints.filter(c => c.delayActive || c.isEscalatedToWarden || c.currentStageV2?.includes('Reopened') || c.isOpen).map((req) => {
            const isDetailsOpen = !!expandedDetails[req.id];

            return (
              <div
                key={req.id}
                className="theme-card rounded-[20px] p-5 sm:p-6 transition-colors"
              >
                {/* Header: ID + Location (mb-3) */}
                <div className="flex items-center justify-between text-xs font-bold mb-3 gap-2">
                  <span className="font-mono text-xs text-[#F48120] flex-shrink-0">
                    Request ID: {req.id}
                  </span>
                  <span className="theme-text-secondary flex items-center gap-1.5 text-xs font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#F48120] flex-shrink-0" />
                    <span className="truncate">{req.location}</span>
                  </span>
                </div>

                {/* Title & Assigned (mb-3) */}
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-bold theme-text-primary leading-snug tracking-tight mb-1.5">
                    {req.title}
                  </h3>
                  <div className="text-xs theme-text-secondary mb-3">
                    Assigned: <strong className="theme-text-primary font-semibold">{req.assignedUnit}</strong>
                  </div>
                </div>

                {/* Delay Notice if present */}
                {req.delayActive && (
                  <div className="p-3.5 rounded-xl badge-delayed text-xs font-semibold my-3 leading-relaxed">
                    {req.delayReason}
                  </div>
                )}

                {/* Action Row: mt-4 pt-3.5 border-t flex items-center justify-between gap-2.5 */}
                <div className="mt-4 pt-3.5 border-t border-[var(--border-card)] flex items-center justify-between gap-2.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => handleNudge(req.id)}
                    className="py-2.5 px-4 rounded-xl pill-accent border border-[#F48120]/30 hover:border-[#F48120] text-[#F48120] flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    <span>Nudge Maintenance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleDetails(req.id)}
                    className="py-2.5 px-3.5 rounded-xl theme-text-secondary hover:theme-text-primary flex items-center gap-1.5 transition-colors"
                  >
                    <span>Details &amp; History</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Details & History Drawer (mt-4 pt-4 border-t space-y-4 p-4 sm:p-5 rounded-xl) */}
                {isDetailsOpen && (
                  <div className="mt-4 pt-4 border-t border-[var(--border-card)] theme-subtle rounded-xl p-4 sm:p-5 space-y-4 text-xs animate-fade-in">
                    
                    {/* Audit History */}
                    <div>
                      <span className="text-[10px] uppercase font-bold theme-text-secondary block mb-2">
                        Timeline History:
                      </span>
                      <div className="space-y-2 pl-3 border-l-2 border-[#F48120] text-[11px]">
                        {req.chronologicalHistory?.map((log, i) => (
                          <div key={i} className="leading-snug">
                            <span className="font-mono text-[10px] theme-text-secondary">{log.timestamp} — </span>
                            <span className="theme-text-primary font-medium">{log.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add Directive Note */}
                    <div className="space-y-2 pt-1 border-t border-[var(--border-card)]/50">
                      <label className="block text-[10px] font-bold theme-text-secondary uppercase">
                        Attach Warden Directive:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={noteInputs[req.id] || ''}
                          onChange={(e) => setNoteInputs(prev => ({ ...prev, [req.id]: e.target.value }))}
                          placeholder="e.g. Authorized local purchase of cartridge if delayed past 5 PM..."
                          className="flex-1 p-2.5 text-xs rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] theme-text-primary outline-none focus:border-[#F48120]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddNote(req.id)}
                          className="btn-lpu-gradient px-4 py-2.5 text-white font-semibold text-xs rounded-xl shadow-2xs hover:opacity-95"
                        >
                          Attach
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
