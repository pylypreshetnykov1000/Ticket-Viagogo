"use client";

import { useState } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import Modal from "@/components/admin/Modal";
import { setOrderStatus } from "../../actions";

const STATUS_STYLE: Record<OrderStatus, string> = {
  confirmed: "bg-brand/10 text-brand-dark",
  cancelled: "bg-surface text-ink-muted",
  refunded: "bg-amber-100 text-amber-700",
};

function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${p(d.getDate())} ${M[d.getMonth()]} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function OrdersList({ orders }: { orders: Order[] }) {
  const [selected, setSelected] = useState<Order | null>(null);

  if (orders.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-line bg-white p-12 text-center text-sm text-ink-muted shadow-card">
        No orders here yet. Buy a ticket on the site to see it appear.
      </div>
    );
  }

  return (
    <>
      {/* ---------- Desktop: table ---------- */}
      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-line bg-white shadow-card md:block">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3 text-right">Qty</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-line align-top last:border-0 hover:bg-surface/60">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-ink">{o.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{fmtDateTime(o.createdAt)}</td>
                <td className="px-4 py-3">
                  <span className="block max-w-[220px] truncate font-semibold text-ink">{o.performer}</span>
                  <span className="block text-xs text-ink-muted">{o.zone} · {o.section}{o.row ? ` · ${o.row}` : ""}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="block max-w-[180px] truncate text-ink">{o.customerName}</span>
                  <span className="block max-w-[180px] truncate text-xs text-ink-muted">{o.customerEmail}</span>
                </td>
                <td className="px-4 py-3 text-right text-ink-soft">{o.qty}</td>
                <td className="px-4 py-3 text-right font-semibold text-ink">{formatPrice(o.total)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    <StatusButtons order={o} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile: tappable cards ---------- */}
      <div className="mt-4 space-y-2.5 md:hidden">
        {orders.map((o) => (
          <button
            key={o.id}
            onClick={() => setSelected(o)}
            className="flex w-full items-center gap-3 rounded-xl border border-line bg-white p-3 text-left shadow-card active:bg-surface"
          >
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-ink">{o.id}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLE[o.status]}`}>{o.status}</span>
              </span>
              <span className="mt-0.5 block truncate font-semibold text-ink">{o.performer}</span>
              <span className="block truncate text-xs text-ink-muted">{o.customerName} · {o.qty} ticket{o.qty > 1 ? "s" : ""}</span>
            </span>
            <span className="flex-shrink-0 text-right">
              <span className="block font-bold text-ink">{formatPrice(o.total)}</span>
              <span className="block text-[11px] text-ink-faint">{fmtDateTime(o.createdAt).split(",")[0]}</span>
            </span>
          </button>
        ))}
      </div>

      {/* ---------- Order detail modal ---------- */}
      {selected && (
        <Modal
          title={`Order ${selected.id}`}
          onClose={() => setSelected(null)}
          footer={<div className="flex flex-wrap justify-end gap-2"><StatusButtons order={selected} onDone={() => setSelected(null)} /></div>}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[selected.status]}`}>{selected.status}</span>
            <span className="text-xs text-ink-muted">{fmtDateTime(selected.createdAt)}</span>
          </div>

          <h3 className="text-base font-bold text-ink">{selected.performer}</h3>
          <p className="text-sm text-ink-soft">{selected.eventName}</p>

          <dl className="mt-4 divide-y divide-line text-sm">
            <DetailRow label="Section" value={`${selected.zone} · ${selected.section}${selected.row ? ` · ${selected.row}` : ""}`} />
            <DetailRow label="Venue" value={`${selected.venue}, ${selected.city}`} />
            <DetailRow label="Customer" value={selected.customerName} />
            <DetailRow label="Email" value={selected.customerEmail} />
            <DetailRow label="Quantity" value={`${selected.qty} ticket${selected.qty > 1 ? "s" : ""}`} />
            <DetailRow label={`Tickets (${selected.qty} × ${formatPrice(selected.pricePerTicket)})`} value={formatPrice(selected.subtotal)} />
            <DetailRow label="Service fees" value={formatPrice(selected.fees)} />
            <DetailRow label="Total" value={formatPrice(selected.total)} strong />
          </dl>
        </Modal>
      )}
    </>
  );
}

function StatusButtons({ order, onDone }: { order: Order; onDone?: () => void }) {
  const btn = (status: OrderStatus, label: string, cls: string) => (
    <form action={setOrderStatus} onSubmit={onDone}>
      <input type="hidden" name="id" value={order.id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className={`rounded-md border border-line px-2.5 py-1 text-xs font-semibold ${cls}`}>{label}</button>
    </form>
  );
  if (order.status === "confirmed") {
    return (
      <>
        {btn("cancelled", "Cancel", "text-ink hover:border-ink-muted")}
        {btn("refunded", "Refund", "text-amber-700 hover:border-amber-500")}
      </>
    );
  }
  return btn("confirmed", "Confirm", "text-brand hover:border-brand");
}

function DetailRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <dt className="min-w-0 flex-shrink text-ink-muted">{label}</dt>
      <dd className={`flex-shrink-0 text-right ${strong ? "text-base font-bold text-ink" : "font-medium text-ink"}`}>{value}</dd>
    </div>
  );
}
