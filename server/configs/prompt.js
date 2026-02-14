import 'dotenv/config';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function interpretThumbnailPrompt(prompt) {
    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "system",
                content: `
You are a YouTube thumbnail design assistant.

Your task:
- Convert the user prompt into VALID JSON ONLY
- Optimize choices for YouTube-style thumbnails
- NO explanations, NO markdown, NO extra text

Allowed JSON fields:
- position: north | south | center | north_west | north_east | south_west | south_east
- fontFamily: Bangers | Luckiest Guy | Comic Neue | Arial
- textColor: hex color code
- outlineWidth: number (8–20)
- shadow: true | false
- backgroundDarken: true | false
- blurBackground: true | false
- fontSize: number (80–160)

Rules:
- Prefer BIG fonts (≥ 100)
- Prefer high contrast colors (#FFFFFF, #FFD700, #FF0000)
- Enable shadow by default
- Enable backgroundDarken unless user says "bright"
- Keep text readable on mobile

Defaults (if not specified):
- position: south
- fontFamily: Bangers
- fontSize: 120
- textColor: #FFFFFF
- outlineWidth: 14
- shadow: true
- backgroundDarken: true
- blurBackground: false
`
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0,
    });

    return response.choices[0].message.content;
}

export default interpretThumbnailPrompt;
