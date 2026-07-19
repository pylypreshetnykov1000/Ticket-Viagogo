import Link from "next/link";
import Logo from "@/components/Logo";
import { logout } from "../actions";

export const metadata = { title: "Admin | viagogo" };

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/images", label: "Images" },
];

/** Dedicated admin chrome — full width, no public-site header/footer. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface/40">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-14 w-full max-w-[1500px] items-center gap-3 px-4 sm:px-6">
          <Logo />
          <span className="rounded-md bg-announce px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
            Admin
          </span>
          <nav className="ml-auto flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-blue hover:text-blue-dark">
              View site →
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink hover:border-pink hover:text-pink"
              >
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Sidebar + content */}
      <div className="mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-[190px_1fr]">
        <aside className="md:sticky md:top-[88px] md:self-start">
          <nav className="no-scrollbar -mx-1 flex flex-row gap-1 overflow-x-auto px-1 md:mx-0 md:flex-col md:overflow-visible md:px-0">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-white hover:shadow-card"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
