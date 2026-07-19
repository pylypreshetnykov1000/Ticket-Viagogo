"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatCardDate } from "@/lib/format";
import type { EventItem } from "@/lib/types";
import { IconSearch } from "./icons";

export default function SearchBar({
  size = "md",
  placeholder = "Search events, artists, teams and more",
}: {
  size?: "md" | "lg";
  placeholder?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<EventItem[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // fetch suggestions from the store-backed API (debounced)
  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((d) => setResults(d.results ?? []))
        .catch(() => {});
    }, 150);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (term) {
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(term)}`);
    }
  }

  function go(ev: EventItem) {
    setOpen(false);
    setQ("");
    router.push(`/event/${ev.id}`);
  }

  const big = size === "lg";

  return (
    <div ref={ref} className="relative w-full">
      <form
        onSubmit={submit}
        role="search"
        className={`flex w-full items-center gap-3 rounded-full border transition-colors focus-within:border-brand ${
          big
            ? "h-12 border-[#c7ced6] bg-white px-4 shadow-[0_2px_8px_rgba(16,24,40,0.08)]"
            : "h-11 border-line bg-surface px-4"
        }`}
      >
        <span className="text-brand">
          <IconSearch size={big ? 20 : 18} />
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label="Search"
          className={`h-full flex-1 bg-transparent font-medium text-ink placeholder:font-medium placeholder:text-ink-date focus:outline-none ${
            big ? "text-base" : "text-sm"
          }`}
        />
      </form>

      {/* Live suggestions, like origin's search dropdown */}
      {open && results.length > 0 && (
        <div className="absolute inset-x-0 top-full z-40 mt-1.5 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-cardHover">
          {results.map((ev) => (
            <button
              key={ev.id}
              onClick={() => go(ev)}
              className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-surface"
            >
              <span className="relative block h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-surface">
                <Image src={ev.image} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">
                  {ev.performer}
                </span>
                <span className="block truncate text-xs text-ink-muted">
                  {formatCardDate(ev.date, { year: true })} · {ev.venue}
                </span>
              </span>
            </button>
          ))}
          <button
            onClick={() => submit({ preventDefault: () => {} } as React.FormEvent)}
            className="block w-full px-4 py-2 text-left text-sm font-semibold text-blue hover:bg-surface"
          >
            See all results for “{q.trim()}”
          </button>
        </div>
      )}
    </div>
  );
}
