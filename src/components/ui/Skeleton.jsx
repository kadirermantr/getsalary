export function Skeleton({ className = '', variant = 'text', shimmer = true }) {
  const baseClasses = shimmer
    ? 'skeleton-shimmer'
    : 'animate-pulse bg-[var(--bg-secondary)]';

  const variants = {
    text: 'h-4 rounded',
    title: 'h-6 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
    card: 'rounded-xl',
  };

  return <div className={`${baseClasses} ${variants[variant]} ${className}`} />;
}

export function StatCardSkeleton() {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
      <Skeleton variant="title" className="w-20 h-8 mx-auto mb-2" />
      <Skeleton variant="text" className="w-24 h-3 mx-auto" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--bg-primary)]">
      <div className="flex items-center gap-3 p-4 border-b border-[var(--bg-primary)]">
        <Skeleton variant="circle" className="w-5 h-5" />
        <Skeleton variant="text" className="w-32 h-5" />
      </div>
      <div className="p-4">
        <div className="h-72 flex items-end justify-around gap-2 px-8">
          {[40, 65, 45, 80, 55, 70].map((height, i) => (
            <Skeleton
              key={i}
              variant="rect"
              className="w-12 rounded-t-lg"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FilterSidebarSkeleton() {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl p-4 space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <Skeleton variant="text" className="w-16 h-4 mb-3" />
          <div className="space-y-2">
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex items-center gap-2">
                <Skeleton variant="circle" className="w-4 h-4" />
                <Skeleton variant="text" className="w-20 h-4" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
