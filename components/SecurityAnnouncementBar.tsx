import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const SecurityAnnouncementBar: React.FC = () => (
  <div className="fixed top-0 left-0 right-0 h-10 z-[120] bg-red-600/10 backdrop-blur-md border-b border-red-500/20 flex items-center justify-center px-4 overflow-hidden">
    <div className="flex items-center gap-4">
      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
      <p className="text-[8.5px] md:text-[10px] font-bold text-white uppercase tracking-[0.15em]">
        Vigil has <span className="text-red-500 underline decoration-2 font-black">NO OFFICIAL TOKEN</span>. Avoid all phishing attempts.
      </p>
      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
    </div>
  </div>
);