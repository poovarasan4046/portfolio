"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"

interface ContactItemProps {
    icon: React.ReactNode
    link: string
    username: string
    label: string
}

/**
 * ContactItem - Mobile-friendly social link with hover tooltip
 * 
 * Removed Draggable to fix mobile touch issues.
 * Touch/click now reliably navigates to the link.
 */
export function ContactItem({ icon, link, username, label }: ContactItemProps) {
    const containerRef = useRef<HTMLAnchorElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const iconEl = iconRef.current
        const tooltipEl = tooltipRef.current

        if (!iconEl || !tooltipEl) return

        const showTooltip = () => {
            gsap.to(tooltipEl, {
                y: -40,
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)",
            })
        }

        const hideTooltip = () => {
            gsap.to(tooltipEl, {
                y: -20,
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
            })
        }

        // Desktop hover
        iconEl.addEventListener("mouseenter", showTooltip)
        iconEl.addEventListener("mouseleave", hideTooltip)

        // Mobile long-press to show tooltip (optional UX enhancement)
        let longPressTimer: NodeJS.Timeout
        const handleTouchStart = () => {
            longPressTimer = setTimeout(showTooltip, 500)
        }
        const handleTouchEnd = () => {
            clearTimeout(longPressTimer)
            hideTooltip()
        }

        iconEl.addEventListener("touchstart", handleTouchStart, { passive: true })
        iconEl.addEventListener("touchend", handleTouchEnd, { passive: true })

        return () => {
            iconEl.removeEventListener("mouseenter", showTooltip)
            iconEl.removeEventListener("mouseleave", hideTooltip)
            iconEl.removeEventListener("touchstart", handleTouchStart)
            iconEl.removeEventListener("touchend", handleTouchEnd)
        }
    }, [])

    return (
        <a
            ref={containerRef}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center touch-manipulation"
            aria-label={`${label}: ${username}`}
        >
            {/* Tooltip */}
            <div 
                ref={tooltipRef} 
                className="absolute opacity-0 scale-75 pointer-events-none px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md shadow-md whitespace-nowrap z-10"
                style={{ top: 0 }}
            >
                {username}
            </div>

            {/* Icon Button */}
            <div 
                ref={iconRef} 
                className="p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-200"
            >
                {icon}
            </div>
        </a>
    )
}
