export const SUBJECTS = [
  'Mathematics',
  'Science',
  'History',
  'Literature',
  'Programming',
  'Languages',
  'Geography',
  'General Knowledge',
] as const

export type Subject = (typeof SUBJECTS)[number]

interface Props {
  selected: Subject
  onSelect: (subject: Subject) => void
}

export default function SubjectSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap lg:flex-col gap-2">
      {SUBJECTS.map((subject) => (
        <button
          key={subject}
          onClick={() => onSelect(subject)}
          className={`text-left text-sm font-medium px-3 py-2 rounded-xl transition-colors ${
            selected === subject
              ? 'bg-accent text-white shadow-sm'
              : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          {subject}
        </button>
      ))}
    </div>
  )
}
