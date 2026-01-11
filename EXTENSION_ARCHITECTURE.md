# VIGIL ARCHITECTURE & DEPLOYMENT BLUEPRINT (v1.1.0)

## 1. ARCHITECTURAL PHILOSOPHY: "SHADOW SYNC"
To maintain the high-integrity standard of the VIGIL ecosystem, we employ a **Shadow Sync** protocol. This ensures that the **Command Center (Website)** remains a standard, deployable React application while the **Field Unit (Chrome Extension)** exists as a self-contained, high-performance security primitive.

### 1.1 The Source of Truth
The root directories `/services/` and `/utils/` serve as the **Neural Hub**. All security heuristics, validation logic, and AI integration patterns are authored here in **TypeScript** first.

### 1.2 The Field Unit Silo
The `/VIGIL-FIELD-UNIT/` directory is an isolated environment. During the manifestation process, it receives flattened **ES6 JavaScript** versions of the Neural Hub logic.
- **Silo Segregation**: This directory explicitly ignores source `.tsx` files and only tracks output `.js` files to ensure browser runtime compliance and prevent execution errors.

---

## 2. DIRECTORY STRUCTURE

```text
/ (Project Root)
├── services/                  # SHARED (TS): Core Intelligence (Gemini, Reputation)
├── utils/                     # SHARED (TS): Logical Primitives (Validators, Diffs)
├── components/                # WEBSITE (TSX): UI Components
├── VIGIL-FIELD-UNIT/          # EXTENSION SILO (JS Only)
│   ├── manifest.json          # Identity & Permissions
│   ├── popup/                 # Tray UI (Compiled JS)
│   ├── background/            # Service Worker (Guardian JS)
│   ├── content/               # Retinal Shield (DOM Observer JS)
│   ├── core/                  # Shadow Sync: Flattened JS copies of Hub logic
│   └── assets/                # Isolated Icons & Branding
├── EXTENSION_ARCHITECTURE.md  # This document
├── VIGIL_CONTEXT.md           # Master Project Context
├── App.tsx                    # Website Entry Point
└── index.html                 # Platform Bridge (Import Maps)
```

---

## 3. MODULE GOVERNANCE

### 3.1 Shared Intelligence Modules (The Brain)
These files provide identical security heuristics to both platforms.
- `geminiService.ts`: Facilitates cognitive autopsy and reputation synthesis.
- `addressValidator.ts`: High-performance regex and Base58 validation.
- `addressDiff.ts`: Character collision and entropy deviation analysis.

### 3.2 Platform-Specific Logic
- **Website**: Employs "Virtual Mirror" components (e.g., `FieldUnitHub.tsx`) to simulate extension behavior for operator training.
- **Extension**: Employs `chrome.storage.local` and `MutationObserver` for persistent, non-intrusive monitoring of the browser lifecycle.

---

## 4. DEPLOYMENT PROTOCOLS

### 4.1 Website Deployment (The Command Center)
- **Target**: Standard Web Host.
- **Process**: Deploy the root folder as a standard React/TypeScript project. 
- **Integrity**: The website ignores the `VIGIL-FIELD-UNIT/` folder during its build process.

### 4.2 Extension Deployment (The Field Unit)
- **The Transpilation Mandate**: 
    1.  Source authored in **TypeScript** within the Neural Hub.
    2.  Transpiled to **ES6 JavaScript** to satisfy Chrome runtime requirements.
    3.  Flattened and mirrored to `/VIGIL-FIELD-UNIT/core/`.
- **The "Manifestation" Step**: 
    1.  Transpile and copy `services/` and `utils/` into `VIGIL-FIELD-UNIT/core/` as `.js`.
    2.  Update internal paths in the extension scripts to point to `./core/`.
    3.  Zip only the `VIGIL-FIELD-UNIT/` folder.
- **Independence**: The resulting package has zero references to the root-level source files, ensuring absolute reliability.

---

## 5. TECHNICAL SAFEGUARDS

### 5.1 Import Map Parity
The root `index.html` maintains a canonical `importmap`. Both the website and the extension (during simulation) must use identical library versions (React 19, Google GenAI SDK) to prevent "Verdict Divergence."

### 5.2 State Isolation
- **Website**: Uses `localStorage`.
- **Extension**: Uses `chrome.storage.local`.

### 5.3 Style Encapsulation
The extension UI utilizes **Shadow DOM** and scoped CSS to preserve the "Sovereign Tactical" aesthetic across all dApps without style bleed.

---

## 6. MAINTENANCE DIRECTIVE
As the AI Agent, I am tasked with **Neural Parity Governance**. Any update to a shared utility in the root must be immediately mirrored in the `VIGIL-FIELD-UNIT/core/` directory as compiled JavaScript before a release is finalized.

---

## 7. NEURAL PARITY ENFORCEMENT
To prevent verdict divergence, the following verification steps are mandatory during development:
1. **Source Sync**: Verify that the contents of `/core` in the extension directory are bit-perfect JavaScript mirrors of the root TypeScript source logic.
2. **Checksum Verification**: Automated build-time check to compare SHA-256 hashes of the logic flow between the Neural Hub and the Field Unit core.
3. **Logic Validation**: Test the website's "Virtual Mirror" against the actual Extension background script using identical threat inputs.
4. **Parity Sign-off**: No logic update is complete until parity is confirmed across both operational surfaces.

## 8. Transparency Governance
The Shadow Sync protocol is governed by the **Communication Transparency Protocol (CTP)**. No synchronization between the Neural Hub and the Field Unit is considered verified until a **Registry Update Report (RUR)** has been issued and acknowledged.

- **Audit Process**: The operator should cross-reference the RUR's "Logical Deltas" against the physical file updates in the `/VIGIL-FIELD-UNIT/` silo.
- **Genetic Integrity**: The RUR ensures that the "Genetic Code" of the system remains human-readable and verifiable at every stage of manifestation.

---
*VIGILANCE IS THE ONLY PERMANENT SHIELD.*