"use client"

import { content } from "@/lib/content"

export function Process() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
        {content.process.title}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {content.process.steps.map((step, i) => (
          <div key={i} className="relative flex flex-col gap-4 p-6 rounded-xl border border-border bg-background shadow-sm">
            <span className="text-6xl font-bold text-muted/20 absolute -top-4 -right-2 select-none">
              {i + 1}
            </span>
            <h3 className="text-xl font-medium relative z-10">{step}</h3>
            <div className="h-1 w-12 bg-primary rounded-full mt-auto" />
          </div>
        ))}
      </div>
    </section>
  )
}
