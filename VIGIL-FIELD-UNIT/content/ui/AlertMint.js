// VIGIL HUD: ALERT_MINT
// MODULE_ID: VIG-HUD-MNT

export function render(address, index) {
  const host = document.createElement('div');
  host.id = 'vigil-hud-root';
  host.style.cssText = 'position: fixed; z-index: 2147483647; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
  const shadow = host.attachShadow({ mode: 'open' });

  shadow.innerHTML = `
    <style>
      :host { --threat: #b91c1c; --bg: #0a0a0a; --font: 'Inter', system-ui, sans-serif; --mono: 'JetBrains Mono', monospace; }
      @keyframes strobe { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      .backdrop { position: fixed; inset: 0; background: rgba(5, 0, 0, 0.96); backdrop-filter: blur(40px); opacity: 0; transition: opacity 0.5s ease; pointer-events: auto; display: flex; align-items: center; justify-content: center; font-family: var(--font); }
      .backdrop.active { opacity: 1; }
      .card { width: 440px; background: var(--bg); border: 2px solid rgba(185, 28, 28, 0.3); border-radius: 40px; padding: 40px; color: white; position: relative; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,1); }
      .threat-index { position: absolute; top: 32px; right: 32px; background: #000; border: 1px solid rgba(185, 28, 28, 0.4); border-radius: 100px; padding: 4px 12px; font-weight: 900; font-style: italic; color: var(--threat); font-size: 13px; }
      .header { display: flex; align-items: center; gap: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 24px; margin-bottom: 24px; }
      .icon-box { width: 56px; height: 56px; background: rgba(185, 28, 28, 0.05); border: 1px solid rgba(185, 28, 28, 0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; animation: strobe 0.5s infinite; }
      .header-text h3 { color: var(--threat); font-weight: 900; font-style: italic; font-size: 18px; margin: 0; text-transform: uppercase; }
      .header-text p { font-size: 8px; font-weight: 900; color: #555; letter-spacing: 0.3em; margin: 4px 0 0 0; text-transform: uppercase; }
      .logic-block { margin-bottom: 24px; }
      .label { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 7px; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 6px; text-transform: uppercase; }
      .label-def { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); }
      .logic-text { font-size: 12px; color: #888; font-style: italic; line-height: 1.5; margin: 0; }
      .addr { background: #000; border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 16px; font-family: var(--mono); font-size: 11px; color: var(--threat); word-break: break-all; margin-bottom: 24px; }
      .telemetry { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 16px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px; }
      .tel-item span:first-child { font-size: 7px; font-weight: 900; color: #444; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
      .tel-item span:last-child { font-family: var(--mono); font-size: 10px; font-weight: 700; color: #bbb; }
      .btn { width: 100%; padding: 16px; border-radius: 14px; font-weight: 900; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center; gap: 10px; position: relative; overflow: hidden; }
      .btn-p { background: var(--threat); color: #fff; margin-bottom: 10px; }
      .btn-s { background: transparent; border: 1px solid #222; color: #555; }
      .hp { position: absolute; left: 0; top: 0; bottom: 0; background: rgba(185, 28, 28, 0.15); width: 0%; transition: width 0.05s linear; pointer-events: none; }
      .legal p { font-size: 7px; font-weight: 900; color: #333; letter-spacing: 0.1em; margin: 16px 0 0 0; text-transform: uppercase; text-align: center; }
    </style>
    <div class="backdrop" id="b">
      <div class="card">
        <div class="threat-index">${index}%</div>
        <div class="header">
          <div class="icon-box">❌</div>
          <div class="header-text">
            <h3>Mint Mismatch</h3>
            <p>VIGIL_FIELD_UNIT // REGISTRY_FAILURE</p>
          </div>
        </div>
        <div class="logic-block">
          <div class="label label-def">Shielding</div>
          <p class="logic-text">Against counterfeit assets that impersonate legitimate tokens via registry verification failure. This is likely a malicious impersonator.</p>
        </div>
        <div class="addr">${address}</div>
        <div class="telemetry">
          <div class="tel-item"><span>Address Age</span><span>12 Days</span></div>
          <div class="tel-item" style="border-left:1px solid #111; border-right:1px solid #111; padding: 0 12px;"><span>Last Time</span><span>3h ago</span></div>
          <div class="tel-item"><span>15D Tx</span><span>1,209</span></div>
        </div>
        <button class="btn btn-p" id="c">BLOCK COUNTERFEIT ASSET</button>
        <button class="btn btn-s" id="o"><div class="hp" id="hp"></div><span>IGNORE REGISTRY: EXECUTE [HOLD]</span></button>
        <div class="legal"><p>VIGILANCE IS THE ONLY PERMANENT SHIELD.</p></div>
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
  sBtn.ontouchstart = (e) => { e.preventDefault(); start = Date.now(); iv = setInterval(tick, 10); };
  sBtn.ontouchend = () => { clearInterval(iv); hp.style.width = '0%'; };
}