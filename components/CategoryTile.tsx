import Link from "next/link";
import type { Category } from "@/lib/types";

const art: Record<string, string> = {
  concerts: "linear-gradient(135deg,#ff512f,#dd2476)",
  sport: "linear-gradient(135deg,#1a2980,#26d0ce)",
  theatre: "linear-gradient(135deg,#42275a,#734b6d)",
};

const icons: Record<string, React.ReactNode> = {
  concerts: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  sport: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="m12 3 3 4-1 5-4 1-3-4M12 3 9 7M15 7l5 1M14 13l3 4M10 14l-2 5" />
    </svg>
  ),
  theatre: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5h16v7a6 6 0 0 1-12 0M8 9h.01M12 9h.01M9 13a3 3 0 0 0 3 1" />
    </svg>
  ),
};

export default function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={category.href}
      className="group relative flex h-36 flex-col justify-end overflow-hidden rounded-xl p-5 text-white shadow-card transition-transform hover:-translate-y-0.5"
      style={{ background: art[category.key] }}
    >
      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
      <span className="relative mb-auto text-white/90">{icons[category.key]}</span>
      <div className="relative">
        <h3 className="text-lg font-bold">{category.label}</h3>
        <p className="text-xs text-white/85">{category.blurb}</p>
      </div>
    </Link>
  );
}
