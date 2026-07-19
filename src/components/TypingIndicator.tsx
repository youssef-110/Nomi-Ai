export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
        N
      </div>
      <div className="bg-white border-l-4 border-accent rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-2">
        <span className="flex gap-1">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </span>
        <span className="text-xs text-muted">Nomi is thinking...</span>
      </div>
    </div>
  )
}
