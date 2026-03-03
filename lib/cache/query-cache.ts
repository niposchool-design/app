/**
 * React Query Cache Configuration
 *
 * Centralized staleTime/cacheTime constants for heavy reads.
 * Use these when configuring useQuery hooks to ensure consistent
 * caching behavior across the application.
 *
 * Strategy: React Query in-memory cache is sufficient for pilot.
 * No Redis/external cache needed at current scale (~100 users).
 */

export const CACHE_TIMES = {
  /** User RBAC (role, permissions, navigation) — already cached in PermissionsProvider */
  RBAC: 5 * 60 * 1000, // 5 minutes

  /** Feature flags — rarely change */
  FEATURE_FLAGS: 5 * 60 * 1000, // 5 minutes

  /** Lesson list — moderate update frequency */
  LESSONS: 2 * 60 * 1000, // 2 minutes

  /** AI generated content — rarely changes after creation */
  AI_CONTENT: 10 * 60 * 1000, // 10 minutes

  /** Library items — static curriculum content */
  LIBRARY: 30 * 60 * 1000, // 30 minutes

  /** Instruments catalog — static reference data */
  INSTRUMENTS: 30 * 60 * 1000, // 30 minutes

  /** Feed posts — needs fresher data */
  FEED: 1 * 60 * 1000, // 1 minute

  /** User progress / achievements — moderate */
  PROGRESS: 3 * 60 * 1000, // 3 minutes

  /** Superadmin dashboard — needs recent data */
  ADMIN_DASHBOARD: 1 * 60 * 1000, // 1 minute

  /** Enrollment / course data */
  ENROLLMENTS: 5 * 60 * 1000, // 5 minutes

  /** Practice sessions — daily diary */
  PRACTICE: 2 * 60 * 1000, // 2 minutes
} as const

/**
 * Query key factory for consistent key management
 */
export const QUERY_KEYS = {
  rbac: ['rbac'] as const,
  featureFlags: ['feature-flags'] as const,
  lessons: (moduleId?: string) => ['lessons', moduleId] as const,
  lesson: (id: string) => ['lesson', id] as const,
  aiContent: (lessonId: string) => ['ai-content', lessonId] as const,
  library: ['library'] as const,
  instruments: ['instruments'] as const,
  feed: ['feed'] as const,
  progress: (userId: string) => ['progress', userId] as const,
  achievements: (userId: string) => ['achievements', userId] as const,
  enrollments: ['enrollments'] as const,
  practice: (userId: string) => ['practice', userId] as const,
  adminDashboard: ['admin-dashboard'] as const,
  dataQuality: ['data-quality'] as const,
  aiUsage: ['ai-usage'] as const,
  auditEvents: ['audit-events'] as const,
} as const
