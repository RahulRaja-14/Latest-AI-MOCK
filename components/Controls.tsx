import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface ControlsProps {
    state: 'idle' | 'listening' | 'processing' | 'speaking' | 'completed';
    onStart: () => void;
    isListening: boolean;
}

export default function Controls({ state, onStart, isListening }: ControlsProps) {
    return (
        <div className="flex h-full items-center justify-between px-8">
            <div className="flex items-center space-x-4">
                <div className="text-sm text-neutral-400">
                    Status: <span className="text-white uppercase font-bold">{state}</span>
                </div>
            </div>

            <div className="flex items-center space-x-6">
                {state === 'idle' || state === 'completed' ? (
                    <button
                        onClick={onStart}
                        className="rounded-full bg-white px-8 py-3 font-bold text-black transition hover:bg-neutral-200"
                    >
                        {state === 'completed' ? 'Restart Interview' : 'Start Interview'}
                    </button>
                ) : (
                    <button className={`rounded-full p-4 transition ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-neutral-700 text-neutral-400'}`}>
                        {isListening ? <Mic size={24} /> : <MicOff size={24} />}
                    </button>
                )}
            </div>

            <div className="w-32" />
        </div>
    );
}
