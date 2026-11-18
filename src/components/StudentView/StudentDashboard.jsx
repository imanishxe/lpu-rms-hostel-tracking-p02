import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  ChevronDown, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Sun, 
  Moon
} from 'lucide-react';

export default function StudentDashboard({ 
  currentVersion, 
  setCurrentVersion,
  theme,
  setTheme,
  onBackToHome,
  complaints, 
  onConfirmResolved, 
  onReopenComplaint, 
  onOpenEscalateModal, 
  onOpenSubmitModal,
  initialExpandedId = null
}) {
  const [activeTab, setActiveTab] = useState('All');
  // All details start collapsed by default unless specified
  const [expandedDetails, setExpandedDetails] = useState(
    initialExpandedId ? { [initialExpandedId]: true } : {}
  );
  const [ratedCards, setRatedCards] = useState({});
  const [cardAlerts, setCardAlerts] = useState({
    sms: true,
    touchApp: true
  });

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRate = (id, rating) => {
    setRatedCards(prev => ({ ...prev, [id]: rating }));
  };

  const filteredList = complaints.filter(c => {
    if (activeTab === 'Open') return c.isOpen;
    if (activeTab === 'Close') return !c.isOpen;
    return true;
  });

  const countOpen = complaints.filter(c => c.isOpen).length;
  const countClose = complaints.filter(c => !c.isOpen).length;

  return (
    <div 
      data-theme={theme}
      className="min-h-screen theme-page-bg transition-colors duration-150"
    >
      {/* Centered Mobile-First Container (max-w-[500px] mx-auto px-5 py-6 sm:px-6 sm:py-8) */}
      <div className="max-w-[500px] w-full mx-auto px-5 py-6 sm:px-6 sm:py-8">
        
        {/* 1. Top App Bar (rounded-[20px] p-5 sm:p-6 mb-6) */}
        <div className="theme-card rounded-[20px] p-5 sm:p-6 mb-6 flex items-center justify-between gap-2.5">
          
          {/* Left: Back + Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={onBackToHome}
              className="w-8 h-8 rounded-lg flex items-center justify-center btn-outline-neutral text-xs flex-shrink-0"
              title="Return to Perspectives"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight theme-text-primary leading-tight truncate">
                RMS Requests
              </h1>
              <p className="text-[10.5px] theme-text-secondary font-mono truncate">
                Hostel B · Room 207
              </p>
            </div>
          </div>

          {/* Right: Controls & + Log Button */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            
            {/* Version Toggle Pill */}
            <div className="flex items-center bg-[var(--bg-subtle)] border border-[var(--border-card)] p-0.5 rounded-lg text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => setCurrentVersion('v1')}
                className={`py-1 px-2 rounded-md transition-all ${
                  currentVersion === 'v1' ? 'bg-amber-600 text-white shadow-2xs' : 'theme-text-secondary hover:text-[#F48120]'
                }`}
                title="Current RMS Baseline"
              >
                v1.0
              </button>
              <button
                type="button"
                onClick={() => setCurrentVersion('v2')}
                className={`py-1 px-2 rounded-md transition-all ${
                  currentVersion === 'v2' ? 'btn-lpu-gradient shadow-2xs' : 'theme-text-secondary hover:text-[#F48120]'
                }`}
                title="Improved RMS"
              >
                v2.0
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="w-7 h-7 rounded-lg flex items-center justify-center btn-outline-neutral text-xs"
              title="Toggle Light/Dark"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            {/* + Log Request Orange Button */}
            <button
              type="button"
              onClick={onOpenSubmitModal}
              className="btn-lpu-gradient text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Log</span>
            </button>

          </div>

        </div>

        {/* 2. 3-Tab Segmented Filter Bar (p-1.5 rounded-2xl mb-6) */}
        <div className="theme-card rounded-2xl p-1.5 mb-6 flex items-center text-xs font-semibold">
          {['All', 'Open', 'Close'].map((tab) => {
            const count = tab === 'All' ? complaints.length : (tab === 'Open' ? countOpen : countClose);
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-center transition-all ${
                  isActive
                    ? 'btn-lpu-gradient shadow-xs'
                    : 'theme-text-secondary hover:text-[var(--text-primary)]'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* 3. Request Cards (space-y-5) */}
        <div className="space-y-5">
          {filteredList.map((req) => {
            const isDetailsOpen = !!expandedDetails[req.id];
            const isWorkDone = req.currentStageV2 === 'Work Done' || req.statusLabelV1 === 'Work Done';
            const isVerifiedResolved = req.currentStageV2 === 'Verified Resolved';

            return (
              <div
                key={req.id}
                className="theme-card rounded-[20px] p-5 sm:p-6 transition-colors"
              >
                
                {/* ==========================================
                    v1.0 CURRENT RMS MODE
                    ========================================== */}
                {currentVersion === 'v1' ? (
                  <div>
                    {/* Title (mb-2.5) */}
                    <h3 className="text-[16px] sm:text-[17px] font-bold theme-text-primary leading-snug tracking-tight mb-2.5">
                      {req.title}
                    </h3>
                    
                    {/* Short Description (mb-4) */}
                    <p className="text-xs theme-text-secondary leading-relaxed mb-4 line-clamp-2">
                      {req.description}
                    </p>

                    {/* Classic REMARKS box (p-4 sm:p-5 my-4 rounded-xl border-l-4) */}
                    <div className="theme-subtle border-l-4 border-l-[var(--accent-primary)] p-4 sm:p-5 my-4 rounded-xl text-xs space-y-1">
                      <span className="text-[10.5px] font-bold text-[#F48120] uppercase tracking-wider block">
                        REMARKS :
                      </span>
                      <p className="font-semibold theme-text-primary text-sm">
                        {req.id === '5847088' ? 'Pending' : (req.id === '5847129' ? 'In Progress' : 'Work Done')}
                      </p>
                    </div>

                    {/* Footer Row (pt-3.5 mt-3 border-t) */}
                    <div className="pt-3.5 mt-3 border-t border-[var(--border-card)] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#F48120] font-mono text-xs">
                          Request ID: {req.id}
                        </span>
                        <span className="theme-text-secondary text-[11px] block font-mono mt-0.5">
                          Date: {req.dateFormatted}
                        </span>
                      </div>
                    </div>

                    {/* If Work Done: Rate Us button */}
                    {isWorkDone && (
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => handleRate(req.id, 5)}
                          className="w-full btn-lpu-gradient text-xs font-semibold py-2.5 rounded-xl shadow-xs text-center"
                        >
                          RATE US
                        </button>
                        {ratedCards[req.id] && (
                          <p className="text-[11px] font-bold text-emerald-600 text-center mt-2">
                            ✓ {ratedCards[req.id]}/5 Stars Submitted
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* ==========================================
                      v2.0 IMPROVED RMS MODE (8-Point Grid Polish)
                      ========================================== */
                  <div>
                    
                    {/* 1. Header Row (mb-3): ID + Status Pill */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-[#F48120] flex-shrink-0">
                        Request ID: {req.id}
                      </span>

                      {/* Status Pill */}
                      {req.delayActive ? (
                        <span className="badge-delayed px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-right truncate max-w-[60%]">
                          Delayed · Part Needed
                        </span>
                      ) : isVerifiedResolved ? (
                        <span className="badge-resolved px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-right truncate max-w-[60%]">
                          ✓ Verified Resolved
                        </span>
                      ) : isWorkDone ? (
                        <span className="badge-alert px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-right truncate max-w-[60%]">
                          Action Needed: Verify Repair
                        </span>
                      ) : (
                        <span className="pill-accent px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border border-[#F48120]/30 text-right truncate max-w-[60%]">
                          {req.currentStageV2}
                        </span>
                      )}
                    </div>

                    {/* 2. Issue Title (mb-4): text-[16px] sm:text-[17px] font-bold leading-snug tracking-tight */}
                    <h3 className="text-[16px] sm:text-[17px] font-bold theme-text-primary leading-snug tracking-tight mb-4">
                      {req.title}
                    </h3>

                    {/* 3. 4-Step Progress Bar (my-4 py-3.5 px-3 rounded-xl bg-[var(--bg-subtle)]) */}
                    <div className="my-4 py-3.5 px-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-card)]">
                      <div className="grid grid-cols-4 items-center text-center select-none">
                        {[
                          { label: 'Submitted', done: true },
                          { label: 'Assigned', done: req.currentStageV2 !== 'Submitted' },
                          { label: 'In Progress', done: req.currentStageV2 === 'In Progress' || req.delayActive || isWorkDone || isVerifiedResolved },
                          { label: 'Resolved', done: isVerifiedResolved }
                        ].map((node, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="flex items-center w-full">
                              <span className={`h-0.5 w-full ${i === 0 ? 'invisible' : (node.done ? 'bg-[#F48120]' : 'bg-[var(--border-card)]')}`} />
                              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 border-2 ${
                                node.done 
                                  ? (req.delayActive && i === 2 ? 'bg-amber-500 border-amber-500' : 'bg-[#F48120] border-[#F48120]') 
                                  : 'bg-[var(--bg-card)] border-[var(--border-card)]'
                              }`} />
                              <span className={`h-0.5 w-full ${i === 3 ? 'invisible' : (node.done && i < 2 ? 'bg-[#F48120]' : 'bg-[var(--border-card)]')}`} />
                            </div>
                            <span className={`mt-2 whitespace-nowrap text-center text-[10px] sm:text-[11px] font-medium block ${node.done ? 'text-[#F48120] font-bold' : 'theme-text-secondary'}`}>
                              {node.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. REMARKS & STATUS Box (my-4 p-4 sm:p-5 rounded-xl border-l-4, space-y-2) */}
                    <div className="theme-subtle border-l-4 border-l-[var(--accent-primary)] p-4 sm:p-5 my-4 rounded-xl text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="theme-text-secondary">Assigned:</span>
                        <strong className="theme-text-primary font-semibold">{req.assignedUnit}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="theme-text-secondary">Est. Completion:</span>
                        <strong className="theme-text-primary font-semibold">
                          {req.revisedEstimatedCompletion || req.initialEstimatedCompletion}
                        </strong>
                      </div>
                      {req.delayActive && (
                        <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold pt-1 border-t border-[var(--border-card)]/50">
                          {req.delayReason}
                        </div>
                      )}
                    </div>

                    {/* 5. Two-Way Resolution Gate (my-4 p-4 sm:p-5 rounded-xl on ticket 5847104) */}
                    {isWorkDone && !isVerifiedResolved && (
                      <div className="my-4 p-4 sm:p-5 rounded-xl bg-[var(--bg-accent-soft)] border border-[#F48120]/30">
                        <p className="text-xs font-bold theme-text-primary mb-3">
                          Is the ceiling fan regulator fixed in your room?
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => onConfirmResolved(req.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            <span>✓ Confirm Resolved</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onReopenComplaint(req.id, "Regulator still sparks when turned.")}
                            className="btn-outline-neutral border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <XCircle className="w-4 h-4 flex-shrink-0" />
                            <span>✕ Still Not Resolved</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Star Rating on Verified Resolved */}
                    {isVerifiedResolved && (
                      <div className="my-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Physically Verified in Room 207</span>
                        </span>
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 6. Card Footer Row (pt-3.5 mt-3 border-t border-[var(--border-card)]) */}
                    <div className="pt-3.5 mt-3 border-t border-[var(--border-card)] flex items-center justify-between text-xs">
                      <span className="theme-text-secondary text-[11px]">
                        Submitted: {req.dateFormatted.split(' ')[0]}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleDetails(req.id)}
                        className="text-[#F48120] hover:underline font-semibold text-xs flex items-center gap-1 py-1"
                      >
                        <span>More Details</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Expanded Drawer (mt-4 pt-4 border-t space-y-4 p-4 sm:p-5) */}
                    {isDetailsOpen && (
                      <div className="mt-4 pt-4 border-t border-[var(--border-card)] theme-subtle rounded-xl p-4 sm:p-5 space-y-4 text-xs animate-fade-in">
                        
                        {/* Description */}
                        <div>
                          <span className="text-[10px] uppercase font-bold theme-text-secondary block mb-1">
                            Full Issue Description:
                          </span>
                          <p className="theme-text-primary text-[11.5px] leading-relaxed">
                            {req.description}
                          </p>
                        </div>

                        {/* Update History (space-y-2.5) */}
                        <div>
                          <span className="text-[10px] uppercase font-bold theme-text-secondary block mb-1.5">
                            Timestamped Updates:
                          </span>
                          <div className="space-y-2 pl-3 border-l-2 border-[#F48120] text-[11px]">
                            {req.chronologicalHistory?.map((log, i) => (
                              <div key={i} className="leading-snug">
                                <span className="theme-text-secondary font-mono text-[10px]">{log.timestamp} — </span>
                                <span className="theme-text-primary font-medium">{log.message}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Escalation Box (p-3.5 rounded-xl) */}
                        <div className="p-3.5 rounded-xl theme-card flex items-center justify-between gap-3">
                          <div>
                            <span className="font-bold theme-text-primary block text-xs">
                              Need Warden Intervention?
                            </span>
                            <span className="text-[10px] theme-text-secondary">
                              Standard SLA: 48 hours.
                            </span>
                          </div>

                          {req.isEscalatedToWarden ? (
                            <span className="text-[11px] font-semibold pill-accent text-[#F48120] border border-[#F48120]/30 px-3 py-1 rounded-lg">
                              ✓ Escalated to Warden
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onOpenEscalateModal(req.id)}
                              className="btn-lpu-gradient text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs hover:opacity-95"
                            >
                              Escalate to Warden
                            </button>
                          )}
                        </div>

                        {/* Alerts Checkboxes */}
                        <div className="flex items-center gap-5 text-xs theme-text-secondary pt-1">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cardAlerts.sms}
                              onChange={(e) => setCardAlerts(prev => ({ ...prev, sms: e.target.checked }))}
                              className="accent-[#F48120]"
                            />
                            <span>SMS Alerts</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cardAlerts.touchApp}
                              onChange={(e) => setCardAlerts(prev => ({ ...prev, touchApp: e.target.checked }))}
                              className="accent-[#F48120]"
                            />
                            <span>LPU Touch Push</span>
                          </label>
                        </div>

                      </div>
                    )}

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
