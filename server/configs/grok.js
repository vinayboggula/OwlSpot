import 'dotenv/config';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main(prompt) {
    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "system",
                content: "You are a professional content writer, write a engaging blog description in plain text and it must be clear and understandable and add any intensive story related to it."
            },
            {
                role: "user",
                content: `Generate blog description ${prompt}`
            },
        ],
        temperature: 0.2,
    });

    return response.choices[0].message.content;
}

export default main;