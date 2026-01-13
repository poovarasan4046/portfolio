"use client"

import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { content } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link className="mr-6 flex items-center space-x-2 font-bold" href="/">
          <span>{content.footer.name}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About
          </Link>
          <Link href="#projects" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Work
          </Link>
          <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
