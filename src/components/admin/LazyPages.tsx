import { Suspense, lazy } from "react";
import SkeletonLoader from "./SkeletonLoader";

// Lazy load admin pages
export const LazyAdminDashboard = lazy(
  () => import("@/app/admin/dashboard/page")
);
export const LazyAdminLogin = lazy(() => import("@/app/admin/login/page"));
export const LazyAdminSeed = lazy(() => import("@/app/admin/seed/page"));

// Higher-order component for lazy loading pages with skeleton
export function withPageLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function LazyPageComponent(props: T) {
    return (
      <Suspense fallback={fallback || <SkeletonLoader type="card" count={3} />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Specific lazy pages with appropriate skeletons
export const AdminDashboardWithSkeleton = withPageLazyLoading(
  LazyAdminDashboard,
  <div className="min-h-screen bg-gray-900 p-6">
    <SkeletonLoader type="text" />
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SkeletonLoader type="stats" />
      <SkeletonLoader type="stats" />
    </div>
  </div>
);

export const AdminLoginWithSkeleton = withPageLazyLoading(
  LazyAdminLogin,
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="w-full max-w-md">
      <SkeletonLoader type="card" />
    </div>
  </div>
);

export const AdminSeedWithSkeleton = withPageLazyLoading(
  LazyAdminSeed,
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <SkeletonLoader type="card" />
  </div>
);
