import React from 'react';
import { 
  X, 
  Lightbulb, 
  Target, 
  Users, 
  Sparkles, 
  Layers, 
  BarChart3,
  HeartHandshake
} from 'lucide-react';
import { DESIGN_THINKING_ANNOTATIONS } from '../../data/initialData';

export default function DesignThinkingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      feature: "Complaint Lifecycle States",
      v1: "Vague single 'Pending' badge on newly submitted and routed complaints (ISS-01).",
      v2: "4-Stage Visual Stepper: Submitted → Assigned → In Progress → Student Verified (FIX-01)."
    },
    {
      feature: "Maintenance Responsibility",
      v1: "Hidden/buried. Student cannot see who handles plumbing, power, or carpentry (ISS-02).",
      v2: "High-visibility Ownership Card with trade unit scope and technician ID (FIX-02 & RES-01)."
    },
    {
      feature: "Completion Deadline Framing",
      v1: "Rigid false deadlines that break trust when emergencies occur (ISS-03).",
      v2: "Framed 'Estimated Completion Window' with explicit revision timestamp (FIX-03 & RES-02)."
    },
    {
      feature: "Delay Communication",
      v1: "Complete radio silence when parts are awaited, causing duplicate complaints (ISS-04).",
      v2: "Transparent Delay Banner with exact store part reason & revised ETA (FIX-04)."
    },
    {
      feature: "Resolution Sign-off",
      v1: "Unilateral closure by technician with zero student verification (ISS-05).",
      v2: "Two-Way Resolution Confirmation Gate with 1-click Reopen option (FIX-05)."
    },
    {
      feature: "Audit Trail & Escalation",
      v1: "No chronological history or objective escalation path (ISS-06, ISS-07).",
      v2: "Reverse-chronological timestamped audit log & Warden SLA Escalation (FIX-06, FIX-07)."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="theme-card rounded-[20px] theme-border border shadow-2xl max-w-4xl w-full my-auto overflow-hidden theme-text-primary flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 flex items-center justify-between flex-shrink-0 border-b theme-border">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl pill-accent flex items-center justify-center text-[#F48120] shadow-2xs">
              <Lightbulb className="w-5 h-5 text-[#F48120]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono pill-accent text-[#F48120] px-2.5 py-0.5 rounded-md uppercase font-bold border border-[#F48120]/30">
                  INT335 Design Thinking
                </span>
                <span className="text-xs theme-text-secondary font-medium">Project P02</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold theme-text-primary mt-1">
                Closing the Loop: Smart Hostel Maintenance Tracking &amp; Communication System
              </h3>
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

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs theme-text-secondary">
          
          {/* Executive Summary */}
          <div className="pill-accent border border-[#F48120]/30 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase text-[#F48120] tracking-wider mb-1 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#F48120]" />
              <span>Project Objective &amp; The 4 Stakeholder Perspectives</span>
            </h4>
            <p className="leading-relaxed theme-text-primary">
              Hostel residents at large residential universities experience acute frustration when daily amenities break down. Our research showed that the true pain point is not merely the mechanical repair — <strong className="text-[#F48120]">it is the psychological black box</strong> of existing complaint systems. Project P02 integrates an accountable communication and tracking layer into the university RMS with tailored workflows for all 4 stakeholders: <strong>Students, Maintenance Technicians, Hostel Wardens, and University Campus Management</strong>.
            </p>
          </div>

          {/* Persona & Empathy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="theme-subtle p-4 rounded-xl theme-border border">
              <h5 className="font-bold theme-text-primary mb-1 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#F48120]" />
                <span>Primary Student Persona: Aditya Gupta</span>
              </h5>
              <p className="text-[11px] theme-text-secondary mb-2">
                Hostel B, Room 207 (2nd Year B.Tech CSE)
              </p>
              <ul className="space-y-1.5 text-[11px] list-disc pl-4 theme-text-primary">
                <li><strong>Pain Point:</strong> Tap leaks continuously; portal says "In Progress" for 36 hours with zero explanation.</li>
                <li><strong>Behavior:</strong> Files 3 duplicate complaints, gets anxious before exams, calls warden at night.</li>
                <li><strong>Need:</strong> Transparent ETA windows, specific physical delay causes (store parts), and right to physically verify before closure.</li>
              </ul>
            </div>

            <div className="theme-subtle p-4 rounded-xl theme-border border">
              <h5 className="font-bold theme-text-primary mb-1 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Executive Management Perspective (CP2.12)</span>
              </h5>
              <p className="text-[11px] theme-text-secondary mb-2">
                Estate &amp; Campus Facilities Administration
              </p>
              <ul className="space-y-1.5 text-[11px] list-disc pl-4 theme-text-primary">
                <li><strong>Macro SLA:</strong> Monitors campus-wide 84% SLA resolution compliance across Blocks A–D.</li>
                <li><strong>Root-Cause Tracking:</strong> Discovers that 42% of repair delays stem from central store spare-part requisitions.</li>
                <li><strong>Fast-Track Action:</strong> Can approve targeted bulk infrastructure requisitions (e.g. Hostel B plumbing valve upgrades).</li>
              </ul>
            </div>
          </div>

          {/* Before vs After Comparison Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase theme-text-primary tracking-wider mb-2.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#F48120]" />
              <span>Concept v1.0 (CP5 Baseline) vs Validated v2.0 (CP6/CP7 Redesign)</span>
            </h4>

            <div className="theme-border border rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead className="theme-subtle text-[11px] font-bold uppercase theme-text-secondary border-b theme-border">
                  <tr>
                    <th className="py-2.5 px-3 w-1/4">UX Element</th>
                    <th className="py-2.5 px-3 w-3/8 text-amber-800 dark:text-amber-300 bg-amber-500/10">Concept v1.0 (CP5 Baseline)</th>
                    <th className="py-2.5 px-3 w-3/8 text-[#F48120] pill-accent">Validated v2.0 (Redesign)</th>
                  </tr>
                </thead>
                <tbody className="divide-y theme-border text-[11px]">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3 font-semibold theme-text-primary">
                        {row.feature}
                      </td>
                      <td className="py-2.5 px-3 text-amber-900 dark:text-amber-200 bg-amber-500/5">
                        {row.v1}
                      </td>
                      <td className="py-2.5 px-3 theme-text-primary bg-orange-500/5 font-medium">
                        {row.v2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Psychology Fix Catalog */}
          <div>
            <h4 className="text-xs font-bold uppercase theme-text-primary tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F48120]" />
              <span>Catalog of Psychology &amp; Usability Fixes</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(DESIGN_THINKING_ANNOTATIONS).map((fix) => (
                <div key={fix.code} className="p-3 theme-subtle theme-border border rounded-xl shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-1 font-mono font-bold text-[#F48120]">
                    <span className="pill-accent text-[#F48120] px-1.5 py-0.5 rounded text-[10px] border border-[#F48120]/30">
                      {fix.code}
                    </span>
                    <span className="theme-text-primary font-sans text-xs">{fix.title}</span>
                  </div>
                  <p className="text-[11px] theme-text-secondary mb-1 leading-snug">
                    {fix.psychology}
                  </p>
                  <p className="text-[10px] theme-text-secondary/70 italic">
                    Resolved: {fix.issueRef}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="theme-subtle p-4 border-t theme-border flex items-center justify-between flex-shrink-0 text-xs">
          <span className="theme-text-secondary font-mono text-[11px]">
            INT335 Design Thinking · Lovely Professional University
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn-lpu-gradient px-4 py-1.5 text-white font-semibold rounded-lg shadow-2xs hover:opacity-95"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
}
