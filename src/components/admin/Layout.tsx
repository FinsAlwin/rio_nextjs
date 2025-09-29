"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SidebarWithSkeleton, HeaderWithSkeleton } from "./LazyComponents";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check authentication first
    if (status === "loading") return; // Still loading

    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }

    // Only set up mobile detection if authenticated
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [status, router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="admin-layout">
      <Suspense
        fallback={<div className="w-64 bg-gray-800 animate-pulse"></div>}
      >
        <SidebarWithSkeleton isOpen={sidebarOpen} onToggle={toggleSidebar} />
      </Suspense>

      <div className="flex-1 transition-all duration-300 ease-in-out min-h-screen relative z-20">
        <Suspense
          fallback={<div className="h-16 bg-gray-800 animate-pulse"></div>}
        >
          <HeaderWithSkeleton
            onToggleSidebar={toggleSidebar}
            isMobile={isMobile}
          />
        </Suspense>

        <main className="admin-main-content min-h-full relative admin-fade-in">
          {children}
        </main>
      </div>

      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
