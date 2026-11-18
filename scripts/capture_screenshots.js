import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distHtml = path.join(projectRoot, 'dist', 'index.html');
const outputBaseDir = path.join(projectRoot, 'screenshots_for_drive');
const userDataDir = path.join(projectRoot, '.chrome_headless_profile');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const baseFileUrl = 'file:///' + distHtml.replace(/\\/g, '/');

// Clean and prepare output directories
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir, { recursive: true });
}

const screenshotTasks = [
  // ==========================================
  // 1. Home Gateway
  // ==========================================
  {
    folder: '01_Home_Gateway',
    filename: '01_Home_Light_Collapsed.png',
    query: '?theme=light',
    width: 540,
    height: 1040,
    scale: 2
  },
  {
    folder: '01_Home_Gateway',
    filename: '02_Home_Light_Student_Dropdown_Open.png',
    query: '?theme=light&open_student=true',
    width: 540,
    height: 1040,
    scale: 2
  },
  {
    folder: '01_Home_Gateway',
    filename: '03_Home_Dark_Mode.png',
    query: '?theme=dark',
    width: 540,
    height: 1040,
    scale: 2
  },

  // ==========================================
  // 2. CP5 Baseline v1 Before
  // ==========================================
  {
    folder: '02_CP5_Baseline_v1_Before',
    filename: '01_Student_v1_Baseline_List.png',
    query: '?role=student&version=v1&theme=light',
    width: 540,
    height: 1040,
    scale: 2
  },
  {
    folder: '02_CP5_Baseline_v1_Before',
    filename: '02_Log_Request_Modal_RMS_Form.png',
    query: '?role=student&version=v1&modal=submit&theme=light',
    width: 540,
    height: 1040,
    scale: 2
  },

  // ==========================================
  // 3. CP6 Validated v2 After
  // ==========================================
  {
    folder: '03_CP6_Validated_v2_After',
    filename: '01_Student_v2_Improved_Overview.png',
    query: '?role=student&version=v2&theme=light',
    width: 540,
    height: 1040,
    scale: 2
  },
  {
    folder: '03_CP6_Validated_v2_After',
    filename: '02_Student_v2_Delay_and_Two_Way_Gate.png',
    query: '?role=student&version=v2&theme=light',
    width: 540,
    height: 1220,
    scale: 2
  },
  {
    folder: '03_CP6_Validated_v2_After',
    filename: '03_Student_v2_More_Details_Expanded.png',
    query: '?role=student&version=v2&details=5847129&theme=light',
    width: 540,
    height: 1150,
    scale: 2
  },
  {
    folder: '03_CP6_Validated_v2_After',
    filename: '04_Student_v2_Dark_Mode.png',
    query: '?role=student&version=v2&theme=dark',
    width: 540,
    height: 1040,
    scale: 2
  },

  // ==========================================
  // 4. Multi-Stakeholder Dashboards
  // ==========================================
  {
    folder: '04_Multi_Stakeholder_Dashboards',
    filename: '01_Service_Manager_Console.png',
    query: '?role=technician&delay=5847129&theme=light',
    width: 540,
    height: 1080,
    scale: 2
  },
  {
    folder: '04_Multi_Stakeholder_Dashboards',
    filename: '02_Hostel_Warden_Exception_Console.png',
    query: '?role=warden&details=5847129&theme=light',
    width: 540,
    height: 1080,
    scale: 2
  },
  {
    folder: '04_Multi_Stakeholder_Dashboards',
    filename: '03_University_Management_Analytics.png',
    query: '?role=management&block=hostel-b&theme=light',
    width: 540,
    height: 1080,
    scale: 2
  },

  // ==========================================
  // 5. Desktop High-Res Views (1280x900)
  // ==========================================
  {
    folder: '05_Desktop_High_Res',
    filename: '01_Desktop_Home_Gateway.png',
    query: '?theme=light',
    width: 1280,
    height: 900,
    scale: 1.5
  },
  {
    folder: '05_Desktop_High_Res',
    filename: '02_Desktop_Student_v2_Overview.png',
    query: '?role=student&version=v2&theme=light',
    width: 1280,
    height: 900,
    scale: 1.5
  },
  {
    folder: '05_Desktop_High_Res',
    filename: '03_Desktop_Service_Manager.png',
    query: '?role=technician&theme=light',
    width: 1280,
    height: 900,
    scale: 1.5
  },
  {
    folder: '05_Desktop_High_Res',
    filename: '04_Desktop_Hostel_Warden.png',
    query: '?role=warden&theme=light',
    width: 1280,
    height: 900,
    scale: 1.5
  },
  {
    folder: '05_Desktop_High_Res',
    filename: '05_Desktop_University_Management.png',
    query: '?role=management&theme=light',
    width: 1280,
    height: 900,
    scale: 1.5
  }
];

function captureAll() {
  console.log('Starting automated screenshot capture...\n');
  let successCount = 0;

  for (const task of screenshotTasks) {
    const targetDir = path.join(outputBaseDir, task.folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const outPath = path.join(targetDir, task.filename);
    const targetUrl = `${baseFileUrl}${task.query}`;

    process.stdout.write(`Capturing: ${task.folder}/${task.filename} ... `);

    const args = [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--allow-file-access-from-files',
      '--hide-scrollbars',
      `--user-data-dir=${userDataDir}`,
      `--window-size=${task.width},${task.height}`,
      `--force-device-scale-factor=${task.scale}`,
      '--virtual-time-budget=3000',
      `--screenshot=${outPath}`,
      targetUrl
    ];

    try {
      execFileSync(chromePath, args, { stdio: 'pipe' });

      if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
        const stats = fs.statSync(outPath);
        const kb = (stats.size / 1024).toFixed(1);
        console.log(`[OK] (${kb} KB)`);
        successCount++;
      } else {
        console.log(`[FAILED]`);
      }
    } catch (err) {
      console.log(`[ERROR: ${err.message}]`);
    }
  }

  console.log(`\nScreenshot capture finished: ${successCount}/${screenshotTasks.length} successful.`);

  // Cleanup temporary chrome profile
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (e) {
    // ignore
  }
}

captureAll();
