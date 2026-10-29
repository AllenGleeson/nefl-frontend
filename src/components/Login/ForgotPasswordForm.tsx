"use client";

// src/components/Login/ForgotPasswordForm.tsx
import { useState } from 'react';
import Link from 'next/link';
import { buttonStyles } from "@/components/ui/Button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock password reset logic
      setIsSubmitted(true);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          We&apos;ve sent a password reset link to <strong className="break-all">{email}</strong>
        </p>
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={() => setIsSubmitted(false)}
            className={buttonStyles({size: "lg", fullWidth: true})}
          >
            Send another email
          </button>
          <Link
            href="/login"
            className="block w-full text-center text-[var(--md-primary)] hover:text-[var(--md-primary-hover)] py-2 text-sm sm:text-base"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] focus:border-transparent text-base"
          placeholder="Enter your email address"
          autoComplete="email"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={buttonStyles({size: "lg", fullWidth: true})}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending...
          </div>
        ) : (
          'Send Reset Link'
        )}
      </button>

      <div className="text-center">
        <Link href="/login" className="text-[var(--md-primary)] hover:text-[var(--md-primary-hover)] text-sm sm:text-base">
          ← Back to login
        </Link>
      </div>
    </form>
  );
}
