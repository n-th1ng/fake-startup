import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a comedy writer specializing in satirical startup culture. Generate a completely absurd but deadpan-professional startup pitch. 

Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "name": "string — sounds like a real YC startup (portmanteau or two random words smashed)",
  "tagline": "string — sounds profound but means absolutely nothing",
  "problem": "string — dramatically overstate a minor inconvenience, 2-3 sentences",
  "solution": "string — mention AI at least twice, sound confident, 2-3 sentences",
  "tam": "string — absurdly inflated TAM like '$4.2T by 2028'",
  "sam": "string — still ridiculous SAM",
  "som": "string — suspiciously specific SOM",
  "team": [
    {"name": "string", "title": "string", "bio": "string — Ivy League, absurd achievements, 1-2 sentences"},
    {"name": "string", "title": "string", "bio": "string"},
    {"name": "string", "title": "string", "bio": "string"}
  ],
  "testimonial": {"name": "string", "role": "string", "quote": "string — deadpan praise"},
  "traction": {
    "metric1_label": "string", "metric1_value": "string — suspiciously specific number",
    "metric2_label": "string", "metric2_value": "string",
    "metric3_label": "string", "metric3_value": "string"
  },
  "funding": "string — absurd funding round detail",
  "pitch_line": "string — one-liner for the hero section, punchy",
  "accent_color": "string — hex color that fits the vibe, like #6366f1"
}

Rules:
- Tone: deadpan corporate satire. Write like a TechCrunch article but the startup is insane.
- Be genuinely funny — not groan-worthy. Think "The Onion meets Y Combinator."
- Every generation should feel fresh and surprising.
- The more professional the language, the funnier the content.`;

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();

    const userPrompt = category && category !== 'random'
      ? `Generate a satirical startup in the "${category}" category. Be creative and unexpected.`
      : `Generate a satirical startup in a random category. Pick something unexpected — not just "AI" or "blockchain". Surprise me.`;

    const apiKey = process.env.LLM_API_KEY;
    const baseUrl = process.env.LLM_BASE_URL || 'https://token-plan-ams.xiaomimimo.com/v1';
    const model = process.env.LLM_MODEL || 'mimo-v2.5';

    if (!apiKey) {
      return NextResponse.json({ error: 'LLM API key not configured' }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.9,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('LLM API error:', err);
      return NextResponse.json({ error: 'Generation failed' }, { status: 502 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Parse JSON from the response (handle potential markdown fences)
    let startup;
    try {
      const jsonStr = content.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      startup = JSON.parse(jsonStr);
    } catch {
      console.error('Failed to parse LLM output:', content);
      return NextResponse.json({ error: 'Invalid generation output' }, { status: 500 });
    }

    return NextResponse.json(startup);
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
