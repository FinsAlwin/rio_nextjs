"use client";

import { useSession } from "next-auth/react";

interface HeaderProps {
  onToggleSidebar: () => void;
  isMobile?: boolean;
}

export default function Header({
  onToggleSidebar,
  isMobile = false,
}: HeaderProps) {
  const { data: session } = useSession();

  return (
    <div className="admin-header">
      <div className="flex items-center justify-between w-full h-full">
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-gray-700/50 flex-shrink-0"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <div className="flex items-center justify-end w-full">
          <div className="text-right">
            <p className="text-sm font-medium text-white leading-none mb-0.5">
              Welcome back, {session?.user?.username}
            </p>
            <p className="text-xs text-gray-400 leading-none">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
