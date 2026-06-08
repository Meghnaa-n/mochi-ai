"use client"

import { motion } from "framer-motion"

export function Waveform({ active }: { active: boolean }) {
  const bars = Array.from({ length: 28 })

  return (
    <div className="flex h-10 items-center justify-center gap-[3px]" aria-hidden="true">
      {bars.map((_, i) => {
        const center = Math.abs(i - bars.length / 2)
        const base = 4 + Math.max(0, 14 - center * 1.1)
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-primary"
            initial={{ height: 4 }}
            animate={
              active
                ? { height: [base * 0.4, base * 1.6, base * 0.6, base * 1.2, base * 0.4] }
                : { height: 4 }
            }
            transition={{
              duration: 0.9 + (i % 5) * 0.12,
              repeat: active ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}
