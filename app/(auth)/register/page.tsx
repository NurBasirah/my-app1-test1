"use client";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Create Account</h1>
        <p className="text-zinc-500 mt-2">Start mastering Mandarin today.</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent outline-none focus:ring-2 focus:ring-red-600" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input type="email" placeholder="name@example.com" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent outline-none focus:ring-2 focus:ring-red-600" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent outline-none focus:ring-2 focus:ring-red-600" />
        </div>
        <button className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl font-bold transition-colors mt-2">
          Create Free Account
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-red-600 font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </>
  );
}