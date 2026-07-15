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
  return {
    day: d.getDate(),
    month: MONTHS[d.getMonth()],
    monthShort: MONTHS[d.getMonth()],
    weekday: DAYS[d.getDay()],
    year: d.getFullYear(),
    time: `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`,
  };
}

export function formatFullDate(iso: string): string {
  const p = parseDate(iso);
  return `${p.weekday} ${p.day} ${p.month} ${p.year} · ${p.time}`;
}
