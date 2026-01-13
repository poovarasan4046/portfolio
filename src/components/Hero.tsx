"use client"

import { useEffect, useRef } from "react"
import { content } from "@/lib/content"
import gsap from "gsap"

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const greetingRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const setupTextHover = (container: HTMLElement | null, type: keyof typeof FONT_WEIGHTS) => {
    if(!container) return;

    const letters = container.querySelectorAll(".char-interactive");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter: Element, weight: number, duration = 0.25) => {
            return gsap.to(letter, {
                duration,
                ease: "power2.out",
                fontVariationSettings: `'wght' ${weight}`,
            })
    }

    const handleMouseMove = (e: MouseEvent) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach(letter => {
            const rect = letter.getBoundingClientRect();
            // Use window-relative coordinates effectively or offsets
            const letterLeft = rect.left;
            // The logic from snippet assumes mouseX is relative to container, and letterLeft needs adjustment
            // Let's rely on clientX differences directly for robustness in varying layouts
            const center = rect.left + rect.width / 2;
            const distance = Math.abs(e.clientX - center);

            const intensity = Math.exp(-(distance ** 2) / 20000);

            animateLetter(letter,
                min + (max - min) * intensity,
            )
        });
    }

    const handleMouseLeave = () => {
        letters.forEach(letter => {
            animateLetter(letter, base, 0.3);
        });
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      // Entrance Animation
      tl.to(".char", {
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        ease: "power3.out",
      })
      .from(roleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      .from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")

    }, containerRef)
    
    // Interactive Hover Setup
    const cleanupName = setupTextHover(nameRef.current, "title")

    return () => {
      ctx.revert()
      cleanupName && cleanupName()
    }
  }, [])

  const renderText = (text: string, className: string, baseWeight = 400) => {
    return text.split("").map((char, index) => (
      <span 
        key={index} 
        className={`${className} char opacity-0`}
        style={{
          fontVariationSettings: `'wght' ${baseWeight}`,
        }}
      >
        {char === " " ? "\u00A0" : <span className="char-interactive">{char}</span>}
      </span>
    ))
  }

  return (
    <section ref={containerRef} className="flex min-h-[85vh] flex-col justify-center px-4 md:px-8 max-w-screen-xl mx-auto py-20">
      <div className="space-y-4">
        <h2 ref={greetingRef} className="text-xl font-medium text-muted-foreground sm:text-2xl md:text-3xl">
          {content.hero.greeting}
        </h2>
        
        
        <h1 ref={nameRef} className="font-georama text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl italic cursor-default bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent pb-2">
           {renderText(content.hero.name, "", 400)}
        </h1>

        <h2 ref={roleRef} className="text-2xl font-bold text-foreground/80 sm:text-3xl md:text-4xl lg:text-5xl">
          {content.hero.role}
        </h2>
      </div>

      <p ref={descRef} className="mt-6 max-w-[700px] text-lg text-muted-foreground sm:text-xl md:mt-8">
        {content.hero.description}
      </p>

      <div ref={ctaRef} className="mt-8 flex gap-4 md:mt-10">
        <a
          href="#projects"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {content.hero.ctaPrimary}
        </a>
        <a
          href="#contact"
          className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-base font-medium shadow-sm transition-transform hover:scale-105 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {content.hero.ctaSecondary}
        </a>
      </div>
    </section>
  )
}
