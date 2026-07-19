import { useNavigate } from 'react-router-dom'
import { ShieldCheck, WifiOff, Globe, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'

const features = [
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    text: 'Student conversations are never sold, tracked, or used for advertising. Learning data belongs to the learner — always.',
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    text: 'Designed for low-connectivity environments. Lessons and progress sync gracefully when the network returns.',
  },
  {
    icon: Globe,
    title: 'Built for Emerging Markets',
    text: 'Lightweight, low-bandwidth, and multilingual by design — made for the classrooms the rest of EdTech forgot.',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Abstract CSS/SVG background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute top-40 -left-32 w-80 h-80 rounded-full bg-navy/10 blur-3xl" />
          <svg
            className="absolute right-0 top-8 hidden lg:block opacity-70"
            width="420"
            height="420"
            viewBox="0 0 420 420"
            fill="none"
          >
            <circle cx="300" cy="140" r="110" stroke="#22C55E" strokeWidth="2" strokeDasharray="6 8" />
            <circle cx="300" cy="140" r="70" stroke="#1B2A4A" strokeWidth="2" opacity="0.3" />
            <circle cx="300" cy="140" r="10" fill="#22C55E" />
            <circle cx="190" cy="140" r="6" fill="#1B2A4A" opacity="0.5" />
            <circle cx="410" cy="140" r="6" fill="#22C55E" />
            <path d="M60 340 Q 210 240 360 320" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 6" />
            <rect x="70" y="300" width="26" height="26" rx="8" fill="#1B2A4A" opacity="0.15" />
            <rect x="330" y="290" width="20" height="20" rx="6" fill="#22C55E" opacity="0.4" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <span className="inline-flex items-center gap-2 bg-accent/10 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Privacy-first education technology
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-navy leading-tight max-w-3xl">
            AI-Powered Learning for Every Student,{' '}
            <span className="text-accent">Everywhere</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
            Nomi AI is a privacy-first learning assistant built for students in emerging
            markets — patient, encouraging, and always on the learner's side. No tracking,
            no ads, just better learning.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/learn')}
              className="inline-flex items-center gap-2 bg-accent hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5"
            >
              Start Learning <ArrowRight size={18} />
            </button>
            <span className="text-sm text-muted">Free for students · No account required</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full">
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          Why students and teachers trust Nomi
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white rounded-xl border-l-4 border-accent shadow-sm p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mb-4">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SDG banner */}
      <section id="sdgs" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 w-full">
        <div className="bg-navy rounded-xl p-8 sm:p-10 text-white flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Aligned with the UN Global Goals</h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Nomi AI is built in direct support of the United Nations Sustainable
              Development Goals — expanding access to quality education and closing the
              digital divide.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/40 text-sm font-semibold px-4 py-2 rounded-full">
              SDG 4 · Quality Education
            </span>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/40 text-sm font-semibold px-4 py-2 rounded-full">
              SDG 5 · Gender Equality
            </span>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/40 text-sm font-semibold px-4 py-2 rounded-full">
              SDG 7 · Affordable and Clean Energy
            </span>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/40 text-sm font-semibold px-4 py-2 rounded-full">
              SDG 12 · Responsible Consumption & Production
            </span>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-muted">
          Nomi AI © 2025 · Privacy First · Built for the World
        </div>
      </footer>
    </div>
  )
}
