# VIGIL Field Unit | Product Requirements (PRD-EXT-01)

## OBJECTIVE
Build a high-performance Chrome Extension ("The Field Unit") that manifests the Layer 0.5 standard across all browser-based Solana interactions.

## CORE MODULES

### Module A: Retinal Shield (DOM Interception)
- **Requirement**: Use `MutationObserver` to scan the visible DOM for Solana addresses in real-time.
- **Logic**: Wrap detected addresses in a 0.5 refractive highlight.
- **Visual States**: 
  - Emerald: Safe/Trusted (Found in local trust graph).
  - Amber: New/Unknown (First-time encounter).
  - Pulsing Red: Mimic/Poison (Detected similarity collision).

### Module B: Clipboard Guardian
- **Requirement**: Listen to `copy` and `paste` events globally within the browser.
- **Logic**: Detect "Silent Swaps" (where the clipboard content changes to a different address without a user-initiated copy event).
- **Intervention**: Trigger a full-surface "Breach Overlay" to prevent the user from pasting a hijacked address.

### Module C: Heuristic Similarity Engine (Local Matrix)
- **Requirement**: Client-side Levenshtein distance check for all destination addresses.
- **Logic**: Compare current intent against the user's Local Trust Graph.
- **Threshold**: Flag 90%+ similarity collisions that have differing middle entropy (Vanity Attacks).

### Module D: Pro Sentinel Handshake
- **Requirement**: Authenticate Pro Node status via a non-gas wallet signature.
- **Features**: Unlock "Global Mesh Sync" and "Dynamic Tray Icon" (Changes color based on current page risk: Grey/Safe/Threat).

### Module E: Tactical Dashboard (Extension Popup)
- **Features**: 
  - Master Toggles for Defense Layers.
  - Live Biological Resilience Index (BRI) readout.
  - Manual "Intent Validator" input terminal (Synthesis Scan).
  - Feed of recent security intercepts.

## PERFORMANCE TARGETS
- **Operational Latency**: Sub-12ms for DOM traversal and regex matching.
- **Memory Footprint**: <25MB during background monitoring.
- **Stability**: Zero interference with dApp functionality or main-thread rendering.

## DESIGN REFERENCE
Mirror the aesthetics found in the website's `SentinelControlDeck.tsx` and `SystemBoot.tsx`. Use Lucide-React icons and the custom Zinc palette.