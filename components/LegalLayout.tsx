import React from 'react';

export const LegalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#050505] text-zinc-400 p-8 md:p-20">
    <div className="max-w-4xl mx-auto space-y-12">
      {children}
    </div>
  </div>
);
