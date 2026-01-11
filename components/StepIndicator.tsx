
import React from 'react';
import { ProjectStep } from '../types';

interface StepIndicatorProps {
  currentStep: ProjectStep;
}

const steps = [
  { key: ProjectStep.VISION, label: 'Vision' },
  { key: ProjectStep.STRUCTURE, label: 'Structure' },
  { key: ProjectStep.DESIGN, label: 'Design' },
  { key: ProjectStep.CODE, label: 'Review' }
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const currentIndex = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-12 px-4">
      {steps.map((step, index) => (
        <div key={step.key} className="flex flex-col items-center flex-1">
          <div className="flex items-center w-full">
            <div className={`h-1 flex-1 ${index === 0 ? 'bg-transparent' : (index <= currentIndex ? 'bg-indigo-500' : 'bg-zinc-800')}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              index < currentIndex ? 'bg-indigo-500 text-white' : 
              index === currentIndex ? 'bg-indigo-500 text-white ring-4 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 
              'bg-zinc-800 text-zinc-500'
            }`}>
              {index + 1}
            </div>
            <div className={`h-1 flex-1 ${index === steps.length - 1 ? 'bg-transparent' : (index < currentIndex ? 'bg-indigo-500' : 'bg-zinc-800')}`} />
          </div>
          <span className={`mt-3 text-xs uppercase tracking-widest font-semibold ${index <= currentIndex ? 'text-zinc-200' : 'text-zinc-600'}`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};
