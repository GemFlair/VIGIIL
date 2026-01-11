
export interface TIMAxes {
  vsi: number; // Visual Similarity
  edi: number; // Entropy Deviation (VCI - Vanity Cluster Index)
  pdi: number; // Provenance Depth
  cri: number; // Context Risk
  ipi: number; // Interaction Pattern
  rii: number; // Registry Integrity
  eii: number; // Execution Integrity
}

/**
 * Calculates the composite threat level.
 * High entropy deviation (VCI) triggers an immediate critical override.
 */
export function calculateCompositeThreat(axes: TIMAxes): number {
  // CRITICAL OVERRIDES: Registry, Execution, or high Vanity Cluster signatures
  if (axes.rii === 100 || axes.eii === 100 || axes.edi >= 90) return 100;

  const score = (
    (axes.vsi || 0) * 0.25 + // Visual Similarity Weight
    (axes.edi || 0) * 0.20 + // VCI: Entropy Deviation weight
    (axes.pdi || 0) * 0.15 +
    (axes.cri || 0) * 0.15 +
    (axes.ipi || 0) * 0.10 +
    (axes.rii || 0) * 0.10 +
    (axes.eii || 0) * 0.05
  );

  return Math.round(Math.min(100, score));
}

export function getAxesFromVerdict(verdict: string): TIMAxes {
  const presets: Record<string, TIMAxes> = {
    POISON: { vsi: 98, edi: 95, pdi: 50, cri: 40, ipi: 80, rii: 0, eii: 0 },
    SPOOF: { vsi: 100, edi: 90, pdi: 100, cri: 40, ipi: 10, rii: 0, eii: 0 },
    SIMILARITY: { vsi: 85, edi: 75, pdi: 30, cri: 30, ipi: 10, rii: 0, eii: 0 },
    NEW: { vsi: 10, edi: 0, pdi: 100, cri: 30, ipi: 10, rii: 0, eii: 0 },
    TRUSTED: { vsi: 5, edi: 0, pdi: 10, cri: 0, ipi: 0, rii: 0, eii: 0 }
  };
  return presets[verdict] || presets.NEW;
}
