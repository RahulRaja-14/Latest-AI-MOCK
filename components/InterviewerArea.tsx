import React from 'react';
import Image from 'next/image';

interface InterviewerAreaProps {
    isSpeaking?: boolean;
}

export default function InterviewerArea({ isSpeaking }: InterviewerAreaProps) {
    return (
        <div className="flex h-full w-full items-center justify-center p-8">
            <div className={`relative aspect-square w-full max-w-2xl overflow-hidden rounded-2xl border-4 transition-all duration-300 ${isSpeaking ? 'border-emerald-500 shadow-emerald-500/20' : 'border-neutral-800'} shadow-2xl`}>
                <Image
                    src="/interviewer.png"
                    alt="AI Interviewer"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Speaking Indicator overlay could go here */}
            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full px-6 py-2 text-sm backdrop-blur-md border border-neutral-700/50 shadow-lg transition-colors ${isSpeaking ? 'bg-emerald-500/80 text-white' : 'bg-black/60 text-neutral-300'}`}>
                {isSpeaking ? 'Interviewer is speaking...' : 'Interviewer is listening'}
            </div>
        </div>
    );
}
