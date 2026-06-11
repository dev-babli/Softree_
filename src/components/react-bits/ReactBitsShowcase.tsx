"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { ReactBitsPreview } from "@/components/react-bits/ReactBitsPreview"
import { REACT_BITS_CATALOG, REACT_BITS_CATEGORIES } from "@/components/react-bits/catalog"

type ReactBitsShowcaseProps = {
  initialComponentId?: string
  embedded?: boolean
}

export function ReactBitsShowcase({ initialComponentId, embedded = false }: ReactBitsShowcaseProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [selectedId, setSelectedId] = useState(initialComponentId ?? REACT_BITS_CATALOG[0]?.id ?? "")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return REACT_BITS_CATALOG.filter((entry) => {
      if (category !== "all" && entry.category !== category) return false
      if (!q) return true
      return (
        entry.name.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.id.toLowerCase().includes(q)
      )
    })
  }, [category, query])

  const selected = REACT_BITS_CATALOG.find((entry) => entry.id === selectedId)

  return (
    <div className={embedded ? "flex h-full min-h-0 flex-col bg-[#0f1117]" : "min-h-screen bg-[#0f1117] text-white"}>
      {!embedded ? (
        <header className="border-b border-white/10 px-6 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-orange-400">Design library</p>
              <h1 className="text-2xl font-semibold">React Bits</h1>
              <p className="mt-1 text-sm text-white/60">
                {REACT_BITS_CATALOG.length} animated components — TypeScript + Tailwind
              </p>
            </div>
            <Link href="/showcase" className="text-sm text-white/70 hover:text-white">
              ← Back to showcase
            </Link>
          </div>
        </header>
      ) : null}

      <div className={embedded ? "grid min-h-0 flex-1 grid-cols-[280px_1fr]" : "mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:grid-cols-[320px_1fr]"}>
        <aside className="flex min-h-0 flex-col border-r border-white/10 bg-[#12151d]">
          <div className="space-y-3 border-b border-white/10 p-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none ring-orange-400/40 focus:ring-2"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
            >
              <option value="all">All categories</option>
              {REACT_BITS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {filtered.map((entry) => {
              const active = entry.id === selectedId
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  className={`mb-1 w-full rounded-lg px-3 py-2 text-left transition ${
                    active ? "bg-orange-500/20 text-orange-100" : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  <div className="text-sm font-medium">{entry.name}</div>
                  <div className="text-xs text-white/45">{entry.category}</div>
                </button>
              )
            })}
          </div>
        </aside>

        <main className="min-h-0 overflow-y-auto p-4 lg:p-6">
          {selected ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{selected.name}</h2>
                  <p className="mt-1 max-w-2xl text-sm text-white/60">{selected.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={selected.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
                  >
                    Docs ↗
                  </a>
                  <CopyPathButton importPath={selected.importPath} name={selected.name} />
                </div>
              </div>

              <ReactBitsPreview componentId={selected.id} className="overflow-hidden rounded-2xl border border-white/10" />

              <details className="rounded-xl border border-white/10 bg-black/20 p-4">
                <summary className="cursor-pointer text-sm font-medium text-white/80">Import path</summary>
                <pre className="mt-3 overflow-x-auto text-xs text-orange-100/90">
                  {`import ${selected.name} from '@/components/react-bits${selected.importPath.slice(1)}'`}
                </pre>
              </details>
            </div>
          ) : (
            <p className="text-white/60">Select a component to preview.</p>
          )}
        </main>
      </div>
    </div>
  )
}

function CopyPathButton({ importPath, name }: { importPath: string; name: string }) {
  const [copied, setCopied] = useState(false)
  const text = `import ${name} from '@/components/react-bits${importPath.slice(1)}'`

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
      }}
      className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-400"
    >
      {copied ? "Copied" : "Copy import"}
    </button>
  )
}
