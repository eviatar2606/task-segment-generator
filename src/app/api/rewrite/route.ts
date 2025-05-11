export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    return new Response(JSON.stringify({
      polished: "This is the All Might-approved polished version!"
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
