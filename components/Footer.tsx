import Link from "next/link";
import Logo from "./Logo";
import { IconCheck, IconChevronDown } from "./icons";

const guarantees = [
  "World-class security controls",
  "Transparent pricing",
  "Order 100% guaranteed",
  "Customer service from start to finish",
];

const cols = [
  {
    title: "Our company",
    links: [
      "About us",
      "Open distribution",
      "Affiliate programme",
      "Investors",
      "Corporate services",
      "Press room",
      "Careers",
    ],
  },
  {
    title: "Have questions?",
    links: ["Help Centre / Contact us"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Guarantee block */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Logo />
              <span className="rounded bg-surface px-2 py-0.5 text-xs font-semibold text-ink-muted">
                guarantee
              </span>
            </div>
            <ul className="space-y-2.5">
              {guarantees.map((g) => (
                <li key={g} className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="text-[#6FB229]">
                    <IconCheck size={16} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-bold text-ink">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-ink-soft hover:text-brand-dark">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>

              {col.title === "Have questions?" && (
                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-bold text-ink">
                    Live events around the world
                  </h4>
                  <div className="space-y-2">
                    <Selector label="🌍 International" />
                    <Selector label="English (EN)" />
                    <Selector label="€ Euro" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} viagogo Entertainment Inc. — Demonstration recreation, not officially affiliated.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="hover:text-ink">Terms & Conditions</Link>
            <Link href="#" className="hover:text-ink">Privacy</Link>
            <Link href="#" className="hover:text-ink">Cookies</Link>
            <Link href="#" className="hover:text-ink">Your privacy choices</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Selector({ label }: { label: string }) {
  return (
    <button className="flex w-full max-w-[220px] items-center justify-between rounded-md border border-line bg-white px-3 py-2 text-sm text-ink hover:border-brand">
      <span>{label}</span>
      <IconChevronDown size={14} className="text-ink-muted" />
    </button>
  );
}
