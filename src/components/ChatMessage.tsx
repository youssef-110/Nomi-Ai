export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatMessage({ message }: { message: Message }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end animate-fadeIn">
        <div className="bg-accent text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%] sm:max-w-[70%] shadow-sm whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-end gap-2 animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
        N
      </div>
      <div className="bg-white border-l-4 border-accent text-navy rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%] sm:max-w-[70%] shadow-sm whitespace-pre-wrap break-words">
        {message.content}
      </div>
    </div>
  )
}
