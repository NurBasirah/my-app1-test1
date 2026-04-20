// app/mandarin/category/page.tsx
import Link from 'next/link';

const hskLevels = [1, 2, 3, 4, 5, 6];

export default function MandarinCategoryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans text-zinc-900 dark:text-zinc-50">
      {/* Minimal Navigation */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto border-b border-zinc-100 dark:border-zinc-800">
        <Link href="/" className="text-xl font-bold tracking-tighter text-red-600">
          MANDARIN.AI
        </Link>
        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
        >
          ← Back
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Choose your <span className="text-red-600">HSK level</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base">
            Click any level below to start practicing.
          </p>
        </div>

        {/* Basic HSK Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {hskLevels.map((level) => (
            <Link
              key={level}
              href={`/mandarin/${level}`}
              className="group flex items-center justify-center px-4 py-6 rounded-2xl 
                         bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800
                         hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-950/30
                         transition-all duration-200 active:scale-95"
            >
              <span className="text-xl font-bold tracking-tight group-hover:text-red-600">
                HSK {level}
              </span>
            </Link>
          ))}
        </div>

        {/* Extra Back Button for clarity */}
        <div className="flex justify-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 
                       hover:text-red-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}