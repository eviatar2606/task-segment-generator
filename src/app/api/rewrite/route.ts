import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description || description.trim() === "") {
      return NextResponse.json({ error: "Missing description" }, { status: 400 });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Polish the following sentence to sound like a professional deliverable:\n\n"${description}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    const data = await openaiRes.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error("❌ Unexpected response from OpenAI:", data);
      return NextResponse.json({ error: "OpenAI response invalid" }, { status: 500 });
    }

    const polished = data.choices[0].message.content.trim();

    return NextResponse.json({ polished });
  } catch (err) {
    console.error("💥 API route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
