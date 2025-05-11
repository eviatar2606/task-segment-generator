import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ Missing OPENAI_API_KEY in environment');
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Rewrite the following description in a polished, All Might-approved tone:\n\n${description}`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // Debug log
    console.log('🧠 OpenAI raw response:', JSON.stringify(data));

    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ error: 'OpenAI response invalid', raw: data }, { status: 500 });
    }

    const polished = data.choices[0].message.content.trim();
    return NextResponse.json({ polished });

  } catch (err: any) {
    console.error('💥 API handler error:', err);
    return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
  }
}
