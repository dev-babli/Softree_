import Link from "next/link";

export function Navigation() {
  return (
    <nav className="border-b border-border bg-surface-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-text-primary">
              Project Neo
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/studio"
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              Studio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
