import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.error("❌ Missing OpenAI API key");
      return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Polish the following task to make it sound more professional:\n${description}` }],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    const data = await res.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error("❌ Unexpected response from OpenAI:", data);
      return NextResponse.json({ error: "OpenAI response invalid" }, { status: 500 });
    }

    const polished = data.choices[0].message.content.trim();
    return NextResponse.json({ polished });
  } catch (err) {
    console.error("🔥 Error in /api/rewrite:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
