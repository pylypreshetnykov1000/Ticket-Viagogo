"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { IconBell, IconUser, IconMenu, IconClose } from "./icons";

const navLinks = [
  { label: "Sports", href: "/sport" },
  { label: "Concerts", href: "/concerts" },
  { label: "Theatre", href: "/theatre" },
  { label: "Top cities", href: "/concerts" },
];

const rightLinks = [
  { label: "Explore", href: "/concerts" },
  { label: "Sell", href: "/vendre" },
  { label: "Favorites", href: "/compte" },
  { label: "My tickets", href: "/compte" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Announcement bar */}
      <div className="bg-announce text-white">
        <div className="container-page py-2 text-center text-[12px] leading-snug text-white/85">
          We are the world&apos;s largest marketplace for buying and reselling tickets.
          All confirmed purchases are{" "}
          <span className="font-semibold underline underline-offset-2">100% guaranteed</span>.
          Resale ticket prices may be above or below face value.
        </div>
      </div>

      {/* Row 1: logo + nav + right links */}
      <div className="container-page flex h-16 items-center gap-6">
        <Logo />

        {/* Inline nav (desktop) */}
        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="whitespace-nowrap text-[14px] font-medium text-ink hover:text-brand-dark"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right links (desktop) */}
        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          {rightLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="whitespace-nowrap text-[14px] font-normal text-ink hover:text-brand-dark"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/compte" className="whitespace-nowrap text-[14px] font-normal text-ink hover:text-brand-dark">
            Sign in
          </Link>
          {/* origin: 32px surface circles, 16px glyphs, 8px red dot at corner */}
          <Link
            href="/compte"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-ink hover:text-brand-dark"
            aria-label="Sign in"
          >
            <IconUser size={16} />
          </Link>
          <button
            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-surface text-ink hover:text-brand-dark"
            aria-label="Notifications"
          >
            <IconBell size={16} />
            <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-[#d81819]" />
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Link
            href="/compte"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-ink"
            aria-label="Account"
          >
            <IconUser size={16} />
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Row 2: search bar — centered, 880px wide (viagogo.fr) */}
      <div className="border-b border-line pb-4 md:pb-5">
        <div className="container-page">
          <div className="mx-auto w-full max-w-[880px]">
            <SearchBar size="lg" />
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-line bg-white lg:hidden">
          <div className="container-page py-3">
            <div className="flex flex-col">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3 font-medium text-ink"
                >
                  {l.label}
                </Link>
              ))}
              {rightLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3 text-ink-soft"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/compte" onClick={() => setOpen(false)} className="py-3 font-medium text-brand-dark">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
