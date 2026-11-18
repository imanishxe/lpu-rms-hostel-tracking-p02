import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function Footer({ onOpenDesignModal }) {
  return (
    <footer className="border-t theme-border theme-card theme-text-secondary text-xs py-5 mt-auto transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Institutional Badge & Disclaimer */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full pill-accent border border-[#F48120]/30 text-[#F48120] font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Interactive Demonstration Prototype · Project P02 (INT335 Design Thinking)
            </span>
            <span className="text-[11px] theme-text-secondary">
              RMS Hostel Maintenance Tracking &amp; Communication Module
            </span>
          </div>

          {/* Quick links & credits */}
          <div className="flex items-center gap-3 text-[11px]">
            <button
              type="button"
              onClick={onOpenDesignModal}
              className="text-[#F48120] hover:underline font-semibold flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              Design Thinking Methodology &amp; Fixes Matrix
            </button>
            <span>•</span>
            <span className="theme-text-secondary">Lovely Professional University</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t theme-border flex flex-col sm:flex-row items-center justify-between text-[11px] theme-text-secondary gap-2">
          <p>
            Grounded in user psychology: Transparent delay communication, framed completion windows, and two-way verified loop closure.
          </p>
          <p className="font-mono text-[10px]">
            LPU RMS Framework v4.2 · Static Vercel Deployment Build
          </p>
        </div>
      </div>
    </footer>
  );
}
