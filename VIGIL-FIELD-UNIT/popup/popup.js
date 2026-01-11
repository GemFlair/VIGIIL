// VIGIL FIELD UNIT: POD CONTROLLER
// VERSION: 1.6.2 (404_FIX)

/**
 * Main dashboard update loop.
 * Syncs local storage state with the physical UI pods.
 */
async function updateDashboard() {
  const keys = [
    'VIG_USER_BRI', 
    'VIG_NODE_VERIFIED', 
    'VIG_PLAN_TIER',
    'VIG_LINKED_WALLET',
    'VIG_TOTAL_POISONS',
    'VIG_TOTAL_TRUSTED',
    'VIG_TOTAL_SWAPS',
    'VIG_TOTAL_PHISHING',
    'VIG_TOTAL_UNICODE',
    'VIG_TOTAL_DUST',
    'VIG_TOTAL_VANITY',
    'VIG_TOTAL_SPOOF',
    'VIG_TOTAL_MINT',
    'VIG_MESH_SYNC_COUNT',
    'VIG_VCI_HITS',
    'VIG_USER_TRUSTED_NODES'
  ];
  
  const data = await chrome.storage.local.get(keys);
  
  const bri = data.VIG_USER_BRI !== undefined ? data.VIG_USER_BRI : 100;
  const isVerified = data.VIG_NODE_VERIFIED === true;
  const tier = data.VIG_PLAN_TIER || 'BASELINE';
  const wallet = data.VIG_LINKED_WALLET || 'UNLINKED';
  
  // Master Matrix Values
  const trusted = data.VIG_TOTAL_TRUSTED || 0;
  const poisons = data.VIG_TOTAL_POISONS || 0;
  const mesh = data.VIG_MESH_SYNC_COUNT || 0;
  const vci = data.VIG_VCI_HITS || 0;

  // Screen Orchestration
  const authScreen = document.getElementById('auth-screen');
  const dashScreen = document.getElementById('dashboard-screen');
  
  // Safety check to prevent errors during rapid state changes
  if (!authScreen || !dashScreen) return;

  const tierLabel = document.getElementById('tier-label');
  const rankLabel = document.getElementById('rank-label');
  const walletAddr = document.getElementById('wallet-addr');
  const apexGrid = document.getElementById('apex-grid');
  
  if (isVerified) {
    authScreen.classList.remove('active');
    dashScreen.classList.add('active');
    
    // Tier-based UI State & Branding
    document.body.className = `tier-${tier.toLowerCase()}`;
    if (tierLabel) tierLabel.innerText = tier;
    
    if (walletAddr) {
      walletAddr.innerText = wallet !== 'UNLINKED' ? 
        `${wallet.slice(0, 4)}...${wallet.slice(-4)}` : 'GUEST_NODE';
    }

    if (rankLabel) {
      if (tier === 'APEX') rankLabel.innerText = 'SOVEREIGN APEX';
      else if (tier === 'SENTINEL') rankLabel.innerText = 'PRO SENTINEL';
      else rankLabel.innerText = 'BASELINE OPERATOR';
    }

    if (apexGrid) {
      if (tier === 'BASELINE') {
        apexGrid.classList.add('blurred');
      } else {
        apexGrid.classList.remove('blurred');
      }
    }

    // Biometric Gauge Update
    const valEl = document.getElementById('bri-val');
    const fillEl = document.getElementById('gauge-fill');
    if (valEl) valEl.innerText = `${bri}%`;
    if (fillEl) {
      const offset = 283 - (283 * (bri / 100));
      fillEl.style.strokeDashoffset = offset;
      fillEl.style.stroke = bri > 80 ? '#10b981' : bri > 40 ? '#f59e0b' : '#ef4444';
    }

    // Atomic Stat Updates with Pulsing
    updateStatValue('stat-trusted', trusted);
    updateStatValue('stat-poison', poisons);
    updateStatValue('stat-mesh', mesh);
    updateStatValue('stat-vci', vci);
  } else {
    authScreen.classList.add('active');
    dashScreen.classList.remove('active');
    document.body.className = 'tier-baseline';
  }
}

/**
 * Updates a numerical value with a pulse animation trigger.
 */
function updateStatValue(id, newVal) {
  const el = document.getElementById(id);
  if (!el) return;
  
  const oldVal = parseInt(el.innerText || "0");
  if (oldVal !== newVal) {
    el.innerText = newVal;
    el.classList.remove('pulse-up');
    void el.offsetWidth; // Force Reflow
    el.classList.add('pulse-up');
  }
}

/**
 * Forensic Drill-Down: Expands Master Matrix Pods into sub-metrics.
 */
async function openDrillDown(type) {
  const overlay = document.getElementById('forensic-overlay');
  const title = document.getElementById('drill-title');
  const grid = document.getElementById('drill-grid');
  
  if (!overlay || !grid) return;

  grid.innerHTML = ''; // Clear for rebuild
  const data = await chrome.storage.local.get(null);

  if (type === 'POISON') {
    title.innerText = '>> POISON_FORENSICS';
    title.classList.add('title-poison');
    title.classList.remove('title-trusted');
    
    const items = [
      { label: 'CLIPBOARD_SWAPS', val: data.VIG_TOTAL_SWAPS || 0 },
      { label: 'PHISHING_SHIELDS', val: data.VIG_TOTAL_PHISHING || 0 },
      { label: 'UNICODE_MIMICS', val: data.VIG_TOTAL_UNICODE || 0 },
      { label: 'DUST_INJECTIONS', val: data.VIG_TOTAL_DUST || 0 },
      { label: 'VANITY_COLLISIONS', val: data.VIG_TOTAL_VANITY || 0 },
      { label: 'VISUAL_SPOOFS', val: data.VIG_TOTAL_SPOOF || 0 },
      { label: 'MINT_MISMATCHES', val: data.VIG_TOTAL_MINT || 0 },
      { label: 'VCI_PREDICTIONS', val: data.VIG_VCI_HITS || 0 }
    ];

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'drill-item';
      div.innerHTML = `<span class="label">${item.label}</span><span class="value">${item.val}</span>`;
      grid.appendChild(div);
    });
  } else if (type === 'TRUSTED') {
    title.innerText = '>> TRUST_REGISTRY';
    title.classList.add('title-trusted');
    title.classList.remove('title-poison');
    const nodes = (data.VIG_USER_TRUSTED_NODES || []).length;
    grid.innerHTML = `
      <div class="drill-item">
        <span class="label">UNIQUE_NODES_INDEXED</span>
        <span class="value">${nodes}</span>
      </div>
      <div class="drill-item">
        <span class="label">REGISTRY_INTEGRITY</span>
        <span class="value" style="color:var(--emerald)">VERIFIED</span>
      </div>
    `;
  }

  overlay.classList.add('active');
}

function closeDrillDown() {
  const overlay = document.getElementById('forensic-overlay');
  if (overlay) overlay.classList.remove('active');
}

/**
 * Handshake: Virtual authentication from website or direct bypass
 */
async function performHandshake() {
  const btn = document.getElementById('handshake-btn');
  if (!btn) return;

  btn.disabled = true;
  btn.innerText = 'WAITING_FOR_COMMAND...';
  
  // Appending index.html to ensure the AI Studio sandbox resolves correctly
  window.open('https://48evb9yill5ja8sxgiy9hgzjcx1ocbouxx6c7nfxhgkt5ai2e3-h852644758.scf.usercontent.goog/index.html', '_blank');
}

/**
 * Revoke: Terminates the identity session.
 */
async function terminateSession() {
  if (confirm("TERMINATE SESSION? DATA WILL BE PURGED.")) {
    // Setting these keys will trigger chrome.storage.onChanged,
    // which then calls updateDashboard(). Manual call is redundant.
    await chrome.storage.local.set({ 
      'VIG_NODE_VERIFIED': false,
      'VIG_PLAN_TIER': 'BASELINE',
      'VIG_LINKED_WALLET': 'UNLINKED'
    });
  }
}

// Lifecycle Initialization
document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
  
  const handshakeBtn = document.getElementById('handshake-btn');
  if (handshakeBtn) handshakeBtn.onclick = performHandshake;

  const terminateBtn = document.getElementById('terminate-btn');
  if (terminateBtn) terminateBtn.onclick = terminateSession;

  // Pod Interactivity
  const poisonPod = document.getElementById('pod-poison');
  const trustedPod = document.getElementById('pod-trusted');
  const meshPod = document.getElementById('pod-mesh');
  const vciPod = document.getElementById('pod-vci');
  const closeDrill = document.getElementById('close-drill');

  if (poisonPod) poisonPod.onclick = () => openDrillDown('POISON');
  if (trustedPod) trustedPod.onclick = () => openDrillDown('TRUSTED');
  if (meshPod) meshPod.onclick = () => openDrillDown('TRUSTED');
  if (vciPod) vciPod.onclick = () => openDrillDown('POISON');
  if (closeDrill) closeDrill.onclick = closeDrillDown;

  chrome.storage.onChanged.addListener(() => updateDashboard());
});