
import React from 'react';

interface VigilScannerProps {
  // Added 'idle' to fix FieldUnitHub type error
  status?: 'scanning' | 'success' | 'error' | 'critical' | 'idle';
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const VigilScanner: React.FC<VigilScannerProps> = ({ 
  status = 'scanning', 
  label = 'INTERCEPT_SCAN_ACTIVE', 
  size = 'md',
  className = ''
}) => {
  const getColors = () => {
    switch (status) {
      case 'success': return 'text-emerald-500';
      case 'error': return 'text-red-500';
      case 'critical': return 'text-red-600 animate-pulse';
      // Added case for idle status
      case 'idle': return 'text-zinc-700';
      default: return 'text-blue-500';
    }
  };

  const getSizes = () => {
    switch (size) {
      case 'sm': return 'w-12 h-12';
      case 'lg': return 'w-32 h-32';
      case 'xl': return 'w-48 h-48';
      default: return 'w-20 h-20';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      <div className={`relative ${getSizes()}`}>
        <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
          {/* Static Ghost Trace */}
          <path 
            d="M50 200 H120 L180 350 L240 120 V350 H350" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="28" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`${getColors()} opacity-10`}
          />
          
          {/* Active Signal Pulse */}
          <path 
            d="M50 200 H120 L180 350 L240 120 V350 H350" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="28" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeDasharray="120 1000"
            className={`${getColors()} drop-shadow-[0_0_15px_currentColor]`}
          >
            {/* Animation only plays if not idle */}
            {status !== 'idle' && (
              <animate 
                attributeName="stroke-dashoffset" 
                from="120" 
                to="-1000" 
                dur={status === 'critical' ? '0.8s' : '1.8s'} 
                repeatCount="indefinite" 
              />
            )}
          </path>
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full ${status !== 'idle' ? 'animate-pulse' : ''} ${getColors()}`} />
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] font-mono ${getColors()}`}>
            {label}
          </span>
        </div>
        <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">
          SYS_NODE: VIG-SCAN-0.5
        </div>
      </div>
    </div>
  );
};
