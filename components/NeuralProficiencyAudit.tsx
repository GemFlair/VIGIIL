import React, { useState, useEffect } from 'react';
import { Shield, Brain, Lock, Eye, Zap, ChevronRight, CheckCircle2, AlertTriangle, Terminal, Info, BarChart3, Binary, Target, Activity, ShieldCheck, RefreshCcw, LogOut } from 'lucide-react';
// Added import for TechLabel and TechNote
import { TechLabel, TechNote } from './docs/DocHelpers';

interface Question {
  id: number;
  sector: string;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  // SECTOR 01: SOVEREIGNTY
  { id: 1, sector: "Sovereignty", text: "Layer 0.5 security operates between which two primary layers?", options: ["User Interface & Operating System", "Human Intent & Cryptographic Execution", "Protocol Consensus & Finality", "Local Storage & Cloud DB"], correct: 1, explanation: "VIGIL acts at the 'Retinal Layer'—securing what you believe you are doing before you sign." },
  { id: 2, sector: "Sovereignty", text: "Why is the VIGIL standard designated as 'Layer 0.5'?", options: ["It is half-speed execution", "It is 50% automated", "It sits between UI (L0) and Execution (L1)", "It requires 0.5 SOL to activate"], correct: 2, explanation: "It occupies the crucial gap between the visual representation and the technical payload." },
  { id: 3, sector: "Sovereignty", text: "What is the primary objective of 'Intent Validation'?", options: ["Faster transaction speeds", "Predicting market moves", "Ensuring visual trust aligns with reality", "Automating complex smart contracts"], correct: 2, explanation: "Validating that the destination you see is the destination your wallet will sign." },
  { id: 4, sector: "Sovereignty", text: "Does the Layer 0.5 standard ever handle your private keys?", options: ["Yes, for encryption", "Only during Pro setup", "Never", "Temporarily during transfer"], correct: 2, explanation: "Architectural isolation ensures VIGIL is an advisory layer, never a custodian." },
  { id: 5, sector: "Sovereignty", text: "What is an 'Intent Mismatch'?", options: ["A failed transaction", "The gap between what you see and what you sign", "An incorrect password", "A network timeout"], correct: 1, explanation: "When an attacker swaps an address to exploit your visual trust in the UI." },

  // SECTOR 02: TOXICOLOGY
  { id: 6, sector: "Toxicology", text: "The '8-Character Blind Spot' refers to which parts of an address?", options: ["The first 8 characters", "The last 8 characters", "First 4 and last 4 characters", "Random 8 in the middle"], correct: 2, explanation: "Users rarely verify the 'Noise' middle, focusing only on the familiar edges." },
  { id: 7, sector: "Toxicology", text: "How is 'Address Poisoning' primarily executed?", options: ["Social engineering", "Injecting look-alike addresses into history", "Hacking the Phantom wallet", "DDoS attacks"], correct: 1, explanation: "Attackers rely on you mis-selecting a mimic from your recent transaction feed." },
  { id: 8, sector: "Toxicology", text: "What is the purpose of a 'Dust Transfer' in an attack?", options: ["To steal small amounts", "To hide the attacker's IP", "To place an address in your transaction logs", "To slow down the network"], correct: 2, explanation: "Dust is a trojan horse that positions the attacker's address for future errors." },
  { id: 9, sector: "Toxicology", text: "What defines a 'Unicode Spoofing' attempt?", options: ["Using binary code", "Using look-alike characters (Greek ο vs Latin o)", "Encryption of addresses", "Hidden text in documentation"], correct: 1, explanation: "Unicode homographs exploit the eye's inability to distinguish between identical glyphs." },
  { id: 10, sector: "Toxicology", text: "What is a 'Visual Collision'?", options: ["Two wallets crashing", "When two identical addresses exist", "A mimic address sharing the same edges as a trusted one", "A display error in the explorer"], correct: 2, explanation: "A high-fidelity vanity address that generates a visual match for your history." },

  // SECTOR 03: BIOMETRICS
  { id: 11, sector: "Biometrics", text: "What is the average human visual verification window?", options: ["0.2 seconds", "1.2 seconds", "5.0 seconds", "10 seconds"], correct: 1, explanation: "The 1.2s window is the 'Biological Bypass' threshold where scrutiny fails." },
  { id: 12, sector: "Biometrics", text: "What are 'Saccades' in relation to security?", options: ["Encrypted keys", "Rapid eye movements between fixations", "Address fragments", "Smart contract functions"], correct: 1, explanation: "Attacks exploit the saccadic masking gap where the brain 'fills in' missing data." },
  { id: 13, sector: "Biometrics", text: "What is the primary cause of 'Cognitive Bypass'?", options: ["Poor internet connection", "Confusing wallet UIs", "Routine and high confidence", "Low battery"], correct: 2, explanation: "Confidence breeds routine, which reduces the frequency of manual verification." },
  { id: 14, sector: "Biometrics", text: "Users are most likely to verify which parts of a 44-char address?", options: ["The middle characters", "The entire string", "The first and last 4 characters", "Only the middle"], correct: 2, explanation: "94% of users rely on edge-verification shortcuts, leaving the center exposed." },
  { id: 15, sector: "Biometrics", text: "How does 'Saccadic Depth' audit measure vulnerability?", options: ["Measuring typing speed", "Tracking how much of the payload you actually scan", "Testing memory", "Network latency check"], correct: 1, explanation: "It maps the 'Attentional Blind Spots' where your brain assumes safety." },

  // SECTOR 04: PRIVACY
  { id: 16, sector: "Privacy", text: "Where does VIGIL store your 'Local Trust Graph'?", options: ["Amazon AWS Servers", "VIGIL Master Cloud", "Local Browser IndexedDB", "Encrypted TX Logs"], correct: 2, explanation: "Local-first processing ensures your interaction history never leaves your device." },
  { id: 17, sector: "Privacy", text: "Does VIGIL transmit your interaction history to external servers?", options: ["Yes, for syncing", "Only in Pro mode", "Never", "Only if an attack occurs"], correct: 2, explanation: "Zero-knowledge localized processing is the VIGIL standard." },
  { id: 18, sector: "Privacy", text: "What is the primary benefit of Local-First security?", options: ["Faster load times", "Data sovereignty and privacy", "Lower protocol fees", "Offline access"], correct: 1, explanation: "No server-side database means no central point of failure for your history." },
  { id: 19, sector: "Privacy", text: "What is the 'Sentinel Mesh'?", options: ["A hardware wallet", "Anonymized global threat signals", "A group of validators", "A cloud backup"], correct: 1, explanation: "Synthesis of global intercepts into a collective defense for all nodes." },
  { id: 20, sector: "Privacy", text: "Reputation Synthesis uses which data source?", options: ["Your private history", "Sentinel Mesh collective telemetry", "Solscan API only", "Google Search trends"], correct: 1, explanation: "Collective intelligence identifies clusters without exposing individual users." },

  // SECTOR 05: ADVERSARIAL
  { id: 21, sector: "Adversarial", text: "How are modern high-fidelity mimics generated?", options: ["Manually", "GPU-accelerated vanity clusters", "AI Chatbots", "Cloud-mining"], correct: 1, explanation: "Attackers use high-density compute to brute-force addresses that match your history." },
  { id: 22, sector: "Adversarial", text: "What is 'Temporal Poisoning'?", options: ["Slowing down the blockchain", "Waiting weeks before a target transaction occurs", "Expiring private keys", "Outdated software"], correct: 1, explanation: "Injecting dust and waiting 14-21 days for legitimate history to bury the mimic." },
  { id: 23, sector: "Adversarial", text: "What does the 'Entropy Collider' stress-test?", options: ["Network throughput", "Biological endurance under high-velocity load", "GPU cooling", "Encryption strength"], correct: 1, explanation: "Testing the limits of human vigilance during massive packet injection." },
  { id: 24, sector: "Adversarial", text: "Why is 'Smart Contract Dusting' dangerous?", options: ["It costs more fees", "It bypasses standard 'Sender' verification UI", "It hacks the contract", "It drains the wallet"], correct: 1, explanation: "The transfer appears from a trusted address, even if initiated by an attacker." },
  { id: 25, sector: "Adversarial", text: "What is the ultimate permanent shield in the VIGIL system?", options: ["The Pro Extension", "Hardware wallets", "Human Layer Vigilance", "Advanced Encryption"], correct: 2, explanation: "Technology is the filter, but your vigilance remains the final security primitive." }
];

export const NeuralProficiencyAudit: React.FC<{ onCompleteExit: () => void }> = ({ onCompleteExit }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const current = QUESTIONS[currentIdx];
  const totalCorrect = Object.entries(answers).filter(([id, ans]) => ans === QUESTIONS[parseInt(id)-1].correct).length;
  const progressPercent = (Object.keys(answers).length / QUESTIONS.length) * 100;
  const clarityPercent = (totalCorrect / QUESTIONS.length) * 100;

  const handleAnswer = (optionIdx: number) => {
    if (answers[current.id] !== undefined) return;
    setAnswers(prev => ({ ...prev, [current.id]: optionIdx }));
    setShowFeedback(true);
    if (optionIdx === current.correct) setScore(s => s + 1);
  };

  const jumpTo = (idx: number) => {
    setCurrentIdx(idx);
    setShowFeedback(false);
  };

  const isComplete = Object.keys(answers).length === QUESTIONS.length;

  return (
    <section id="neural-audit" className="px-6 md:px-20 py-24 bg-[#020202] relative z-10 overflow-hidden border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-xl">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-500 animate-pulse" />
                </div>
                <div className="space-y-1">
                   <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Final Checkpoint // Audit</span>
                   <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Neural Proficiency.</h2>
                </div>
             </div>
             <p className="text-zinc-500 text-lg font-medium italic leading-relaxed">
               "Verify your calibration against the VIGIL human-layer standard. Precision in theory precedes safety in execution."
             </p>
          </div>

          <div className="w-full lg:w-80 p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-6 shadow-2xl">
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Neural Clarity</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{Math.round(clarityPercent)}%</span>
             </div>
             <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                <div className="h-full bg-cyan-500 shadow-[0_0_15px_cyan] transition-all duration-1000" style={{ width: `${clarityPercent}%` }} />
             </div>
             <div className="flex justify-between items-center px-1">
                <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest">Progress: {Object.keys(answers).length}/25</p>
                {isComplete && <div className="text-[9px] font-black text-emerald-500 uppercase italic animate-pulse">Audit Verified</div>}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           
           {/* SYNC BUS - NAVIGATION */}
           <div className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] space-y-8">
                 <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] border-b border-zinc-900 pb-4 flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Sync Bus
                 </div>
                 <div className="grid grid-cols-5 gap-3">
                    {QUESTIONS.map((q, idx) => {
                      const isAnswered = answers[q.id] !== undefined;
                      const isCorrect = isAnswered && answers[q.id] === q.correct;
                      const isActive = currentIdx === idx;
                      
                      return (
                        <button 
                          key={q.id}
                          onClick={() => jumpTo(idx)}
                          className={`aspect-square rounded-xl border flex items-center justify-center text-[11px] font-black transition-all duration-300 relative group ${
                            isActive ? 'bg-white border-white text-black scale-110 shadow-lg' : 
                            isAnswered ? (isCorrect ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500' : 'bg-red-500/10 border-red-500/40 text-red-500') : 
                            'bg-zinc-950 border-zinc-900 text-zinc-700 hover:border-zinc-700'
                          }`}
                        >
                           {q.id}
                           {isActive && <div className="absolute -inset-1 border border-white/20 rounded-2xl animate-ping opacity-20" />}
                        </button>
                      );
                    })}
                 </div>
                 <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Correct Output
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Anomalous Signal
                    </div>
                 </div>
              </div>

              {/* Fixed TechNote undefined error */}
              <TechNote title="NARRATIVE SECTOR">
                 {current.sector.toUpperCase()} MODULE v1.0.2
              </TechNote>
           </div>

           {/* MAIN TERMINAL */}
           <div className="lg:col-span-8">
              <div className={`relative min-h-[500px] bg-[#080808] border-2 rounded-[3.5rem] p-12 md:p-16 overflow-hidden transition-all duration-700 flex flex-col justify-center ${answers[current.id] !== undefined ? (answers[current.id] === current.correct ? 'border-emerald-500/20' : 'border-red-500/20') : 'border-zinc-900'}`}>
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
                 
                 <div className="relative z-10 space-y-12">
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          {/* Fixed TechLabel undefined error */}
                          <TechLabel text={`SECTOR: ${current.sector.toUpperCase()}`} color="blue" />
                          <div className="h-[1px] w-8 bg-zinc-900" />
                          <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Q_FRAGMENT_{current.id < 10 ? `0${current.id}` : current.id}</span>
                       </div>
                       <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-tight">
                         {current.text}
                       </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {current.options.map((opt, i) => {
                         const isAnswered = answers[current.id] !== undefined;
                         const isSelected = answers[current.id] === i;
                         const isCorrect = i === current.correct;
                         
                         let stateStyles = "bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-blue-500/40 hover:text-zinc-300";
                         if (isAnswered) {
                            if (isSelected) stateStyles = isCorrect ? "bg-emerald-500 border-emerald-400 text-white shadow-lg" : "bg-red-600 border-red-500 text-white shadow-lg";
                            else if (isCorrect) stateStyles = "bg-emerald-500/10 border-emerald-500/40 text-emerald-500";
                            else stateStyles = "bg-black border-zinc-900 text-zinc-800 opacity-40";
                         }

                         return (
                           <button 
                            key={i} 
                            onClick={() => handleAnswer(i)}
                            disabled={isAnswered}
                            className={`p-6 rounded-2xl border-2 text-left text-sm font-bold uppercase tracking-tight transition-all duration-300 flex items-center justify-between group ${stateStyles}`}
                           >
                              {opt}
                              {!isAnswered && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />}
                              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                              {isAnswered && isSelected && !isCorrect && <AlertTriangle className="w-5 h-5" />}
                           </button>
                         );
                       })}
                    </div>

                    {showFeedback && (
                       <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                          <div className={`p-8 rounded-3xl border-l-4 space-y-3 ${answers[current.id] === current.correct ? 'bg-emerald-500/5 border-emerald-500/40' : 'bg-red-500/5 border-red-500/40'}`}>
                             <div className="flex items-center gap-3">
                                <Info className={`w-4 h-4 ${answers[current.id] === current.correct ? 'text-emerald-500' : 'text-red-500'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${answers[current.id] === current.correct ? 'text-emerald-500' : 'text-red-500'}`}>
                                   Intel Briefing
                                </span>
                             </div>
                             <p className="text-zinc-400 text-base font-medium italic leading-relaxed">
                                "{current.explanation}"
                             </p>
                          </div>
                          
                          <div className="mt-8 flex justify-end">
                             <button 
                               onClick={() => jumpTo(currentIdx < QUESTIONS.length - 1 ? currentIdx + 1 : currentIdx)}
                               className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 ${
                                 currentIdx === QUESTIONS.length - 1 ? 'hidden' : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                               }`}
                             >
                               Next Fragment <ChevronRight className="w-4 h-4" />
                             </button>
                          </div>
                       </div>
                    )}
                 </div>

                 {/* FINAL DISENGAGE BUTTON */}
                 {isComplete && (
                   <div className="absolute inset-0 z-50 bg-[#020202]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center space-y-12 animate-in zoom-in duration-700">
                      <div className="relative">
                         <div className="w-32 h-32 rounded-full border-2 border-emerald-500/30 flex items-center justify-center animate-pulse">
                            <ShieldCheck className="w-16 h-16 text-emerald-500" />
                         </div>
                         <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center font-black italic">25/25</div>
                      </div>
                      
                      <div className="space-y-4">
                         <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">Calibration <br/> Verified.</h3>
                         <p className="text-zinc-500 text-lg max-w-md mx-auto italic">
                           "Your neural clarity is now synchronized with the VIGIL 0.5 Layer standard. Secure disengagement protocol available."
                         </p>
                      </div>

                      <div className="flex gap-4">
                         <button 
                            onClick={() => jumpTo(0)}
                            className="px-10 py-5 bg-zinc-950 border border-zinc-900 rounded-2xl text-[11px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-all flex items-center gap-3"
                         >
                            <RefreshCcw className="w-4 h-4" /> RE-AUDIT
                         </button>
                         <button 
                            onClick={onCompleteExit}
                            className="px-12 py-5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] shadow-[0_0_50px_rgba(16,185,129,0.2)] hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group"
                         >
                            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> SECURE DISENGAGE
                         </button>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};