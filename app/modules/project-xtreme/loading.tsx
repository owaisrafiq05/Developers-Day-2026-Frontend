export default function ProjectXtremeLoading() {
  return (
    <div className="min-h-screen bg-[#0B1200] text-white py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header skeleton */}
        <div className="flex gap-4 sm:gap-5 items-stretch mb-10 sm:mb-14">
          <div className="w-1 bg-[#2E3B10] self-stretch flex-shrink-0" />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-10 w-64 bg-[#1A2308] rounded animate-pulse" />
                <div className="h-10 w-40 bg-[#1A2308] rounded animate-pulse" />
              </div>
              <div className="w-20 h-20 bg-[#1A2308] rounded animate-pulse flex-shrink-0" />
            </div>
            <div className="h-4 w-96 bg-[#1A2308] rounded animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[520px] bg-[#1A2308] rounded animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 bg-[#1A2308] rounded animate-pulse"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
