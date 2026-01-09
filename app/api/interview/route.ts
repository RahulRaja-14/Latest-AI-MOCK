import { NextResponse } from 'next/server';

// Simple mock responses based on keywords or stages
// In a real scenario, this would call Gemini/OpenAI
const MOCK_RESPONSES = [
    "Hello, thank you for joining me today. I'm excited to learn more about you. To start, could you please introduce yourself and tell me a bit about your professional background?",
    "That's interesting. What would you say is your greatest technical strength, and can you give me an example of how you've applied it?",
    "I see. Can you describe a challenging situation you faced in a previous role and how you resolved it?",
    "Thank you for sharing that. Now, let's move to a more technical question. How do you approach designing a scalable system given vague requirements?",
    "Excellent detailed answer. Finally, do you have any questions for us before we conclude this interview?",
    "Thank you for your time today. We will be in touch shortly. Good luck!",
];

export async function POST(req: Request) {
    try {
        const { history } = await req.json();

        // If history is empty, it's the start
        if (!history || history.length === 0) {
            return NextResponse.json({
                response: MOCK_RESPONSES[0],
                stage: 'intro'
            });
        }

        // Simple mock logic: advance based on turn count
        // History contains { role: 'user' | 'assistant', content: string }
        // We count assistant messages to determine the next question
        const assistantTurns = history.filter((m: any) => m.role === 'assistant').length;

        // Pick next response or fallback
        const responseText = MOCK_RESPONSES[assistantTurns] || MOCK_RESPONSES[MOCK_RESPONSES.length - 1];

        // Artificial delay to simulate thinking
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            response: responseText,
            stage: assistantTurns >= MOCK_RESPONSES.length - 1 ? 'end' : 'interview'
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
