// Server-side chat endpoint. The Groq key lives only here (GROQ_API_KEY), never in the
// browser bundle. The system prompt is fixed on the server, so the endpoint cannot be
// used as a general-purpose LLM proxy.
import { buildSystemPrompt } from '../src/lib/prompt.js'
import { SUBJECTS } from '../src/lib/subjects.js'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MAX_MESSAGES = 30
const MAX_CHARS = 4000

// shortcut: in-memory per instance, resets on cold start; use a shared store if abused.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = Number(process.env.RATE_LIMIT_PER_10_MIN) || 40
const MAX_TRACKED_IPS = 10000
// Backstop across all visitors, per instance: protects the key if many IPs join in.
const GLOBAL_MAX = Number(process.env.GLOBAL_LIMIT_PER_10_MIN) || 600
const hits = new Map<string, number[]>()
let globalTimes: number[] = []

function limited(ip: string): boolean {
  const now = Date.now()
  for (const [key, times] of hits) {
    if (now - times[times.length - 1] >= RATE_WINDOW_MS) hits.delete(key)
  }
  globalTimes = globalTimes.filter((t) => now - t < RATE_WINDOW_MS)
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  // Fail closed when the table is full instead of evicting live entries.
  if (recent.length >= RATE_MAX || (!hits.has(ip) && hits.size >= MAX_TRACKED_IPS) || globalTimes.length >= GLOBAL_MAX) {
    return true
  }
  recent.push(now)
  globalTimes.push(now)
  hits.set(ip, recent)
  return false
}

// Bucket key for a client IP: IPv4 as is, IPv6 grouped by its /64 prefix.
// '::' is expanded first so every address in a /64 maps to the same key.
function clientKey(raw: string): string {
  let ip = String(raw || 'unknown').trim().toLowerCase().slice(0, 64);
  const mapped = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (mapped) return mapped[1];
  if (!ip.includes(':')) return ip;
  ip = ip.split('%')[0];
  const [head, tail = ''] = ip.split('::');
  const left = head ? head.split(':') : [];
  const right: string[] = ip.includes('::') && tail ? tail.split(':') : [];
  const missing = 8 - left.length - right.length;
  const groups = ip.includes('::') ? [...left, ...Array(Math.max(missing, 0)).fill('0'), ...right] : left;
  return groups.slice(0, 4).map((g) => (parseInt(g, 16) || 0).toString(16)).join(':');
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

function validMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= MAX_MESSAGES &&
    value.every(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length <= MAX_CHARS,
    )
  )
}

export async function POST(request: Request): Promise<Response> {
  const key = process.env.GROQ_API_KEY
  if (!key) return json(500, { error: 'The server has no GROQ_API_KEY set.' })

  // x-real-ip is set by Vercel to the connecting client; callers cannot spoof it.
  const ip = clientKey(request.headers.get('x-real-ip') ?? 'local')
  if (limited(ip)) return json(429, { error: 'Too many messages. Take a short break and try again.' })

  let body: { subject?: unknown; messages?: unknown }
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Body must be JSON.' })
  }
  const subject = SUBJECTS.find((s) => s === body.subject)
  if (!subject) return json(400, { error: 'Unknown subject.' })
  if (!validMessages(body.messages)) return json(400, { error: 'Invalid messages.' })

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      reasoning_effort: 'low',
      max_tokens: 2000,
      messages: [
        { role: 'system', content: buildSystemPrompt(subject) },
        ...body.messages.map(({ role, content }) => ({ role, content })),
      ],
    }),
  })
  if (!response.ok) {
    const status = response.status === 429 ? 429 : 502
    return json(status, { error: status === 429 ? 'Nomi is busy right now. Try again in a minute.' : 'The AI provider returned an error.' })
  }
  const data = await response.json()
  const reply: string | undefined = data?.choices?.[0]?.message?.content
  return json(200, { reply: reply?.trim() || "Hmm, I didn't catch that. Could you try asking again? 📚" })
}
