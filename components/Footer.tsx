import Link from "next/link";
import { IconCheck, IconChevronDown } from "./icons";

const guarantees = [
  "World class security checks",
  "Transparent pricing",
  "100% order guarantee",
  "Customer service from start to finish",
];

const company = [
  "About Us",
  "Open Distribution",
  "Affiliate Programme",
  "Investors",
  "Newsroom",
  "Careers",
  "Event Organisers",
];

const questions = ["Help Centre / Contact Us", "Lowest Price Guarantee"];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {/* Guarantee */}
          <div>
            <div className="mb-4 flex items-start gap-2">
              <ShieldCheck />
              <div className="leading-none">
                <span className="text-lg font-extrabold text-ink">
                  via<span className="text-brand-light">go</span>go
                </span>
                <div className="mt-0.5 text-sm font-medium text-ink-muted">guarantee</div>
              </div>
            </div>
            <ul className="space-y-2.5">
              {guarantees.map((g) => (
                <li key={g} className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <span className="text-[#6FB229]">
                    <IconCheck size={15} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">Our Company</h4>
            <ul className="space-y-2.5 text-sm">
              {company.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-ink-soft hover:text-brand-dark">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Have Questions */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">Have Questions?</h4>
            <ul className="space-y-2.5 text-sm">
              {questions.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-ink-soft hover:text-brand-dark">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Live events selectors */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-ink">Live events all over the world</h4>
            <div className="space-y-2">
              <Selector label="🇺🇸 United States" />
              <Selector label="English (US)" />
              <Selector label="€ Euro" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-1.5 py-6 text-xs text-ink-muted">
          <p>
            Copyright © {new Date().getFullYear()} viagogo Entertainment Inc —{" "}
            <Link href="#" className="text-blue hover:underline">Company Details</Link>
          </p>
          <p>
            Use of this web site constitutes acceptance of the{" "}
            <Link href="#" className="text-blue hover:underline">Terms and Conditions</Link> and{" "}
            <Link href="#" className="text-blue hover:underline">Privacy Policy</Link> and{" "}
            <Link href="#" className="text-blue hover:underline">Cookies Policy</Link> and{" "}
            <Link href="#" className="text-blue hover:underline">Mobile Privacy Policy</Link>{" "}
            <Link href="#" className="text-blue hover:underline">Do Not Share My Personal Information/Your Privacy Choices</Link>
          </p>
          <p className="mt-1 text-ink-faint">Demonstration recreation — not officially affiliated with viagogo.</p>
        </div>
      </div>
    </footer>
  );
}

function Selector({ label }: { label: string }) {
  return (
    <button className="flex w-full max-w-[240px] items-center justify-between rounded-md border border-line bg-white px-3 py-2 text-sm text-ink hover:border-brand">
      <span>{label}</span>
      <IconChevronDown size={14} className="text-ink-muted" />
    </button>
  );
}

function ShieldCheck() {
  return (
    <svg width="30" height="34" viewBox="0 0 30 34" fill="none" className="flex-shrink-0">
      <path
        d="M15 2 4 6v9c0 7.2 4.7 11.6 11 14 6.3-2.4 11-6.8 11-14V6z"
        fill="none"
        stroke="#4C7A02"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m10 16 3.5 3.5L20 12" stroke="#6FB229" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
