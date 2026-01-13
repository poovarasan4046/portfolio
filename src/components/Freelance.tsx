"use client"

import { content } from "@/lib/content"

export function Freelance() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-screen-xl mx-auto bg-muted/30 rounded-3xl my-10 text-center">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
                {content.freelance.title}
            </h2>
            <p className="text-lg text-muted-foreground">
                {content.freelance.description}
            </p>
        </div>
    </section>
  )
}
