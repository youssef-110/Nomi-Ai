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
