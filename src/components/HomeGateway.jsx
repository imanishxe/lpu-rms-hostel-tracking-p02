import React, { useState } from 'react';
import { 
  GraduationCap, 
  Wrench, 
  Landmark, 
  BarChart3, 
  ChevronDown, 
  ArrowRight, 
  Sun, 
  Moon, 
  RotateCcw, 
  Info,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function HomeGateway({ 
  onSelectRole, 
  theme, 
  setTheme, 
  currentVersion, 
  setCurrentVersion, 
  onResetData, 
  onOpenDesignModal,
  toastMessage,
  initialOpenStudent = false
}) {
  // All 4 dropdowns start false (collapsed) by default, or opened if specified via initialOpenStudent
  const [openDropdowns, setOpenDropdowns] = useState({
    student: !!initialOpenStudent,
    technician: false,
    warden: false,
    management: false
  });

  const toggleDropdown = (roleId, e) => {
    e.stopPropagation();
    setOpenDropdowns(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  const roles = [
    {
      id: 'student',
      title: 'Hostel Student',
      persona: 'Aditya Gupta · Hostel B, Room 207',
      icon: GraduationCap,
      bullets: [
        'Track real-time status of hostel maintenance requests',
        'Transparent physical delay causes (central store parts)',
        'Two-Way Resolution Confirmation before closing'
      ]
    },
    {
      id: 'technician',
      title: 'Service Manager',
      persona: 'Amit Kumar · Maintenance & Electrical Unit',
      icon: Wrench,
      bullets: [
        'Zero-typing mobile task dispatch queue',
        '1-tap chips to log spare-part store delays & revised ETA',
        'Trigger student room verification with 1 tap'
      ]
    },
    {
      id: 'warden',
      title: 'Hostel Warden',
      persona: 'Hostel B Warden Administration Office',
      icon: Landmark,
      bullets: [
        'Exception dashboard for overdue and stalled requests',
        'Review student "Still Not Resolved" dispute queue',
        '1-click supervisor nudges and priority directives'
      ]
    },
    {
      id: 'management',
      title: 'University Management',
      persona: 'Campus Facilities & Estate Administration',
      icon: BarChart3,
      bullets: [
        'Campus-wide 84% SLA resolution rate benchmarks',
        'Inter-Hostel block comparison (Blocks A–D)',
        'Root-cause tracking (42% store delays) & fast-track approval'
      ]
    }
  ];

  return (
    <div 
      data-theme={theme}
      className="min-h-screen theme-page-bg flex flex-col justify-between transition-colors duration-150"
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold py-2 px-5 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Centered Mobile-First Container (max-w-[500px] mx-auto px-5 py-6 sm:px-6 sm:py-8) */}
      <div className="max-w-[500px] w-full mx-auto my-auto px-5 py-6 sm:px-6 sm:py-8">
        
        {/* 1. Top Brand Card (rounded-[20px] p-5 sm:p-6 mb-6, w-12 h-12 rounded-2xl, gap-3.5) */}
        <div className="theme-card rounded-[20px] p-5 sm:p-6 mb-6 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#F48120] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.08em] text-[#F48120] font-mono block truncate">
              Lovely Professional University
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight theme-text-primary leading-tight mt-0.5">
              RMS Portal
            </h1>
            <p className="text-xs theme-text-secondary mt-1 leading-normal truncate">
              Hostel Maintenance Tracking &amp; Communication
            </p>
          </div>
        </div>

        {/* 2. Theme & Version Switch Bar (2-column grid, gap-3 mb-6) */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
          
          {/* Switch 1: Light | Dark */}
          <div className="theme-card p-1 rounded-2xl flex items-center">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex-1 py-2 px-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-xs ${
                theme === 'light'
                  ? 'bg-[#F48120] text-white shadow-xs'
                  : 'theme-text-secondary hover:text-[#F48120]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex-1 py-2 px-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-xs ${
                theme === 'dark'
                  ? 'bg-[#F48120] text-white shadow-xs'
                  : 'theme-text-secondary hover:text-[#F48120]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Dark</span>
            </button>
          </div>

          {/* Switch 2: v1.0 Current | v2.0 Improved */}
          <div className="theme-card p-1 rounded-2xl flex items-center">
            <button
              type="button"
              onClick={() => setCurrentVersion('v1')}
              className={`flex-1 py-2 px-2 rounded-xl font-semibold text-center transition-all text-[11px] sm:text-xs ${
                currentVersion === 'v1'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'theme-text-secondary hover:text-[#F48120]'
              }`}
            >
              v1.0 Current
            </button>
            <button
              type="button"
              onClick={() => setCurrentVersion('v2')}
              className={`flex-1 py-2 px-2 rounded-xl font-semibold text-center transition-all text-[11px] sm:text-xs ${
                currentVersion === 'v2'
                  ? 'btn-lpu-gradient shadow-xs'
                  : 'theme-text-secondary hover:text-[#F48120]'
              }`}
            >
              v2.0 Improved
            </button>
          </div>

        </div>

        {/* 3. Section Heading (text-[11px] font-bold tracking-widest text-[var(--text-secondary)] uppercase mb-4 px-1) */}
        <div className="mb-4 px-1 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--text-secondary)]">
            Select Your Perspective
          </span>
          <span className="text-[11px] font-medium text-[var(--text-secondary)]">
            4 Roles
          </span>
        </div>

        {/* 4. Perspective Cards (space-y-5) */}
        <div className="space-y-5">
          {roles.map((role) => {
            const Icon = role.icon;
            const isOpen = openDropdowns[role.id];

            return (
              <div
                key={role.id}
                className="theme-card rounded-[20px] overflow-hidden transition-all duration-150"
              >
                {/* Collapsed row (p-4 sm:p-5 with gap-3, vertically aligned items-center) */}
                <div 
                  onClick={() => onSelectRole(role.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  {/* Left: Soft Orange Icon Circle + Role Name Only */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[var(--bg-accent-soft)] flex items-center justify-center flex-shrink-0 text-[#F48120]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-semibold theme-text-primary leading-tight truncate">
                      {role.title}
                    </h3>
                  </div>

                  {/* Right: Dropdown Arrow Button ▾ + Enter Button (gap-2, items-center) */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    
                    {/* Interactive Dropdown Button ▾ (w-9 h-9 rounded-xl) */}
                    <button
                      type="button"
                      aria-label={`Toggle ${role.title} details`}
                      onClick={(e) => toggleDropdown(role.id, e)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center btn-outline-neutral text-xs"
                      title="Show role details & capabilities"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Enter Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRole(role.id);
                      }}
                      className="px-3.5 py-2 rounded-xl btn-lpu-gradient text-xs font-semibold shadow-xs flex items-center gap-1.5"
                    >
                      <span>Enter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </div>

                {/* Dropdown Drawer (Expanded ONLY on click, mt-4 pt-4 border-t space-y-2.5 p-4 sm:p-5) */}
                {isOpen && (
                  <div className="p-4 sm:p-5 mt-4 pt-4 border-t border-[var(--border-card)] theme-subtle rounded-xl text-xs space-y-2.5 animate-fade-in">
                    <div className="font-semibold text-[#F48120] text-xs">
                      Persona: {role.persona}
                    </div>
                    <ul className="space-y-1.5 theme-text-secondary text-[11px] leading-relaxed">
                      {role.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#F48120] font-bold mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* 5. Utility Links (mt-6 px-1) */}
        <div className="mt-6 px-1 flex items-center justify-between text-xs theme-text-secondary">
          <button
            type="button"
            onClick={onResetData}
            className="flex items-center gap-1.5 hover:text-[#F48120] transition-colors py-1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-medium">Reset Demo Data</span>
          </button>

          <button
            type="button"
            onClick={onOpenDesignModal}
            className="text-[#F48120] hover:underline font-semibold flex items-center gap-1 py-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>P02 Insights</span>
          </button>
        </div>

      </div>

      {/* Subtle Footer */}
      <div className="text-center text-[11px] theme-text-secondary pb-5">
        Project P02: Closing the Loop · LPU RMS Module
      </div>

    </div>
  );
}
