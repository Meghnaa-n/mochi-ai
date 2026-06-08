"use client"

import { motion } from "framer-motion"
import { Mic, MicOff, Copy, Check, Send, Sparkles, X } from "lucide-react"
import { useState } from "react"
import { CatAvatar, type CatState } from "./cat-avatar"
import { Waveform } from "./waveform"

const easeOut = [0.22, 1, 0.36, 1] as const

export function PopupCard({
  state,
  rawPrompt,
  optimizedPrompt,
  stats,
  onMicToggle,
  onSend,
  onClose,
}: {
  state: CatState
  rawPrompt: string
  optimizedPrompt: string
  stats: { before: number; after: number }
  onMicToggle: () => void
  onSend: () => void
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const listening = state === "listen"
  const thinking = state === "think"
  const hasResult = optimizedPrompt.length > 0 && !thinking && !listening

  const reduction = stats.before
    ? Math.round(((stats.before - stats.after) / stats.before) * 100)
    : 0

  const copy = async () => {
    await navigator.clipboard.writeText(optimizedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const statusLabel =
    state === "sleep"
      ? "Dozing off…"
      : listening
        ? "Listening…"
        : thinking
          ? "Optimizing your prompt…"
          : hasResult
            ? "Ready to send"
            : "Tap the mic to speak"

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.94 }}
      transition={{ duration: 0.32, ease: easeOut }}
      className="glass w-[340px] overflow-hidden rounded-3xl shadow-2xl"
    >
      {/* header */}
      <div className="flex items-center gap-3 px-4 pb-2 pt-4">
        <div className="-my-2 shrink-0">
          <CatAvatar state={state} size={56} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="font-heading text-sm font-semibold text-foreground">Mochi</h2>
            <Sparkles className="h-3 w-3 text-accent" />
          </div>
          <motion.p
            key={statusLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="truncate text-xs text-muted-foreground"
          >
            {statusLabel}
          </motion.p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Close assistant"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* body */}
      <div className="px-4 pb-4">
        {/* listening waveform / raw transcript */}
        <div className="rounded-2xl bg-secondary/50 p-3">
          {listening ? (
            <Waveform active />
          ) : (
            <p className="min-h-[40px] text-sm leading-relaxed text-muted-foreground">
              {rawPrompt || (
                <span className="italic opacity-60">
                  Your spoken prompt will appear here…
                </span>
              )}
            </p>
          )}
        </div>

        {/* optimized output */}
        {hasResult && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mt-3"
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium text-foreground">Optimized prompt</span>
            </div>
            <div className="scrollbar-thin max-h-32 overflow-y-auto rounded-2xl border border-primary/20 bg-primary/5 p-3">
              <p className="text-sm leading-relaxed text-foreground">{optimizedPrompt}</p>
            </div>

            {/* token reduction stats */}
            <div className="mt-3 flex items-center gap-2">
              <StatPill label="Before" value={`${stats.before} tok`} muted />
              <RotateCcwArrow />
              <StatPill label="After" value={`${stats.after} tok`} />
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 18 }}
                className="ml-auto flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent"
              >
                <span>−{reduction}%</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* actions */}
        <div className="mt-4 flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onMicToggle}
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors ${
              listening
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/70"
            }`}
            aria-label={listening ? "Stop listening" : "Start listening"}
          >
            {listening && (
              <motion.span
                className="absolute inset-0 rounded-2xl ring-2 ring-primary"
                animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={!hasResult}
            onClick={copy}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary text-sm font-medium text-foreground transition-colors hover:bg-secondary/70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={!hasResult}
            onClick={onSend}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Send
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function StatPill({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div
      className={`rounded-xl px-2.5 py-1.5 ${
        muted ? "bg-secondary/50" : "bg-primary/10"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div
        className={`font-mono text-xs font-semibold ${
          muted ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  )
}

function RotateCcwArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
