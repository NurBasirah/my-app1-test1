import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans text-zinc-900 dark:text-zinc-50">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-red-600">MANDARIN.AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features" className="hover:text-red-600">Features</Link>
          <Link href="#pricing" className="hover:text-red-600">Pricing</Link>
          <Link href="/login" className="hover:text-red-600">Sign In</Link>
          <Link 
            href="/register" 
            className="bg-black dark:bg-white dark:text-black text-white px-5 py-2 rounded-full transition-transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col lg:flex-row items-center justify-between py-20 gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              Master HSK 1 <br />
              <span className="text-red-600">Easier than ever.</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-lg mx-auto lg:mx-0">
              Interactive flashcards, native audio, and AI-powered progress tracking. Start your journey for free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/mandarin/category"
                className="flex h-14 items-center justify-center rounded-full bg-red-600 px-10 text-lg font-bold text-white transition-all hover:bg-red-700 hover:shadow-lg shadow-red-500/30"
              >
                Start Free Trial ✨
              </Link>
              <Link
                href="#pricing"
                className="flex h-14 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 px-10 text-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                View Pro Plans
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-md aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
             {/* Replace with a screenshot of your flashcard app later! */}
             <span className="text-8xl">🏮</span>
          </div>
        </section>

        {/* --- PRICING SECTION --- */}
        <section id="pricing" className="py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose your path</h2>
            <p className="text-zinc-500">No credit card required to start.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
              <h3 className="text-xl font-bold mb-2">Free Explorer</h3>
              <p className="text-4xl font-bold mb-6">$0 <span className="text-sm font-normal text-zinc-500">/mo</span></p>
              <ul className="space-y-4 mb-8 text-zinc-600 dark:text-zinc-400">
                <li>✅ All HSK 1 Vocabulary</li>
                <li>✅ Basic Audio Pronunciation</li>
                <li>✅ Limited Daily Reviews</li>
              </ul>
              <Link href="/mandarin" className="block w-full text-center py-3 rounded-xl border border-black dark:border-white font-bold">
                Continue Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="p-8 rounded-3xl border-2 border-red-600 bg-white dark:bg-black relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Popular</span>
              <h3 className="text-xl font-bold mb-2">Pro Scholar</h3>
              <p className="text-4xl font-bold mb-6">$9 <span className="text-sm font-normal text-zinc-500">/mo</span></p>
              <ul className="space-y-4 mb-8 text-zinc-600 dark:text-zinc-400">
                <li>✅ HSK 1 to HSK 6</li>
                <li>✅ AI Voice Analysis</li>
                <li>✅ Offline Study Mode</li>
                <li>✅ Priority Support</li>
              </ul>
              <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">
                Go Pro Now
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-8 border-t border-zinc-100 dark:border-zinc-900 text-center text-zinc-500 text-sm">
        <p>© 2026 Mandarin Trainer AI. Built with Next.js.</p>
      </footer>
    </div>
  );
}