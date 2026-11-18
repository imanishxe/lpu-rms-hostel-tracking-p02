import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BarChart3, 
  ChevronDown, 
  Sun, 
  Moon, 
  CheckCircle2, 
  TrendingUp, 
  Building2,
  PackageCheck,
  Check
} from 'lucide-react';
import { CAMPUS_MANAGEMENT_DATA } from '../../data/initialData';

export default function ManagementDashboard({ 
  theme, 
  setTheme, 
  onBackToHome,
  initialBlockId = null
}) {
  const [openBlockDropdowns, setOpenBlockDropdowns] = useState(
    initialBlockId ? { [initialBlockId]: true } : {}
  );
  const [approvedBlocks, setApprovedBlocks] = useState({});
  const [toastNotice, setToastNotice] = useState('');

  const data = CAMPUS_MANAGEMENT_DATA;

  const toggleBlock = (blockId) => {
    setOpenBlockDropdowns(prev => ({
      ...prev,
      [blockId]: !prev[blockId]
    }));
  };

  const handleApprove = (blockId, blockName) => {
    setApprovedBlocks(prev => ({ ...prev, [blockId]: true }));
    setToastNotice(`Fast-Track Store Requisition Approved for ${blockName}! ERP order dispatched.`);
    setTimeout(() => setToastNotice(''), 4000);
  };

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
                University Management
              </h1>
              <p className="text-[11px] theme-text-secondary font-mono mt-0.5 truncate">
                Campus Estate &amp; Facilities Administration
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
          <div className="p-3.5 sm:p-4 rounded-2xl theme-card shadow-2xs">
            <span className="text-[10px] sm:text-[11px] theme-text-secondary block font-semibold mb-0.5 truncate">SLA Rate</span>
            <span className="text-lg sm:text-xl text-emerald-600 dark:text-emerald-400 font-mono font-bold">{data.overallSlaResolutionRate}%</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl theme-card shadow-2xs">
            <span className="text-[10px] sm:text-[11px] theme-text-secondary block font-semibold mb-0.5 truncate">Avg Response</span>
            <span className="text-lg sm:text-xl theme-text-primary font-mono font-bold">{data.avgFirstResponseTime}</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl theme-card border border-amber-300 dark:border-amber-900/60 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] text-amber-700 dark:text-amber-400 block font-semibold mb-0.5 truncate">Store Delays</span>
            <span className="text-lg sm:text-xl text-amber-800 dark:text-amber-300 font-mono font-bold">42%</span>
          </div>
        </div>

        {/* Hostel Block Performance Header (mb-4 px-1) */}
        <div className="mb-4 px-1">
          <h2 className="text-[11px] font-bold tracking-widest uppercase theme-text-secondary">
            Hostel Block Performance &amp; Analytics
          </h2>
        </div>

        {/* Hostel Block Cards (space-y-5) */}
        <div className="space-y-5">
          {data.hostelBlockComparison.map((block) => {
            const isOpen = !!openBlockDropdowns[block.id];
            const isApproved = !!approvedBlocks[block.id];

            return (
              <div
                key={block.id}
                className="rounded-[20px] theme-card shadow-xs overflow-hidden transition-colors"
              >
                {/* Horizontal Card Row (p-4 sm:p-5 flex items-center justify-between gap-3) */}
                <div 
                  onClick={() => toggleBlock(block.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl pill-accent flex items-center justify-center text-[#F48120] flex-shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[14px] sm:text-[15px] font-bold theme-text-primary truncate">
                        {block.block}
                      </h3>
                      <div className="text-[11px] sm:text-xs theme-text-secondary flex items-center gap-1.5 sm:gap-2 mt-0.5 truncate">
                        <span>Avg: <strong className="theme-text-primary font-semibold">{block.avgTurnaround}</strong></span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SLA: {block.slaCompliance}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBlock(block.id);
                    }}
                    className={`w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-xl flex items-center justify-center border text-xs transition-transform ${
                      isOpen ? 'bg-[#F48120] text-white border-[#F48120]' : 'theme-border theme-text-secondary btn-outline-neutral'
                    }`}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Dropdown Breakdown Drawer (mt-4 pt-4 border-t space-y-3.5 p-4 sm:p-5 rounded-xl) */}
                {isOpen && (
                  <div className="p-4 sm:p-5 mt-4 pt-4 border-t border-[var(--border-card)] theme-subtle rounded-xl space-y-3.5 text-xs animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                      <div className="p-3 rounded-xl theme-card theme-border border">
                        <span className="font-bold text-[#F48120] block mb-0.5">Plumbing:</span>
                        <span className="theme-text-secondary leading-snug">{block.plumbingBreakdown}</span>
                      </div>
                      <div className="p-3 rounded-xl theme-card theme-border border">
                        <span className="font-bold text-sky-600 dark:text-sky-400 block mb-0.5">Electrical:</span>
                        <span className="theme-text-secondary leading-snug">{block.electricalBreakdown}</span>
                      </div>
                      <div className="p-3 rounded-xl theme-card theme-border border">
                        <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">Carpentry:</span>
                        <span className="theme-text-secondary leading-snug">{block.carpentryBreakdown}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-3 border-t border-[var(--border-card)]/50">
                      <span className="text-xs theme-text-secondary">
                        Satisfaction: <strong className="theme-text-primary font-bold">{block.studentSatisfaction}/5.0</strong>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleApprove(block.id, block.block)}
                        className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs ${
                          isApproved 
                            ? 'bg-emerald-600 text-white cursor-default' 
                            : 'btn-lpu-gradient text-white hover:opacity-95'
                        }`}
                      >
                        {isApproved ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Fast-Track Approved</span>
                          </>
                        ) : (
                          <>
                            <PackageCheck className="w-4 h-4" />
                            <span>Approve Fast-Track Parts</span>
                          </>
                        )}
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
