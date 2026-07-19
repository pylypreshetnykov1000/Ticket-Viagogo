import Link from "next/link";
import type { OrderStatus } from "@/lib/types";
import { getOrders } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import OrdersList from "./OrdersList";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const all = getOrders();

  const confirmed = all.filter((o) => o.status === "confirmed");
  const revenue = confirmed.reduce((acc, o) => acc + o.total, 0);
  const ticketsSold = confirmed.reduce((acc, o) => acc + o.qty, 0);

  const orders = status ? all.filter((o) => o.status === status) : all;

  const FILTERS: { key: OrderStatus | undefined; label: string }[] = [
    { key: undefined, label: "All" },
    { key: "confirmed", label: "Confirmed" },
    { key: "cancelled", label: "Cancelled" },
    { key: "refunded", label: "Refunded" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">
        Orders <span className="text-base font-normal text-ink-muted">({all.length})</span>
      </h1>

      {/* summary */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Revenue (confirmed)" value={formatPrice(revenue)} />
        <Stat label="Confirmed orders" value={String(confirmed.length)} />
        <Stat label="Tickets sold" value={String(ticketsSold)} />
        <Stat label="Total orders" value={String(all.length)} />
      </div>

      {/* filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.label}
            href={f.key ? `/admin/orders?status=${f.key}` : "/admin/orders"}
            className={`pill ${status === f.key || (!status && !f.key) ? "pill-active" : ""}`}
          >
            {f.label}
            <span className="text-xs text-ink-faint">
              {f.key ? all.filter((o) => o.status === f.key).length : all.length}
            </span>
          </Link>
        ))}
      </div>

      <OrdersList orders={orders} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-card">
      <p className="text-xl font-bold text-ink sm:text-2xl">{value}</p>
      <p className="mt-0.5 text-xs text-ink-muted">{label}</p>
    </div>
  );
}
