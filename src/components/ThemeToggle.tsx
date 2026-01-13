"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

/**
 * ThemeToggle with circular reveal animation
 * 
 * Uses the View Transitions API for a modern radial transition effect
 * that expands from the button's click position.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme()
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"

    // Check if View Transitions API is supported
    // @ts-expect-error - View Transitions API is experimental
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    // Get click coordinates for the reveal origin
    const x = event.clientX
    const y = event.clientY
    
    // Calculate the max radius needed to cover the entire screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Start the view transition
    // @ts-expect-error - View Transitions API is experimental
    const transition = document.startViewTransition(() => {
      setTheme(newTheme)
    })

    // Wait for the transition to be ready
    await transition.ready

    // Animate the clip-path from the click point
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  // Prevent flash of wrong icon during hydration
  if (!mounted) {
    return (
      <button
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
          className
        )}
        aria-label="Toggle theme"
      >
        <div className="h-[1.2rem] w-[1.2rem]" />
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors relative overflow-hidden",
        className
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <Sun 
        className={cn(
          "h-[1.2rem] w-[1.2rem] absolute transition-all duration-300",
          resolvedTheme === "dark" 
            ? "rotate-90 scale-0 opacity-0" 
            : "rotate-0 scale-100 opacity-100"
        )} 
      />
      {/* Moon Icon */}
      <Moon 
        className={cn(
          "h-[1.2rem] w-[1.2rem] absolute transition-all duration-300",
          resolvedTheme === "dark" 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        )} 
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
