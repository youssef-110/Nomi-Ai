import { GraduationCap, Scale, Zap, Recycle } from 'lucide-react'
import Navbar from '../components/Navbar'

const team = [
  { name: 'Puwat Konganan', role: 'Design & Systems Thinking' },
  { name: 'Youssef Elkhashab', role: 'Research & Content' },
  { name: 'Abdulloh Komilov', role: 'AI Product Lead' },
  { name: 'Ahmed Elharty', role: 'Regional Strategy & Outreach' },
  { name: 'Muhammad Davlatzoda', role: 'Network & Sustainability' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {/* Mission */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-navy mb-6">Our Mission</h1>
          <p className="text-lg text-muted leading-relaxed">
            Nomi AI exists to make world-class learning support available to every student,
            regardless of geography or income. We are a{' '}
            <span className="text-navy font-semibold">privacy-first AI learning assistant</span>{' '}
            built for emerging markets — where connectivity is scarce, devices are shared,
            and trust matters most. Student data is never sold, profiled, or used for
            advertising. Nomi is patient, encouraging, and always on the learner's side.
          </p>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-navy text-center mb-10">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl shadow-sm p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <h3 className="font-bold text-navy">{member.name}</h3>
                <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SDG alignment */}
        <section className="bg-white rounded-xl shadow-sm p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-navy text-center mb-10">SDG Alignment</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="border-l-4 border-accent pl-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <GraduationCap size={22} />
                </div>
                <h3 className="font-bold text-navy">SDG 4 · Quality Education</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Nomi delivers personalized, patient tutoring at near-zero marginal cost,
                helping ensure inclusive and equitable quality education and lifelong
                learning opportunities for all — especially where qualified teachers are
                stretched thin.
              </p>
            </div>
            <div className="border-l-4 border-accent pl-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Scale size={22} />
                </div>
                <h3 className="font-bold text-navy">SDG 5 · Gender Equality</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                A private, judgment-free tutor lowers barriers for girls and young women
                whose access to classrooms, mentors, or study time is constrained —
                letting every learner study on their own terms.
              </p>
            </div>
            <div className="border-l-4 border-accent pl-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Zap size={22} />
                </div>
                <h3 className="font-bold text-navy">SDG 7 · Affordable and Clean Energy</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Nomi is engineered to be lightweight — running on low-end devices with
                minimal compute and bandwidth, so learning stays possible where power is
                intermittent and every watt counts.
              </p>
            </div>
            <div className="border-l-4 border-accent pl-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Recycle size={22} />
                </div>
                <h3 className="font-bold text-navy">SDG 12 · Responsible Consumption & Production</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                By extending the useful life of shared, older devices instead of demanding
                new hardware, Nomi supports sustainable consumption and reduces
                electronic waste.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-muted">
          Nomi AI © 2025 · Privacy First · Built for the World
        </div>
      </footer>
    </div>
  )
}
