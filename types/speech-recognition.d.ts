// Basic types for Web Speech API
// These are often needed if @types/dom-speech-recognition is not installed
// or if we want to support both standard and webkit prefixed versions.

interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

interface SpeechRecognitionEvent {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: () => void;
    onend: () => void;
    onError: (event: any) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
}
