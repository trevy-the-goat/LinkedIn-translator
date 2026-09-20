/* ------------------------------------------------------------------
   Translation API layer.
   Priority:  OpenAI (VITE_OPENAI_API_KEY)
              → Anthropic (VITE_ANTHROPIC_API_KEY)
              → Offline mock engine (always available, always unhinged)
------------------------------------------------------------------- */

import {
  translateMock,
  genStats,
  sanitizeLinkedInEnding,
  type TranslationResult,
} from "./engine";

const SYSTEM_PROMPT = `You are "LinkedIn Translator" — a satirical engine that rewrites plain, brutally honest statements into hyper-exaggerated, buzzword-heavy LinkedIn posts.

RULES:
1. Tone: overly inspirational, toxic positivity, corporate doublespeak, humblebragging, hyper-inflated achievement.
2. Structure: start with a catchy opener ("I'm humbled and thrilled to announce…", "Big news!", "Reflecting on my journey…").
3. Spin ANY negative, criminal, lazy, academic, broke, or mundane act into a "learning experience", "strategic pivot" or "leadership insight".
4. Paragraph break after every 1-2 sentences.
5. Heavy LinkedIn buzzwords: synergy, leverage, mindset, 10x, pivot, paradigm shift, ecosystem, growth, reflection.
6. Include 3-5 relevant emojis chosen ONLY from: 🚀 💡 📈 🙏 🧠 ⚖️ ☕.
7. University/student inputs should sound especially polished and delusional: failed module, 50% midterm, supplementary exam, DPR, broke student life, missing an 8 AM.
8. End with a strong declarative closing line. DO NOT ask a question. DO NOT ask for comments, agreement, engagement, or reactions.
9. Output ONLY the post text. No preamble, no quotes around the whole thing.`;

export async function translateToLinkedIn(input: string): Promise<TranslationResult> {
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
  const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;

  if (openaiKey) {
    try {
      return await viaOpenAI(input, openaiKey);
    } catch (e) {
      console.warn("[LinkedInTranslator] OpenAI failed, falling back to mock engine.", e);
    }
  }

  if (anthropicKey) {
    try {
      return await viaAnthropic(input, anthropicKey);
    } catch (e) {
      console.warn("[LinkedInTranslator] Anthropic failed, falling back to mock engine.", e);
    }
  }

  return translateMock(input);
}

async function viaOpenAI(input: string, key: string): Promise<TranslationResult> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 1.1,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Translate this into a LinkedIn post: "${input}"` },
      ],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const data = await res.json();
  const rawText: string = data.choices?.[0]?.message?.content?.trim();
  if (!rawText) throw new Error("OpenAI returned empty content");
  const text = sanitizeLinkedInEnding(rawText);
  return {
    text,
    category: "ai",
    detectedLabel: "Detected (AI): Unfiltered Academic/Professional Reality",
    aiPowered: true,
    stats: genStats(),
  };
}

async function viaAnthropic(input: string, key: string): Promise<TranslationResult> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 900,
      temperature: 1,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Translate this into a LinkedIn post: "${input}"` }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}`);
  const data = await res.json();
  const rawText: string = data.content?.[0]?.text?.trim();
  if (!rawText) throw new Error("Anthropic returned empty content");
  const text = sanitizeLinkedInEnding(rawText);
  return {
    text,
    category: "ai",
    detectedLabel: "Detected (AI): Unfiltered Academic/Professional Reality",
    aiPowered: true,
    stats: genStats(),
  };
}
