import React, { useState, useEffect } from 'react';
import HomeGateway from './components/HomeGateway';
import Footer from './components/Footer';

// Perspective Dashboards
import StudentDashboard from './components/StudentView/StudentDashboard';
import TechnicianDashboard from './components/TechnicianView/TechnicianDashboard';
import WardenDashboard from './components/WardenView/WardenDashboard';
import ManagementDashboard from './components/ManagementView/ManagementDashboard';

// Modals
import SubmitComplaintModal from './components/Modals/SubmitComplaintModal';
import EscalateModal from './components/Modals/EscalateModal';
import FeedbackModal from './components/Modals/FeedbackModal';
import DesignThinkingModal from './components/Modals/DesignThinkingModal';

import { INITIAL_COMPLAINTS } from './data/initialData';

export default function App() {
  // 0. Deep Linking & Screenshot Automation Helper (handles query search & hash)
  const getParam = (key) => {
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(key)) return urlParams.get(key);
    const hash = window.location.hash.replace(/^#\/?\??/, '');
    const hashParams = new URLSearchParams(hash);
    return hashParams.get(key);
  };

  const initialTheme = getParam('theme') || 'light';
  const initialRole = getParam('role');
  const initialView = initialRole ? 'dashboard' : (getParam('view') || 'home');
  const initialVersion = getParam('version') || 'v2';
  const initialModal = getParam('modal');

  // 1. Theme State: DEFAULT MUST BE "light"
  const [theme, setTheme] = useState(initialTheme);

  // Synchronize data-theme on HTML root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // 2. View Mode ('home' for Gateway screen vs 'dashboard' for role screen)
  const [currentView, setCurrentView] = useState(initialView);

  // 3. Current Stakeholder Role ('student' | 'technician' | 'warden' | 'management')
  const [currentRole, setCurrentRole] = useState(initialRole || 'student');

  // 4. Prototype Version ('v1' Current RMS vs 'v2' Improved RMS)
  const [currentVersion, setCurrentVersion] = useState(initialVersion);

  // 5. Shared Complaint Data
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [selectedComplaintId, setSelectedComplaintId] = useState('5847129');

  // 6. UI Toast notification & Modals
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(initialModal === 'submit');
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(initialModal === 'escalate');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(initialModal === 'feedback');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(initialModal === 'design');
  const [modalTargetComplaintId, setModalTargetComplaintId] = useState(getParam('target_id') || '5847104');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Reset Demo Data
  const handleResetData = () => {
    setComplaints(JSON.parse(JSON.stringify(INITIAL_COMPLAINTS)));
    setSelectedComplaintId('5847129');
    triggerToast("Demo data successfully restored to initial state.");
  };

  const getNowTimestamp = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day} ${month} ${year}, ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Role Selection from Home Gateway
  const handleSelectRole = (roleId) => {
    setCurrentRole(roleId);
    setCurrentView('dashboard');
  };

  // Student Action: Confirm Resolved (FIX-05 -> FIX-08)
  const handleConfirmResolved = (complaintId) => {
    const now = getNowTimestamp();
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          currentStageV2: 'Verified Resolved',
          statusLabelV1: 'Work Done',
          isOpen: false, // Closed!
          studentVerificationStatus: `Confirmed Resolved by Student on ${now}`,
          chronologicalHistory: [
            {
              id: `log-${Date.now()}`,
              timestamp: now,
              actor: "Aditya Gupta",
              actorRole: "Student",
              message: `Student verified physical fix in Room 207 and confirmed resolution. Ticket officially closed.`
            },
            ...c.chronologicalHistory
          ]
        };
      }
      return c;
    }));

    setModalTargetComplaintId(complaintId);
    setIsFeedbackModalOpen(true);
    triggerToast("Resolution confirmed! Feedback loop completed.");
  };

  // Student Action: Report Still Not Resolved (FIX-05)
  const handleReopenComplaint = (complaintId, studentReason) => {
    const now = getNowTimestamp();
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          currentStageV2: 'Reopened — Priority Escalated',
          statusLabelV1: 'Reopened',
          isOpen: true,
          studentVerificationStatus: 'Reopened',
          studentFeedback: studentReason,
          urgency: 'High',
          chronologicalHistory: [
            {
              id: `log-${Date.now()}`,
              timestamp: now,
              actor: "Aditya Gupta",
              actorRole: "Student",
              message: `Student reported issue STILL NOT RESOLVED: "${studentReason}". Re-inspection priority dispatched.`
            },
            ...c.chronologicalHistory
          ]
        };
      }
      return c;
    }));

    triggerToast("Request reopened! Priority alert sent to Maintenance Supervisor & Warden.");
  };

  // Student Action: Escalate to Warden (FIX-07)
  const handleEscalateToWarden = (complaintId, { reason, remarks }) => {
    const now = getNowTimestamp();
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          isEscalatedToWarden: true,
          escalationStatus: `Escalated to Hostel B Warden on ${now} (${reason}). Awaiting supervisory review.`,
          chronologicalHistory: [
            {
              id: `log-${Date.now()}`,
              timestamp: now,
              actor: "Aditya Gupta",
              actorRole: "Student",
              message: `Formally escalated to Hostel B Warden: Reason: "${reason}". Remarks: "${remarks || 'Expedited intervention requested.'}"`
            },
            ...c.chronologicalHistory
          ]
        };
      }
      return c;
    }));

    triggerToast("Grievance escalated to Hostel B Warden Office queue.");
  };

  // Student Action: Feedback Submission (FIX-08)
  const handleFeedbackSubmit = (complaintId, { rating, tags, comment }) => {
    const now = getNowTimestamp();
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          studentRating: rating,
          studentFeedback: comment,
          chronologicalHistory: [
            {
              id: `log-${Date.now()}`,
              timestamp: now,
              actor: "Aditya Gupta",
              actorRole: "Student",
              message: `Student submitted ${rating}/5 rating with feedback: "${comment}". Tags: [${tags.join(', ')}].`
            },
            ...c.chronologicalHistory
          ]
        };
      }
      return c;
    }));

    triggerToast(`Rating (${rating}/5) recorded in LPU RMS.`);
  };

  // Technician Updates (Amit Kumar)
  const handleTechnicianUpdate = (complaintId, update) => {
    const now = getNowTimestamp();
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updated = { ...c };

        if (update.type === 'START_INSPECTION') {
          updated.currentStageV2 = 'In Progress';
          updated.statusLabelV1 = 'In Progress';
        } else if (update.type === 'LOG_DELAY') {
          updated.delayActive = true;
          updated.delayReason = update.delayReason;
          updated.delayLoggedAt = now;
          updated.revisedEstimatedCompletion = `${update.revisedEta} (Estimated)`;
        } else if (update.type === 'MARK_DONE') {
          updated.currentStageV2 = 'Work Done';
          updated.statusLabelV1 = 'Work Done';
          updated.delayActive = false;
          updated.technicianCompletionNote = update.note;
          updated.studentVerificationStatus = 'Pending Confirmation';
        }

        updated.chronologicalHistory = [
          {
            id: `log-${Date.now()}`,
            timestamp: now,
            actor: "Amit Kumar",
            actorRole: "Technician",
            message: update.note
          },
          ...c.chronologicalHistory
        ];

        return updated;
      }
      return c;
    }));
  };

  // Warden Actions
  const handleWardenAction = (complaintId, action) => {
    const now = getNowTimestamp();
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updated = { ...c };

        if (action.type === 'ADD_NOTE') {
          updated.wardenNote = action.note;
          updated.isEscalatedToWarden = true;
        }

        updated.chronologicalHistory = [
          {
            id: `log-${Date.now()}`,
            timestamp: now,
            actor: "Hostel B Warden Desk",
            actorRole: "Warden",
            message: action.auditMessage
          },
          ...c.chronologicalHistory
        ];

        return updated;
      }
      return c;
    }));
  };

  // Register New Complaint (RMS-Maintenance)
  const handleRegisterComplaint = ({ category, title, description, location, urgency }) => {
    const now = getNowTimestamp();
    const newId = (5847130 + complaints.length).toString();

    let unit = "Plumbing Team (Amit Kumar)";
    let tech = "Amit Kumar";
    let techId = "TECH-PL-04";
    let unitScope = "Handles internal room taps, pipelines, flush tanks, and drainage blocks.";

    if (category.includes('Plumbing')) {
      unit = "Plumbing Team (Amit Kumar)";
      tech = "Amit Kumar";
      techId = "TECH-PL-04";
      unitScope = "Handles room taps, health faucets, pipelines, flush tanks, and drainage lines for Hostel Blocks A–C.";
    } else if (category.includes('Electr')) {
      unit = "Electrical Team (Rajesh Verma)";
      tech = "Rajesh Verma";
      techId = "TECH-EL-02";
      unitScope = "Handles room fans, switches, regulators, sockets, tube lights, and distribution boards.";
    } else if (category.includes('Carpentry')) {
      unit = "Carpentry Team (Sukhdev Singh)";
      tech = "Sukhdev Singh";
      techId = "TECH-CP-01";
      unitScope = "Handles study chairs, study tables, bed frames, almirah locks, doors, and window latches.";
    }

    const newComplaint = {
      id: newId,
      rmsCode: `RMS-HTL-${1050 + complaints.length}`,
      category,
      title,
      description,
      location,
      dateFormatted: now,
      submittedOn: now,
      currentStageV2: "Assigned",
      statusLabelV1: "Pending",
      isOpen: true,
      urgency,
      assignedUnit: unit,
      assignedTechnician: tech,
      technicianId: techId,
      unitResponsibilityNote: unitScope,
      assignedTimestamp: now,
      initialEstimatedCompletion: "Tomorrow by 5:00 PM",
      delayActive: false,
      delayReason: null,
      delayLoggedAt: null,
      revisedEstimatedCompletion: "Tomorrow by 5:00 PM (Estimated)",
      nextActionNote: "Assigned to trade unit. Technician scheduled on morning round.",
      escalationStatus: "Within standard 48-hour service window.",
      isEscalatedToWarden: false,
      wardenNote: null,
      studentVerificationStatus: null,
      studentRating: null,
      studentFeedback: null,
      chronologicalHistory: [
        {
          id: `log-${Date.now()}-2`,
          timestamp: now,
          actor: "RMS Dispatcher",
          actorRole: "System",
          message: `Auto-routed to ${unit}. Tech ID: ${techId}.`
        },
        {
          id: `log-${Date.now()}-1`,
          timestamp: now,
          actor: "Aditya Gupta",
          actorRole: "Student",
          message: `Request registered in LPU RMS by Aditya Gupta (${location}).`
        }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);
    setSelectedComplaintId(newId);
    triggerToast(`Request ${newId} logged and routed to ${unit}!`);
  };

  const targetComplaintForModal = complaints.find(c => c.id === (modalTargetComplaintId || selectedComplaintId)) || complaints[0];

  // ========================================================
  // VIEW 1: HOME PERSPECTIVE GATEWAY SCREEN
  // ========================================================
  if (currentView === 'home') {
    return (
      <HomeGateway 
        onSelectRole={handleSelectRole}
        theme={theme}
        setTheme={setTheme}
        currentVersion={currentVersion}
        setCurrentVersion={setCurrentVersion}
        onResetData={handleResetData}
        onOpenDesignModal={() => setIsDesignModalOpen(true)}
        toastMessage={toastMessage}
        initialOpenStudent={getParam('open_student') === 'true'}
      />
    );
  }

  // ========================================================
  // VIEW 2: AUTHENTIC LPU RMS DASHBOARDS (NO DOUBLE HEADERS!)
  // ========================================================
  return (
    <div 
      data-theme={theme}
      className="min-h-screen theme-page-bg flex flex-col justify-between transition-colors duration-150"
    >
      
      <main className="flex-1 w-full">
        {currentRole === 'student' && (
          <StudentDashboard 
            currentVersion={currentVersion}
            setCurrentVersion={setCurrentVersion}
            theme={theme}
            setTheme={setTheme}
            onBackToHome={() => setCurrentView('home')}
            complaints={complaints}
            onConfirmResolved={handleConfirmResolved}
            onReopenComplaint={handleReopenComplaint}
            onOpenEscalateModal={(id) => {
              setModalTargetComplaintId(id);
              setIsEscalateModalOpen(true);
            }}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            initialExpandedId={getParam('details')}
          />
        )}

        {currentRole === 'technician' && (
          <TechnicianDashboard 
            complaints={complaints}
            onTechnicianUpdate={handleTechnicianUpdate}
            theme={theme}
            setTheme={setTheme}
            currentVersion={currentVersion}
            setCurrentVersion={setCurrentVersion}
            onBackToHome={() => setCurrentView('home')}
            initialDelayId={getParam('delay')}
          />
        )}

        {currentRole === 'warden' && (
          <WardenDashboard 
            complaints={complaints}
            onWardenAction={handleWardenAction}
            theme={theme}
            setTheme={setTheme}
            onBackToHome={() => setCurrentView('home')}
            initialExpandedId={getParam('details')}
          />
        )}

        {currentRole === 'management' && (
          <ManagementDashboard 
            theme={theme}
            setTheme={setTheme}
            onBackToHome={() => setCurrentView('home')}
            initialBlockId={getParam('block')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenDesignModal={() => setIsDesignModalOpen(true)} />

      {/* MODALS */}
      <SubmitComplaintModal 
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitComplaint={handleRegisterComplaint}
      />

      <EscalateModal 
        isOpen={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
        complaint={targetComplaintForModal}
        onEscalateSubmit={handleEscalateToWarden}
      />

      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        complaint={targetComplaintForModal}
        onSubmitFeedback={handleFeedbackSubmit}
      />

      <DesignThinkingModal 
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />

    </div>
  );
}
