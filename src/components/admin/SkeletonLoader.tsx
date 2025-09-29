interface SkeletonLoaderProps {
  type?: "card" | "list" | "table" | "stats" | "text";
  count?: number;
  className?: string;
}

export default function SkeletonLoader({
  type = "card",
  count = 1,
  className = "",
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (type) {
      case "stats":
        return (
          <div className="admin-stats-card">
            <div className="admin-stats-card-icon">
              <div className="bg-gray-700 animate-pulse w-full h-full rounded-xl"></div>
            </div>
            <div className="admin-stats-card-content">
              <div className="bg-gray-700 animate-pulse h-4 w-20 rounded mb-2"></div>
              <div className="bg-gray-700 animate-pulse h-6 w-16 rounded"></div>
            </div>
          </div>
        );

      case "list":
        return (
          <div className="admin-activity-item">
            <div className="flex items-start">
              <div className="admin-activity-avatar bg-gray-700 animate-pulse"></div>
              <div className="admin-activity-content flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-gray-700 animate-pulse h-4 w-24 rounded"></div>
                  <div className="bg-gray-700 animate-pulse h-3 w-16 rounded"></div>
                </div>
                <div className="bg-gray-700 animate-pulse h-3 w-full rounded mb-2"></div>
                <div className="bg-gray-700 animate-pulse h-3 w-3/4 rounded"></div>
              </div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="bg-gray-700 animate-pulse h-4 w-4 rounded"></div>
                  <div className="bg-gray-700 animate-pulse h-4 w-32 rounded"></div>
                  <div className="bg-gray-700 animate-pulse h-4 w-24 rounded"></div>
                  <div className="bg-gray-700 animate-pulse h-4 w-20 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-2">
            <div className="bg-gray-700 animate-pulse h-4 w-full rounded"></div>
            <div className="bg-gray-700 animate-pulse h-4 w-3/4 rounded"></div>
            <div className="bg-gray-700 animate-pulse h-4 w-1/2 rounded"></div>
          </div>
        );

      case "card":
      default:
        return (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="space-y-4">
              <div className="bg-gray-700 animate-pulse h-6 w-1/3 rounded"></div>
              <div className="bg-gray-700 animate-pulse h-4 w-full rounded"></div>
              <div className="bg-gray-700 animate-pulse h-4 w-2/3 rounded"></div>
              <div className="bg-gray-700 animate-pulse h-4 w-1/2 rounded"></div>
            </div>
          </div>
        );
    }
  };

  if (count === 1) {
    return <div className={className}>{renderSkeleton()}</div>;
  }

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}
