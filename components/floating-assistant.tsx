"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useRef, useState } from "react"
import { CatAvatar, type CatState } from "./cat-avatar"
import { PopupCard } from "./popup-card"

const DEMO_RAW =
  "um so basically i was wondering if you could maybe help me write a really nice and professional email to my boss asking if it would be possible to take next friday off because i have a family thing going on"

const DEMO_OPTIMIZED =
  "Write a professional email to my manager requesting next Friday off for a family commitment."

export function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<CatState>("sleep")
  const [rawPrompt, setRawPrompt] = useState("")
  const [optimized, setOptimized] = useState("")
  const [stats, setStats] = useState({ before: 0, after: 0 })
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const openAssistant = useCallback(() => {
    setOpen(true)
    setState((s) => (s === "sleep" ? "wake" : s))
  }, [])

  const closeAssistant = useCallback(() => {
    clearTimers()
    setOpen(false)
    setState("sleep")
    setRawPrompt("")
    setOptimized("")
    setStats({ before: 0, after: 0 })
  }, [])

  const handleMicToggle = useCallback(() => {
    clearTimers()
    if (state === "listen") {
      // stop -> think -> result
      setState("think")
      timers.current.push(
        setTimeout(() => {
          setOptimized(DEMO_OPTIMIZED)
          setStats({ before: 58, after: 17 })
          setState("wake")
        }, 1900),
      )
      return
    }
    // start listening
    setOptimized("")
    setStats({ before: 0, after: 0 })
    setRawPrompt("")
    setState("listen")
    // simulate transcript streaming in
    const words = DEMO_RAW.split(" ")
    words.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setRawPrompt(words.slice(0, i + 1).join(" "))
        }, 120 * i),
      )
    })
  }, [state])

  const handleSend = useCallback(() => {
    setState("wake")
    closeAssistant()
  }, [closeAssistant])

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col items-end gap-3">
      {/* floating cat trigger */}
      <motion.button
        layout
        onClick={() => (open ? closeAssistant() : openAssistant())}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={open ? "Close Mochi assistant" : "Wake Mochi assistant"}
      >
        <CatAvatar state={open ? state : "sleep"} size={84} />
      </motion.button>

      {/* popup */}
      <AnimatePresence>
        {open && (
          <PopupCard
            state={state}
            rawPrompt={rawPrompt}
            optimizedPrompt={optimized}
            stats={stats}
            onMicToggle={handleMicToggle}
            onSend={handleSend}
            onClose={closeAssistant}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
