import React, { useEffect, useRef } from 'react';
import { Message } from '@/hooks/useInterview';

interface CandidateAreaProps {
    state: string;
    messages: Message[];
    transcript: string;
}

export default function CandidateArea({ state, messages, transcript }: CandidateAreaProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, transcript]);

    return (
        <div className="flex h-full w-full flex-col p-8">
            <div className="mb-4 flex items-center space-x-2 text-emerald-400">
                {state === 'listening' && (
                    <>
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-sm font-medium uppercase tracking-wider">Listening</span>
                    </>
                )}
                {state === 'speaking' && (
                    <span className="text-sm font-medium uppercase tracking-wider text-blue-400">Interviewer Speaking</span>
                )}
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-xl bg-neutral-800/50 p-6 font-mono text-lg leading-relaxed text-neutral-200">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user' ? 'bg-neutral-700 text-white' : 'bg-neutral-900 text-emerald-400'}`}>
                            <p className="text-sm opacity-50 mb-1 uppercase">{msg.role}</p>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {transcript && (
                    <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-lg border border-neutral-700 bg-transparent p-3 text-neutral-400 italic">
                            {transcript}
                        </div>
                    </div>
                )}

                {messages.length === 0 && !transcript && (
                    <p className="opacity-50 text-center mt-20">Press Start to begin the interview.</p>
                )}
            </div>

            <div className="mt-8 flex justify-center h-12">
                {/* Visualizer Placeholder */}
                {state === 'speaking' && (
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 w-1 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
