// VIGIL FIELD UNIT: TACTICAL DISPATCHER
// VERSION: 1.4.0 (RELAY_ENABLED)

(async function() {
  const validatorSrc = chrome.runtime.getURL('core/addressValidator.js');
  const indexerSrc = chrome.runtime.getURL('core/threatIndex.js');
  const diffSrc = chrome.runtime.getURL('core/addressDiff.js');
  
  const { isValidSolanaAddress } = await import(validatorSrc);
  const { calculateCompositeThreat, getAxesFromVerdict } = await import(indexerSrc);
  const { calculateEntropy, getSimilarityScore } = await import(diffSrc);

  const HIGH_RISK_DOMAINS = ['t.me', 'twitter.com', 'x.com', 'discord.com'];

  async function fetchHeliusTelemetry(address) {
    // SECURE ACTION: Send to background script where the key is hidden
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ 
        type: 'FETCH_TELEMETRY', 
        payload: { address } 
      }, (response) => {
        resolve(response?.data || []);
      });
    });
  }

  async function analyzeAddress(addr) {
    const data = await chrome.storage.local.get(['VIG_USER_TRUSTED_NODES', 'VIG_CLIPBOARD_INTENT']);
    const userWhitelist = data.VIG_USER_TRUSTED_NODES || [];
    
    if (userWhitelist.includes(addr)) return 'TRUSTED';
    
    const currentOrigin = window.location.hostname;
    if (HIGH_RISK_DOMAINS.some(d => currentOrigin.includes(d))) return 'PHISHING';

    const entropy = calculateEntropy(addr);
    if (entropy < 3.8) return 'SIMILARITY';

    for (const trusted of userWhitelist) {
      if (getSimilarityScore(addr, trusted) > 85 && addr !== trusted) return 'POISON';
    }

    if (data.VIG_CLIPBOARD_INTENT && data.VIG_CLIPBOARD_INTENT !== addr) return 'CLIPBOARD';
    
    return 'NEW';
  }

  // Wrap Logic
  async function wrapAddress(node) {
    if (node.parentElement && node.parentElement.tagName === 'VIGIL-SHIELD') return;
    const text = node.textContent;
    const regex = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;
    const matches = text.match(regex);
    if (!matches) return;

    for (const addr of matches) {
      if (isValidSolanaAddress(addr)) {
        const verdict = await analyzeAddress(addr);
        const shield = document.createElement('vigil-shield');
        shield.className = verdict.toLowerCase();
        shield.textContent = addr;
        shield.onclick = (e) => { e.stopPropagation(); dispatchHUD(addr, verdict); };
        
        try {
          const range = document.createRange();
          const start = text.indexOf(addr);
          range.setStart(node, start);
          range.setEnd(node, start + addr.length);
          range.deleteContents();
          range.insertNode(shield);
        } catch(e) {}
      }
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE) wrapAddress(node);
        else if (node.nodeType === Node.ELEMENT_NODE) {
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
          let textNode;
          while (textNode = walker.nextNode()) wrapAddress(textNode);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  async function dispatchHUD(address, verdict) {
    if (document.getElementById('vigil-hud-root')) return;
    
    const signatures = await fetchHeliusTelemetry(address);
    const age = signatures.length > 0 ? "Verified Active" : "New Node";
    const activity = signatures.length.toString();

    const axes = getAxesFromVerdict(verdict);
    const index = calculateCompositeThreat(axes);
    const moduleSrc = chrome.runtime.getURL(`content/ui/Alert${verdict.charAt(0) + verdict.slice(1).toLowerCase()}.js`);
    
    try {
      const { render } = await import(moduleSrc);
      render(address, index, { age, activity, axes });
      chrome.runtime.sendMessage({ type: 'THREAT_LOG', payload: { address, verdict, index } });
    } catch (e) { console.error(`[VIGIL] HUD Error:`, e); }
  }

  document.addEventListener('copy', () => {
    const text = window.getSelection().toString().trim();
    if (isValidSolanaAddress(text)) chrome.storage.local.set({ 'VIG_CLIPBOARD_INTENT': text });
  });
})();