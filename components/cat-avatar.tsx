"use client"

import { motion, AnimatePresence } from "framer-motion"

export type CatState = "sleep" | "wake" | "listen" | "think"

const easeOut = [0.22, 1, 0.36, 1] as const

export function CatAvatar({
  state,
  size = 96,
}: {
  state: CatState
  size?: number
}) {
  const sleeping = state === "sleep"
  const listening = state === "listen"
  const thinking = state === "think"

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* soft ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-primary), transparent 70%)",
        }}
        animate={{
          opacity: sleeping ? 0.25 : listening ? 0.7 : 0.45,
          scale: listening ? [1, 1.12, 1] : 1,
        }}
        transition={{
          duration: listening ? 1.4 : 0.6,
          repeat: listening ? Number.POSITIVE_INFINITY : 0,
          ease: "easeInOut",
        }}
      />

      {/* breathing / bobbing body wrapper */}
      <motion.div
        className="relative h-full w-full"
        animate={
          sleeping
            ? { y: [0, 2, 0], scale: [1, 1.015, 1] }
            : { y: [0, -3, 0] }
        }
        transition={{
          duration: sleeping ? 3.2 : 2.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
        >
          <defs>
            <linearGradient id="catBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b4564" />
              <stop offset="100%" stopColor="#2a3150" />
            </linearGradient>
            <radialGradient id="catCheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ears */}
          <motion.g
            animate={
              listening
                ? { rotate: [0, -4, 4, 0] }
                : { rotate: 0 }
            }
            transition={{
              duration: 0.8,
              repeat: listening ? Number.POSITIVE_INFINITY : 0,
            }}
            style={{ transformOrigin: "60px 50px" }}
          >
            <path d="M38 46 L30 22 L54 38 Z" fill="url(#catBody)" />
            <path d="M82 46 L90 22 L66 38 Z" fill="url(#catBody)" />
            <path d="M40 42 L35 28 L50 38 Z" fill="var(--color-primary)" opacity="0.5" />
            <path d="M80 42 L85 28 L70 38 Z" fill="var(--color-primary)" opacity="0.5" />
          </motion.g>

          {/* head/body */}
          <ellipse cx="60" cy="68" rx="38" ry="34" fill="url(#catBody)" />

          {/* cheeks */}
          <circle cx="40" cy="74" r="11" fill="url(#catCheek)" />
          <circle cx="80" cy="74" r="11" fill="url(#catCheek)" />

          {/* eyes */}
          <AnimatePresence mode="wait">
            {sleeping ? (
              <motion.g
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <path
                  d="M40 66 q7 6 14 0"
                  stroke="var(--color-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M66 66 q7 6 14 0"
                  stroke="var(--color-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.g>
            ) : (
              <motion.g
                key="open"
                initial={{ opacity: 0, scaleY: 0.2 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
                style={{ transformOrigin: "60px 66px" }}
              >
                <motion.ellipse
                  cx="47"
                  cy="66"
                  rx="6"
                  ry={thinking ? 6 : 7}
                  fill="var(--color-primary)"
                  animate={
                    thinking
                      ? { cx: [45, 49, 45] }
                      : { ry: [7, 1.5, 7] }
                  }
                  transition={
                    thinking
                      ? { duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                      : { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", times: [0, 0.05, 0.1] }
                  }
                />
                <motion.ellipse
                  cx="73"
                  cy="66"
                  rx="6"
                  ry={thinking ? 6 : 7}
                  fill="var(--color-primary)"
                  animate={
                    thinking
                      ? { cx: [71, 75, 71] }
                      : { ry: [7, 1.5, 7] }
                  }
                  transition={
                    thinking
                      ? { duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                      : { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", times: [0, 0.05, 0.1] }
                  }
                />
                {/* eye shine */}
                <circle cx="49" cy="63" r="1.8" fill="white" opacity="0.9" />
                <circle cx="75" cy="63" r="1.8" fill="white" opacity="0.9" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* nose + mouth */}
          <path d="M57 76 h6 l-3 3 Z" fill="var(--color-accent)" />
          <path
            d="M60 79 q-4 4 -8 2 M60 79 q4 4 8 2"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* whiskers */}
          <g stroke="var(--color-muted-foreground)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
            <line x1="30" y1="74" x2="14" y2="70" />
            <line x1="30" y1="78" x2="14" y2="80" />
            <line x1="90" y1="74" x2="106" y2="70" />
            <line x1="90" y1="78" x2="106" y2="80" />
          </g>
        </svg>
      </motion.div>

      {/* sleeping Zzz */}
      <AnimatePresence>
        {sleeping && (
          <div className="absolute -right-1 top-0">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute font-mono font-bold text-primary"
                style={{ fontSize: 12 + i * 4 }}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -22 - i * 6, x: 6 + i * 5 }}
                transition={{
                  duration: 2.4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                  ease: easeOut,
                }}
              >
                z
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* thinking dots */}
      <AnimatePresence>
        {thinking && (
          <motion.div
            className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-1 rounded-full glass px-2 py-1"
            initial={{ opacity: 0, scale: 0.6, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.9,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
