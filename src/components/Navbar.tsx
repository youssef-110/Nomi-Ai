import { Link, NavLink, useNavigate } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn' },
  { to: '/teacher', label: 'Teachers' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        <Link to="/" className="flex items-center gap-1 text-xl font-extrabold text-navy">
          Nomi AI
          <span className="w-2.5 h-2.5 rounded-full bg-accent mt-1" aria-hidden />
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-muted hover:text-navy'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <button
          onClick={() => navigate('/learn')}
          className="bg-accent hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
        >
          Get Started
        </button>
      </nav>
    </header>
  )
}
