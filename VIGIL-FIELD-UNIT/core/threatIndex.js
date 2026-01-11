// VIGIL CORE: THREAT MATRIX CALCULATION ENGINE
// VERSION: 1.2.0 (PARITY_SYNC_DEFINITIVE)
// AXIS WEIGHTS: VSI(0.20), EDI(0.15), PDI(0.15), CRI(0.15), IPI(0.15), RII(0.10), EII(0.10)

/**
 * Calculates the composite threat index (0-100%)
 * Incorporates critical overrides for Registry (RII) and Execution (EII) layers.
 */
export function calculateCompositeThreat(axes) {
  // CRITICAL OVERRIDES: Registry failure or Execution interception (Clipboard swap) triggers immediate 100%
  if (axes.rii >= 100 || axes.eii >= 100) return 100;

  const score = (
    (axes.vsi || 0) * 0.20 + // Visual Similarity
    (axes.edi || 0) * 0.15 + // Entropy Deviation (VCI)
    (axes.pdi || 0) * 0.15 + // Provenance Depth
    (axes.cri || 0) * 0.15 + // Context Risk
    (axes.ipi || 0) * 0.15 + // Interaction Pattern
    (axes.rii || 0) * 0.10 + // Registry Integrity
    (axes.eii || 0) * 0.10   // Execution Integrity
  );

  return Math.round(Math.min(100, score));
}

/**
 * Maps categorical verdicts to Diagnostic Matrix axis scores.
 * Exact 1:1 parity with IntentValidatorDemo.tsx
 */
export function getAxesFromVerdict(verdict) {
  const presets = {
    TRUSTED: { vsi: 5, edi: 0, pdi: 10, cri: 0, ipi: 0, rii: 0, eii: 0 },
    POISON: { vsi: 95, edi: 90, pdi: 50, cri: 30, ipi: 80, rii: 0, eii: 0 },
    PHISHING: { vsi: 30, edi: 0, pdi: 100, cri: 100, ipi: 0, rii: 0, eii: 0 },
    DUST: { vsi: 50, edi: 40, pdi: 60, cri: 30, ipi: 100, rii: 0, eii: 0 },
    NEW: { vsi: 10, edi: 0, pdi: 100, cri: 30, ipi: 10, rii: 0, eii: 0 },
    SIMILARITY: { vsi: 85, edi: 60, pdi: 30, cri: 30, ipi: 10, rii: 0, eii: 0 },
    MINT: { vsi: 20, edi: 0, pdi: 80, cri: 30, ipi: 10, rii: 100, eii: 0 },
    CLIPBOARD: { vsi: 10, edi: 0, pdi: 70, cri: 90, ipi: 10, rii: 0, eii: 100 },
    SPOOF: { vsi: 100, edi: 95, pdi: 100, cri: 40, ipi: 10, rii: 0, eii: 0 }
  };
  return presets[verdict] || presets.NEW;
}