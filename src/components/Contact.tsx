"use client"

import { content } from "@/lib/content"
import { Github, Linkedin, Mail } from "lucide-react"
import { ContactItem } from "@/components/ContactItem"

export function Contact() {
  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-screen-xl mx-auto">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            {content.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            {content.contact.text}
          </p>
          <a href={`mailto:${content.contact.email}`} className="text-2xl font-medium hover:text-primary underline decoration-2 underline-offset-4 decoration-primary/50 hover:decoration-primary transition-all">
            {content.contact.email}
          </a>
        </div>
        <div className="flex flex-col gap-6 lg:items-end">
            <div className="flex gap-4 min-h-[100px] items-center">
              {content.contact.socials.map((social) => (
                <ContactItem 
                  key={social.label}
                  icon={
                    social.label === "LinkedIn" ? <Linkedin className="h-6 w-6" /> :
                    social.label === "GitHub" ? <Github className="h-6 w-6" /> :
                    <Mail className="h-6 w-6" />
                  }
                  link={social.link}
                  username={social.username}
                  label={social.label}
                />
              ))}
                <ContactItem 
                  icon={<Mail className="h-6 w-6" />}
                  link={`mailto:${content.contact.email}`}
                  username={content.contact.email}
                  label="Email"
                />
            </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
    return (
        <footer className="py-8 border-t border-border/40">
            <div className="container px-4 text-center md:flex md:justify-between md:text-left text-sm text-muted-foreground max-w-screen-xl mx-auto">
                <p>&copy; {content.footer.year} {content.footer.name}. All rights reserved.</p>
                <p>{content.footer.role}</p>
            </div>
        </footer>
    )
}
