import { NextResponse } from "next/server";
import {OpenAI} from "openai";

// export async function GET(request) {
//     return NextResponse.json({message: "GET response"})
// }

export async function POST(req) {
    const systemPrompt = "You are the 'Stocks for Noobs Assistant,' an AI chatbot designed to help beginners navigate the stock market. Your role is to provide clear, simple explanations on how to get started with investing in stocks, answer common questions about stock market concepts, and offer guidance on basic strategies for beginners. You should be patient, informative, and focused, ensuring that your advice is accessible to those with little to no experience. If a question is unrelated to stocks or too advanced, politely guide the user back to beginner-friendly stock market topics."

    const openai = new OpenAI();
    const data = await req.json()
    // console.log('api/chat/route.js:13 data: ' + data);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system", content: systemPrompt
            },
            ...data,
            // {
            //     role: "user",
            //     content: [
            //         {
            //             type: "text",
            //             text: data.message
            //         },
            //     ],
            // },
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
    // console.log("AI msg: " + completion.choices[0].message.content)
    console.log('api/chat/route.js:55 completion.choices[0].message.content: ' + completion.choices[0].message.content);
    return new NextResponse(stream);
    // return NextResponse.json({message: "200 OK"})
}

// curl -X POST localhost:3000/api/chat -d '{"message": "Hello to AI"}'

// {
//     "message": {
//         "id":"chatcmpl-9u3NhebZAD1LegM78BL6BQaDPZbYF",
//         "object":"chat.completion",
//         "created":1723146393,
//         "model":"gpt-3.5-turbo-0125",
//         "choices":[
//             {
//                 "index":0,
//                 "message":{
//                     "role":"assistant",
//                     "content":"Hello! I am an AI digital assistant. You can call me anything you like. How can I assist you today?",
//                     "refusal":null
//                 },
//                 "logprobs":null,
//                 "finish_reason":"stop"
//             }
//         ],
//         "usage":{
//             "prompt_tokens":15,
//             "completion_tokens":24,
//             "total_tokens":39
//         },
//         "system_fingerprint":null
//     }
// }