// src/app/api/rewrite/route.ts

export const runtime = 'edge';

export async function POST(req: Request) {
  const { description } = await req.json();

  const prompt = `Rewrite the following task description to make it sound clear, professional, and aligned with a corporate tone:\n\n${description}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    console.error("⚠️ Unexpected response from OpenAI:", data);
    return new Response(JSON.stringify({ error: "OpenAI response invalid" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const polished = data.choices[0].message.content.trim();

  return new Response(JSON.stringify({ polished }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
