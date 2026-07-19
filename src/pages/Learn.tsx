import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, RotateCcw, Menu, X } from 'lucide-react'
import { groq, MODEL, buildSystemPrompt } from '../lib/groq'
import ChatMessage, { type Message } from '../components/ChatMessage'
import SubjectSelector, { type Subject } from '../components/SubjectSelector'
import TypingIndicator from '../components/TypingIndicator'

const WELCOME: Message = {
  role: 'assistant',
  content:
    "Hi! I'm Nomi, your learning assistant. Select a subject and ask me anything — I'm here to help you learn! 📚",
}

export default function Learn() {
  const [subject, setSubject] = useState<Subject>('Mathematics')
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const newSession = () => {
    setMessages([WELCOME])
    setInput('')
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const history = [...messages, userMessage]
    setMessages(history)
    setInput('')
    setLoading(true)

    try {
      const completion = await groq.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: buildSystemPrompt(subject) },
          ...history
            .filter((m) => m !== WELCOME)
            .map((m) => ({ role: m.role, content: m.content })),
        ],
      })
      const reply =
        completion.choices[0]?.message?.content ??
        "Hmm, I didn't catch that — could you try asking again? 📚"
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "⚠️ I couldn't reach my brain right now. Please check that your Groq API key is set in the .env file (VITE_GROQ_API_KEY) and try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-screen flex bg-surface overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-navy flex flex-col p-5 transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-1 text-xl font-extrabold text-white">
            Nomi AI
            <span className="w-2.5 h-2.5 rounded-full bg-accent mt-1" aria-hidden />
          </Link>
          <button
            className="lg:hidden text-slate-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
          Subjects
        </p>
        <div className="flex-1 overflow-y-auto">
          <SubjectSelector
            selected={subject}
            onSelect={(s) => {
              setSubject(s)
              setSidebarOpen(false)
            }}
          />
        </div>

        <div className="mt-6 bg-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 text-center">
          🔒 Your data stays private
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-navy"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="font-bold text-navy leading-tight">{subject}</h1>
              <p className="text-xs text-muted">Learning session</p>
            </div>
          </div>
          <button
            onClick={newSession}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy border border-slate-200 hover:border-accent hover:text-accent px-3.5 py-2 rounded-xl transition-colors"
          >
            <RotateCcw size={16} /> New Session
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto chat-scroll px-4 sm:px-6 py-6 space-y-4">
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-4 shrink-0">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask Nomi about ${subject}...`}
              className="flex-1 bg-surface border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-accent hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-5 flex items-center justify-center transition-colors shadow-sm"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-[11px] text-muted mt-2.5">
            Powered by Groq · Privacy First
          </p>
        </div>
      </div>
    </div>
  )
}
