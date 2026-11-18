export const INITIAL_COMPLAINTS = [
  {
    id: "5847129",
    rmsCode: "RMS-HTL-1047",
    category: "Plumbing",
    title: "Toilet Jet Spray Connection Pipe Leakage - Need New Pipe",
    description: "The flexible connection pipe to the health faucet / jet spray is leaking continuously and flooding the bathroom floor.",
    location: "Hostel B – Room 207",
    dateFormatted: "11/9/2026 3:39:36 AM",
    submittedOn: "11/9/2026 3:39:36 AM",
    // Stages: 'Submitted' | 'Assigned' | 'In Progress' | 'Work Done' | 'Verified Resolved' | 'Reopened'
    currentStageV2: "In Progress",
    statusLabelV1: "In Progress",
    isOpen: true,
    urgency: "Medium",
    assignedUnit: "Plumbing Team (Amit Kumar)",
    assignedTechnician: "Amit Kumar",
    technicianId: "TECH-PL-04",
    unitResponsibilityNote: "Handles room taps, health faucets, pipelines, flush tanks, and drainage lines for Hostel Blocks A–C.",
    assignedTimestamp: "11/9/2026 4:15:00 AM",
    initialEstimatedCompletion: "15 Nov, by 5:00 PM",
    delayActive: true,
    delayReason: "⚠️ Delayed: New connection pipe awaited from store.",
    delayLoggedAt: "11/9/2026 6:20:00 AM",
    revisedEstimatedCompletion: "15 Nov, by 5:00 PM (Estimated)",
    nextActionNote: "Technician Amit Kumar will install new connection pipe once store delivers part.",
    escalationStatus: "Within standard 48-hour SLA. Escalation unlocks if no progress occurs past 15 Nov, 5:00 PM.",
    isEscalatedToWarden: false,
    wardenNote: null,
    studentVerificationStatus: null, // null | 'Pending Confirmation' | 'Confirmed Resolved' | 'Reopened'
    studentRating: null,
    studentFeedback: null,
    chronologicalHistory: [
      {
        id: "log-5847129-4",
        timestamp: "11/9/2026 6:20:00 AM",
        actor: "Amit Kumar (Plumbing Team)",
        actorRole: "Technician",
        message: "Delay logged: New 15mm connection pipe awaited from central maintenance store. Revised window: 15 Nov, 5:00 PM."
      },
      {
        id: "log-5847129-3",
        timestamp: "11/9/2026 5:05:00 AM",
        actor: "Amit Kumar (Plumbing Team)",
        actorRole: "Technician",
        message: "Initial inspection completed. Old braided pipe found rusted and ruptured."
      },
      {
        id: "log-5847129-2",
        timestamp: "11/9/2026 4:15:00 AM",
        actor: "RMS Dispatch Desk",
        actorRole: "System",
        message: "Assigned to Plumbing Team (Amit Kumar - TECH-PL-04)."
      },
      {
        id: "log-5847129-1",
        timestamp: "11/9/2026 3:39:36 AM",
        actor: "Aditya Gupta",
        actorRole: "Student",
        message: "Request registered in LPU RMS via LPU Touch mobile portal."
      }
    ]
  },
  {
    id: "5847104",
    rmsCode: "RMS-HTL-1042",
    category: "Electricity",
    title: "Ceiling Fan Regulator Sparking",
    description: "The fan regulator near bed sparks when rotated and does not increase fan speed beyond level 1.",
    location: "Hostel B – Room 207",
    dateFormatted: "11/8/2026 9:15:45 AM",
    submittedOn: "11/8/2026 9:15:45 AM",
    currentStageV2: "Work Done",
    statusLabelV1: "Work Done",
    isOpen: true, // open until student confirms!
    urgency: "High",
    assignedUnit: "Electrical Team (Rajesh Verma)",
    assignedTechnician: "Rajesh Verma",
    technicianId: "TECH-EL-02",
    unitResponsibilityNote: "Handles room fans, stepped regulators, switches, sockets, and LED tube lights.",
    assignedTimestamp: "11/8/2026 10:30:00 AM",
    initialEstimatedCompletion: "13 Nov, by 3:00 PM",
    delayActive: false,
    delayReason: null,
    delayLoggedAt: null,
    revisedEstimatedCompletion: "13 Nov, by 3:00 PM (Completed at 2:20 PM)",
    technicianCompletionNote: "Replaced faulty stepped resistor regulator and tested fan speeds 1 to 5.",
    nextActionNote: "Technician marked work complete. Awaiting student physical verification in Room 207.",
    escalationStatus: "Work marked completed by technician. Student physical verification pending.",
    isEscalatedToWarden: false,
    wardenNote: null,
    studentVerificationStatus: "Pending Confirmation", // Can be 'Confirmed Resolved' or 'Reopened'
    studentRating: null,
    studentFeedback: null,
    chronologicalHistory: [
      {
        id: "log-5847104-3",
        timestamp: "11/8/2026 2:20:00 PM",
        actor: "Rajesh Verma (Electrical Team)",
        actorRole: "Technician",
        message: "Marked Work Done: Replaced faulty stepped regulator. Awaiting student physical confirmation."
      },
      {
        id: "log-5847104-2",
        timestamp: "11/8/2026 10:30:00 AM",
        actor: "RMS Dispatch Desk",
        actorRole: "System",
        message: "Assigned to Electrical Team (Rajesh Verma - TECH-EL-02)."
      },
      {
        id: "log-5847104-1",
        timestamp: "11/8/2026 9:15:45 AM",
        actor: "Aditya Gupta",
        actorRole: "Student",
        message: "Request registered in LPU RMS."
      }
    ]
  },
  {
    id: "5847088",
    rmsCode: "RMS-HTL-1018",
    category: "Carpentry",
    title: "Study Chair Backrest Loose",
    description: "One screw on the study chair backrest has come off and table drawer channel is jammed.",
    location: "Hostel B – Room 207",
    dateFormatted: "11/7/2026 8:30:10 AM",
    submittedOn: "11/7/2026 8:30:10 AM",
    currentStageV2: "Assigned",
    statusLabelV1: "Pending", // classic vague label in v1
    isOpen: true,
    urgency: "Low",
    assignedUnit: "Carpentry Team (Sukhdev Singh)",
    assignedTechnician: "Sukhdev Singh",
    technicianId: "TECH-CP-01",
    unitResponsibilityNote: "Handles study chairs, study tables, bed frames, almirah locks, doors, and window latches.",
    assignedTimestamp: "11/7/2026 10:00:00 AM",
    initialEstimatedCompletion: "16 Nov, by 5:00 PM",
    delayActive: false,
    delayReason: null,
    delayLoggedAt: null,
    revisedEstimatedCompletion: "16 Nov, by 5:00 PM (Estimated)",
    nextActionNote: "Carpentry unit morning route scheduled.",
    escalationStatus: "Within standard 48-hour service window.",
    isEscalatedToWarden: false,
    wardenNote: null,
    studentVerificationStatus: null,
    studentRating: null,
    studentFeedback: null,
    chronologicalHistory: [
      {
        id: "log-5847088-2",
        timestamp: "11/7/2026 10:00:00 AM",
        actor: "Carpentry Dispatch Desk",
        actorRole: "System",
        message: "Assigned to Carpentry Team (Sukhdev Singh - TECH-CP-01). Estimated visit: 16 Nov by 5:00 PM."
      },
      {
        id: "log-5847088-1",
        timestamp: "11/7/2026 8:30:10 AM",
        actor: "Aditya Gupta",
        actorRole: "Student",
        message: "Request registered in LPU RMS."
      }
    ]
  },
  {
    id: "5807500",
    rmsCode: "RMS-HTL-1032",
    category: "Electricity",
    title: "Bathroom Tube Light Flickering",
    description: "LED batten above the washbasin mirror flickers continuously.",
    location: "Hostel B – Room 207",
    dateFormatted: "11/5/2026 4:10:22 PM",
    submittedOn: "11/5/2026 4:10:22 PM",
    currentStageV2: "Verified Resolved",
    statusLabelV1: "Work Done",
    isOpen: false, // Closed!
    urgency: "Medium",
    assignedUnit: "Electrical Team (Rajesh Verma)",
    assignedTechnician: "Rajesh Verma",
    technicianId: "TECH-EL-02",
    unitResponsibilityNote: "Handles room fans, switches, regulators, sockets, tube lights, and distribution boards.",
    assignedTimestamp: "11/5/2026 5:00:00 PM",
    initialEstimatedCompletion: "09 Nov, by 2:00 PM",
    delayActive: false,
    delayReason: null,
    delayLoggedAt: null,
    revisedEstimatedCompletion: "09 Nov, by 2:00 PM (Closed)",
    technicianCompletionNote: "Replaced 20W LED batten.",
    nextActionNote: "Request fully verified and closed by student.",
    escalationStatus: "Resolved and verified by student.",
    isEscalatedToWarden: false,
    wardenNote: null,
    studentVerificationStatus: "Confirmed Resolved by Student on 11/6/2026",
    studentRating: 5,
    studentFeedback: "Fast fix and polite technician.",
    chronologicalHistory: [
      {
        id: "log-5807500-3",
        timestamp: "11/6/2026 1:30:00 PM",
        actor: "Aditya Gupta",
        actorRole: "Student",
        message: "Student confirmed physical resolution and submitted 5/5 rating. Ticket officially closed."
      },
      {
        id: "log-5807500-2",
        timestamp: "11/6/2026 12:15:00 PM",
        actor: "Rajesh Verma (Electrical Team)",
        actorRole: "Technician",
        message: "Marked Work Done: Replaced 20W LED batten."
      },
      {
        id: "log-5807500-1",
        timestamp: "11/5/2026 4:10:22 PM",
        actor: "Aditya Gupta",
        actorRole: "Student",
        message: "Request registered in LPU RMS."
      }
    ]
  }
];

export const CAMPUS_MANAGEMENT_DATA = {
  overallSlaResolutionRate: 84, // percentage
  avgFirstResponseTime: "1.8 hrs",
  studentVerifiedClosureRate: 92, // percentage
  activeSparePartDelaysRate: 14, // percentage
  totalHostelCapacity: "14,800 Students",
  totalMonthlyComplaints: 1248,
  resolvedThisMonth: 1120,
  hostelBlockComparison: [
    {
      id: "hostel-a",
      block: "Hostel A (Boys Senior)",
      rooms: 380,
      activeComplaints: 8,
      avgTurnaround: "14.2 hrs",
      slaCompliance: 89,
      studentSatisfaction: 4.3,
      primaryTradeLoad: "Electrical (44%)",
      plumbingBreakdown: "4 active · Avg 15h",
      electricalBreakdown: "3 active · Avg 12h",
      carpentryBreakdown: "1 active · Avg 18h"
    },
    {
      id: "hostel-b",
      block: "Hostel B (Boys Sophomore - Focus Block)",
      rooms: 420,
      activeComplaints: 14,
      avgTurnaround: "18.5 hrs",
      slaCompliance: 81,
      studentSatisfaction: 3.9,
      primaryTradeLoad: "Plumbing (52%)",
      plumbingBreakdown: "8 active · Avg 22h (Store delay hotspot)",
      electricalBreakdown: "4 active · Avg 14h",
      carpentryBreakdown: "2 active · Avg 16h"
    },
    {
      id: "hostel-c",
      block: "Hostel C (Boys Freshman)",
      rooms: 340,
      activeComplaints: 5,
      avgTurnaround: "12.8 hrs",
      slaCompliance: 93,
      studentSatisfaction: 4.6,
      primaryTradeLoad: "Carpentry (38%)",
      plumbingBreakdown: "2 active · Avg 11h",
      electricalBreakdown: "1 active · Avg 10h",
      carpentryBreakdown: "2 active · Avg 14h"
    },
    {
      id: "girls-block-1",
      block: "Girls Hostel Block 1",
      rooms: 460,
      activeComplaints: 6,
      avgTurnaround: "11.4 hrs",
      slaCompliance: 95,
      studentSatisfaction: 4.7,
      primaryTradeLoad: "Electrical (41%)",
      plumbingBreakdown: "2 active · Avg 9h",
      electricalBreakdown: "3 active · Avg 11h",
      carpentryBreakdown: "1 active · Avg 12h"
    }
  ],
  delayRootCauses: [
    {
      driver: "Central Store Spare Part Restock",
      percentage: 42,
      note: "Brass ceramic cartridges, flexible jet pipes, 20W LED batten drivers, fan step regulators"
    },
    {
      driver: "Student Room Unavailability / Locked Door",
      percentage: 28,
      note: "Students away at academic blocks / lectures during technician morning rounds"
    },
    {
      driver: "Multi-Trade Cross Coordination Needed",
      percentage: 18,
      note: "Concealed wall seepage affecting electrical conduit wiring"
    },
    {
      driver: "Emergency Campus Priority Diversions",
      percentage: 12,
      note: "Main water feeder or transformer trip requiring immediate crew redeployment"
    }
  ],
  infrastructureHotspot: {
    location: "Hostel B – 2nd Floor (Rooms 201–215)",
    component: "15mm Plumbing Brass Cartridges & Jet Spray Water Pressure",
    recommendation: "Bulk replace 45 aging valve cartridges and install pressure regulator valve.",
    estimatedCost: "₹18,500 (Pre-approved under Hostel B Facility Budget)"
  }
};

export const DESIGN_THINKING_ANNOTATIONS = {
  "FIX-01": {
    code: "FIX-01",
    title: "4-Stage Visual Status Stepper",
    psychology: "Eliminates ambiguity by replacing opaque 'Pending' with clear stages: Submitted → Assigned → In Progress → Verified Resolved.",
    issueRef: "ISS-01: 'Pending' status caused 68% of student anxiety and duplicate complaints."
  },
  "FIX-02": {
    code: "FIX-02 / RES-01",
    title: "Assignment & Ownership Card",
    psychology: "Establishes institutional accountability. Shows exactly which team, technician, and scope owns the repair.",
    issueRef: "ISS-02: Students didn't know whether plumbing, electricity, or carpentry handled their ticket."
  },
  "FIX-03": {
    code: "FIX-03 / RES-02",
    title: "Framed Completion Estimate Window",
    psychology: "Psychologically frames the resolution date as an 'Estimated Window' with explicit revision timestamp rather than an unkept false promise.",
    issueRef: "ISS-03: Fixed false deadlines broke trust when unexpected emergencies occurred."
  },
  "FIX-04": {
    code: "FIX-04",
    title: "Transparent Delay Alert Banner",
    psychology: "Proactively explains the physical cause of delays (e.g. 15mm ceramic disc awaited from store), preventing students from re-registering duplicates.",
    issueRef: "ISS-04: Silence during delays created belief that maintenance forgot the complaint."
  },
  "FIX-05": {
    code: "FIX-05",
    title: "Two-Way Resolution Confirmation Gate",
    psychology: "Prevents unilateral premature closing by technicians. Shifts power to the student to physically confirm or reject the repair.",
    issueRef: "ISS-05: False closures ('Ghost resolutions') forced students to open redundant new tickets."
  },
  "FIX-06": {
    code: "FIX-06",
    title: "Chronological Audit Trail with Exact Timestamps",
    psychology: "Provides complete transparent visibility into who touched the ticket, when, and what changed.",
    issueRef: "ISS-06: Black-box status changes left students feeling helpless."
  },
  "FIX-07": {
    code: "FIX-07 / RES-03",
    title: "Policy-Approved Warden Escalation",
    psychology: "Replaces unguided panic calls to warden with an objective, rules-based escalation path.",
    issueRef: "ISS-07: Ineffective escalation channels swamped warden office with routine complaints."
  },
  "FIX-08": {
    code: "FIX-08",
    title: "Post-Verification Feedback & Rating",
    psychology: "Closes the emotional loop by letting students rate service and leave remarks once physically verified.",
    issueRef: "User satisfaction feedback loop"
  }
};
