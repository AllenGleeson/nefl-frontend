"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isApiError } from "@/types/ApiError";

// Mock login function for demo - in production, this would call the actual API
const loginUser = async (email: string, _password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock successful login for demo
  return {
    email,
    role: 'admin',
    name: email.split('@')[0]
  };
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await loginUser(email, password);
      console.log("Login success:", result);
      
      // Store user data in localStorage
      localStorage.setItem('nefl_user', JSON.stringify({
        email: email,
        role: result.role || 'viewer',
        name: result.name || 'User'
      }));
      
      // Redirect to management dashboard
      router.push('/management');
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(`Error ${err.code}: ${err.message}`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Mobile Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">NEFL</h1>
          <p className="text-blue-100 text-lg">North East Football League</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 text-sm sm:text-base">Welcome back to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-4 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
