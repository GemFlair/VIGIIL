import React from 'react';
import { Target, History } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

export interface ChronicleVideo {
  day: number;
  era: string;
  theme: string;
  script: string;
  visualPrompt: string;
  metadata: {
    location: string;
    riskFactor: string;
    outcome: string;
  };
}

export interface TacticalGif {
  id: string;
  theme: string;
  script: string;
  visualPrompt: string;
  metadata: {
    type: string;
    loop: string;
  };
}

export const GIF_VAULT: TacticalGif[] = [
  {
    id: 'GIF_01',
    theme: 'The Illusion of Clarity',
    script: 'Tactical Loop 01: The Substitution. Watch the center entropy. A violent digital glitch swaps the middle characters to Hazard Red while the blue edges remain frozen. The trap is signed in the blind spot.',
    visualPrompt: "Create a 6-second cinematic tactical motion loop. High-contrast monolithic zinc background (#050505). A wallet address 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90' is centered. The first 4 'Ab1C' and last 4 'Zz90' characters glow with static blue tactical light and remain strictly frozen. Every 2 seconds, a violent digital glitch ripple clears the middle characters, visibly swapping them for a completely different set of hazard-red, flickering characters. The blue edges never move or change, acting as fixed anchors. Small condensed italic text in the bottom right corner rapidly flips between 'Looks right.' (in blue) and 'TRAP DETECTED' (in red) in sync with the middle characters changing. Professional hardware sensor aesthetic with heavy film grain.",
    metadata: { type: "Tactical GIF", loop: "Seamless" }
  }
];

export const CHRONICLES: ChronicleVideo[] = [
  {
    day: 1,
    era: "2026 // THE AWAKENING",
    theme: "The Illusion of Clarity",
    script: "Log 01. The first step of the attack is psychological. You verify the edges—the first 4, the last 4. [GLITCH] But in the center, a substitution occurs. While your retina holds the blue anchors, the middle is swapped for poison. Fifty million dollars just changed hands. Watch the gap. STATUS: [POISON_SUBSTITUTION_DETECTED]",
    visualPrompt: "Create a 6-second cinematic tactical motion loop. High-contrast monolithic zinc background (#050505). A wallet address 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90' is centered. The first 4 'Ab1C' and last 4 'Zz90' characters glow with static blue tactical light and remain strictly frozen. Every 2 seconds, a violent digital glitch ripple clears the middle characters, visibly swapping them for a completely different set of hazard-red, flickering characters. The blue edges never move or change, acting as fixed anchors. Small condensed italic text in the bottom right corner rapidly flips between 'Looks right.' (in blue) and 'TRAP DETECTED' (in red) in sync with the middle characters changing. Professional hardware sensor aesthetic with heavy film grain.",
    metadata: { location: "The Retinal Layer", riskFactor: "Cognitive Truncation", outcome: "Intent Intercepted" }
  },
  {
    day: 2,
    era: "2018 // IDEX DAYS",
    theme: "The UI Trap",
    script: "Log 02. The early DEX days. IDEX. It felt like hacking the future. [PAUSE] We were signing transactions into a black box, trusting an interface that looked like a terminal from the 80s. [GLITCH] One wrong click. One misaligned row. I lost half a year's savings because I trusted a button. I thought the system checked my work. It didn't. STATUS: [UX_FAILURE_DETECTED]",
    visualPrompt: "Close up of shaky hands typing on a mechanical keyboard in a dark room. CRT monitor in background showing flickering white terminal text on a black screen. VHS glitch effects.",
    metadata: { location: "Decentralized Node", riskFactor: "Interface Obfuscation", outcome: "Capital Erosion" }
  },
  {
    day: 3,
    era: "2019 // THE NEW ZEALAND COLD",
    theme: "Cryptopia Closure",
    script: "Log 03. Cryptopia. A safe harbor in New Zealand, or so we thought. [PAUSE] I woke up on a Tuesday. The login screen was a ghost. No support ticket. No withdrawal button. Just a static message and a cold realization. [GLITCH] My private keys weren't mine. My assets were part of the permafrost now. Lesson two: If the exit is a button, it can be deleted. STATUS: [CUSTODIAL_ERASURE]",
    visualPrompt: "Cinematic wide shot of a snowy mountain range at dusk. A single red '404 NOT FOUND' error message floats in the center of the frame like a holographic ghost. Deep shadows.",
    metadata: { location: "Christchurch, NZ", riskFactor: "Centralized Custody", outcome: "Total Asset Forfeiture" }
  },
  {
    day: 4,
    era: "2020 // THE INFLUENCE",
    theme: "The Twitter Mirage",
    script: "Log 04. 2020. I had a following now. I felt like a veteran because I survived the first winter. [PAUSE] Private sales. DM groups. The promise of early access. We felt like insiders. [GLITCH] We weren't insiders; we were just higher-value targets. I started sending funds to 'Official' addresses pinned in Telegram groups. I didn't see the poison being prepared. STATUS: [SOCIAL_VECTOR_ARMED]",
    visualPrompt: "Silhouette of a man staring at a wall of glowing smartphones in a dark room. Each screen shows a different X (Twitter) profile. Blue light washing over his face. Cinematic bokeh.",
    metadata: { location: "The Social Layer", riskFactor: "Authority Bias", outcome: "Target Acquisition" }
  },
  {
    day: 5,
    era: "2020 // THE COVID CRASH",
    theme: "1/20th Remaining",
    script: "Log 05. March. The world stopped. The charts followed. [PAUSE] By the time the dust settled, I had one-twentieth of my initial investment left. Nineteen parts of my belief were gone. [GLITCH] Most people left. I stayed. I believed the math, but I was beginning to fear the humans. This was the moment naivety died. The real fight was about to begin. STATUS: [SURVIVAL_MODE_INIT]",
    visualPrompt: "A single glowing emerald coin sinking slowly into a thick black liquid. Red flashes in the background. High contrast lighting, 8K octane render style, dramatic slow motion.",
    metadata: { location: "The Abyss", riskFactor: "Systemic Contagion", outcome: "95% Drawdown" }
  },
  {
    day: 15,
    era: "2022 // THE INSTITUTIONAL BETRAYAL",
    theme: "The LUNA/FTX Eclipse",
    script: "Log 15. The Professional Illusion. We thought we were safe with the giants. LUNA fell in days. FTX vanished in hours. 20% of my life's work... gone. It wasn't just money. It was the belief that 'Big Crypto' had our backs.",
    visualPrompt: "A monolithic glass skyscraper shattering in slow motion, fragments turning into red falling candles. High-end architectural visualization, dark overcast sky, raining digital code, cinematic depth of field.",
    metadata: { location: "The Void", riskFactor: "Systemic Contagion", outcome: "-20% Portfolio" }
  },
  {
    day: 30,
    era: "2026 // THE FINAL PERIMETER",
    theme: "Birth of Layer 0.5",
    script: "Log 30. December. Fifty million dollars lost to a simple poison attack. Cryptography didn't fail. The human did. That was the day I stopped being a victim and became the architect. Welcome to VIGIL. The bridge is now secure.",
    visualPrompt: "The VIGIL Emerald Monolith rising from a sea of chaotic red code. An eye opens in the center of the monolith. Absolute geometric precision, zero grain, 8K Octane render, sovereign tactical aesthetic.",
    metadata: { location: "The Bridge", riskFactor: "Neutralized", outcome: "Permanent Shield" }
  }
];

export const ChronicleNarrativeLibrary: React.FC = () => {
  return (
    <div className="space-y-12 pb-32">
      <div className="flex items-center gap-4 border-b border-zinc-900 pb-8">
        <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
           <History className="w-6 h-6 text-blue-500" />
        </div>
        <div>
           <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Chronicle Repository.</h3>
           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">30 Days of Sovereignty // Act I: Genesis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHRONICLES.map((v) => (
          <div key={v.day} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] space-y-6 hover:border-blue-500/30 transition-all group">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest italic">Day {v.day < 10 ? `0${v.day}` : v.day}</div>
                   <h4 className="text-xl font-black text-white uppercase italic">{v.theme}</h4>
                </div>
                <TechLabel text={v.era} color="blue" />
             </div>
             
             <div className="p-6 bg-black border border-zinc-900 rounded-2xl">
                <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase tracking-tight">
                  <span className="text-blue-600 mr-2">[TTS_SCRIPT]:</span>
                  "{v.script}"
                </p>
             </div>

             <div className="space-y-3">
                <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                   <Target size={12} /> Visual Directive (Veo 3.1)
                </div>
                <p className="text-[10px] text-zinc-500 italic leading-relaxed bg-black/40 p-4 rounded-xl border border-zinc-900">
                   {v.visualPrompt}
                </p>
             </div>
             
             <div className="pt-4 border-t border-zinc-900 flex justify-between">
                <div className="space-y-1">
                   <div className="text-[7px] font-black text-zinc-600 uppercase">Risk Factor</div>
                   <div className="text-[9px] font-bold text-red-500 uppercase italic">{v.metadata.riskFactor}</div>
                </div>
                <div className="space-y-1 text-right">
                   <div className="text-[7px] font-black text-zinc-600 uppercase">Outcome</div>
                   <div className="text-[9px] font-bold text-white uppercase italic">{v.metadata.outcome}</div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};