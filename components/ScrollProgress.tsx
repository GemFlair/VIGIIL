import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Radio } from 'lucide-react';

interface ScrollProgressProps {
  progress: number;
  onScrollTo: (percentage: number) => void;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ progress, onScrollTo }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate percentage from Y position
  const calculatePercentage = useCallback((clientY: number) => {
    if (!railRef.current) return 0;
    const rect = railRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const p = (y / rect.height) * 100;
    return Math.max(0, Math.min(100, p));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    onScrollTo(calculatePercentage(e.clientY));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    onScrollTo(calculatePercentage(e.touches[0].clientY));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onScrollTo(calculatePercentage(e.clientY));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        // Prevent page bounce on mobile while scrubbing
        if (e.cancelable) e.preventDefault();
        onScrollTo(calculatePercentage(e.touches[0].clientY));
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
      document.body.style.cursor = 'default';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isDragging, calculatePercentage, onScrollTo]);

  const getProgressColor = () => {
    if (progress < 20) return 'text-blue-500';
    if (progress < 40) return 'text-amber-500';
    if (progress < 65) return 'text-purple-500';
    if (progress > 95) return 'text-emerald-500';
    return 'text-blue-500';
  };

  const getProgressBg = () => {
    if (progress < 20) return 'bg-blue-600';
    if (progress < 40) return 'bg-amber-500';
    if (progress < 65) return 'bg-purple-500';
    if (progress > 95) return 'bg-emerald-500';
    return 'bg-blue-600';
  };

  const colorClass = getProgressColor();
  const bgClass = getProgressBg();

  return (
    <div className="fixed right-0 top-10 bottom-0 w-12 md:w-16 z-[110] hidden md:flex flex-col items-center pointer-events-none border-l border-zinc-900/50 bg-black/20 backdrop-blur-[2px]">
      {/* Percentage Readout at Top */}
      <div className="pt-8 flex flex-col items-center gap-2">
         <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest rotate-90 mb-8 whitespace-nowrap origin-center">
           Sync Depth
         </div>
         <div className={`text-sm font-black italic tabular-nums transition-colors duration-700 ${isDragging ? 'scale-110 text-white' : colorClass}`}>
            {Math.round(progress)}%
         </div>
         <div className={`w-1 h-1 rounded-full transition-colors ${isDragging ? 'bg-white' : 'bg-zinc-800'}`} />
      </div>

      {/* Vertical Rail - Interactive Zone */}
      <div 
        ref={railRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="flex-1 w-full relative my-6 pointer-events-auto cursor-pointer group/rail"
      >
        {/* Invisible wider hit area */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 h-full" />
        
        {/* Visual Rail Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-900/50" />

        {/* Progress Bar Filling */}
        <div 
          className={`absolute top-0 left-[calc(50%-0.5px)] w-0.5 transition-all duration-300 ease-out ${isDragging ? 'opacity-100 shadow-[0_0_20px_white]' : 'opacity-70 shadow-[0_0_15px_currentColor]'} ${isDragging ? 'bg-white' : bgClass}`}
          style={{ height: `${progress}%` }}
        />
        
        {/* Floating Marker */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out"
          style={{ top: `${progress}%` }}
        >
           <div className={`w-4 h-4 rounded-full border bg-black shadow-2xl transition-all duration-500 ${isDragging ? 'scale-125 border-white' : `scale-100 ${colorClass.replace('text-', 'border-')}`}`}>
              <div className={`absolute inset-1 rounded-full ${isDragging ? 'bg-white animate-ping' : `animate-pulse ${bgClass}`}`} />
           </div>
        </div>
      </div>

      {/* Footer Icon */}
      <div className="pb-8 flex flex-col items-center gap-4">
         <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-700 ${progress > 95 ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10' : 'border-zinc-800 text-zinc-700 bg-zinc-950'}`}>
            <Radio className="w-3 h-3" />
         </div>
         <div className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.3em] rotate-90 origin-center whitespace-nowrap">
           VIG-PROTOCOL-SYNC
         </div>
      </div>
    </div>
  );
};