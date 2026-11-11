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
        const reject = (status: number, error: string) => {
          res.statusCode = status
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error }))
        }
        // Other sites open in the browser can reach localhost. Requiring JSON forces a CORS
        // preflight they cannot pass, and a foreign Origin is refused outright.
        if (req.method !== 'POST') return reject(405, 'POST only.')
        if (!req.headers['content-type']?.startsWith('application/json')) return reject(415, 'Send JSON.')
        const origin = req.headers.origin
        if (origin && new URL(origin).host !== req.headers.host) return reject(403, 'Cross-origin request refused.')

        const chunks: Buffer[] = []
        let size = 0
        for await (const chunk of req) {
          size += (chunk as Buffer).length
          if (size > 256 * 1024) return reject(413, 'Request too large.')
          chunks.push(chunk as Buffer)
        }
        const { POST } = await server.ssrLoadModule('/api/chat.ts')
        const response: Response = await POST(
          new Request('http://localhost/api/chat', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'x-real-ip': req.socket.remoteAddress ?? 'local' },
            body: Buffer.concat(chunks),
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
