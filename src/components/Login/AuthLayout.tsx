// src/components/Login/AuthLayout.tsx
import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showRegisterLink: boolean;
}

export default function AuthLayout({ children, title, subtitle, showRegisterLink }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 xl:p-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl xl:text-6xl font-bold mb-4">NEFL</h1>
            <p className="text-xl xl:text-2xl text-blue-100">North East Football League</p>
          </div>
          <div className="text-center">
            <p className="text-base xl:text-lg text-blue-100 mb-6">
              The official platform for managing your football league
            </p>
            <div className="flex space-x-6 xl:space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl xl:text-3xl mb-2">⚽</div>
                <p>Fixtures</p>
              </div>
              <div className="text-center">
                <div className="text-2xl xl:text-3xl mb-2">🏆</div>
                <p>Clubs</p>
              </div>
              <div className="text-center">
                <div className="text-2xl xl:text-3xl mb-2">📊</div>
                <p>Statistics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Mobile/Tablet Logo */}
          <div className="lg:hidden text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">NEFL</h1>
            <p className="text-blue-100 text-sm sm:text-base">North East Football League</p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
            </div>

            {children}

            {/* Footer Links */}
            <div className="mt-6 sm:mt-8 text-center">
              {showRegisterLink ? (
                <p className="text-gray-600 text-sm sm:text-base">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign up here
                  </Link>
                </p>
              ) : (
                <p className="text-gray-600 text-sm sm:text-base">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4 sm:mt-6">
            <Link href="/" className="text-white hover:text-blue-200 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
