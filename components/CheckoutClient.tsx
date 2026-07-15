"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getEvent } from "@/lib/data";
import { formatFullDate, formatPrice } from "@/lib/format";
import { IconCheck } from "./icons";

const FEES_RATE = 0.15;

export default function CheckoutClient({
  eventId,
  listingId,
  qty,
  price,
  section,
  zone,
}: {
  eventId: string;
  listingId: string;
  qty: number;
  price: number;
  section: string;
  zone: string;
}) {
  const event = getEvent(eventId);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [done, setDone] = useState(false);

  const totals = useMemo(() => {
    const subtotal = price * qty;
    const fees = Math.round(subtotal * FEES_RATE);
    const delivery = 0;
    return { subtotal, fees, delivery, total: subtotal + fees + delivery };
  }, [price, qty]);

  if (!event) {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-ink-soft">Event not found.</p>
        <Link href="/" className="btn-brand mt-4">Back to home</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-line bg-white p-8 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="m5 12 4 4 10-10" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-ink">Order confirmed!</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Your {qty} ticket{qty > 1 ? "s" : ""} for <strong>{event.name}</strong> have been
            booked. A confirmation email has been sent to you (demo).
          </p>
          <div className="mt-4 rounded-lg bg-surface p-4 text-left text-sm">
            <Row label="Event" value={event.name} />
            <Row label="Section" value={`${zone} · ${section}`} />
            <Row label="Quantity" value={`${qty} ticket${qty > 1 ? "s" : ""}`} />
            <Row label="Total paid" value={formatPrice(totals.total)} bold />
          </div>
          <Link href="/" className="btn-brand mt-6 w-full">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <nav className="mb-4 text-xs text-ink-faint">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1">/</span>
        <Link href={`/event/${event.id}`} className="hover:text-brand">{event.performer}</Link>
        <span className="mx-1">/</span>
        <span className="text-ink-soft">Checkout</span>
      </nav>

      {/* Stepper */}
      <ol className="mb-8 flex items-center gap-2 text-sm">
        {["Your tickets", "Delivery", "Payment"].map((label, i) => {
          const n = (i + 1) as 1 | 2 | 3;
          const state = step === n ? "active" : step > n ? "done" : "todo";
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  state === "active"
                    ? "bg-brand text-white"
                    : state === "done"
                    ? "bg-brand text-white"
                    : "bg-surface text-ink-faint"
                }`}
              >
                {state === "done" ? "✓" : n}
              </span>
              <span
                className={`hidden sm:inline ${
                  state === "todo" ? "text-ink-faint" : "font-medium text-ink"
                }`}
              >
                {label}
              </span>
              {i < 2 && <span className="h-px flex-1 bg-line" />}
            </li>
          );
        })}
      </ol>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* Main step content */}
        <div className="rounded-xl border border-line bg-white p-6 shadow-card">
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-ink">Your tickets</h2>
              <div className="mt-4 rounded-lg border border-line p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-ink">{zone}</p>
                    <p className="text-sm text-ink-soft">{section}</p>
                  </div>
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
                    {qty} ticket{qty > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-brand-dark">
                  <IconCheck size={14} /> Covered by the viagogo Guarantee
                </div>
              </div>
              <button onClick={() => setStep(2)} className="btn-brand mt-6">
                Continue to delivery
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-ink">Delivery method</h2>
              <div className="mt-4 space-y-3">
                {[
                  { t: "E-ticket (download)", d: "Available immediately after purchase", price: "Free", def: true },
                  { t: "Mobile ticket", d: "Transferred to your app before the event", price: "Free" },
                ].map((opt) => (
                  <label
                    key={opt.t}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-line p-4 hover:border-brand"
                  >
                    <input type="radio" name="delivery" defaultChecked={opt.def} className="accent-brand" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink">{opt.t}</p>
                      <p className="text-xs text-ink-soft">{opt.d}</p>
                    </div>
                    <span className="text-sm font-semibold text-brand-dark">{opt.price}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                <button onClick={() => setStep(3)} className="btn-brand">Continue to payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <h2 className="text-lg font-bold text-ink">Payment</h2>
              <p className="mt-1 text-xs text-ink-faint">
                Demo — do not enter any real card details.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name on card" className="sm:col-span-2" placeholder="John Smith" />
                <Field label="Card number" className="sm:col-span-2" placeholder="4242 4242 4242 4242" />
                <Field label="Expiry" placeholder="MM/YY" />
                <Field label="CVC" placeholder="123" />
                <Field label="Email" className="sm:col-span-2" type="email" placeholder="you@example.com" />
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-outline">Back</button>
                <button type="submit" className="btn-brand flex-1">
                  Pay {formatPrice(totals.total)}
                </button>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-faint">
                <LockIcon /> Secure, encrypted payment
              </p>
            </form>
          )}
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-xl border border-line bg-white p-5 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
              Summary
            </h3>
            <div className="mt-3 border-b border-line pb-3">
              <p className="text-sm font-semibold text-ink">{event.name}</p>
              <p className="mt-1 text-xs text-ink-soft">{formatFullDate(event.date)}</p>
              <p className="text-xs text-ink-faint">{event.venue}, {event.city}</p>
            </div>
            <div className="space-y-2 py-3 text-sm">
              <Row label={`Tickets (${qty} × ${formatPrice(price)})`} value={formatPrice(totals.subtotal)} />
              <Row label="Service fees" value={formatPrice(totals.fees)} />
              <Row label="Delivery" value="Free" />
            </div>
            <div className="flex items-center justify-between border-t border-line pt-3">
              <span className="font-bold text-ink">Total</span>
              <span className="text-lg font-bold text-ink">{formatPrice(totals.total)}</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-dark">
              <IconCheck size={14} /> Protected by the viagogo Guarantee
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-soft">{label}</span>
      <span className={bold ? "font-bold text-ink" : "text-ink"}>{value}</span>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
