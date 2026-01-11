// VIGIL HUD: ALERT_NEW
// MODULE_ID: VIG-HUD-NEW
// PARITY_VERSION: 1.2.5 (DEFINITIVE_FULL)

export function render(address, index, telemetryData = {}) {
  const { 
    age = '1 Day', 
    activity = '0', 
    axes = { vsi: 10, edi: 0, pdi: 100, cri: 30, ipi: 10, rii: 0, eii: 0 } 
  } = telemetryData;

  const host = document.createElement('div');
  host.id = 'vigil-hud-root';
  host.style.cssText = 'position: fixed; z-index: 2147483647; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
  const shadow = host.attachShadow({ mode: 'open' });

  shadow.innerHTML = `
    <style>
      :host { --accent: #06b6d4; --bg: #050505; --font: 'Inter', system-ui, sans-serif; --mono: 'JetBrains Mono', monospace; }
      @keyframes inspect-flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      .backdrop { position: fixed; inset: 0; background: rgba(0, 5, 5, 0.98); backdrop-filter: blur(60px); opacity: 0; transition: opacity 0.5s ease; pointer-events: auto; display: flex; align-items: center; justify-content: center; font-family: var(--font); }
      .backdrop.active { opacity: 1; }
      .card { width: 480px; background: radial-gradient(circle at top right, rgba(6, 182, 212, 0.1), transparent 70%), var(--bg); border: 2px solid rgba(6, 182, 212, 0.2); border-radius: 44px; padding: 48px; color: white; position: relative; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,1); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      .diag-open .card { transform: scale(0.9) translateX(-40px); opacity: 0.4; }
      .threat-badge { position: absolute; top: 18px; right: 32px; background: #000; border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 100px; padding: 6px 16px; display: flex; align-items: center; gap: 8px; cursor: pointer; }
      .threat-badge .val { color: var(--accent); font-weight: 900; font-style: italic; font-size: 14px; }
      .threat-badge .lbl { color: #3b82f6; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; border-left: 1px solid #222; padding-left: 10px; animation: inspect-flash 2s infinite; }
      .header { display: flex; align-items: center; gap: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 32px; margin-bottom: 32px; }
      .icon-box { width: 64px; height: 64px; background: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
      .header-text h3 { color: var(--accent); font-weight: 900; font-style: italic; font-size: 22px; margin: 0; text-transform: uppercase; }
      .header-text p { font-size: 9px; font-weight: 900; color: #555; letter-spacing: 0.4em; margin: 6px 0 0 0; text-transform: uppercase; }
      .logic-section { margin-bottom: 32px; }
      .block { margin-bottom: 24px; }
      .lbl-pill { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 8px; font-weight: 900; letter-spacing: 0.15em; margin-bottom: 8px; text-transform: uppercase; }
      .lbl-def { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); }
      .lbl-ex { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
      .logic-text { font-size: 15px; color: #999; font-style: italic; line-height: 1.6; margin: 0; font-weight: 500; }
      
      .telemetry { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 32px; }
      .tel-pod { background: #080808; border: 1px solid #111; border-radius: 20px; padding: 16px 8px; text-align: center; }
      .tel-pod .lbl { display: block; font-size: 7px; font-weight: 900; color: #444; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px; }
      .tel-pod .val { display: block; font-family: var(--mono); font-size: 13px; font-weight: 900; }
      .stat-red { color: #ef4444; }
      .stat-orange { color: #f59e0b; }
      .stat-green { color: #10b981; }

      .btn { width: 100%; padding: 20px; border-radius: 18px; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center; gap: 12px; position: relative; overflow: hidden; transition: all 0.2s; }
      .btn-p { background: var(--accent); color: #000; margin-bottom: 12px; }
      .btn-s { background: #0a0a0a; border: 1px solid #1a1a1a; color: #666; margin-bottom: 12px; }
      .hp { position: absolute; left: 0; top: 0; bottom: 0; background: rgba(6, 182, 212, 0.15); width: 0%; transition: width 0.05s linear; pointer-events: none; }
      .footer { pt: 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; }
      .footer p { font-size: 8px; font-weight: 900; color: #333; letter-spacing: 0.2em; margin: 24px 0 0 0; text-transform: uppercase; }

      .diagnostic { position: absolute; inset: 0; background: #050505; z-index: 100; padding: 48px; display: none; flex-direction: column; }
      .diagnostic.active { display: flex; }
      .diag-header { border-bottom: 1px solid #111; padding-bottom: 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
      .axis-row { display: grid; grid-template-columns: 1fr 100px 60px; gap: 16px; align-items: center; margin-bottom: 16px; }
      .axis-label { font-size: 10px; font-weight: 900; color: #666; text-transform: uppercase; }
      .axis-bar { height: 2px; background: #111; position: relative; }
      .axis-fill { height: 100%; background: var(--accent); position: absolute; left: 0; top: 0; }
      .axis-val { font-family: var(--mono); font-size: 10px; color: white; text-align: right; }
      .close-diag { cursor: pointer; color: #444; }
      .close-diag:hover { color: white; }
    </style>
    <div class="backdrop" id="b">
      <div class="card" id="card">
        <div class="threat-badge" id="inspect">
          <span class="val">THREAT INDEX ${index}%</span>
          <span class="lbl">Inspect</span>
        </div>
        <div class="header">
          <div class="icon-box">👤</div>
          <div class="header-text">
            <h3>Report: New Address</h3>
            <p>ACTIVE_INTERCEPTION_LAYER</p>
          </div>
        </div>
        <div class="logic-section">
          <div class="block">
            <div class="lbl-pill lbl-def">Definition</div>
            <p class="logic-text">"Forensic alert for addresses with no prior interaction history or established on-chain reputation."</p>
          </div>
          <div class="block">
            <div class="lbl-pill lbl-ex">Example</div>
            <p class="logic-text">"You try to send funds to a wallet address that was created only 10 minutes ago and has zero previous transactions."</p>
          </div>
        </div>
        <div class="telemetry">
          <div class="tel-pod">
            <span class="lbl">Address Age</span>
            <span class="val stat-red">${age}</span>
          </div>
          <div class="tel-pod">
            <span class="lbl">Last Time</span>
            <span class="val stat-red">New</span>
          </div>
          <div class="tel-pod">
            <span class="lbl">15D Tx</span>
            <span class="val stat-red">${activity}</span>
          </div>
        </div>
        <button class="btn btn-p" id="c">INITIATE FORENSIC SCAN</button>
        <button class="btn btn-s" id="t"><div class="hp" id="hpt"></div><span>AUTHORIZE AS TRUSTED NODE [HOLD 1.5S]</span></button>
        <button class="btn btn-s" id="o"><div class="hp" id="hp"></div><span>CONTINUE TO EXECUTION [HOLD 1.5S]</span></button>
        <div class="footer"><p>VIGIL ADVISORY: SECURITY IS PROBABILISTIC. WE DO NOT SIGN TRANSACTIONS. OPERATOR ASSUMES ALL RISK.</p></div>
      </div>

      <div class="diagnostic" id="diag">
        <div class="diag-header">
          <div>
            <div style="font-size: 9px; font-weight: 900; color: var(--accent); letter-spacing: 0.4em;">TIM v1.2 // PARITY_SYNC</div>
            <div style="font-size: 24px; font-weight: 900; font-style: italic; text-transform: uppercase;">Diagnostic.</div>
          </div>
          <div class="close-diag" id="close-diag">CLOSE [X]</div>
        </div>
        <div style="flex: 1">
          <div class="axis-row"><span class="axis-label">Visual Similarity</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.vsi}%"></div></div><span class="axis-val">${axes.vsi}</span></div>
          <div class="axis-row"><span class="axis-label">Entropy Deviation</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.edi}%"></div></div><span class="axis-val">${axes.edi}</span></div>
          <div class="axis-row"><span class="axis-label">Provenance Depth</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.pdi}%"></div></div><span class="axis-val">${axes.pdi}</span></div>
          <div class="axis-row"><span class="axis-label">Context Risk</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.cri}%"></div></div><span class="axis-val">${axes.cri}</span></div>
          <div class="axis-row"><span class="axis-label">Interaction Pattern</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.ipi}%"></div></div><span class="axis-val">${axes.ipi}</span></div>
          <div class="axis-row"><span class="axis-label">Registry Integrity</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.rii}%"></div></div><span class="axis-val">${axes.rii}</span></div>
          <div class="axis-row"><span class="axis-label">Execution Integrity</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.eii}%"></div></div><span class="axis-val">${axes.eii}</span></div>
        </div>
        <div style="text-align: right">
          <div style="font-size: 10px; color: #444; font-weight: 900; text-transform: uppercase;">Composite Index</div>
          <div style="font-size: 48px; color: var(--accent); font-weight: 900; font-style: italic;">${index}%</div>
        </div>
      </div>
    </div>
  `;

  document.documentElement.appendChild(host);
  setTimeout(() => shadow.getElementById('b').classList.add('active'), 10);
  
  const close = () => {
    shadow.getElementById('b').classList.remove('active');
    setTimeout(() => host.remove(), 400);
  };

  shadow.getElementById('c').onclick = close;
  shadow.getElementById('inspect').onclick = () => {
    shadow.getElementById('diag').classList.add('active');
    shadow.getElementById('b').classList.add('diag-open');
  };
  shadow.getElementById('close-diag').onclick = () => {
    shadow.getElementById('diag').classList.remove('active');
    shadow.getElementById('b').classList.remove('diag-open');
  };

  const setupHold = (id, hpId, onComplete) => {
    const btn = shadow.getElementById(id);
    const hp = shadow.getElementById(hpId);
    let start, iv;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / 1500) * 100);
      hp.style.width = p + '%';
      if (p >= 100) { clearInterval(iv); onComplete(); }
    };
    btn.onmousedown = () => { start = Date.now(); iv = setInterval(tick, 10); };
    btn.onmouseup = btn.onmouseleave = () => { clearInterval(iv); hp.style.width = '0%'; };
  };

  setupHold('o', 'hp', close);
  setupHold('t', 'hpt', async () => {
    const data = await chrome.storage.local.get(['VIG_USER_TRUSTED_NODES']);
    const list = data.VIG_USER_TRUSTED_NODES || [];
    if (!list.includes(address)) {
      list.push(address);
      await chrome.storage.local.set({ 'VIG_USER_TRUSTED_NODES': list });
    }
    close();
  });
}