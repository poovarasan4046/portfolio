"use client"

import { content } from "@/lib/content"

export function Services() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-screen-xl mx-auto bg-secondary/20 rounded-3xl my-10">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
        {content.services.title}
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {content.services.items.map((item, i) => (
          <div key={i} className="bg-background rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
