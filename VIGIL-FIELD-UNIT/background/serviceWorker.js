// VIGIL BACKGROUND GUARDIAN
// VERSION: 1.6.0 (TIERED_RELAY_MASTER)

// OWNER CONFIGURATION - PROTECTED LAYER
const HELIUS_SECURE_LINK = "https://mainnet.helius-rpc.com/?api-key=YOUR_PAID_KEY_HERE";
const VIGIL_OWNER_WALLET = "Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i";

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(['VIG_PLAN_TIER']);
  if (!data.VIG_PLAN_TIER) {
    await chrome.storage.local.set({ 
      'VIG_PLAN_TIER': 'BASELINE',
      'VIG_NODE_VERIFIED': false,
      'VIG_USER_BRI': 100,
      'VIG_TOTAL_TRUSTED': 1,
      'VIG_TOTAL_POISONS': 0,
      'VIG_MESH_SYNC_COUNT': 0,
      'VIG_VCI_HITS': 0
    });
  }
});

// SECURE PROXY: Communicates with Helius while hiding the API Key
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FETCH_TELEMETRY') {
    processSecureRequest(message.payload.address).then(sendResponse);
    return true; 
  }
  
  if (message.type === 'THREAT_LOG') {
    updateLocalIntelligence(message.payload);
  }
});

async function processSecureRequest(address) {
  const data = await chrome.storage.local.get(['VIG_PLAN_TIER', 'VIG_LINKED_WALLET']);
  const tier = data.VIG_PLAN_TIER || 'BASELINE';
  const userWallet = data.VIG_LINKED_WALLET;

  // 1. Check for Admin/Owner override
  if (userWallet === VIGIL_OWNER_WALLET) {
    return await fetchFromHelius(address, 20); // Full Admin depth
  }

  // 2. Handle Plan Quotas
  switch (tier) {
    case 'APEX':
      return await fetchFromHelius(address, 10);
    case 'SENTINEL':
      return await fetchFromHelius(address, 5); // Preserve credits
    case 'BASELINE':
    default:
      return { status: 'RESTRICTED', data: [], msg: "Upgrade to Sentinel for live telemetry." };
  }
}

async function fetchFromHelius(address, limit) {
  try {
    const response = await fetch(HELIUS_SECURE_LINK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "vigil-tiered-proxy",
        method: "getSignaturesForAddress",
        params: [address, { limit }]
      })
    });
    const result = await response.json();
    return { status: 'SUCCESS', data: result.result || [] };
  } catch (e) {
    return { status: 'ERROR', data: null };
  }
}

async function updateLocalIntelligence(payload) {
  const data = await chrome.storage.local.get(['VIG_TOTAL_POISONS', 'VIG_USER_BRI']);
  await chrome.storage.local.set({
    'VIG_TOTAL_POISONS': (data.VIG_TOTAL_POISONS || 0) + 1,
    'VIG_USER_BRI': Math.max(0, (data.VIG_USER_BRI || 100) - 5)
  });
}

// THE HANDSHAKE: Receives activation from vigil.layer website
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.type === 'VIGIL_HANDSHAKE_ACTIVATE') {
    chrome.storage.local.set({
      'VIG_PLAN_TIER': request.tier,
      'VIG_NODE_VERIFIED': true,
      'VIG_LINKED_WALLET': request.wallet,
      'VIG_AUTH_STAMP': Date.now()
    });
    sendResponse({ status: 'HANDSHAKE_ACCEPTED' });
  }
});