/* =============================================
   SUHAIL — DEVELOPER LABORATORY PORTFOLIO
   App Logic: 3D Flips, Skill Filters, Project Modal, CLI Terminal
   ============================================= */

'use strict';

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let currentPage    = 0;
const TOTAL_PAGES  = 6; // 0:Cover, 1:About, 2:Skills, 3:Featured, 4:Showcase, 5:Roadmap & CLI
let isAnimating    = false;
let mouseX = 0, mouseY = 0;

const PAGE_NAMES = [
  'Cover',
  '01 About',
  '02 Skills',
  '03 Featured',
  '04 Showcase',
  '05 Roadmap & CLI'
];

// ─────────────────────────────────────────────
// PROJECT MODAL DATA ENGINE
// ─────────────────────────────────────────────
const PROJECT_DATA = {
  glassmessaging: {
    title: "GlassMessaging",
    category: "Android / Messaging / Cloud Backend",
    description: "GlassMessaging is an Android messaging project focused on building a modern communication experience with cloud-backed authentication and data management. The project uses Supabase for backend functionality and explores user authentication, database operations, messaging workflows, and Android application development.",
    concepts: [
      "User Registration & Login Authentication",
      "User Profiles & Account Management",
      "Database Storage & Schema Design",
      "Real-time Message Sending & Retrieval",
      "Updating and Deleting Data (CRUD Operations)",
      "Supabase REST API & Real-time Integration"
    ],
    flow: "Android ➔ Supabase Backend ➔ Cloud Database ➔ Auth ➔ Messaging",
    tags: ["Android", "Sketchware Pro", "Supabase", "SQL", "Authentication", "CRUD", "REST API"]
  },
  storagerecovery: {
    title: "Storage Recovery & Analysis Tool",
    category: "Python / Storage Systems / System Programming",
    description: "A Python-based storage analysis and recovery project that explores low-level disk operations, partition detection, file-system identification, and storage-device analysis through a graphical interface built with Tkinter.",
    concepts: [
      "Storage-device detection & Disk Scanning",
      "Partition Table Scanning & MBR Parsing",
      "Raw Sector Reading & Binary Analysis",
      "File-System Signature Detection (NTFS, FAT32, exFAT)",
      "System Programming with WMI and psutil in Python",
      "Graphical User Interface (GUI) Development"
    ],
    flow: "Python Script ➔ WMI / psutil ➔ Disk Storage ➔ Raw Sectors ➔ GUI Analysis",
    tags: ["Python", "Tkinter", "WMI", "psutil", "Storage Systems", "MBR Parsing", "File Systems"]
  },
  cyberlab: {
    title: "Cybersecurity & Ethical Hacking Lab",
    category: "Security / Linux / Network Analysis",
    description: "A personal cybersecurity learning lab used to explore Linux, networking, network discovery, vulnerability assessment, and security-testing tools in controlled, isolated laboratory environments.",
    concepts: [
      "Network Discovery & Host Reconnaissance",
      "Port Scanning & Service Enumeration (Nmap)",
      "Vulnerability Scanning & Assessment (Nessus, Shodan)",
      "Exploitation Workflows & Security Testing (Metasploit)",
      "Linux System Administration & Security (Kali Linux)",
      "Virtual Network Isolation & NAT/Bridged VMs (VirtualBox)"
    ],
    flow: "VirtualBox Lab ➔ Kali Linux ➔ Target VM ➔ Nmap / Metasploit ➔ Vulnerability Report",
    tags: ["Kali Linux", "VirtualBox", "Nmap", "Metasploit", "Nessus", "Shodan", "Ethical Hacking"]
  },
  supabaseandroid: {
    title: "Supabase Android Applications",
    category: "Android / Cloud Database Integration",
    description: "Hands-on application development connecting Android apps to Supabase to implement complete cloud database functionality, authentication, and structured API queries.",
    concepts: [
      "Supabase Project Configuration (URL & API Key setup)",
      "User Signup & Login Authentication Workflows",
      "GET, INSERT, UPDATE, DELETE (CRUD) Operations",
      "Database Querying & Schema Integration",
      "Cloud Data Storage & User Data Management"
    ],
    flow: "Android App ➔ Supabase Client ➔ Cloud PostgreSQL ➔ Auth & CRUD",
    tags: ["Android", "Sketchware Pro", "Supabase", "SQL", "REST APIs", "Cloud DB"]
  },
  chatzonee: {
    title: "ChatZonee",
    category: "Web Application / Communication",
    description: "ChatZonee is a web-based communication project exploring the development of interactive chat functionality, frontend interfaces, backend logic, and data handling.",
    concepts: [
      "Interactive Chat Interface Design",
      "PHP Backend Data Processing & Handling",
      "Database Message Storage & Retrieval",
      "User Sessions & Message State Management"
    ],
    flow: "Frontend UI ➔ PHP Backend ➔ MySQL/SQL DB ➔ Real-time Chat",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "Database", "Chat App"]
  },
  ecommerce: {
    title: "E-Commerce Shopping Website",
    category: "React / E-Commerce / Supabase",
    description: "A modern shopping website project connected with Supabase for product management, user authentication, and responsive shopping interface.",
    concepts: [
      "Dynamic Product Listings & Catalog",
      "Database Integration & Product Data CRUD",
      "User Authentication & Account Management",
      "Responsive Frontend UI Design"
    ],
    flow: "React Frontend ➔ Supabase API ➔ SQL Database ➔ Responsive Cart",
    tags: ["HTML", "CSS", "JavaScript", "React", "Supabase", "SQL"]
  },
  selenium: {
    title: "Selenium Automation Projects",
    category: "Python / Automation / Web Interaction",
    description: "Browser automation projects leveraging Python and Selenium WebDriver to build automated workflows and web interactions.",
    concepts: [
      "Selenium WebDriver Configuration",
      "Browser Automation & Scripting",
      "DOM Element Identification & Interaction",
      "Automated Workflow Execution"
    ],
    flow: "Python Script ➔ Selenium WebDriver ➔ Browser Engine ➔ Automated Task",
    tags: ["Python", "Selenium", "WebDriver", "Browser Automation"]
  },
  aimodels: {
    title: "AI Model Experiments",
    category: "AI / Machine Learning / LLM Deployment",
    description: "Exploration of open-source coding models and cloud AI environments for model testing and deployment.",
    concepts: [
      "Coding AI Models (Qwen2.5-Coder-3B/7B, DeepSeek Coder 6.7B)",
      "Hugging Face & Transformers Framework",
      "Deploying AI Models in Cloud Envs (Kaggle, Gradio)",
      "AI-assisted Programming & Local AI Tools"
    ],
    flow: "Hugging Face / Transformers ➔ Cloud GPUs / Kaggle ➔ Gradio UI",
    tags: ["Qwen2.5", "DeepSeek", "Hugging Face", "Transformers", "Kaggle", "Gradio"]
  },
  electronics: {
    title: "Electronics & Mini Li-ion UPS",
    category: "Hardware / Electronics / Power Management",
    description: "Practical electronics experiments focused on power regulation, lithium-ion battery management, and microcontroller circuits.",
    concepts: [
      "Mini Li-ion UPS Circuit with Charging Module",
      "Low-Voltage Regulator (converting 3.0-4.2V to target electronics)",
      "Battery Protection & Load Management",
      "Microcontroller Experiments (ESP32, Arduino, CH341A)"
    ],
    flow: "Li-ion Cell (3.0-4.2V) ➔ Charging Module ➔ Voltage Regulator ➔ Microcontroller / Load",
    tags: ["Li-ion", "UPS", "Voltage Regulators", "ESP32", "Arduino", "CH341A"]
  },
  networking: {
    title: "Networking Lab & Connectivity Experiments",
    category: "Networking / Systems / Virtualization",
    description: "Hands-on experience with real-world connectivity, DNS routing, VirtualBox networking modes, and network scanning tools.",
    concepts: [
      "TCP/IP, IPv4, IPv6, DNS & TCP Connectivity",
      "Router Configuration & NAT / Bridged Virtual Networking",
      "Network Scanning & Diagnostic Commands (ping, tracert, nslookup, curl)",
      "Troubleshooting Virtual Machine Network Adapters"
    ],
    flow: "VM Host ➔ VirtualBox Bridged Net ➔ Router NAT ➔ Network Diagnostics",
    tags: ["TCP/IP", "DNS", "IPv4/v6", "NAT", "VirtualBox", "ping", "tracert"]
  }
};

// ─────────────────────────────────────────────
// DOM REFS
// ─────────────────────────────────────────────
const pages           = Array.from(document.querySelectorAll('.page'));
const prevBtn         = document.getElementById('prev-btn');
const nextBtn         = document.getElementById('next-btn');
const currentPageNum  = document.getElementById('current-page-num');
const pills           = Array.from(document.querySelectorAll('.pill'));
const loadingScreen   = document.getElementById('loading-screen');
const notebookWrapper = document.getElementById('notebook-wrapper');
const openNotebookBtn = document.getElementById('open-notebook-btn');
const sendBtn         = document.getElementById('send-msg-btn');
const sendSuccess     = document.getElementById('send-success');
const skillBars       = document.querySelectorAll('.skill-bar-fill');
const modalOverlay    = document.getElementById('project-modal');
const modalContent    = document.getElementById('modal-content');

const bgMusicAudio    = document.getElementById('bg-music');
const pageFlipAudio   = document.getElementById('page-flip-audio');
const typingAudio     = document.getElementById('typing-audio');

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  spawnParticles();
  initParallax();
  updateNavState();
  setupPills();
  setupSkillFilters();
  setupTerminal();

  // Audio start gesture
  const startAudioOnInteraction = () => {
    if (bgMusicAudio) {
      bgMusicAudio.volume = 0.15;
      bgMusicAudio.play().catch(() => {});
    }
    window.removeEventListener('click', startAudioOnInteraction);
    window.removeEventListener('keydown', startAudioOnInteraction);
    window.removeEventListener('touchstart', startAudioOnInteraction);
  };
  window.addEventListener('click', startAudioOnInteraction);
  window.addEventListener('keydown', startAudioOnInteraction);
  window.addEventListener('touchstart', startAudioOnInteraction);

  // Hide loading screen
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    setTimeout(() => { loadingScreen.style.display = 'none'; }, 700);

    notebookWrapper.style.opacity = '0';
    notebookWrapper.style.transform = 'translateY(30px) rotateX(6deg)';
    notebookWrapper.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.34,1.56,0.64,1)';
    requestAnimationFrame(() => {
      setTimeout(() => {
        notebookWrapper.style.opacity = '1';
        notebookWrapper.style.transform = '';
      }, 50);
    });
  }, 1800);

  // Open btn
  if (openNotebookBtn) {
    openNotebookBtn.addEventListener('click', () => { flipToPage(1); });
  }

  // Navigation
  prevBtn.addEventListener('click', () => { if (!isAnimating) flipToPage(currentPage - 1); });
  nextBtn.addEventListener('click', () => { if (!isAnimating) flipToPage(currentPage + 1); });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (isAnimating || modalOverlay.classList.contains('hidden') === false) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') flipToPage(currentPage + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   flipToPage(currentPage - 1);
  });

  // Send message form
  if (sendBtn) {
    sendBtn.addEventListener('click', handleSend);
  }

  initSwipeGesture();
});

// ─────────────────────────────────────────────
// PAGE FLIP ENGINE
// ─────────────────────────────────────────────
function flipToPage(targetIndex) {
  if (targetIndex < 0 || targetIndex >= TOTAL_PAGES) return;
  if (targetIndex === currentPage || isAnimating) return;

  isAnimating = true;
  const direction = targetIndex > currentPage ? 'forward' : 'back';

  playPageFlipSound();

  pages.forEach((p, idx) => {
    if (idx === targetIndex) p.style.zIndex = '15';
    else if (idx === currentPage) p.style.zIndex = '30';
    else if (idx < currentPage) p.style.zIndex = `${10 - (currentPage - idx)}`;
    else p.style.zIndex = `${10 - (idx - currentPage)}`;
  });

  if (direction === 'forward') {
    pages[targetIndex].classList.add('active');
    for (let i = currentPage; i < targetIndex; i++) {
      const page = pages[i];
      const delay = (i - currentPage) * 70;
      setTimeout(() => {
        page.classList.remove('active');
        page.classList.add('flipping-forward');
        page.addEventListener('animationend', () => {
          page.classList.remove('flipping-forward');
          page.classList.add('flipped');
        }, { once: true });
      }, delay);
    }
  } else {
    pages[targetIndex].classList.add('active');
    for (let i = currentPage - 1; i >= targetIndex; i--) {
      const page = pages[i];
      const delay = (currentPage - 1 - i) * 70;
      setTimeout(() => {
        page.classList.remove('flipped');
        page.classList.add('flipping-back');
        page.addEventListener('animationend', () => {
          page.classList.remove('flipping-back');
        }, { once: true });
      }, delay);
    }
  }

  const transitionDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--page-transition')) * 1000;
  const totalDelay = transitionDuration + Math.abs(targetIndex - currentPage) * 70;

  setTimeout(() => {
    currentPage = targetIndex;
    pages.forEach((p, i) => {
      p.style.zIndex = '';
      p.classList.remove('active', 'flipping-forward', 'flipping-back');
      if (i < currentPage) p.classList.add('flipped');
      else if (i === currentPage) p.classList.add('active');
      else p.classList.remove('flipped');
    });
    updateNavState();
    isAnimating = false;

    if (currentPage === 2) animateSkillBars();
  }, totalDelay);
}

// ─────────────────────────────────────────────
// NAV STATE & PILLS
// ─────────────────────────────────────────────
function updateNavState() {
  prevBtn.disabled = currentPage <= 0;
  nextBtn.disabled = currentPage >= TOTAL_PAGES - 1;
  currentPageNum.textContent = PAGE_NAMES[currentPage];

  pills.forEach((pill, i) => {
    pill.classList.toggle('active', i === currentPage);
  });
}

function setupPills() {
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const target = parseInt(pill.dataset.target, 10);
      if (!isAnimating) flipToPage(target);
    });
  });
}

// ─────────────────────────────────────────────
// SKILL FILTERS & BARS
// ─────────────────────────────────────────────
function setupSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const categories = document.querySelectorAll('.skill-category');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      categories.forEach(cat => {
        if (filter === 'all' || cat.dataset.cat === filter) {
          cat.classList.remove('hidden');
        } else {
          cat.classList.add('hidden');
        }
      });
    });
  });
}

function animateSkillBars() {
  skillBars.forEach(bar => bar.classList.add('animated'));
}

// ─────────────────────────────────────────────
// PROJECT MODAL HANDLERS
// ─────────────────────────────────────────────
window.openProjectModal = function(projId) {
  const data = PROJECT_DATA[projId];
  if (!data) return;

  modalContent.innerHTML = `
    <h3 class="modal-title">${data.title}</h3>
    <div class="modal-cat">${data.category}</div>
    <p class="modal-desc">${data.description}</p>
    
    <div class="modal-section-title">Core Architecture &amp; Workflow</div>
    <div class="concept-flow" style="margin-bottom: 12px;">${data.flow}</div>
    
    <div class="modal-section-title">Key Concepts Explored</div>
    <ul class="modal-concepts-list">
      ${data.concepts.map(c => `<li>${c}</li>`).join('')}
    </ul>

    <div class="modal-section-title" style="margin-top: 14px;">Technologies Used</div>
    <div class="modal-tags">
      ${data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
    </div>
  `;

  modalOverlay.classList.remove('hidden');
};

window.closeProjectModal = function() {
  modalOverlay.classList.add('hidden');
};

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeProjectModal();
});

// ─────────────────────────────────────────────
// TERMINAL CLI EMULATOR
// ─────────────────────────────────────────────
function setupTerminal() {
  const termInput = document.getElementById('terminal-input');
  if (!termInput) return;

  termInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = termInput.value.trim();
      if (cmd) {
        runTermCmd(cmd);
        termInput.value = '';
      }
    }
  });
}

window.runTermCmd = function(cmd) {
  const output = document.getElementById('terminal-output');
  if (!output) return;

  const cmdLower = cmd.toLowerCase().trim();

  // Print command line
  const cmdLine = document.createElement('div');
  cmdLine.className = 'term-line';
  cmdLine.innerHTML = `<span class="term-prompt">suhail@dev-lab:~$</span> ${cmd}`;
  output.appendChild(cmdLine);

  let resp = '';
  if (cmdLower === 'help') {
    resp = "Available commands: 'whoami', 'skills', 'projects', 'roadmap', 'contact', 'clear'";
  } else if (cmdLower === 'whoami') {
    resp = "Suhail — Computer Science Student | Software Developer | Android & Web Developer | Cybersecurity Enthusiast.\nPhilosophy: Learn. Build. Experiment. Understand. Improve.";
  } else if (cmdLower === 'skills') {
    resp = "Languages: Python, Java, C, C++, JS, TS, PHP, SQL | Mobile: Android Studio, Java, Flutter, Supabase | Security: Kali Linux, Nmap, Metasploit, Nessus | AI: Qwen2.5, DeepSeek";
  } else if (cmdLower === 'projects') {
    resp = "Featured: GlassMessaging, Storage Recovery Tool, Cybersecurity Lab, Supabase Android Apps.\nShowcase: ChatZonee, E-Commerce Site, Selenium Automation, AI Experiments, Electronics & Mini UPS, Networking Lab.";
  } else if (cmdLower === 'roadmap') {
    resp = "Programming: Python->Java->C->C++->JS->TS->PHP\nDev: Web->Android->Flutter->Backend->DB->Cloud\nSecurity: Linux->Net->Nmap->Vuln->Hacking\nAI: Models->Transformers->Apps\nSystems: Hardware->Linux->Net->Storage";
  } else if (cmdLower === 'contact') {
    resp = "Email: suhail@example.com | GitHub: github.com/suhail | LinkedIn: linkedin.com/in/suhail | Twitter: @suhail_dev";
  } else if (cmdLower === 'clear') {
    output.innerHTML = '';
    return;
  } else {
    resp = `Command not recognized: '${cmd}'. Type 'help' for options.`;
  }

  const respLine = document.createElement('div');
  respLine.className = 'term-line term-out';
  respLine.innerText = resp;
  output.appendChild(respLine);

  output.scrollTop = output.scrollHeight;
};

// ─────────────────────────────────────────────
// AUDIO & PARALLAX UTILS
// ─────────────────────────────────────────────
function playPageFlipSound() {
  if (pageFlipAudio) {
    pageFlipAudio.currentTime = 0;
    pageFlipAudio.volume = 0.4;
    pageFlipAudio.play().catch(() => {});
  }
}

function handleSend() {
  const name = document.getElementById('contact-name').value.trim();
  const msg  = document.getElementById('contact-msg').value.trim();

  if (!name || !msg) {
    alert("Please fill in your name and message!");
    return;
  }

  sendSuccess.classList.remove('hidden');
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-msg').value = '';

  setTimeout(() => {
    sendSuccess.classList.add('hidden');
  }, 4000);
}

function initParallax() {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    mouseX = (e.clientX - cx) / cx;
    mouseY = (e.clientY - cy) / cy;

    const rotX = mouseY * -5;
    const rotY = mouseX *  7;
    const tx   = mouseX * 8;
    const ty   = mouseY * 5;

    notebookWrapper.style.transform = `translate(${tx}px, ${ty}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    notebookWrapper.style.transform = '';
  });
}

function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 25;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const dur  = Math.random() * 15 + 10;
    const del  = Math.random() * -20;
    const dx   = (Math.random() - 0.5) * 2;

    Object.assign(p.style, {
      width:  `${size}px`,
      height: `${size}px`,
      left:   `${left}%`,
      bottom: `${Math.random() * 20}%`,
      animationDuration: `${dur}s`,
      animationDelay: `${del}s`,
      '--dx': dx,
      '--op': Math.random() * 0.5 + 0.2,
    });

    container.appendChild(p);
  }
}

function initSwipeGesture() {
  let touchStartX = 0;
  let touchEndX   = 0;

  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0 && !isAnimating) flipToPage(currentPage + 1);
      if (diff > 0 && !isAnimating) flipToPage(currentPage - 1);
    }
  }
}
