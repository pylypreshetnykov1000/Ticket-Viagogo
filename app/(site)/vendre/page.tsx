import Link from "next/link";

export const metadata = { title: "Sell tickets | viagogo" };

export default function VendrePage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold text-ink">Sell your tickets</h1>
        <p className="mt-3 text-ink-soft">
          List your tickets in minutes and reach millions of buyers around the
          world. You set your price, we handle the rest.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { t: "1. Describe", d: "Select the event and your seats." },
            { t: "2. Set the price", d: "You stay in control of your price." },
            { t: "3. Get paid", d: "Secure payout after the event." },
          ].map((s) => (
            <div key={s.t} className="rounded-xl border border-line bg-white p-5 text-left shadow-card">
              <p className="font-semibold text-brand">{s.t}</p>
              <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
        <Link href="/" className="btn-brand mt-8">Start selling</Link>
        <p className="mt-3 text-xs text-ink-faint">Demonstration — feature not active.</p>
      </div>
    </div>
  );
}
