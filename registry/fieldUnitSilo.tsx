import React from 'react';
import { 
  FileJson, FileCode, Search, Fingerprint, Eye, 
  Scale, ShieldX, Skull, AlertOctagon, Clipboard, Activity, ShieldCheck,
  Shield, Zap, Layers, Smartphone, Radar, Ghost, BrainCircuit, Layout
} from 'lucide-react';

export interface ManifestFile {
  path: string;
  icon: React.ReactNode;
  type: string;
  content: string;
}

export const SILO_MANIFEST: ManifestFile[] = [
  {
    path: 'manifest.json',
    icon: <FileJson size={14} />,
    type: 'VIG-MANIFEST-v4',
    content: `{
  "manifest_version": 3,
  "name": "VIGIL | Field Unit",
  "version": "0.0.4.0",
  "description": "Layer 0.5 Security Standard. Modular HUD Architecture v2.",
  "permissions": [
    "storage",
    "scripting"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "action": {
    "default_popup": "popup/popup.html"
  },
  "background": {
    "service_worker": "background/serviceWorker.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content/retinalShield.js"],
      "run_at": "document_start"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["core/*.js", "popup/*.css", "content/ui/*.js"],
      "matches": ["<all_urls>"]
    }
  ]
}`
  },
  {
    path: 'background/serviceWorker.js',
    icon: <FileCode size={14} />,
    type: 'JS_SERVICE_WORKER',
    content: `// VIGIL BACKGROUND GUARDIAN
// VERSION: 0.0.4.0
// PERSISTENT_SECURITY_SERVICE

chrome.runtime.onInstalled.addListener(() => {
  console.log("[VIGIL] Persistent Guardian Layer 0.5 initialized.");
});

// Listening for security events from the Field Units
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'THREAT_DETECTED') {
    console.warn(\`[VIGIL] Security Event: \${message.payload.verdict} in tab \${sender.tab.id}\`);
  }
});`
  },
  {
    path: 'content/retinalShield.js',
    icon: <Shield size={14} />,
    type: 'JS_DISPATCHER',
    content: `// VIGIL FIELD UNIT: TACTICAL DISPATCHER
// VERSION: 0.0.4.0
// COMPONENT: CONTENT_DISPATCHER

(async function() {
  const validatorSrc = chrome.runtime.getURL('core/addressValidator.js');
  const indexerSrc = chrome.runtime.getURL('core/threatIndex.js');
  
  const { isValidSolanaAddress } = await import(validatorSrc);
  const { calculateCompositeThreat, getAxesFromVerdict } = await import(indexerSrc);

  const TRUSTED_NODES = [
    'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90',
    'EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3',
    'Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i'
  ];

  async function analyzeAddress(addr) {
    const data = await chrome.storage.local.get(['VIG_USER_TRUSTED_NODES']);
    const userWhiteslist = data.VIG_USER_TRUSTED_NODES || [];
    
    if (TRUSTED_NODES.includes(addr) || userWhiteslist.includes(addr)) return 'TRUSTED';
    const collision = TRUSTED_NODES.find(t => addr.slice(0, 4) === t.slice(0, 4) && addr.slice(-4) === t.slice(-4));
    if (collision) return 'POISON';
    if (/(.)\\1{5,}/.test(addr)) return 'SPOOF';
    if (addr.toUpperCase().startsWith('DEFI') || addr.toUpperCase().startsWith('CEX')) return 'SIMILARITY';
    return 'NEW';
  }

  async function dispatchHUD(address) {
    if (document.getElementById('vigil-hud-root')) return;

    const verdict = await analyzeAddress(address);
    const axes = getAxesFromVerdict(verdict);
    const index = calculateCompositeThreat(axes);

    // DYNAMIC IMPORT OF MODULAR HUD
    const moduleName = \`Alert\${verdict.charAt(0) + verdict.slice(1).toLowerCase()}.js\`;
    const moduleSrc = chrome.runtime.getURL(\`content/ui/\${moduleName}\`);
    
    try {
      const { render } = await import(moduleSrc);
      render(address, index);
    } catch (e) {
      console.error(\`[VIGIL] Failed to dispatch HUD module: \${moduleName}\`, e);
    }
  }

  document.addEventListener('copy', (e) => {
    const text = window.getSelection().toString().trim();
    if (isValidSolanaAddress(text)) {
      dispatchHUD(text);
    }
  });

  console.log("[VIGIL] Tactical Dispatcher v0.0.4.0 active.");
})();`
  },
  {
    path: 'core/addressValidator.js',
    icon: <FileCode size={14} />,
    type: 'JS_CORE_VAL',
    content: `// VIGIL CORE: ADDRESS VALIDATOR
// Mathematical Primitive

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function isValidSolanaAddress(address) {
  if (!address || typeof address !== 'string') return false;
  if (address.length < 32 || address.length > 44) return false;
  for (let i = 0; i < address.length; i++) {
    if (!BASE58_ALPHABET.includes(address[i])) return false;
  }
  return true;
}

export function extractAddresses(text) {
  if (!text || typeof text !== 'string') return [];
  const regex = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;
  return (text.match(regex) || []).filter(isValidSolanaAddress);
}`
  },
  {
    path: 'core/threatIndex.js',
    icon: <Activity size={14} />,
    type: 'JS_CORE_THREAT',
    content: `// VIGIL CORE: THREAT MATRIX CALCULATION ENGINE
// AXIS WEIGHTS: VSI(0.25), EDI(0.20), PDI(0.15), CRI(0.15), IPI(0.10), RII(0.10), EII(0.05)

export function calculateCompositeThreat(axes) {
  if (axes.rii === 100 || axes.eii === 100 || axes.edi >= 90) return 100;
  const score = (
    (axes.vsi || 0) * 0.25 +
    (axes.edi || 0) * 0.20 +
    (axes.pdi || 0) * 0.15 +
    (axes.cri || 0) * 0.15 +
    (axes.ipi || 0) * 0.10 +
    (axes.rii || 0) * 0.10 +
    (axes.eii || 0) * 0.05
  );
  return Math.round(Math.min(100, score));
}

export function getAxesFromVerdict(verdict) {
  const presets = {
    POISON: { vsi: 98, edi: 95, pdi: 50, cri: 40, ipi: 80, rii: 0, eii: 0 },
    SPOOF: { vsi: 100, edi: 90, pdi: 100, cri: 40, ipi: 10, rii: 0, eii: 0 },
    SIMILARITY: { vsi: 85, edi: 75, pdi: 30, cri: 30, ipi: 10, rii: 0, eii: 0 },
    NEW: { vsi: 10, edi: 0, pdi: 100, cri: 30, ipi: 10, rii: 0, eii: 0 },
    TRUSTED: { vsi: 5, edi: 0, pdi: 10, cri: 0, ipi: 0, rii: 0, eii: 0 }
  };
  return presets[verdict] || presets.NEW;
}`
  },
  {
    path: 'popup/popup.html',
    icon: <Layout size={14} />,
    type: 'HTML_UI_ROOT',
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>VIGIL | Field Unit Dashboard</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div id="vigil-popup">
    <header>
      <div class="brand">
        <div class="logo">V</div>
        <span>SENTINEL_DASHBOARD</span>
      </div>
      <div class="status-dot"></div>
    </header>
    
    <main>
      <div class="bri-card">
         <div class="gauge-container">
           <svg viewBox="0 0 100 100">
             <circle class="bg" cx="50" cy="50" r="45"></circle>
             <circle class="fill" id="gauge-fill" cx="50" cy="50" r="45"></circle>
           </svg>
           <div class="val" id="bri-val">100%</div>
         </div>
         <div class="label">Biological Resilience</div>
      </div>
      
      <div class="toggles">
        <div class="toggle-item">
          <span>RETINAL_SHIELD</span>
          <div class="switch active"></div>
        </div>
        <div class="toggle-item">
          <span>CLIPBOARD_GUARD</span>
          <div class="switch active"></div>
        </div>
        <div class="toggle-item locked">
          <span>MESH_SYNC_PRO</span>
          <div class="lock">🔒</div>
        </div>
      </div>
      
      <div class="intercept-log" id="log">
        <div class="empty">Scanning for DOM mutations...</div>
      </div>
    </main>
    
    <footer>
       <span>v0.0.4.0 // SOVEREIGN STANDARDS</span>
    </footer>
  </div>
  <script type="module" src="popup.js"></script>
</body>
</html>`
  },
  {
    path: 'popup/popup.css',
    icon: <FileCode size={14} />,
    type: 'CSS_UI_STYLING',
    content: `/* VIGIL DASHBOARD AESTHETIC */
:root { --bg: #050505; --zinc-800: #111111; --emerald: #10b981; }
body { width: 320px; height: 500px; margin: 0; background: var(--bg); color: #fff; font-family: 'Inter', sans-serif; padding: 24px; box-sizing: border-box; }
header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a1a1a; padding-bottom: 12px; margin-bottom: 24px; }
.brand { display: flex; align-items: center; gap: 8px; font-weight: 900; font-style: italic; font-size: 10px; letter-spacing: 0.2em; }
.logo { width: 18px; height: 18px; background: #fff; color: #000; display: flex; align-items: center; justify-content: center; border-radius: 3px; font-style: normal; }
.status-dot { width: 6px; height: 6px; background: var(--emerald); border-radius: 50%; box-shadow: 0 0 10px var(--emerald); }
.bri-card { background: var(--zinc-800); border-radius: 28px; padding: 32px 20px; text-align: center; margin-bottom: 24px; }
.gauge-container { position: relative; width: 100px; height: 100px; margin: 0 auto 16px; }
.gauge-container svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.gauge-container .bg { fill: none; stroke: #000; stroke-width: 6; }
.gauge-container .fill { fill: none; stroke: var(--emerald); stroke-width: 6; stroke-dasharray: 283; stroke-dashoffset: 0; transition: 1s ease; }
.gauge-container .val { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; font-style: italic; }
.bri-card .label { font-size: 8px; font-weight: 900; text-transform: uppercase; color: #555; letter-spacing: 0.2em; }
.toggles { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.toggle-item { padding: 14px 18px; background: #080808; border: 1px solid #1a1a1a; border-radius: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 9px; font-weight: 900; letter-spacing: 0.1em; color: #666; }
.switch { width: 32px; height: 16px; background: #111; border-radius: 100px; position: relative; }
.switch.active::after { content: ""; position: absolute; right: 2px; top: 2px; width: 12px; height: 12px; background: var(--emerald); border-radius: 50%; }
.toggle-item.locked { opacity: 0.4; border-style: dashed; }
.intercept-log { background: #080808; border-radius: 18px; padding: 16px; height: 80px; display: flex; align-items: center; justify-content: center; border: 1px solid #1a1a1a; }
.intercept-log .empty { font-size: 8px; font-weight: 900; color: #333; uppercase tracking-widest; }
footer { text-align: center; font-size: 7px; font-weight: 900; color: #222; uppercase tracking-[0.4em] margin-top: 20px; }`
  }
];