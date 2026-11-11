# Nomi AI

Nomi AI is a privacy-first AI learning assistant designed for students in emerging markets — patient, encouraging, and lightweight enough to run on low-end devices and unreliable connections. It was built as a project for a university Startup Management course, framed around the UN Sustainable Development Goals (SDG 4, 5, 7, and 12).

**Live site:** https://nomi-ai-hex8.vercel.app

## Features

- **AI Tutor Chat** — Ask questions across subjects like Mathematics, Science, History, Literature, Programming, Languages, Geography, and General Knowledge. Powered by Groq's `openai/gpt-oss-120b` model (set `GROQ_MODEL` to change it), with a system prompt that keeps responses on-topic, encouraging, and easy to follow for second-language learners.
- **Teacher Dashboard** — A view for educators to see student activity and popular topics.
- **Privacy-first positioning** — No accounts, no tracking, no ad-based data use.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for tooling and dev server
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for navigation
- [Groq API](https://console.groq.com) for LLM inference, called from a Vercel function
- [Oxlint](https://oxc.rs/) for linting

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com/keys)

### Setup

```bash
git clone https://github.com/youssef-110/nomi-ai.git
cd nomi-ai
npm install
```

Create a `.env` file in the project root (see `.env.example`):

```
GROQ_API_KEY=your_groq_api_key_here
```

Then start the dev server:

```bash
npm run dev
```

### Available Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the Vite dev server            |
| `npm run build`    | Type-check and build for production  |
| `npm run preview`  | Preview the production build         |
| `npm run lint`     | Run Oxlint                           |

## Project Structure

```
api/
└── chat.ts         # Server function: adds the Groq key and system prompt, rate-limits
src/
├── components/     # ChatMessage, Navbar, SubjectSelector, TypingIndicator
├── lib/            # System prompt and subject list (shared with api/)
├── pages/          # Landing, Learn (chat), Teacher (dashboard), About
├── App.tsx         # Route definitions
└── main.tsx        # Entry point
```

## Note on API Keys

The browser never sees the Groq key. The chat page posts to `/api/chat`, a Vercel function
that adds the key, fixes the system prompt on the server (so the endpoint can't be used as
a general-purpose AI proxy), checks the subject and message sizes, and limits requests per
visitor. During `npm run dev`, Vite serves the same function locally.

On Vercel, set `GROQ_API_KEY` in the project's environment variables. Do not prefix it
with `VITE_`: Vite would embed any `VITE_` variable in the public JavaScript bundle.

## Team

Built by Puwat Konganan, Youssef Elkhashab, Abdulloh Komilov, Ahmed Elharty, and Muhammad Davlatzoda.

## License

MIT
