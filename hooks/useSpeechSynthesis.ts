import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechSynthesisReturn {
    speak: (text: string) => void;
    cancel: () => void;
    isSpeaking: boolean;
    voices: SpeechSynthesisVoice[];
}

export default function useSpeechSynthesis(): UseSpeechSynthesisReturn {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    // Use a ref to track mounted state to avoid setting state on unmounted component
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;

        const updateVoices = () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                setVoices(window.speechSynthesis.getVoices());
            }
        };

        if (typeof window !== 'undefined' && window.speechSynthesis) {
            updateVoices();
            window.speechSynthesis.onvoiceschanged = updateVoices;
        }

        return () => {
            mounted.current = false;
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const speak = useCallback((text: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to select a good voice
        // Priority: "Google US English", "Microsoft Zira", or any "Female" voice usually sounds calmer
        const preferredVoice = voices.find(v => v.name.includes("Google US English")) ||
            voices.find(v => v.name.includes("Zira")) ||
            voices.find(v => v.lang === 'en-US');

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
            if (mounted.current) setIsSpeaking(true);
        };

        utterance.onend = () => {
            if (mounted.current) setIsSpeaking(false);
        };

        utterance.onerror = (e) => {
            console.error("Speech Synthesis Error:", e);
            if (mounted.current) setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [voices]);

    const cancel = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return {
        speak,
        cancel,
        isSpeaking,
        voices
    };
}
