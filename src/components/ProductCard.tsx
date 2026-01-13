"use client"

import { ExternalLink, Github, Smartphone, CheckCircle2, Circle } from "lucide-react"
import { ProductItem } from "@/lib/productWork"

interface ProductCardProps {
    product: ProductItem
    isActive: boolean
    prefersReducedMotion: boolean
}

/**
 * ProductCard - Responsive layout optimized for all devices
 * 
 * Mobile: Full width, stacked layout, compact padding
 * Tablet: Side-by-side layout
 * Desktop: Side-by-side with more spacing
 */
export function ProductCard({ product, isActive, prefersReducedMotion }: ProductCardProps) {
    // Get all tech stack items flattened
    const allTech = [
        ...(product.techStack.frontend || []),
        ...(product.techStack.backend || []),
        ...(product.techStack.database || []),
        ...(product.techStack.tooling || []),
    ]

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "live":
                return "bg-green-500/20 text-green-500 border-green-500/30"
            case "completed":
                return "bg-blue-500/20 text-blue-500 border-blue-500/30"
            case "in-progress":
                return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
            case "internal-testing":
                return "bg-orange-500/20 text-orange-500 border-orange-500/30"
            default:
                return "bg-muted text-muted-foreground border-border"
        }
    }

    // Format status for display
    const formatStatus = (status: string) => {
        return status.replace(/-/g, " ")
    }

    return (
        <div
            className={`product-card-container w-full transition-opacity duration-500 ${
                isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute"
            }`}
        >
            {/* Main Card - Full width on mobile, scrollable */}
            <div
                className="product-card mx-auto w-full sm:w-[95%] md:w-[90%] lg:w-[80%] max-w-5xl rounded-xl sm:rounded-2xl border border-border/50 bg-card shadow-xl max-h-[70vh] sm:max-h-[75vh] overflow-y-auto"
            >
                {/* Two-Column Layout - Stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
                    
                    {/* ===== LEFT SIDE: Main Details ===== */}
                    <div className="p-5 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-border/30">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{product.title}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{product.ownership.role}</p>
                            </div>
                            <span className={`self-start px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium capitalize border whitespace-nowrap ${getStatusColor(product.lifecycle.currentStatus)}`}>
                                {formatStatus(product.lifecycle.currentStatus)}
                            </span>
                        </div>

                        {/* Summary */}
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                            {product.summary}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-5 sm:mb-6">
                            <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 uppercase tracking-wider">Tech Stack</p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {allTech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md sm:rounded-lg bg-secondary text-secondary-foreground font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {product.visibility.public && (
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                {product.links.website && (
                                    <a
                                        href={product.links.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm transition-colors touch-manipulation"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        Website
                                    </a>
                                )}
                                {product.links.playStore && (
                                    <a
                                        href={product.links.playStore}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm transition-colors touch-manipulation"
                                    >
                                        <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        Play Store
                                    </a>
                                )}
                                {product.links.github && (
                                    <a
                                        href={product.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm transition-colors touch-manipulation"
                                    >
                                        <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        GitHub
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Ownership Badge */}
                        {product.ownership.type === "client" && (
                            <div className="mt-4 sm:mt-6 inline-block px-2.5 py-1 rounded text-[10px] sm:text-xs bg-accent text-accent-foreground font-medium uppercase tracking-wider">
                                Client Project
                            </div>
                        )}
                    </div>

                    {/* ===== RIGHT SIDE: Lifecycle Timeline ===== */}
                    <div className="p-5 sm:p-6 md:p-8 bg-muted/30">
                        {/* Header */}
                        <div className="mb-5 sm:mb-6">
                            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">Progress</p>
                            <h4 className="text-base sm:text-lg font-semibold">Timeline</h4>
                        </div>

                        {/* Timeline - Compact on mobile */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-3 sm:left-4 top-1 bottom-1 w-0.5 bg-border" />

                            <div className="space-y-3 sm:space-y-4">
                                {product.lifecycle.stages.map((stage) => (
                                    <div key={stage.key} className="flex items-center gap-3 sm:gap-4 relative">
                                        {/* Icon */}
                                        <div className={`relative z-10 flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                                            stage.completed 
                                                ? 'bg-primary text-primary-foreground' 
                                                : 'bg-muted text-muted-foreground/40 border border-border'
                                        }`}>
                                            {stage.completed ? (
                                                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                            ) : (
                                                <Circle className="h-3 w-3 sm:h-4 sm:w-4" />
                                            )}
                                        </div>

                                        {/* Label */}
                                        <p className={`text-xs sm:text-sm font-medium ${
                                            stage.completed ? 'text-foreground' : 'text-muted-foreground/50'
                                        }`}>
                                            {stage.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="mt-5 sm:mt-6 pt-4 sm:pt-6 border-t border-border/30 flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-xs text-muted-foreground">
                            {product.lifecycle.startedAt && (
                                <p>Started: <span className="text-foreground">{product.lifecycle.startedAt}</span></p>
                            )}
                            {product.lifecycle.lastUpdated && (
                                <p>Updated: <span className="text-foreground">{product.lifecycle.lastUpdated}</span></p>
                            )}
                            {product.lifecycle.completedAt && (
                                <p>Completed: <span className="text-foreground">{product.lifecycle.completedAt}</span></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
