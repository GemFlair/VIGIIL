
export enum VigilSection {
  HOME = 'HOME',
  TERMINAL = 'TERMINAL',
  TRANSPARENCY = 'TRANSPARENCY'
}

export enum ProjectStep {
  VISION = 'VISION',
  STRUCTURE = 'STRUCTURE',
  DESIGN = 'DESIGN',
  CODE = 'CODE'
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'POISONING_ATTEMPT' | 'VISUAL_SPOOF' | 'PHISHING_SHIELD' | 'CONTRACT_MISMATCH';
  status: 'MITIGATED' | 'INTERCEPTED' | 'FLAGGED';
  details: string;
}

export interface VigilAppState {
  currentSection: VigilSection;
  events: SecurityEvent[];
}
