"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconSearch } from "./icons";

export default function SearchBar({
  size = "md",
  placeholder = "Search events, artists, teams, etc.",
}: {
  size?: "md" | "lg";
  placeholder?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  const big = size === "lg";

  return (
    <form
      onSubmit={submit}
      role="search"
      className={`flex w-full items-center gap-3 rounded-full border transition-colors focus-within:border-brand ${
        big
          ? "h-[60px] border-[#c7ced6] bg-white px-5 shadow-sm"
          : "h-11 border-line bg-surface px-4"
      }`}
    >
      <span className="text-brand">
        <IconSearch size={big ? 22 : 18} />
      </span>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className={`h-full flex-1 bg-transparent font-medium text-ink placeholder:font-medium placeholder:text-ink-date focus:outline-none ${
          big ? "text-base" : "text-sm"
        }`}
      />
    </form>
  );
}
