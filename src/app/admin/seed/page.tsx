"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function SeedPage() {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const response = await fetch("/api/admin/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error || "Failed to seed admin user");
      }
    } catch (error) {
      toast.error("Error seeding admin user");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Seed Admin User
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Create the default admin user
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Admin Credentials
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <strong>Username:</strong> riodadmin
              </p>
              <p>
                <strong>Password:</strong> @Alwin143
              </p>
              <p>
                <strong>Email:</strong> admin@rioluxuryhomes.in
              </p>
              <p>
                <strong>Role:</strong> super_admin
              </p>
            </div>
          </div>

          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSeeding ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Seeding...
              </div>
            ) : (
              "Seed Admin User"
            )}
          </button>

          <div className="text-center">
            <a
              href="/admin/login"
              className="text-indigo-400 hover:text-indigo-300 text-sm"
            >
              Go to Login Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
