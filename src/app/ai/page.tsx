'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChartNoAxesCombined, Send, Bot, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AI_MESSAGES } from '@/lib/mock-data'

type Message = { role: 'assistant' | 'user'; content: string }

const QUICK_ACTIONS = [
  'Analyze BTC/USDT',
  'Find SMC setups',
  'Whale activity',
  'High confidence',
]

const SUGGESTED_PROMPTS = [
  "What's the market sentiment today?",
  'Find me a high R/R setup',
  'Explain this SMC pattern',
  'Compare BTC vs ETH momentum',
  'Show me whale accumulation zones',
]

const RECENT_INSIGHTS = [
  { color: '#1FD978', text: 'BTC accumulation pattern detected near $66K', time: '2h ago' },
  { color: '#FF6467', text: 'ETH showing weakness on 4H RSI', time: '4h ago' },
  { color: '#FACC15', text: 'SOL whale wallet activity spike', time: '6h ago' },
]

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>(AI_MESSAGES)
  const [input, setInput] = useState('')

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [
      ...prev,
      { role: 'user', content: text },
      { role: 'assistant', content: `Analyzing "${text}"...\n\nThis feature is coming soon. I'll provide real-time market analysis powered by advanced SMC and whale tracking algorithms.` },
    ])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 h-full"
      style={{ height: 'calc(100dvh - 48px - 32px)' }}
    >
      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <h1 className="flex items-center gap-2 font-display text-base font-bold text-pumple-text mb-2.5">
          <span className="w-6 h-6 rounded-md bg-pumple-primary/15 border border-pumple-primary/30 flex items-center justify-center">
            <Bot size={13} className="text-pumple-primary" />
          </span>
          AI Analyst
          <Sparkles size={12} className="text-pumple-accent" />
        </h1>

        {/* Quick actions */}
        <div className="flex gap-1.5 flex-wrap mb-2.5">
          {QUICK_ACTIONS.map(action => (
            <button
              key={action}
              onClick={() => setInput(action)}
              className="pill !rounded-lg text-[11px] px-2.5 py-1"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 bg-pumple-card border border-pumple-border rounded-[10px] p-3 overflow-y-auto mb-2.5 flex flex-col gap-2.5 min-h-[260px]">
          {messages.map((msg, i) =>
            msg.role === 'assistant' ? (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: '#1FD97820',
                    border: '1px solid #1FD97840',
                    boxShadow: '0 0 10px rgba(31, 217, 120,0.2)',
                  }}
                >
                  <ChartNoAxesCombined size={12} className="text-pumple-primary" />
                </div>
                <div
                  className="max-w-[80%] rounded-[10px] rounded-tl-[3px] p-2.5 text-xs leading-relaxed text-pumple-text"
                  style={{
                    backgroundColor: '#212225',
                    border: '1px solid #272A2D',
                  }}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({children}) => <strong className="font-bold text-pumple-text">{children}</strong>,
                      ul: ({children}) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
                      li: ({children}) => <li className="text-pumple-text/90">{children}</li>,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div
                  className="max-w-[80%] rounded-[10px] rounded-tr-[3px] p-2.5 text-xs text-pumple-text whitespace-pre-wrap"
                  style={{
                    backgroundColor: '#1FD97815',
                    border: '1px solid #1FD97830',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            )
          )}
        </div>

        {/* Input row */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the AI analyst..."
            className="flex-1 bg-pumple-card border border-pumple-border rounded-[8px] px-3 py-2 text-[12px] text-pumple-text placeholder:text-pumple-muted/50 outline-none focus:border-pumple-primary/50 transition-colors"
          />
          <button
            onClick={handleSend}
            className="btn-degen text-xs px-4 py-2"
          >
            <Send size={12} />
            Send
          </button>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-[280px] flex-shrink-0 hidden lg:flex flex-col gap-4">

        {/* Suggested prompts */}
        <div className="p-card p-4">
          <p className="font-display text-sm font-bold text-pumple-text mb-3">Suggested prompts</p>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <div
              key={prompt}
              onClick={() => setInput(prompt)}
              className="text-[11px] text-pumple-muted hover:text-pumple-primary cursor-pointer py-1.5"
              style={{ borderBottom: i < SUGGESTED_PROMPTS.length - 1 ? '1px solid #272A2D' : 'none' }}
            >
              {prompt}
            </div>
          ))}
        </div>

        {/* Recent insights */}
        <div className="p-card p-4">
          <p className="font-display text-sm font-bold text-pumple-text mb-3">Recent insights</p>
          <div className="flex flex-col gap-3">
            {RECENT_INSIGHTS.map(insight => (
              <div key={insight.text} className="flex items-start gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                  style={{ backgroundColor: insight.color }}
                />
                <div>
                  <p className="text-[11px] text-pumple-muted leading-relaxed">{insight.text}</p>
                  <p className="text-[10px] text-pumple-muted/60">{insight.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
