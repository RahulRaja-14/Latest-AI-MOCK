import { useState, useEffect, useCallback, useRef } from 'react';
import useSpeechRecognition from './useSpeechRecognition';
import useSpeechSynthesis from './useSpeechSynthesis';

export type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export type InterviewState = 'idle' | 'listening' | 'processing' | 'speaking' | 'completed';

export default function useInterview() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [state, setState] = useState<InterviewState>('idle');

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript
    } = useSpeechRecognition();

    const { speak, isSpeaking, cancel: cancelSpeech } = useSpeechSynthesis();

    // Keep track of the latest transcript to debounce/process silence
    const silenceTimer = useRef<NodeJS.Timeout | null>(null);

    const processResponse = useCallback(async (currentHistory: Message[]) => {
        setState('processing');
        try {
            const res = await fetch('/api/interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: currentHistory }),
            });

            const data = await res.json();

            if (data.response) {
                const newMessage: Message = { role: 'assistant', content: data.response };
                setMessages(prev => [...prev, newMessage]);

                // Start speaking the response
                setState('speaking');
                speak(data.response);
            }
        } catch (err) {
            console.error("Interview Error:", err);
            setState('idle'); // Or error state
        }
    }, [speak]);

    // Initial greeting
    const startInterview = useCallback(() => {
        setMessages([]);
        processResponse([]); // Start with empty history to trigger greeting
    }, [processResponse]);

    // Handle User Input Silence Detection
    useEffect(() => {
        if (state === 'listening' && transcript) {
            // Clear existing timer
            if (silenceTimer.current) clearTimeout(silenceTimer.current);

            // Set new timer: if no new speech for 2 seconds, consider it done
            silenceTimer.current = setTimeout(() => {
                stopListening();
                const userMsg: Message = { role: 'user', content: transcript };
                setMessages(prev => [...prev, userMsg]);
                resetTranscript();

                // Trigger API
                processResponse([...messages, userMsg]);
            }, 2000); // 2 seconds silence
        }

        return () => {
            if (silenceTimer.current) clearTimeout(silenceTimer.current);
        };
    }, [transcript, state, messages, stopListening, resetTranscript, processResponse]);

    // State transitions based on hooks
    useEffect(() => {
        // If we were speaking and now stopped, switch to listening
        if (state === 'speaking' && !isSpeaking) {
            setState('listening');
            startListening();
        }
    }, [isSpeaking, state, startListening]);

    return {
        state,
        messages,
        transcript,
        startInterview,
        isListening,
        isSpeaking
    };
}
