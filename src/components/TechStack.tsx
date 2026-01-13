"use client"

import { content } from "@/lib/content"

export function TechStack() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
        {content.techStack.title}
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {content.techStack.categories.map((cat, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-primary">{cat.name}</h3>
            <ul className="grid gap-2">
              {cat.items.map((item, j) => (
                <li key={j} className="text-muted-foreground border-l-2 border-border pl-4 hover:border-primary transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
