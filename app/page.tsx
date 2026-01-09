"use client";

import InterviewLayout from "@/components/InterviewLayout";
import InterviewerArea from "@/components/InterviewerArea";
import CandidateArea from "@/components/CandidateArea";
import Controls from "@/components/Controls";
import useInterview from "@/hooks/useInterview";

export default function Home() {
  const {
    state,
    messages,
    transcript,
    startInterview,
    isListening,
    isSpeaking
  } = useInterview();

  return (
    <InterviewLayout
      interviewer={<InterviewerArea isSpeaking={isSpeaking} />}
      candidate={
        <CandidateArea
          state={state}
          messages={messages}
          transcript={transcript}
        />
      }
      controls={
        <Controls
          state={state}
          onStart={startInterview}
          isListening={isListening}
        />
      }
    />
  );
}
