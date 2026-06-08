import { FloatingAssistant } from "@/components/floating-assistant"

export default function Page() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 0%, color-mix(in oklch, var(--color-primary) 18%, transparent), transparent), radial-gradient(50% 40% at 10% 100%, color-mix(in oklch, var(--color-accent) 14%, transparent), transparent)",
        }}
      />

      {/* mock browser chrome to frame the extension */}
      <div className="relative z-10 mx-auto flex min-h-svh max-w-5xl flex-col px-4 py-6">
        <div className="flex items-center gap-2 rounded-t-2xl border border-border bg-card/60 px-4 py-3 backdrop-blur">
          <span className="h-3 w-3 rounded-full bg-destructive/70" />
          <span className="h-3 w-3 rounded-full bg-accent/70" />
          <span className="h-3 w-3 rounded-full bg-primary/70" />
          <div className="ml-3 flex-1 truncate rounded-lg bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground">
            chat.example.com/new
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-b-2xl border border-t-0 border-border bg-card/30 p-8 text-center backdrop-blur">
          <div className="max-w-md space-y-3">
            <h1 className="text-balance font-heading text-3xl font-semibold tracking-tight text-foreground">
              Meet Mochi, your prompt-optimizing cat
            </h1>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              The sleepy cat naps in your top-right corner. Tap to wake her, speak
              your messy thought, and she&apos;ll trim it into a crisp,
              token-efficient prompt.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border bg-secondary/40 px-3 py-1">
              Voice capture
            </span>
            <span className="rounded-full border border-border bg-secondary/40 px-3 py-1">
              Live waveform
            </span>
            <span className="rounded-full border border-border bg-secondary/40 px-3 py-1">
              Token reduction
            </span>
            <span className="rounded-full border border-border bg-secondary/40 px-3 py-1">
              One-tap send
            </span>
          </div>
          <p className="text-sm text-muted-foreground/70">
            {"\u2197\uFE0E"} Tap the cat in the corner to begin
          </p>
        </div>
      </div>

      <FloatingAssistant />
    </main>
  )
}
