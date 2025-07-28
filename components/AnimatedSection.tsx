import type { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale"
  delay?: number
  duration?: number
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  duration = 0.6,
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`
    const durationClass = `duration-[${Math.round(duration * 1000)}ms]`
    const delayClass = delay > 0 ? `delay-[${Math.round(delay * 1000)}ms]` : ""

    if (!isVisible) {
      switch (animation) {
        case "fadeIn":
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0`
        case "slideUp":
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 translate-y-8`
        case "slideLeft":
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 -translate-x-8`
        case "slideRight":
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 translate-x-8`
        case "scale":
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 scale-95`
        default:
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0`
      }
    }

    return `${baseClasses} ${durationClass} ${delayClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div ref={elementRef} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  )
}
