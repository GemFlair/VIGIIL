import React from 'react';
import { Search, ExternalLink, Copy, ArrowUpRight, Activity, Database, Clock, Filter, List } from 'lucide-react';

export interface SolscanTransaction {
  id: string;
  slot: string;
  timestamp: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  isPoison?: boolean;
  type: 'TRUSTED' | 'POISON' | 'PHISHING' | 'DUST' | 'NEW' | 'SIMILARITY' | 'MINT' | 'CLIPBOARD' | 'SPOOF';
}

interface SolscanMirrorProps {
  onCopy: (tx: SolscanTransaction) => void;
  activeType?: string | null;
}

const TRANSACTIONS: SolscanTransaction[] = [
  { id: '1', slot: '312882109', timestamp: '12s ago', from: '6vX9... M1', to: 'Vig1... 5i', amount: '42.00', token: 'SOL', type: 'TRUSTED' },
  { id: '2', slot: '312882105', timestamp: '44s ago', from: 'Ab1C... Zz90', to: 'Vig1... 5i', amount: '1,200', token: 'USDC', type: 'POISON' },
  { id: '3', slot: '312882098', timestamp: '2m ago', from: 'Dust... Dust', to: 'Vig1... 5i', amount: '0.000001', token: 'SOL', type: 'DUST' },
  { id: '4', slot: '312882087', timestamp: '5m ago', from: 'Mint... Mnt', to: 'Vig1... 5i', amount: '5,000', token: 'USDT', type: 'MINT' },
  { id: '5', slot: '312882076', timestamp: '8m ago', from: 'EyeS... Eye', to: 'Vig1... 5i', amount: '0.15', token: 'SOL', type: 'SPOOF' },
  { id: '6', slot: '312882065', timestamp: '11m ago', from: '5U39... 5v', to: 'Vig1... 5i', amount: '10.00', token: 'SOL', type: 'NEW' },
];

export const SolscanMirror: React.FC<SolscanMirrorProps> = ({ onCopy, activeType }) => {
  return (
    <div className="w-full h-full bg-[#050505] flex flex-col font-sans overflow-hidden border border-zinc-800 rounded-3xl shadow-inner">
      {/* Solscan Header */}
      <div className="h-14 bg-[#0a0a0a] border-b border-zinc-800 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <Search size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">Solscan Mirror</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <span>Mainnet</span>
            <span>Market Cap: $142B</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Activity size={14} className="text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Sub Header / Search */}
      <div className="p-6 bg-[#070707] border-b border-zinc-900/50 shrink-0">
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-4 flex items-center text-zinc-600">
            <Search size={16} />
          </div>
          <input 
            disabled 
            placeholder="Search by Address / Txn Hash / Block / Token" 
            className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-xs text-zinc-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 bg-[#020202]">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <List size={16} className="text-blue-500" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Recent Transactions</h3>
            </div>
            <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline flex items-center gap-2">
              View All <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-[#0c0c0c] border-b border-zinc-900">
                <tr>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Signature</th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Slot</th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Age</th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">From</th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">To</th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className={`group transition-all hover:bg-white/[0.02] ${activeType === tx.type ? 'bg-blue-600/5 ring-1 ring-inset ring-blue-500/20' : ''}`}>
                    <td className="p-4 font-mono text-[10px] text-blue-500 hover:underline cursor-default">5U39...8zH</td>
                    <td className="p-4 font-mono text-[10px] text-zinc-400">{tx.slot}</td>
                    <td className="p-4 text-[10px] text-zinc-500 italic">{tx.timestamp}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 group/addr relative">
                        <span className={`font-mono text-[10px] ${activeType === tx.type ? 'text-white font-bold' : 'text-zinc-400'}`}>{tx.from}</span>
                        <button 
                          onClick={() => onCopy(tx)}
                          className="p-1.5 bg-zinc-900 border border-zinc-800 rounded opacity-0 group-hover/addr:opacity-100 transition-all hover:border-blue-500 hover:text-blue-500"
                        >
                          <Copy size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-zinc-400">{tx.to}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-[11px] font-black text-zinc-200">{tx.amount}</span>
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{tx.token}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center gap-4 text-zinc-700 italic text-[10px]">
            <Clock size={12} />
            Auto-refreshing block history every 400ms...
          </div>
        </div>
      </div>
    </div>
  );
};