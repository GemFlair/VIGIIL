
/**
 * Warning Overlay - PRD Section 5 (Immutable Messages)
 * Injects warning UI using ShadowDOM
 */
export class WarningOverlay {
  private overlay: HTMLDivElement | null = null;
  private shadowRoot: ShadowRoot | null = null;

  createOverlay() {
    if (this.overlay) return;

    this.overlay = document.createElement('div');
    this.overlay.id = 'vigil-overlay';
    this.overlay.style.cssText = `
      position: absolute;
      z-index: 2147483647;
      pointer-events: auto;
      font-family: 'JetBrains Mono', monospace;
    `;

    this.shadowRoot = this.overlay.attachShadow({ mode: 'closed' });
    // This will be appended to the target element's container in the React component
  }

  getStyles() {
    return `
      <style>
        :host {
          --bg-void: #050505;
          --bg-panel: #0a0a0a;
          --border-subtle: #1f1f1f;
          --accent-blue: #3b82f6;
          --threat-red: #ef4444;
          --safe-green: #10b981;
        }
        
        .overlay-container {
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          padding: 20px;
          max-width: 400px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          line-height: 1.6;
          color: #fafafa;
          border-radius: 4px;
        }
        
        .header {
          font-weight: bold;
          margin-bottom: 12px;
          font-size: 14px;
          letter-spacing: 0.1em;
        }
        
        .address {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          word-break: break-all;
          background: var(--bg-void);
          padding: 12px;
          margin: 12px 0;
          border: 1px solid var(--border-subtle);
          color: #71717a;
        }
        
        .button {
          background: var(--bg-void);
          border: 1px solid var(--border-subtle);
          color: #fff;
          padding: 10px 20px;
          cursor: pointer;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          margin-top: 12px;
          transition: all 0.1s linear;
          text-transform: uppercase;
          font-weight: bold;
        }
        
        .button:hover { border-color: var(--accent-blue); color: var(--accent-blue); }
        .button-danger { border-color: var(--threat-red); color: var(--threat-red); }
        .button-danger:hover { background: var(--threat-red); color: white; }
        
        .trusted { color: var(--safe-green); }
        .warning { color: #f59e0b; }
        .danger { color: var(--threat-red); }
      </style>
    `;
  }

  showPoisoningWarning(address: string, trustedAddress: string, container: HTMLElement) {
    this.createOverlay();
    if (!this.shadowRoot || !this.overlay) return;

    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <div class="overlay-container animate-in fade-in slide-in-from-top-2">
        <div class="header danger">🚨 POSSIBLE ADDRESS POISONING</div>
        <div style="margin-bottom: 8px;">Previously trusted:</div>
        <div class="address">${trustedAddress}</div>
        <div style="margin: 8px 0;">Current destination:</div>
        <div class="address" style="color: var(--threat-red); border-color: var(--threat-red);">${address}</div>
        <div style="margin-top: 8px; font-weight: bold;">DO NOT PROCEED unless you verify EVERY character.</div>
        <button class="button button-danger" id="close-btn">OVERRIDE</button>
      </div>
    `;

    this.shadowRoot.getElementById('close-btn')?.addEventListener('click', () => this.remove());
    container.appendChild(this.overlay);
    this.overlay.style.top = '0';
    this.overlay.style.left = '0';
    this.overlay.style.width = '100%';
    this.overlay.style.height = '100%';
    this.overlay.style.display = 'flex';
    this.overlay.style.alignItems = 'center';
    this.overlay.style.justifyContent = 'center';
    this.overlay.style.background = 'rgba(0,0,0,0.8)';
    this.overlay.style.backdropFilter = 'blur(4px)';
    this.overlay.style.borderRadius = '28px';
  }

  remove() {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
      this.overlay = null;
      this.shadowRoot = null;
    }
  }
}
