import { Users, MessageSquare, BookOpen } from 'lucide-react'
import Navbar from '../components/Navbar'

const stats = [
  { icon: Users, label: 'Active Students', value: '24' },
  { icon: MessageSquare, label: 'Sessions Today', value: '87' },
  { icon: BookOpen, label: 'Topics Covered', value: '12' },
]

const students = [
  { name: 'Amina Diallo', subject: 'Mathematics', lastActive: '5 min ago', sessions: 14 },
  { name: 'Rustam Nazarov', subject: 'Programming', lastActive: '22 min ago', sessions: 11 },
  { name: 'Thanya Srisuk', subject: 'Science', lastActive: '1 hour ago', sessions: 9 },
  { name: 'Yusuf El-Amin', subject: 'Languages', lastActive: '2 hours ago', sessions: 8 },
  { name: 'Farzona Karimova', subject: 'History', lastActive: 'Yesterday', sessions: 6 },
]

const topics = [
  { subject: 'Mathematics', pct: 82 },
  { subject: 'Science', pct: 67 },
  { subject: 'Programming', pct: 54 },
  { subject: 'Languages', pct: 41 },
  { subject: 'History', pct: 28 },
]

export default function Teacher() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold text-navy mb-8">
          Teacher Dashboard — Nomi AI
        </h1>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Icon size={24} />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-navy">{value}</div>
                <div className="text-sm text-muted">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Student activity table */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
          <h2 className="text-xl font-bold text-navy mb-4">Student Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-slate-200">
                  <th className="py-3 pr-4 font-semibold">Student Name</th>
                  <th className="py-3 pr-4 font-semibold">Subject</th>
                  <th className="py-3 pr-4 font-semibold">Last Active</th>
                  <th className="py-3 font-semibold">Sessions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.name} className="border-b border-slate-100 last:border-0 hover:bg-surface transition-colors">
                    <td className="py-3 pr-4 font-medium text-navy">{s.name}</td>
                    <td className="py-3 pr-4">
                      <span className="bg-accent/10 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {s.subject}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-muted">{s.lastActive}</td>
                    <td className="py-3 text-navy font-semibold">{s.sessions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular topics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-navy mb-6">Popular Topics This Week</h2>
          <div className="space-y-5">
            {topics.map((t) => (
              <div key={t.subject}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-navy">{t.subject}</span>
                  <span className="text-muted">{t.pct}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
