export function formatPrice(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function parseDate(iso: string) {
  const d = new Date(iso);
  const h = d.getHours();
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return {
    day: d.getDate(),
    month: MONTHS[d.getMonth()],
    monthShort: MONTHS[d.getMonth()],
    weekday: DAYS[d.getDay()],
    year: d.getFullYear(),
    // viagogo uses 12-hour clock: "6:30 PM"
    time: `${h12}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`,
  };
}

export function formatFullDate(iso: string): string {
  const p = parseDate(iso);
  return `${p.weekday}, ${p.month} ${String(p.day).padStart(2, "0")} ${p.year} • ${p.time}`;
}
