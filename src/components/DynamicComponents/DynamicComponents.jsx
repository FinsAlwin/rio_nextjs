import dynamic from "next/dynamic";
import { Suspense } from "react";
import "./DynamicComponents.css";

// Loading component for dynamic imports
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

// Dynamic imports for heavy components
export const DynamicProjects = dynamic(
  () => import("../Projects/Projects"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

export const DynamicInteriors = dynamic(
  () => import("../Interiors/Interiors"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

export const DynamicGallerySlider = dynamic(
  () => import("../GallerySlider/GallerySlider"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

export const DynamicPropertyBlogSlider = dynamic(
  () => import("../PropertyBlogSlider/PropertyBlogSlider"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

export const DynamicTimelineSection = dynamic(
  () => import("../TimelineSection/TimelineSection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

export const DynamicTeamSection = dynamic(
  () => import("../TeamSection/TeamSection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

export const DynamicUpcomingProjectsSection = dynamic(
  () => import("../UpcomingProjectsSection/UpcomingProjectsSection"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

// Higher-order component for wrapping dynamic components with Suspense
export const withSuspense = (Component) => {
  return (props) => (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};