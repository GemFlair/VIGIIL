// VIGIL HUD: ALERT_TRUSTED
// MODULE_ID: VIG-HUD-TRU

export function render(address, index) {
  const host = document.createElement('div');
  host.id = 'vigil-hud-root';
  host.style.cssText = 'position: fixed; z-index: 2147483647; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
  const shadow = host.attachShadow({ mode: 'open' });

  shadow.innerHTML = `
    <style>
      :host { --accent: #10b981; --bg: #0a0a0a; --font: 'Inter', system-ui, sans-serif; --mono: 'JetBrains Mono', monospace; }
      .backdrop { position: fixed; inset: 0; background: rgba(0, 5, 0, 0.94); backdrop-filter: blur(40px); opacity: 0; transition: opacity 0.5s ease; pointer-events: auto; display: flex; align-items: center; justify-content: center; font-family: var(--font); }
      .backdrop.active { opacity: 1; }
      .card { width: 440px; background: var(--bg); border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 40px; padding: 40px; color: white; position: relative; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,1); }
      .threat-badge { position: absolute; top: 32px; right: 32px; background: #000; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 100px; padding: 4px 12px; display: flex; items: center; gap: 6px; }
      .threat-badge .val { color: var(--accent); font-weight: 900; font-style: italic; font-size: 13px; }
      .threat-badge .lbl { color: #3b82f6; font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; border-left: 1px solid #222; padding-left: 6px; }
      .header { display: flex; align-items: center; gap: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 24px; margin-bottom: 24px; }
      .icon-box { width: 56px; height: 56px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
      .header-text h3 { color: var(--accent); font-weight: 900; font-style: italic; font-size: 18px; margin: 0; text-transform: uppercase; }
      .header-text p { font-size: 8px; font-weight: 900; color: #555; letter-spacing: 0.3em; margin: 4px 0 0 0; text-transform: uppercase; }
      .logic-section { margin-bottom: 24px; }
      .logic-label { display: flex; items: center; gap: 8px; margin-bottom: 12px; }
      .logic-label .dot { w: 4px; h: 4px; border-radius: 50%; background: var(--accent); }
      .logic-label span { font-size: 10px; font-weight: 900; color: #555; letter-spacing: 0.2em; text-transform: uppercase; }
      .block { margin-bottom: 20px; }
      .lbl-pill { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 7px; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 6px; text-transform: uppercase; }
      .lbl-def { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); }
      .lbl-ex { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
      .logic-text { font-size: 14px; color: #888; font-style: italic; line-height: 1.5; margin: 0; font-weight: 500; }
      .telemetry { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 16px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px; }
      .tel-item span:first-child { display: block; font-size: 7px; font-weight: 900; color: #444; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
      .tel-item span:last-child { font-family: var(--mono); font-size: 11px; font-weight: 700; color: #bbb; }
      .btn { width: 100%; padding: 16px; border-radius: 14px; font-weight: 900; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center; background: #0a0a0a; border: 1px solid rgba(16, 185, 129, 0.3); color: var(--accent); margin-bottom: 12px; }
      .btn-s { background: transparent; border: 1px solid #1a1a1a; color: #555; }
      .hp { position: absolute; left: 0; top: 0; bottom: 0; background: rgba(16, 185, 129, 0.1); width: 0%; transition: width 0.05s linear; pointer-events: none; }
      .btn-s span { position: relative; z-index: 2; }
      .footer { pt: 20px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; }
      .footer p { font-size: 8px; font-weight: 900; color: #333; letter-spacing: 0.15em; margin: 16px 0 0 0; text-transform: uppercase; text-align: center; }
    </style>
    <div class="backdrop" id="b">
      <div class="card">
        <div class="threat-badge">
          <span class="val">${index}%</span>
          <span class="lbl">Inspect</span>
        </div>
        <div class="header">
          <div class="icon-box">✅</div>
          <div class="header-text">
            <h3>Trusted Destination</h3>
            <p>ACTIVE_INTERCEPTION_LAYER</p>
          </div>
        </div>
        <div class="logic-section">
          <div class="logic-label"><div class="dot"></div><span>Interception Logic</span></div>
          <div class="block">
            <div class="lbl-pill lbl-def">Definition</div>
            <p class="logic-text">"Verification of intent against an established safe node within your local historical trust graph."</p>
          </div>
          <div class="block">
            <div class="lbl-pill lbl-ex">Example</div>
            <p class="logic-text">"You are sending SOL to your hardware wallet address that you have used successfully 20 times this year."</p>
          </div>
        </div>
        <div class="telemetry">
          <div class="tel-item"><span>Address Age</span><span>502 Days</span></div>
          <div class="tel-item" style="border-left:1px solid #111; border-right:1px solid #111; padding: 0 12px;"><span>Last Time</span><span>1h ago</span></div>
          <div class="tel-item"><span>15D Tx</span><span>12</span></div>
        </div>
        <button class="btn" id="c">RETURN TO SOURCE</button>
        <button class="btn btn-s" id="o"><div class="hp" id="hp"></div><span>SETTLE INTENT: CONFIRM [HOLD 1.5S]</span></button>
        <div class="footer"><p>VIGILANCE IS THE ONLY PERMANENT SHIELD.</p></div>
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
  const sBtn = shadow.getElementById('o');
  const hp = shadow.getElementById('hp');
  let start, iv;
  const tick = () => {
    const elapsed = Date.now() - start;
    const p = Math.min(100, (elapsed / 1500) * 100);
    hp.style.width = p + '%';
    if (p >= 100) { clearInterval(iv); close(); }
  };
  sBtn.onmousedown = () => { start = Date.now(); iv = setInterval(tick, 10); };
  sBtn.onmouseup = sBtn.onmouseleave = () => { clearInterval(iv); hp.style.width = '0%'; };
}