import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, ShieldCheck, Zap, Search, Fingerprint, Activity, 
  Eye, MousePointer2, AlertTriangle, Binary, Scan, 
  AlertOctagon, CheckCircle2, Lock, Terminal, Layers, 
  ExternalLink, Sparkles, Filter, Globe
} from 'lucide-react';
import { DocCard, TechLabel, TechNote } from './docs/DocHelpers';
import { WarningOverlay } from './WarningOverlay';

export const SentinelControlDeck: React.FC = () => {
  const [activeSim, setActiveSim] = useState<string | null>(null);
  const [tokenMint, setTokenMint] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'SAFE' | 'MALICIOUS' | null>(null);
  const [sanitizerView, setSanitizerView] = useState<'STANDARD' | 'VIGIL'>('STANDARD');
  
  const simulationRef = useRef<HTMLDivElement>(null);
  const warningOverlay = new WarningOverlay();

  const handleSimTrigger = (type: string) => {
    if (!simulationRef.current) return;
    const container = simulationRef.current;
    
    if (type === 'POISON') {
      warningOverlay.showPoisoningWarning(
        "Ab1C00000000000000000000000000Zz90",
        "Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90",
        container
      );
    } else if (type === 'PHISHING') {
      setActiveSim('PHISHING');
      setTimeout(() => setActiveSim(null), 3000);
    }
  };

  const handleMintScan = () => {
    if (!tokenMint) return;
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      const isFake = tokenMint.toLowerCase().includes('fake') || tokenMint.length < 32;
      setScanResult(isFake ? 'MALICIOUS' : 'SAFE');
      setIsScanning(false);
    }, 2500);
  };

  const mockTransactions = [
    { id: 1, type: 'SEND', addr: 'EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3', amount: '1,000 USDC', isPoison: false },
    { id: 2, type: 'RCV', addr: 'EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3', amount: '0.00001 USDC', isPoison: true },
    { id: 3, type: 'SEND', addr: 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90', amount: '10 SOL', isPoison: false },
    { id: 4, type: 'RCV', addr: 'Ab1C00000000000000000000000000Zz90', amount: '0 SOL', isPoison: true },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 space-y-16">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* MODULE 1: ASSET AUTHENTICITY SCANNER */}
        <div className="lg:col-span-7">
          <DocCard border="cyan" glow>
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-600/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center">
                    <Binary className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Asset Authenticity</h3>
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Verify Token Mint Integrity</p>
                  </div>
                </div>
                <TechLabel text="MESH_VERIFIED" color="cyan" />
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Input Token Mint Address</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={tokenMint}
                      onChange={(e) => setTokenMint(e.target.value)}
                      placeholder="ENTER MINT ADDRESS..."
                      className="flex-1 bg-black border border-zinc-800 rounded-xl px-6 py-4 text-xs font-mono text-white focus:border-cyan-500 outline-none uppercase transition-all"
                    />
                    <button 
                      onClick={handleMintScan}
                      disabled={isScanning || !tokenMint}
                      className="px-8 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-30"
                    >
                      {isScanning ? <Activity className="w-4 h-4 animate-spin" /> : 'SCAN'}
                    </button>
                  </div>
                </div>

                <div className={`relative h-48 bg-zinc-950/50 border border-zinc-900 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${scanResult === 'MALICIOUS' ? 'border-red-600/40 bg-red-600/5' : scanResult === 'SAFE' ? 'border-emerald-600/40 bg-emerald-600/5' : ''}`}>
                   {isScanning && (
                     <div className="absolute inset-x-0 h-1 bg-cyan-500/40 blur-[2px] animate-[scan-vertical_2s_linear_infinite] z-20" />
                   )}
                   
                   {!scanResult && !isScanning && (
                     <div className="text-center space-y-3 opacity-30">
                        <Search className="w-10 h-10 mx-auto" strokeWidth={1} />
                        <p className="text-[10px] font-black uppercase tracking-widest italic">Awaiting Payload...</p>
                     </div>
                   )}

                   {scanResult === 'MALICIOUS' && (
                     <div className="text-center space-y-4 animate-in zoom-in duration-500">
                        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
                        <div className="space-y-1">
                          <h4 className="text-xl font-black text-red-500 uppercase italic">MINT MISMATCH</h4>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Identified as: Visual Impersonator [FAKE_USDC]</p>
                        </div>
                     </div>
                   )}

                   {scanResult === 'SAFE' && (
                     <div className="text-center space-y-4 animate-in zoom-in duration-500">
                        <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
                        <div className="space-y-1">
                          <h4 className="text-xl font-black text-emerald-500 uppercase italic">AUTHENTIC ASSET</h4>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Registry Match: Official Circle USDC Mint</p>
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </DocCard>
        </div>

        {/* MODULE 2: WARNING SIMULATOR */}
        <div className="lg:col-span-5">
          <DocCard border="red">
            <div className="space-y-8">
              <div className="space-y-2">
                 <TechLabel text="EYE_CALIBRATION" color="red" />
                 <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Warning <br/> Simulator.</h3>
                 <p className="text-zinc-500 text-sm italic font-medium">Calibrate your eyes to recognize VIGIL interceptions.</p>
              </div>

              <div ref={simulationRef} className="relative h-64 bg-black rounded-[2.5rem] border border-zinc-900 overflow-hidden flex flex-col items-center justify-center group">
                 <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,white,transparent_70%)]" />
                 
                 {activeSim === 'PHISHING' ? (
                    <div className="text-center space-y-4 animate-in fade-in duration-300 relative z-20">
                       <AlertOctagon className="w-12 h-12 text-red-600 mx-auto animate-pulse" />
                       <div className="px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded text-[9px] font-black text-red-500 uppercase tracking-widest">PHISHING_SHIELD_ACTIVE</div>
                    </div>
                 ) : (
                    <div className="text-center space-y-4 opacity-40 group-hover:opacity-60 transition-opacity">
                       <Sparkles className="w-10 h-10 mx-auto text-zinc-700" />
                       <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Select Vector to Simulate</p>
                    </div>
                 )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <button 
                  onClick={() => handleSimTrigger('POISON')}
                  className="py-4 bg-zinc-950 border border-zinc-900 rounded-xl text-[9px] font-black text-zinc-400 uppercase tracking-widest hover:border-red-600/50 hover:text-white transition-all"
                 >
                   POISON ATTACK
                 </button>
                 <button 
                  onClick={() => handleSimTrigger('PHISHING')}
                  className="py-4 bg-zinc-950 border border-zinc-900 rounded-xl text-[9px] font-black text-zinc-400 uppercase tracking-widest hover:border-red-600/50 hover:text-white transition-all"
                 >
                   PHISHING SHIELD
                 </button>
              </div>
            </div>
          </DocCard>
        </div>

      </div>

      {/* MODULE 3: VISUAL SANITIZER (HISTORY SANITIZER) */}
      <div className="w-full">
         <DocCard border="zinc">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                     <TechLabel text="VISUAL_CLEANSE" color="blue" />
                     <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">History <br/> Sanitizer.</h3>
                     <p className="text-zinc-500 text-lg leading-relaxed italic font-medium">
                       "Hiding the poison before it hits your clipboard. Cleaning the chain's visual noise."
                     </p>
                  </div>
                  
                  <div className="flex gap-4">
                     <button 
                       onClick={() => setSanitizerView('STANDARD')}
                       className={`flex-1 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${sanitizerView === 'STANDARD' ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                     >
                       STANDARD EXPLORER
                     </button>
                     <button 
                       onClick={() => setSanitizerView('VIGIL')}
                       className={`flex-1 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${sanitizerView === 'VIGIL' ? 'bg-blue-600 text-white border-blue-500 shadow-lg' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                     >
                       VIGIL PROTECTED
                     </button>
                  </div>
               </div>

               <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-[3rem] overflow-hidden shadow-inner">
                  <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center px-8 justify-between">
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${sanitizerView === 'VIGIL' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-700'}`} />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Solscan_Mirror_Log</span>
                     </div>
                     {sanitizerView === 'VIGIL' && (
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest italic animate-receive-orange px-3 py-1 bg-blue-500/10 rounded">FILTER_ACTIVE</span>
                     )}
                  </div>
                  
                  <div className="p-8 space-y-4 max-h-[400px] overflow-y-auto no-scrollbar relative">
                     {mockTransactions.map((tx) => (
                       <div key={tx.id} className={`p-5 rounded-2xl border transition-all duration-700 flex items-center justify-between group ${sanitizerView === 'VIGIL' && tx.isPoison ? 'bg-red-950/10 border-red-900/20 grayscale opacity-40 scale-[0.98] blur-[1px]' : 'bg-[#0a0a0a] border-zinc-900'}`}>
                          <div className="flex items-center gap-6">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${tx.type === 'SEND' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                                {tx.type === 'SEND' ? <Activity className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                             </div>
                             <div className="space-y-1">
                                <div className="font-mono text-[10px] text-zinc-300">
                                   {tx.isPoison && sanitizerView === 'VIGIL' ? '••••••••••••••••••••••••••••' : tx.addr.slice(0, 16) + '...'}
                                </div>
                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Value: {tx.amount}</div>
                             </div>
                          </div>
                          <div className="text-right space-y-1">
                             {tx.isPoison ? (
                                sanitizerView === 'VIGIL' ? (
                                   <div className="px-3 py-1 bg-red-600 text-white text-[8px] font-black rounded shadow-lg animate-pulse uppercase tracking-widest">POISON_NEUTRALIZED</div>
                                ) : (
                                   <div className="text-[10px] font-mono text-zinc-700">14m ago</div>
                                )
                             ) : (
                                <div className="text-[10px] font-mono text-zinc-700">2h ago</div>
                             )}
                          </div>
                       </div>
                     ))}

                     {/* Overlay Scan Effect when changing */}
                     {sanitizerView === 'VIGIL' && (
                        <div className="absolute inset-0 pointer-events-none bg-blue-600/5 transition-opacity duration-1000" />
                     )}
                  </div>
               </div>
            </div>
         </DocCard>
      </div>

      <style>{`
        @keyframes scan-vertical {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};