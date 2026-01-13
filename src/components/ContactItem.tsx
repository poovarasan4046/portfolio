"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(Draggable)

interface ContactItemProps {
    icon: React.ReactNode
    link: string
    username: string
    label: string
}

export function ContactItem({ icon, link, username, label }: ContactItemProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hover Tooltip Animation
            const showTooltip = () => {
                gsap.to(tooltipRef.current, {
                    y: -40,
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                })
            }

            const hideTooltip = () => {
                gsap.to(tooltipRef.current, {
                    y: -20,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.2,
                })
            }

            iconRef.current?.addEventListener("mouseenter", showTooltip)
            iconRef.current?.addEventListener("mouseleave", hideTooltip)

            // Draggable Logic - Simple Movement
            // We use a separate ref to store the path values to avoid re-renders
            const dragPath: {x: number, y: number}[] = []

            if (containerRef.current) {
                Draggable.create(containerRef.current, {
                    type: "x,y",
                    onDragStart: () => {
                        hideTooltip()
                        gsap.to(containerRef.current, { scale: 1.1, duration: 0.2 })
                        // Clear previous path
                        dragPath.length = 0
                        dragPath.push({ x: 0, y: 0 })
                    },
                    onDrag: function() {
                        // Record position
                        dragPath.push({ x: this.x, y: this.y })
                    },
                    onDragEnd: () => {
                        // Create return path (reverse of drag)
                        const returnPath = [...dragPath].reverse();
                        // Ensure we end at 0,0
                        returnPath.push({ x: 0, y: 0 });

                        gsap.to(containerRef.current, { 
                            keyframes: returnPath,
                            scale: 1, 
                            duration: 1.5, // Slower duration for "slowly easely" feel
                            ease: "power2.inOut" // Smooth ease, no bounce
                        })
                    }
                })
            }

            return () => {
                iconRef.current?.removeEventListener("mouseenter", showTooltip)
                iconRef.current?.removeEventListener("mouseleave", hideTooltip)
            }
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative inline-flex items-center justify-center cursor-grab active:cursor-grabbing">
            {/* Tooltip */}
            <div 
                ref={tooltipRef} 
                className="absolute opacity-0 scale-75 pointer-events-none px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md shadow-md whitespace-nowrap"
            >
                {username}
            </div>

            {/* Icon */}
            <a 
                href={link} 
                className="block"
                // Prevent drag click from firing link if dragged, but since we use Draggable, 
                // typically Draggable handles click/drag distinction. 
                // We might need onClick logic if Draggable suppresses links.
                // However, wrapping the icon div in an anchor might interfere with Draggable target.
                // Better to put anchor inside or handle click programmatically if not dragging.
                // For simplicity with Draggable on container, let's keep div structure and open link on click if not dragged.
             >
                <div ref={iconRef} className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                    {icon}
                </div>
            </a>
        </div>
    )
}
