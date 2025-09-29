"use client";

import { Suspense, useEffect, useState } from "react";
import { StatsCardWithSkeleton } from "@/components/admin/LazyComponents";
import SkeletonLoader from "@/components/admin/SkeletonLoader";

interface DashboardStats {
  totalAdmins: number;
  totalContacts: number;
  totalProperties: number;
  totalBlogs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAdmins: 0,
    totalContacts: 0,
    totalProperties: 0,
    totalBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        const data = await response.json();

        if (data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Fallback to default values
        setStats({
          totalAdmins: 5,
          totalContacts: 0,
          totalProperties: 0,
          totalBlogs: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="admin-dashboard-container">
      {/* Header Section */}
      <div className="admin-dashboard-header">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
              Dashboard Overview
            </h1>
            <p className="text-gray-400 text-sm lg:text-base">
              Welcome back, Admin
            </p>
          </div>
          <div className="text-left lg:text-right">
            <p className="text-xs text-gray-500 mb-1">Today's Date</p>
            <p className="text-sm lg:text-base font-semibold text-white">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          <Suspense fallback={<SkeletonLoader type="stats" />}>
            <StatsCardWithSkeleton
              title="Total Admins"
              value={loading ? "..." : stats.totalAdmins}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
              icon="👥"
            />
          </Suspense>
          <Suspense fallback={<SkeletonLoader type="stats" />}>
            <StatsCardWithSkeleton
              title="Total Contacts"
              value={loading ? "..." : stats.totalContacts}
              color="bg-gradient-to-r from-purple-500 to-purple-600"
              icon="📧"
            />
          </Suspense>
          <Suspense fallback={<SkeletonLoader type="stats" />}>
            <StatsCardWithSkeleton
              title="Total Properties"
              value={loading ? "..." : stats.totalProperties}
              color="bg-gradient-to-r from-green-500 to-green-600"
              icon="🏠"
            />
          </Suspense>
          <Suspense fallback={<SkeletonLoader type="stats" />}>
            <StatsCardWithSkeleton
              title="Total Blogs"
              value={loading ? "..." : stats.totalBlogs}
              color="bg-gradient-to-r from-yellow-500 to-yellow-600"
              icon="📝"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
