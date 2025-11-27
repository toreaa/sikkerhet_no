import { cn } from "@/lib/utils"

interface MockupFrameProps {
  children: React.ReactNode
  className?: string
  size?: "small" | "medium" | "large"
}

export function MockupFrame({ children, className, size = "medium" }: MockupFrameProps) {
  const sizeClasses = {
    small: "max-w-4xl",
    medium: "max-w-5xl",
    large: "max-w-6xl",
  }

  return (
    <div
      className={cn(
        "relative mx-auto rounded-xl border border-border/50 bg-card/50 p-2 shadow-2xl backdrop-blur-sm",
        sizeClasses[size],
        className
      )}
    >
      <div className="flex gap-1.5 px-3 py-2">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
      </div>
      {children}
    </div>
  )
}

interface MockupProps {
  children: React.ReactNode
  type?: "responsive" | "phone" | "browser"
  className?: string
}

export function Mockup({ children, type = "responsive", className }: MockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg",
        type === "phone" && "aspect-[9/19.5] max-w-[300px]",
        type === "browser" && "aspect-video",
        className
      )}
    >
      {children}
    </div>
  )
}
