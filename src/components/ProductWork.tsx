"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"
import { productWork } from "@/lib/productWork"
import { ProductCard } from "@/components/ProductCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

gsap.registerPlugin(Observer)

/**
 * ProductWork - Full viewport product showcase section
 * 
 * Features:
 * - 100vh layout
 * - Horizontal swipeable tab bar
 * - 3D Z-axis transitions between products
 * - GSAP Observer for swipe detection
 * - Reduced motion support
 */
export function ProductWork() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // Filter visible products
    const visibleProducts = productWork.items.filter(
        (item) => item.visibility.public || item.visibility.internalOnly
    )

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }
        mediaQuery.addEventListener("change", handleChange)

        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    // Navigate to a specific product
    const goToProduct = useCallback((newIndex: number) => {
        if (isAnimating) return
        if (newIndex < 0 || newIndex >= visibleProducts.length) return
        if (newIndex === activeIndex) return

        setIsAnimating(true)

        const direction = newIndex > activeIndex ? 1 : -1
        const currentCard = cardsContainerRef.current?.querySelector(`[data-index="${activeIndex}"]`)
        const nextCard = cardsContainerRef.current?.querySelector(`[data-index="${newIndex}"]`)

        if (prefersReducedMotion) {
            // Instant transition for reduced motion
            setActiveIndex(newIndex)
            setIsAnimating(false)
            return
        }

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveIndex(newIndex)
                setIsAnimating(false)
            },
        })

        // Animate current card OUT (move back in Z-space)
        if (currentCard) {
            tl.to(currentCard, {
                z: -200 * direction,
                opacity: 0,
                scale: 0.8,
                rotateY: 10 * direction,
                duration: 0.5,
                ease: "power3.in",
            }, 0)
        }

        // Animate next card IN (move forward from Z-space)
        if (nextCard) {
            // Set initial state
            gsap.set(nextCard, {
                z: 200 * -direction,
                opacity: 0,
                scale: 0.8,
                rotateY: -10 * direction,
            })

            tl.to(nextCard, {
                z: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 0.5,
                ease: "power3.out",
            }, 0.2)
        }
    }, [activeIndex, isAnimating, prefersReducedMotion, visibleProducts.length])

    // Go to next/previous product
    const goNext = useCallback(() => {
        goToProduct((activeIndex + 1) % visibleProducts.length)
    }, [activeIndex, goToProduct, visibleProducts.length])

    const goPrev = useCallback(() => {
        goToProduct((activeIndex - 1 + visibleProducts.length) % visibleProducts.length)
    }, [activeIndex, goToProduct, visibleProducts.length])

    // Setup GSAP Observer for swipe detection
    // Only capture horizontal swipes, allow vertical scrolling
    useEffect(() => {
        if (prefersReducedMotion) return

        const ctx = gsap.context(() => {
            Observer.create({
                target: sectionRef.current,
                type: "touch",
                dragMinimum: 30, // Higher threshold to avoid accidental triggers
                onLeft: () => goNext(),
                onRight: () => goPrev(),
                tolerance: 100,
                lockAxis: true, // Lock to one axis to allow vertical scroll
                preventDefault: false, // Allow default scroll behavior
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [goNext, goPrev, prefersReducedMotion])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext()
            if (e.key === "ArrowLeft") goPrev()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [goNext, goPrev])

    return (
        <section
            ref={sectionRef}
            id="products"
            className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 overflow-hidden"
            style={{ perspective: "1500px" }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 relative z-10 px-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4">
                    {productWork.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    {productWork.description}
                </p>
            </div>

            {/* Tab Bar - Scrollable on mobile */}
            <div className="flex justify-start sm:justify-center gap-2 mb-6 sm:mb-10 relative z-10 overflow-x-auto pb-2 px-2 -mx-2">
                {visibleProducts.map((product, index) => (
                    <button
                        key={product.id}
                        onClick={() => goToProduct(index)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap touch-manipulation ${
                            index === activeIndex
                                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                    >
                        {product.title}
                    </button>
                ))}
            </div>

            {/* Cards Container */}
            <div
                ref={cardsContainerRef}
                className="relative flex-1 flex items-start sm:items-center justify-center min-h-[400px] sm:min-h-[500px]"
                style={{ transformStyle: "preserve-3d" }}
            >

                {visibleProducts.map((product, index) => (
                    <div
                        key={product.id}
                        data-index={index}
                        className="absolute w-full"
                        style={{
                            transformStyle: "preserve-3d",
                            opacity: index === activeIndex ? 1 : 0,
                            pointerEvents: index === activeIndex ? "auto" : "none",
                        }}
                    >
                        <ProductCard
                            product={product}
                            isActive={index === activeIndex}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-6 sm:mt-8 relative z-10">
                <button
                    onClick={goPrev}
                    disabled={isAnimating}
                    className="p-2.5 sm:p-3 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50 touch-manipulation"
                    aria-label="Previous product"
                >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                    onClick={goNext}
                    disabled={isAnimating}
                    className="p-2.5 sm:p-3 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50 touch-manipulation"
                    aria-label="Next product"
                >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4 relative z-10">
                {visibleProducts.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToProduct(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeIndex
                                ? "bg-primary w-6"
                                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Go to product ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
