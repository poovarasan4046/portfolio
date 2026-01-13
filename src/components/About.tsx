"use client"

import { content } from "@/lib/content"
import { cn } from "@/lib/utils"

export function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-screen-xl mx-auto">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            {content.about.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content.about.description}
          </p>
        </div>
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Core Values</h3>
            <ul className="grid gap-2">
                {content.about.tags.map((tag, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/50">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </section>
  )
}
