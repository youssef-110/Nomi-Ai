# Nomi AI

Nomi AI is a privacy-first AI learning assistant designed for students in emerging markets — patient, encouraging, and lightweight enough to run on low-end devices and unreliable connections. It was built as a project for a university Startup Management course, framed around the UN Sustainable Development Goals (SDG 4, 5, 7, and 12).

## Features

- **AI Tutor Chat** — Ask questions across subjects like Mathematics, Science, History, Literature, Programming, Languages, Geography, and General Knowledge. Powered by Groq's `llama-3.3-70b-versatile` model, with a system prompt that keeps responses on-topic, encouraging, and easy to follow for second-language learners.
- **Teacher Dashboard** — A view for educators to see student activity and popular topics.
- **Privacy-first positioning** — No accounts, no tracking, no ad-based data use.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for tooling and dev server
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for navigation
- [Groq SDK](https://github.com/groq/groq-typescript) for LLM inference
- [Oxlint](https://oxc.rs/) for linting

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com/keys)

### Setup

```bash
git clone https://github.com/<your-username>/nomi-ai.git
cd nomi-ai
npm install
```

Create a `.env` file in the project root (see `.env.example`):

```
VITE_GROQ_API_KEY=your_groq_api_key_here
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
src/
├── components/     # ChatMessage, Navbar, SubjectSelector, TypingIndicator
├── lib/            # Groq client setup and system prompt
├── pages/          # Landing, Learn (chat), Teacher (dashboard), About
├── App.tsx         # Route definitions
└── main.tsx        # Entry point
```

## Note on API Keys

This app calls the Groq API directly from the browser for demo purposes (`dangerouslyAllowBrowser: true`), which exposes the API key to anyone using the deployed site. This is fine for a class project/demo, but for a production app the API calls should be proxied through a backend so the key stays server-side.

## Team

Built by Puwat Konganan, Youssef Elkhashab, Abdulloh Komilov, Ahmed Elharty, and Muhammad Davlatzoda.

## License

MIT
