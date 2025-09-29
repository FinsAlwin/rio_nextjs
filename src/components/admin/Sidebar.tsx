"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    name: "Enquiries",
    href: "/admin/inquiries",
  },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      {/* Header Section */}
      <div className="admin-sidebar-header">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-white leading-none mb-0.5">
              Rio Admin
            </h1>
            <p className="text-xs text-gray-400 leading-none">Luxury Homes</p>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onToggle}
            className="md:hidden text-gray-400 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-gray-700/50 flex-shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="admin-sidebar-nav">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`admin-nav-item group ${
                  isActive ? "admin-nav-active" : "admin-nav-inactive"
                }`}
              >
                <div className="flex items-center">
                  <span className="truncate">{item.name}</span>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Section */}
      <div className="admin-sidebar-user">
        <div className="admin-user-card">
          <div className="mb-2">
            <p className="text-sm font-semibold text-white truncate leading-none mb-0.5">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-400 truncate leading-none">
              Administrator
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="admin-logout-button w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
          >
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="truncate">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
