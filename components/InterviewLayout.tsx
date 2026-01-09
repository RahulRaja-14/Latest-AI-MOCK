import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Assuming you might add utility later, or just use className

interface InterviewLayoutProps {
  interviewer: ReactNode;
  candidate: ReactNode;
  controls: ReactNode;
}

export default function InterviewLayout({ interviewer, candidate, controls }: InterviewLayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-neutral-900 text-white">
      {/* Header / Config Bar could go here */}
      
      {/* Main Split View */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left: Interviewer */}
        <div className="relative flex-1 bg-black/50 border-r border-neutral-800">
          {interviewer}
        </div>

        {/* Right: Candidate / Feedback */}
        <div className="relative flex-1 bg-neutral-900">
          {candidate}
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="h-24 w-full border-t border-neutral-800 bg-black/80 backdrop-blur-md">
        {controls}
      </div>
    </div>
  );
}
