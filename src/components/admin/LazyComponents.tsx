import { Suspense, lazy } from "react";
import SkeletonLoader from "./SkeletonLoader";

// Lazy load admin components
export const LazyStatsCard = lazy(() => import("./StatsCard"));
export const LazyRecentActivities = lazy(() => import("./RecentActivities"));
export const LazySidebar = lazy(() => import("./Sidebar"));
export const LazyHeader = lazy(() => import("./Header"));

// Higher-order component for lazy loading with skeleton
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function LazyComponent(props: T) {
    return (
      <Suspense fallback={fallback || <SkeletonLoader type="card" />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Specific lazy components with appropriate skeletons
export const StatsCardWithSkeleton = withLazyLoading(
  LazyStatsCard,
  <SkeletonLoader type="stats" />
);

export const RecentActivitiesWithSkeleton = withLazyLoading(
  LazyRecentActivities,
  <SkeletonLoader type="list" count={3} />
);

// Temporarily disable lazy loading for debugging
// export const SidebarWithSkeleton = withLazyLoading(
//   LazySidebar,
//   <SkeletonLoader type="text" />
// );

// Direct import for debugging
import Sidebar from "./Sidebar";
export const SidebarWithSkeleton = ({ isOpen, onToggle }: any) => (
  <Sidebar isOpen={isOpen} onToggle={onToggle} />
);

export const HeaderWithSkeleton = withLazyLoading(
  LazyHeader,
  <SkeletonLoader type="text" />
);
