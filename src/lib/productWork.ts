// ============================================================
// Product Work Data Model
// ============================================================
// This file contains the data model for the Product Work section.
// Use the types below to guide you when adding new products.
// ============================================================

// ----- Type Definitions -----

/**
 * A single stage in the product lifecycle timeline.
 * 
 * @example
 * { key: "idea", label: "Idea & Discovery", completed: true }
 */
export interface LifecycleStage {
  /** Unique identifier for the stage (e.g., "idea", "development") */
  key: string;
  /** Human-readable label shown in the UI */
  label: string;
  /** Whether this stage is completed */
  completed: boolean;
}

/**
 * Describes who built the product and how.
 */
export interface ProductOwnership {
  /** "personal" for side projects, "client" for client work */
  type: "personal" | "client";
  /** Your role in the project (e.g., "Idea → Build → Deploy") */
  role: string;
  /** "self" if you built it alone, "team" if with others */
  builtBy: "self" | "team";
}

/**
 * Tech stack used in the product.
 * All arrays are optional - only include what's relevant.
 */
export interface ProductTechStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  tooling?: string[];
}

/**
 * Lifecycle information for the product.
 */
export interface ProductLifecycle {
  /** Current status: "live" | "internal-testing" | "in-progress" | "completed" | "archived" */
  currentStatus: string;
  /** Timeline stages to show progress */
  stages: LifecycleStage[];
  /** When work started (e.g., "2024-06") */
  startedAt?: string;
  /** Last update date (e.g., "2025-01") */
  lastUpdated?: string;
  /** When the project was completed (for finished projects) */
  completedAt?: string;
}

/**
 * Visibility settings for the product.
 */
export interface ProductVisibility {
  /** If true, links will be shown */
  public: boolean;
  /** If true, this is an internal-only project */
  internalOnly: boolean;
}

/**
 * External links for the product.
 * Set to null if not available.
 */
export interface ProductLinks {
  website: string | null;
  playStore: string | null;
  github: string | null;
}

/**
 * Client information (only for client projects).
 */
export interface ProductClient {
  name: string;
  logo?: string;
  allowedToShow: boolean;
}

/**
 * A single product item in the Product Work section.
 * 
 * @example
 * {
 *   id: "my-app",
 *   title: "My App",
 *   summary: "A brief description of the app...",
 *   ownership: { type: "personal", role: "Solo Developer", builtBy: "self" },
 *   techStack: { frontend: ["React"], backend: ["Node.js"] },
 *   lifecycle: {
 *     currentStatus: "live",
 *     stages: [
 *       { key: "idea", label: "Idea", completed: true },
 *       { key: "dev", label: "Development", completed: true },
 *     ],
 *     startedAt: "2024-01",
 *   },
 *   visibility: { public: true, internalOnly: false },
 *   links: { website: "https://example.com", playStore: null, github: null },
 * }
 */
export interface ProductItem {
  /** Unique identifier (used as React key) */
  id: string;
  /** Product title displayed as heading */
  title: string;
  /** Brief description of the product */
  summary: string;
  /** Ownership and role information */
  ownership: ProductOwnership;
  /** Client info (only for client projects) */
  client?: ProductClient;
  /** Technologies used */
  techStack: ProductTechStack;
  /** Development lifecycle */
  lifecycle: ProductLifecycle;
  /** Visibility settings */
  visibility: ProductVisibility;
  /** External links */
  links: ProductLinks;
}

/**
 * The main Product Work content structure.
 */
export interface ProductWorkContent {
  title: string;
  description: string;
  items: ProductItem[];
}

// ----- Data -----

export const productWork: ProductWorkContent = {
  title: "Product Work",
  description:
    "A selection of products I've built or contributed to — from early ideas to production deployments.",
  items: [
    {
      id: "spendsync",
      title: "Spend Sync",
      summary:
        "An Android-first personal finance app designed to reduce friction in expense tracking, with offline-first storage using local SQLite and automatic backup to the app's private Google Drive folder.",

      ownership: {
        type: "personal",
        role: "Idea → Architecture → Development → Deployment",
        builtBy: "self",
      },

      techStack: {
        frontend: ["Expo", "React Native"],
        backend: ["None (Fully client-side)"],
        database: ["Expo SQLite (Local)", "Google Drive App Folder (Backup)"],
        tooling: ["EAS Build", "CI/CD"],
      },

      lifecycle: {
        currentStatus: "internal-testing",
        stages: [
          { key: "idea", label: "Idea & Problem Discovery", completed: true },
          { key: "planning", label: "Planning & Architecture", completed: true },
          { key: "development", label: "Development", completed: true },
          { key: "testing", label: "Internal Testing (Play Store)", completed: true },
          { key: "deployment", label: "Public Play Store Release", completed: false },
          { key: "production", label: "Live in Production", completed: false },
        ],
        startedAt: "2024-06",
        lastUpdated: "2025-01",
      },

      visibility: {
        public: true,
        internalOnly: false,
      },

      links: {
        website: "https://spendsync.poovarasan.me",
        playStore: null, // Internal testing only
        github: null,
      },
    },
    // Add more products here using the ProductItem interface as a guide
  ],
};
