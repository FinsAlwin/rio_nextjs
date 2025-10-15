"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Login successful");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Rio Luxury Homes
          </h1>
          <p className="text-slate-400">Admin Portal Access</p>
        </div>

        {/* Login Form */}
        <div
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-10"
          style={{ margin: "0 auto", maxWidth: "400px" }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", padding: "2rem" }}
          >
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300"
              >
                Username
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  style={{ paddingLeft: "1.25rem" }}
                >
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  style={{
                    direction: "ltr",
                    textAlign: "left",
                    padding: "0.75rem 1rem 0.75rem 3.5rem",
                    width: "100%",
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div
              style={{
                marginTop: "0.5rem",
              }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  style={{ paddingLeft: "1.25rem" }}
                >
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    direction: "ltr",
                    textAlign: "left",
                    padding: "0.75rem 1rem 0.75rem 3.5rem",
                    width: "100%",
                  }}
                />
              </div>
            </div>

            {/* Login Button */}
            <div
              style={{
                marginTop: "2rem",
              }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          {/* <div style={{ marginTop: "1rem" }}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-slate-950 text-slate-400">
                  Test Credentials
                </span>
              </div>
            </div>
          </div> */}

          {/* Test Credentials */}
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <div
              className="flex justify-between items-center bg-slate-800/30 rounded-lg"
              style={{ marginBottom: "1rem", padding: "0.5rem 0.75rem" }}
            >
              <span className="text-sm text-slate-400">Username:</span>
              <code
                className="text-sm text-indigo-300 bg-slate-800/50 rounded font-mono"
                style={{ padding: "0.25rem 0.75rem" }}
              >
                riodadmin
              </code>
            </div>
            <div
              className="flex justify-between items-center bg-slate-800/30 rounded-lg"
              style={{ padding: "0.5rem 0.75rem" }}
            >
              <span className="text-sm text-slate-400">Password:</span>
              <code className="text-sm text-indigo-300 bg-slate-800/50 rounded font-mono">
                @Alwin143
              </code>
            </div>
          </div> */}

          {/* Footer */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <p className="text-xs text-slate-500">
              Secure access to Rio Luxury Homes admin panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
