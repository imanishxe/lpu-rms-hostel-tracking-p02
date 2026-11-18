import React, { useState } from 'react';
import { X, Landmark, AlertTriangle } from 'lucide-react';

export default function EscalateModal({ isOpen, onClose, complaint, onEscalateSubmit }) {
  const [escalationReason, setEscalationReason] = useState('Estimated window expired with no status update');
  const [remarks, setRemarks] = useState('');

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEscalateSubmit(complaint.id, {
      reason: escalationReason,
      remarks: remarks.trim()
    });
    onClose();
    setRemarks('');
  };

  const presetReasons = [
    "Estimated window expired with no status update",
    "Hazard / Water leakage causing room flooding",
    "Electrical spark risk near bed or study desk",
    "Repeated recurrence of previously marked issue",
    "Technician marked visit but did not inspect"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="theme-card rounded-[20px] theme-border border shadow-2xl max-w-lg w-full overflow-hidden theme-text-primary">
        
        {/* Header */}
        <div className="p-5 sm:p-6 flex items-center justify-between border-b theme-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl pill-accent flex items-center justify-center text-[#F48120]">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold theme-text-primary">
                Escalate Complaint to Hostel Warden
              </h3>
              <p className="text-[11px] theme-text-secondary mt-0.5">
                Official SLA Grievance Intervention Channel (FIX-07)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="theme-text-secondary hover:theme-text-primary p-2 rounded-xl btn-outline-neutral transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          
          <div className="theme-subtle p-4 rounded-xl theme-border border">
            <span className="font-mono text-[11px] font-bold text-[#F48120] block">
              Ticket: {complaint.id} · {complaint.location}
            </span>
            <p className="font-bold theme-text-primary text-sm mt-1">
              {complaint.title}
            </p>
            <p className="text-[11px] theme-text-secondary mt-1">
              Estimated Window: <strong className="theme-text-primary">{complaint.revisedEstimatedCompletion || complaint.initialEstimatedCompletion}</strong>
            </p>
          </div>

          <div>
            <label className="block font-bold theme-text-secondary uppercase mb-1.5">
              Select Primary Escalation Reason
            </label>
            <select
              value={escalationReason}
              onChange={(e) => setEscalationReason(e.target.value)}
              className="w-full p-2.5 rounded-xl theme-border border theme-text-primary theme-card focus:border-[#F48120] outline-none"
            >
              {presetReasons.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold theme-text-secondary uppercase mb-1.5">
              Additional Details for the Warden (Optional)
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Explain how this issue is affecting your study routine or safety..."
              rows={3}
              className="w-full p-2.5 rounded-xl theme-border border theme-text-primary theme-card focus:border-[#F48120] outline-none"
            />
          </div>

          <div className="theme-subtle p-3.5 rounded-xl theme-border border theme-text-secondary text-[11px] leading-relaxed">
            <strong className="theme-text-primary">Policy RES-03 SLA Governance:</strong> Escalating routes directly to the Warden's Exception Queue and issues an automated supervisory alert to the maintenance unit.
          </div>

          <div className="pt-3 border-t border-[var(--border-card)]/50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 theme-text-secondary hover:theme-text-primary font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-lpu-gradient px-5 py-2.5 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 hover:opacity-95"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
              <span>Submit Formal Escalation</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
