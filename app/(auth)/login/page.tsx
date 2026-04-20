'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage('Check your email for the confirmation link!');
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    else router.push('/mandarin/category');
  };

  return (
    // min-h-[100svh] ensures it fills the viewport even with mobile browser address bars
    <div className="min-h-[100svh] bg-white dark:bg-black font-sans text-zinc-900 dark:text-zinc-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Flexible container: 
          - w-full for small screens
          - max-w-[420px] to prevent it from getting too wide on desktop
      */}
      <div className="w-full max-w-[420px] transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <span className="text-2xl sm:text-3xl font-bold tracking-tighter text-red-600">MANDARIN.AI</span>
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Continue your journey to HSK mastery
          </p>
        </div>

        {/* Card Body */}
        <div className="bg-white dark:bg-zinc-950 p-6 sm:p-10 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-transparent focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-transparent focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all text-base"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium ${
                message.includes('Check') 
                ? 'bg-green-50 text-green-700 border border-green-100' 
                : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
                {message}
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] disabled:opacity-50 transition-all shadow-lg shadow-red-600/20"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>
              
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl font-bold bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-red-600 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}