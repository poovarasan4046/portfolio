"use client"

import { ExternalLink, Github, Smartphone, CheckCircle2, Circle } from "lucide-react"
import { ProductItem } from "@/lib/productWork"

interface ProductCardProps {
    product: ProductItem
    isActive: boolean
    prefersReducedMotion: boolean
}

/**
 * ProductCard - Side-by-side layout
 * 
 * Left: Overview, description, tech stack, ownership, links
 * Right: Lifecycle timeline with stages
 * 
 * Width: 70-80% of screen
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
            default:
                return "bg-muted text-muted-foreground border-border"
        }
    }

    return (
        <div
            className={`product-card-container w-full transition-opacity duration-500 ${
                isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute"
            }`}
        >
            {/* Main Card - 70-80% width, centered */}
            <div
                className="product-card mx-auto w-[80%] max-w-6xl rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden"
            >
                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                    
                    {/* ===== LEFT SIDE: Main Details ===== */}
                    <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border/30">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight mb-1">{product.title}</h3>
                                <p className="text-sm text-muted-foreground">{product.ownership.role}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(product.lifecycle.currentStatus)}`}>
                                {product.lifecycle.currentStatus}
                            </span>
                        </div>

                        {/* Summary */}
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            {product.summary}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-8">
                            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {allTech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {product.visibility.public && (
                            <div className="flex gap-4">
                                {product.links.website && (
                                    <a
                                        href={product.links.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Website
                                    </a>
                                )}
                                {product.links.playStore && (
                                    <a
                                        href={product.links.playStore}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Smartphone className="h-4 w-4" />
                                        Play Store
                                    </a>
                                )}
                                {product.links.github && (
                                    <a
                                        href={product.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Github className="h-4 w-4" />
                                        GitHub
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Ownership Badge */}
                        {product.ownership.type === "client" && (
                            <div className="mt-6 inline-block px-3 py-1 rounded text-xs bg-accent text-accent-foreground font-medium uppercase tracking-wider">
                                Client Project
                            </div>
                        )}
                    </div>

                    {/* ===== RIGHT SIDE: Lifecycle Timeline ===== */}
                    <div className="p-8 lg:p-10 bg-muted/30">
                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Progress</p>
                            <h4 className="text-lg font-semibold">Lifecycle Timeline</h4>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border" />

                            <div className="space-y-6">
                                {product.lifecycle.stages.map((stage) => (
                                    <div key={stage.key} className="flex items-center gap-4 relative">
                                        {/* Icon */}
                                        <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                            stage.completed 
                                                ? 'bg-primary text-primary-foreground' 
                                                : 'bg-muted text-muted-foreground/40 border border-border'
                                        }`}>
                                            {stage.completed ? (
                                                <CheckCircle2 className="h-4 w-4" />
                                            ) : (
                                                <Circle className="h-4 w-4" />
                                            )}
                                        </div>

                                        {/* Label */}
                                        <p className={`font-medium ${
                                            stage.completed ? 'text-foreground' : 'text-muted-foreground/50'
                                        }`}>
                                            {stage.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="mt-8 pt-6 border-t border-border/30 space-y-1 text-xs text-muted-foreground">
                            {product.lifecycle.startedAt && (
                                <p>Started: <span className="text-foreground">{product.lifecycle.startedAt}</span></p>
                            )}
                            {product.lifecycle.lastUpdated && (
                                <p>Last Updated: <span className="text-foreground">{product.lifecycle.lastUpdated}</span></p>
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
