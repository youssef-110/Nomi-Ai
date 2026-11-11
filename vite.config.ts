import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serves api/chat.ts during `npm run dev`, the same function Vercel runs in production.
 * The key is read on the dev server only: variables without the VITE_ prefix never reach
 * the browser bundle.
 */
function devApi(mode: string): Plugin {
  return {
    name: 'nomi-dev-api',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), '')
      // Older .env files used VITE_GROQ_API_KEY; nothing in src reads it any more.
      process.env.GROQ_API_KEY ||= env.GROQ_API_KEY || env.VITE_GROQ_API_KEY
      if (env.GROQ_MODEL) process.env.GROQ_MODEL ||= env.GROQ_MODEL

      server.middlewares.use('/api/chat', async (req, res) => {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const { POST } = await server.ssrLoadModule('/api/chat.ts')
        const response: Response = await POST(
          new Request('http://localhost/api/chat', {
            method: req.method,
            headers: { 'content-type': 'application/json' },
            body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
          }),
        )
        res.statusCode = response.status
        res.setHeader('content-type', 'application/json')
        res.end(await response.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), devApi(mode)],
}))
