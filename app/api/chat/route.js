import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const systemPrompt = "You are the 'Stocks for Noobs Assistant,' an AI chatbot designed to help beginners navigate the stock market. Your role is to provide clear, simple explanations on how to get started with investing in stocks, answer common questions about stock market concepts, and offer guidance on basic strategies for beginners. You should be patient, informative, and focused, ensuring that your advice is accessible to those with little to no experience. If a question is unrelated to stocks or too advanced, politely guide the user back to beginner-friendly stock market topics."

export async function POST(req) {
    
    const openai = new OpenAI();
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system", content: systemPrompt
            },
            ...data,
        ],
        stream: true,
        max_tokens: 1000,
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream);
}