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

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * Card date, matching viagogo's two formats (both 24-hour):
 * - performer sections: "Sun, 29 Nov • 19:30"  (weekday, no year)
 * - event sections:     "08 Aug 2026 • 19:30"  (year, no weekday)
 */
export function formatCardDate(
  iso: string,
  opts: { weekday?: boolean; year?: boolean } = {}
): string {
  const d = new Date(iso);
  const date = `${pad2(d.getDate())} ${MONTHS[d.getMonth()]}${opts.year ? ` ${d.getFullYear()}` : ""}`;
  const time = `${d.getHours()}:${pad2(d.getMinutes())}`;
  return `${opts.weekday ? `${DAYS[d.getDay()]}, ` : ""}${date} • ${time}`;
}

/** Short tour range for performer cards: "08 Aug - 10 Aug" */
export function formatShortRange(startIso: string, endIso: string): string {
  const s = new Date(startIso);
  const e = new Date(endIso);
  return `${pad2(s.getDate())} ${MONTHS[s.getMonth()]} - ${pad2(e.getDate())} ${MONTHS[e.getMonth()]}`;
}

/**
 * Tour date range as shown on viagogo hero cards: "17 Jul - 22 Jul",
 * or "25 Sep - 10 May 2027" when the range crosses into another year.
 */
export function formatDateRange(startIso: string, endIso: string): string {
  const s = parseDate(startIso);
  const e = parseDate(endIso);
  const end = `${e.day} ${e.month}${e.year !== s.year ? ` ${e.year}` : ""}`;
  return `${s.day} ${s.month} - ${end}`;
}
