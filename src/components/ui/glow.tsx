import { cn } from "@/lib/utils"

interface GlowProps {
  variant?: "top" | "bottom" | "center"
  className?: string
}

export function Glow({ variant = "center", className }: GlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute",
        variant === "top" && "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
        variant === "bottom" && "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
        variant === "center" && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}
    >
      <div
        className={cn(
          "h-[400px] w-[600px] rounded-full opacity-50 blur-[100px]",
          "bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40"
        )}
      />
    </div>
  )
}
