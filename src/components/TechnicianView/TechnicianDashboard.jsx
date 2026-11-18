import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  Sun, 
  Moon, 
  CheckCircle2, 
  MapPin
} from 'lucide-react';

export default function TechnicianDashboard({ 
  complaints, 
  onTechnicianUpdate,
  theme,
  setTheme,
  onBackToHome,
  initialDelayId = null
}) {
  const [filter, setFilter] = useState('All');
  const [openDelayDropdown, setOpenDelayDropdown] = useState(initialDelayId || null);
  const [selectedReason, setSelectedReason] = useState('Spare Part Needed from Central Store');
  const [selectedEta, setSelectedEta] = useState('Tomorrow by 5:00 PM');
  const [toastNotice, setToastNotice] = useState('');

  const delayReasons = [
    "Spare Part Needed from Central Store",
    "Room Locked / Student Unavailable",
    "Urgent Water/Power Emergency Elsewhere",
    "Requires Senior Technician / 2nd Visit"
  ];

  const etaOptions = [
    "+4 Hours (Today Evening)",
    "Tomorrow by 2:00 PM",
    "Tomorrow by 5:00 PM",
    "Pending Store Delivery"
  ];

  const handleStartWork = (id) => {
    onTechnicianUpdate(id, {
      type: 'START_INSPECTION',
      stage: 'In Progress',
      note: 'Technician Amit Kumar arrived at room for physical inspection.'
    });
    showSuccess("Inspection started! Status set to In Progress.");
  };

  const handleApplyDelay = (id) => {
    onTechnicianUpdate(id, {
      type: 'LOG_DELAY',
      stage: 'In Progress',
      delayActive: true,
      delayReason: `⚠️ Delayed: ${selectedReason}`,
      revisedEta: selectedEta,
      note: `Delay logged: ${selectedReason}. Revised ETA: ${selectedEta}.`
    });
    setOpenDelayDropdown(null);
    showSuccess("Delay transparently logged with store reason & revised ETA!");
  };

  const handleMarkDone = (id) => {
    onTechnicianUpdate(id, {
      type: 'MARK_DONE',
      stage: 'Work Done',
      delayActive: false,
      note: 'Repair completed by Amit Kumar. Two-Way Verification Gate dispatched to student.'
    });
    showSuccess("Marked Work Done! Student verification prompt triggered.");
  };

  const showSuccess = (msg) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(''), 3500);
  };

  const filteredList = complaints.filter(c => {
    if (filter === 'Delayed') return c.delayActive;
    if (filter === 'Pending') return c.currentStageV2 !== 'Verified Resolved';
    return true;
  });

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
                Service Manager Console
              </h1>
              <p className="text-[11px] theme-text-secondary font-mono mt-0.5 truncate">
                Amit Kumar · TECH-PL-04 (Plumbing Unit)
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

        {/* 3-Tab Filter Bar (p-1.5 rounded-2xl mb-6) */}
        <div className="theme-card rounded-2xl p-1.5 mb-6 flex items-center text-xs font-semibold">
          {['All', 'Pending', 'Delayed'].map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`flex-1 py-2 rounded-xl text-center transition-all ${
                  isActive
                    ? 'btn-lpu-gradient shadow-xs'
                    : 'theme-text-secondary hover:text-[var(--text-primary)]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Request Cards (space-y-5) */}
        <div className="space-y-5">
          {filteredList.map((req) => {
            const isDelayOpen = openDelayDropdown === req.id;

            return (
              <div
                key={req.id}
                className="theme-card rounded-[20px] p-5 sm:p-6 transition-colors"
              >
                {/* Header: Request ID + Location (mb-3) */}
                <div className="flex items-center justify-between text-xs font-bold mb-3 gap-2">
                  <span className="font-mono text-xs text-[#F48120] flex-shrink-0">
                    Request ID: {req.id}
                  </span>
                  <span className="theme-text-secondary flex items-center gap-1.5 text-xs font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#F48120] flex-shrink-0" />
                    <span className="truncate">{req.location}</span>
                  </span>
                </div>

                {/* Title & Stage (mb-3) */}
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-bold theme-text-primary leading-snug tracking-tight mb-1.5">
                    {req.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <span className="theme-text-secondary">Current Stage:</span>
                    <strong className="theme-text-primary font-semibold">{req.currentStageV2}</strong>
                  </div>
                </div>

                {/* Delay Notice if active (p-3.5 rounded-xl my-3) */}
                {req.delayActive && (
                  <div className="p-3.5 rounded-xl badge-delayed text-xs font-semibold my-3 leading-relaxed">
                    {req.delayReason}
                  </div>
                )}

                {/* Action Row: mt-4 pt-3.5 border-t flex items-center justify-between gap-2.5 with py-2.5 px-4 rounded-xl */}
                <div className="mt-4 pt-3.5 border-t border-[var(--border-card)] grid grid-cols-2 gap-3 text-xs font-semibold">
                  
                  {/* Primary Action Button */}
                  {req.currentStageV2 === 'Assigned' ? (
                    <button
                      type="button"
                      onClick={() => handleStartWork(req.id)}
                      className="btn-lpu-gradient py-2.5 px-4 rounded-xl text-center shadow-xs flex items-center justify-center gap-1.5"
                    >
                      Start Work
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMarkDone(req.id)}
                      className="btn-lpu-gradient py-2.5 px-4 rounded-xl text-center shadow-xs flex items-center justify-center gap-1.5"
                    >
                      Mark Work Done
                    </button>
                  )}

                  {/* Secondary Outline Button */}
                  <button
                    type="button"
                    onClick={() => setOpenDelayDropdown(isDelayOpen ? null : req.id)}
                    className="btn-outline-neutral py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <span>Log Delay</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDelayOpen ? 'rotate-180' : ''}`} />
                  </button>

                </div>

                {/* Inline Delay Drawer (mt-4 pt-4 border-t space-y-3.5 p-4 sm:p-5 rounded-xl) */}
                {isDelayOpen && (
                  <div className="mt-4 pt-4 border-t border-[var(--border-card)] theme-subtle rounded-xl p-4 sm:p-5 space-y-3.5 text-xs animate-fade-in">
                    <div>
                      <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-1.5">
                        Select Delay Reason:
                      </label>
                      <select
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] theme-text-primary outline-none focus:border-[#F48120]"
                      >
                        {delayReasons.map((r, i) => (
                          <option key={i} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-1.5">
                        Revised Estimated Completion:
                      </label>
                      <select
                        value={selectedEta}
                        onChange={(e) => setSelectedEta(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] theme-text-primary outline-none focus:border-[#F48120]"
                      >
                        {etaOptions.map((e, i) => (
                          <option key={i} value={e}>{e}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => setOpenDelayDropdown(null)}
                        className="px-3 py-2 text-xs theme-text-secondary hover:text-[var(--text-primary)] font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyDelay(req.id)}
                        className="btn-lpu-gradient text-xs font-semibold px-4 py-2 rounded-xl shadow-xs"
                      >
                        Confirm Delay
                      </button>
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
