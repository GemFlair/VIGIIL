
import React from 'react';
import { Activity, Cpu, DollarSign, Timer, Zap } from 'lucide-react';
import { UsageData } from '../services/geminiService';

interface TelemetryDisplayProps {
  data: UsageData | null;
  isScanning: boolean;
  isVisible: boolean;
}

export const TelemetryDisplay: React.FC<TelemetryDisplayProps> = ({ data, isScanning, isVisible }) => {
  // Pricing based on Gemini 2.0 Flash (approximate)
  // $0.075 / 1M Input, $0.30 / 1M Output
  const calculateCost = () => {
    if (!data) return "0.00000000";
    const inputCost = (data.promptTokens / 1000000) * 0.075;
    const outputCost = (data.candidatesTokens / 1000000) * 0.30;
    return (inputCost + outputCost).toFixed(8);
  };

  const hasData = data !== null;

  return (
    <div className={`fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[2000] transition-all duration-700 pointer-events-none ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
      <div className="bg-[#050505] border-2 border-zinc-800 rounded-[2rem] p-4 md:p-6 w-56 md:w-64 shadow-[0_30px_60px_rgba(0,0,0,0.9)] space-y-4 pointer-events-auto group hover:border-blue-500/30 transition-all">
        
        {/* HUD HEADER */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <Activity className={`w-3 h-3 md:w-3.5 md:h-3.5 ${isScanning ? 'text-cyan-500 animate-pulse' : hasData ? 'text-blue-500' : 'text-zinc-700'}`} />
            <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] ${isScanning ? 'text-white' : 'text-zinc-500'}`}>
              {isScanning ? "Scanning Payload" : hasData ? "Last Telemetry" : "Compute Standby"}
            </span>
          </div>
          <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-cyan-500 animate-ping' : hasData ? 'bg-blue-600 shadow-[0_0_8px_#3b82f6]' : 'bg-zinc-900'}`} />
        </div>

        {/* METRICS GRID */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-zinc-600">
              <Cpu size={11} />
              <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Tokens</span>
            </div>
            <span className={`text-[10px] md:text-[11px] font-mono font-bold ${isScanning ? 'text-cyan-400' : hasData ? 'text-zinc-200' : 'text-zinc-800'}`}>
              {isScanning ? "CALC..." : hasData ? data.totalTokens : "0"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-zinc-600">
              <Timer size={11} />
              <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Latency</span>
            </div>
            <span className={`text-[10px] md:text-[11px] font-mono font-bold ${isScanning ? 'text-cyan-400' : hasData ? 'text-zinc-200' : 'text-zinc-800'}`}>
              {isScanning ? "WAIT..." : hasData ? `${data.latencyMs}ms` : "0ms"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-zinc-600">
              <DollarSign size={11} className="text-emerald-500/50" />
              <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Est. Cost</span>
            </div>
            <span className={`text-[10px] md:text-[11px] font-mono font-bold ${isScanning ? 'text-zinc-800' : hasData ? 'text-emerald-500' : 'text-zinc-800'}`}>
              ${calculateCost()}
            </span>
          </div>
        </div>

        {/* DATA BAR */}
        <div className="pt-2 border-t border-zinc-900 flex flex-col gap-1.5">
          <div className="flex justify-between text-[6px] md:text-[7px] font-black text-zinc-700 uppercase tracking-widest">
            <span>In: {data?.promptTokens || 0}t</span>
            <span>Out: {data?.candidatesTokens || 0}t</span>
          </div>
          <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
             <div 
               className={`h-full transition-all duration-[2000ms] ${isScanning ? 'bg-cyan-500 w-[30%]' : hasData ? 'bg-blue-600 w-full' : 'w-0'}`} 
             />
          </div>
        </div>

        {/* LOGO STAMP */}
        <div className="flex justify-center pt-1 opacity-20">
           <Zap size={8} className="text-zinc-600" />
        </div>
      </div>
    </div>
  );
};
