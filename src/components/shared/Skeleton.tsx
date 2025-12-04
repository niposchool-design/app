// src/components/shared/Skeleton.tsx
interface SkeletonProps {
  className?: string
  count?: number
  height?: string
  width?: string
}

export function Skeleton({ 
  className = '', 
  count = 1, 
  height = 'h-4', 
  width = 'w-full' 
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`}
          style={{ marginBottom: count > 1 ? '8px' : '0' }}
        />
      ))}
    </>
  )
}

// Skeletons específicos para componentes comuns
export function SkeletonCard() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <Skeleton height="h-6" width="w-3/4" />
      <Skeleton height="h-4" count={3} />
      <div className="flex space-x-2">
        <Skeleton height="h-8" width="w-20" />
        <Skeleton height="h-8" width="w-16" />
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex space-x-4">
        <Skeleton height="h-6" width="w-1/4" />
        <Skeleton height="h-6" width="w-1/4" />
        <Skeleton height="h-6" width="w-1/4" />
        <Skeleton height="h-6" width="w-1/4" />
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton height="h-4" width="w-1/4" />
          <Skeleton height="h-4" width="w-1/4" />
          <Skeleton height="h-4" width="w-1/4" />
          <Skeleton height="h-4" width="w-1/4" />
        </div>
      ))}
    </div>
  )
}

export default Skeleton