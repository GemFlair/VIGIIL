// VIGIL HUD: ALERT_POISON
// MODULE_ID: VIG-HUD-POI
// PARITY_VERSION: 1.2.5 (DEFINITIVE_FULL)

export function render(address, index, telemetryData = {}) {
  const { 
    age = '2,401 Days', 
    activity = '402', 
    axes = { vsi: 98, edi: 92, pdi: 40, cri: 30, ipi: 80, rii: 0, eii: 0 } 
  } = telemetryData;

  const host = document.createElement('div');
  host.id = 'vigil-hud-root';
  host.style.cssText = 'position: fixed; z-index: 2147483647; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
  const shadow = host.attachShadow({ mode: 'open' });

  shadow.innerHTML = `
    <style>
      :host { --threat: #ef4444; --bg: #050505; --font: 'Inter', system-ui, sans-serif; --mono: 'JetBrains Mono', monospace; }
      @keyframes inspect-flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      .backdrop { position: fixed; inset: 0; background: rgba(5, 0, 0, 0.98); backdrop-filter: blur(60px); opacity: 0; transition: opacity 0.5s ease; pointer-events: auto; display: flex; align-items: center; justify-content: center; font-family: var(--font); }
      .backdrop.active { opacity: 1; }
      .card { width: 480px; background: radial-gradient(circle at top right, rgba(239, 68, 68, 0.1), transparent 70%), var(--bg); border: 2px solid rgba(239, 68, 68, 0.2); border-radius: 44px; padding: 48px; color: white; position: relative; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,1); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      .diag-open .card { transform: scale(0.9) translateX(-40px); opacity: 0.4; }
      .threat-badge { position: absolute; top: 32px; right: 32px; background: #000; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 100px; padding: 6px 16px; display: flex; align-items: center; gap: 8px; cursor: pointer; }
      .threat-badge .val { color: var(--threat); font-weight: 900; font-style: italic; font-size: 14px; }
      .threat-badge .lbl { color: #3b82f6; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; border-left: 1px solid #222; padding-left: 10px; animation: inspect-flash 2s infinite; }
      .header { display: flex; align-items: center; gap: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 32px; margin-bottom: 32px; }
      .icon-box { width: 64px; height: 64px; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
      .header-text h3 { color: var(--threat); font-weight: 900; font-style: italic; font-size: 22px; margin: 0; text-transform: uppercase; }
      .header-text p { font-size: 9px; font-weight: 900; color: #555; letter-spacing: 0.4em; margin: 6px 0 0 0; text-transform: uppercase; }
      .telemetry { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 20px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 32px; }
      .tel-item span:first-child { font-size: 8px; font-weight: 900; color: #444; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4px; display: block; }
      .tel-item span:last-child { font-family: var(--mono); font-size: 12px; font-weight: 700; color: #ccc; }
      .btn { width: 100%; padding: 20px; border-radius: 18px; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center; gap: 12px; position: relative; overflow: hidden; }
      .btn-p { background: #0a0a0a; border: 1px solid rgba(239, 68, 68, 0.3); color: var(--threat); margin-bottom: 12px; }
      .btn-s { background: #0a0a0a; border: 1px solid #1a1a1a; color: #666; margin-bottom: 12px; }
      .hp { position: absolute; left: 0; top: 0; bottom: 0; background: rgba(239, 68, 68, 0.1); width: 0%; transition: width 0.05s linear; pointer-events: none; }
      .diagnostic { position: absolute; inset: 0; background: #050505; z-index: 100; padding: 48px; display: none; flex-direction: column; }
      .diagnostic.active { display: flex; }
      .diag-header { border-bottom: 1px solid #111; padding-bottom: 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
      .axis-row { display: grid; grid-template-columns: 1fr 100px 60px; gap: 16px; align-items: center; margin-bottom: 16px; }
      .axis-label { font-size: 10px; font-weight: 900; color: #666; text-transform: uppercase; }
      .axis-bar { height: 2px; background: #111; position: relative; }
      .axis-fill { height: 100%; background: var(--threat); position: absolute; left: 0; top: 0; }
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
          <div class="icon-box">💀</div>
          <div class="header-text"><h3>Possible Poisoning</h3><p>ACTIVE_INTERCEPTION_LAYER</p></div>
        </div>
        <div class="telemetry">
          <div class="tel-item"><span>Address Age</span><span>${age}</span></div>
          <div class="tel-item" style="border-left:1px solid #111; border-right:1px solid #111; padding: 0 12px;"><span>Last Time</span><span>14m ago</span></div>
          <div class="tel-item"><span>15D Tx</span><span>${activity}</span></div>
        </div>
        <button class="btn btn-p" id="c">HALT: ADDRESS POISONING DETECTED</button>
        <button class="btn btn-s" id="t"><div class="hp" id="hpt"></div><span>AUTHORIZE AS TRUSTED NODE [HOLD 1.5S]</span></button>
        <button class="btn btn-s" id="o"><div class="hp" id="hp"></div><span>OVERRIDE: PROCEED [HOLD 1.5S]</span></button>
      </div>
      <div class="diagnostic" id="diag">
        <div class="diag-header"><div><div style="font-size: 9px; font-weight: 900; color: var(--threat); letter-spacing: 0.4em;">TIM v1.2 // PARITY_SYNC</div><div style="font-size: 24px; font-weight: 900; font-style: italic; text-transform: uppercase;">Diagnostic.</div></div><div class="close-diag" id="close-diag">CLOSE [X]</div></div>
        <div style="flex: 1">
          <div class="axis-row"><span class="axis-label">Visual Similarity</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.vsi}%"></div></div><span class="axis-val">${axes.vsi}</span></div>
          <div class="axis-row"><span class="axis-label">Entropy Deviation</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.edi}%"></div></div><span class="axis-val">${axes.edi}</span></div>
          <div class="axis-row"><span class="axis-label">Provenance Depth</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.pdi}%"></div></div><span class="axis-val">${axes.pdi}</span></div>
          <div class="axis-row"><span class="axis-label">Context Risk</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.cri}%"></div></div><span class="axis-val">${axes.cri}</span></div>
          <div class="axis-row"><span class="axis-label">Interaction Pattern</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.ipi}%"></div></div><span class="axis-val">${axes.ipi}</span></div>
          <div class="axis-row"><span class="axis-label">Registry Integrity</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.rii}%"></div></div><span class="axis-val">${axes.rii}</span></div>
          <div class="axis-row"><span class="axis-label">Execution Integrity</span><div class="axis-bar"><div class="axis-fill" style="width:${axes.eii}%"></div></div><span class="axis-val">${axes.eii}</span></div>
        </div>
        <div style="text-align: right"><div style="font-size: 10px; color: #444; font-weight: 900; text-transform: uppercase;">Composite Index</div><div style="font-size: 48px; color: var(--threat); font-weight: 900; font-style: italic;">${index}%</div></div>
      </div>
    </div>`;

  document.documentElement.appendChild(host);
  setTimeout(() => shadow.getElementById('b').classList.add('active'), 10);
  const close = () => { shadow.getElementById('b').classList.remove('active'); setTimeout(() => host.remove(), 400); };
  shadow.getElementById('c').onclick = close;
  shadow.getElementById('inspect').onclick = () => { shadow.getElementById('diag').classList.add('active'); shadow.getElementById('b').classList.add('diag-open'); };
  shadow.getElementById('close-diag').onclick = () => { shadow.getElementById('diag').classList.remove('active'); shadow.getElementById('b').classList.remove('diag-open'); };

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