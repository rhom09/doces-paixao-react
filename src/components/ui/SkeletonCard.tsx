import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-border-soft/60', className)} />
  )
}

export function SkeletonCard() {
  return (
    <div className="group overflow-hidden rounded-[28px] border border-border-soft bg-white p-4 shadow-sm">
      {/* Image Skeleton */}
      <Skeleton className="aspect-square w-full rounded-[22px]" />
      
      <div className="mt-5 space-y-3 px-2 pb-2">
        {/* Category & Tag */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-7 w-3/4 rounded-lg" />
        
        {/* Description */}
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
        
        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between border-t border-border-soft pt-4">
          <Skeleton className="h-6 w-24 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
