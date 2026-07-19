import Link from "next/link";

export const metadata = { title: "Sign in | viagogo" };

export default function ComptePage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-sm rounded-2xl border border-line bg-white p-8 shadow-card">
        <h1 className="text-xl font-bold text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Access your orders and your sales.
        </p>
        <form className="mt-6 space-y-4" action="/">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-soft">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-soft">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <button type="submit" className="btn-brand w-full">Sign in</button>
        </form>
        <p className="mt-4 text-center text-xs text-ink-faint">
          Don&apos;t have an account?{" "}
          <Link href="#" className="font-semibold text-brand">Create one</Link>
        </p>
        <p className="mt-2 text-center text-[11px] text-ink-faint">Demonstration — sign-in not active.</p>
      </div>
    </div>
  );
}
