/**
 * Icon library — exact SVG paths extracted from viagogo.fr's live markup
 * so the project uses viagogo's real iconography. All use currentColor.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number | undefined, viewBox: string, rest: SVGProps<SVGSVGElement>) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox,
    width: size ?? 16,
    height: size ?? 16,
    fill: "currentColor",
    "aria-hidden": true,
    ...rest,
  };
}

export function IconSearch({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 20, "0 0 20 20", rest)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.391 14.452a7 7 0 1 1 1.06-1.06l3.33 3.328a.75.75 0 1 1-1.061 1.06zM14.5 9a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
      />
    </svg>
  );
}

/** Heart (favourite) — viagogo card favourite icon */
export function IconHeart({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 18, "0 0 20 20", { fill: "none", ...rest })} stroke="currentColor" strokeWidth={1.6}>
      <path d="M10 17.5C10 17.5 2.5 13 2.5 7.75A3.75 3.75 0 0 1 10 5.5a3.75 3.75 0 0 1 7.5 2.25C17.5 13 10 17.5 10 17.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBell({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 16", rest)}>
      <path d="M6 1.75A.75.75 0 0 1 6.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 1.75" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m2.626 11.833-.005.01A.75.75 0 0 0 3.25 13h2.299a2.5 2.5 0 0 0 4.9-.001h2.3a.75.75 0 0 0 .63-1.157l-.006-.01-.035-.057-.13-.225c-.11-.195-.256-.47-.402-.79-.303-.662-.557-1.415-.557-2.011v-1.8C12.25 4.692 10.152 3 8 3S3.75 4.692 3.75 6.95v1.8c0 .596-.254 1.349-.557 2.011a11 11 0 0 1-.567 1.072M8 4.5c-1.486 0-2.75 1.174-2.75 2.45v1.8c0 .932-.37 1.93-.693 2.635l-.053.115h6.992l-.053-.115c-.322-.705-.693-1.703-.693-2.635v-1.8C10.75 5.674 9.486 4.5 8 4.5M7.134 13a1 1 0 0 0 1.732 0z"
      />
    </svg>
  );
}

/** Account person glyph — origin renders this at 16px inside a 32px surface circle */
export function IconUser({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 16", rest)}>
      <path d="M8 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5" />
      <path d="M8 9.25c-3.04 0-5.5 1.79-5.5 4.25 0 .552.448 1 1 1h9c.552 0 1-.448 1-1 0-2.46-2.46-4.25-5.5-4.25" />
    </svg>
  );
}

/** "Use my location" paper-plane / send arrow */
export function IconSend({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 16", rest)}>
      <path d="M12.6 2.092c.833-.364 1.68.482 1.317 1.315L9.124 14.4l-.08.15c-.418.65-1.414.584-1.742-.116l-.06-.159-1.068-3.743a1 1 0 0 0-.565-.643l-.121-.044-3.759-1.079C.828 8.508.746 7.264 1.605 6.89z" />
    </svg>
  );
}

/** Map pin (location) */
export function IconPin({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 20 20", rest)}>
      <path d="m9.517 18.825.483-.574.483.574a.75.75 0 0 1-.966 0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m9.517 18.825.483-.574.483.574.006-.005.016-.014.057-.049q.075-.064.208-.184a26.968 26.968 0 0 0 2.94-3.132c1.584-1.991 3.287-4.778 3.287-7.651 0-2.036-1-3.815-2.249-4.968C13.478 1.65 11.768 1 9.997 1s-3.482.649-4.752 1.82C3.995 3.977 3 5.755 3 7.79c0 2.873 1.704 5.66 3.288 7.652a27 27 0 0 0 2.942 3.132l.265.233.016.014.004.004zM6.263 3.924c.98-.905 2.323-1.423 3.734-1.423 1.41 0 2.753.518 3.734 1.423 1.001.924 1.767 2.324 1.767 3.866 0 2.337-1.421 4.78-2.961 6.718A25.5 25.5 0 0 1 10 17.245a25.491 25.491 0 0 1-2.538-2.737C5.922 12.57 4.5 10.126 4.5 7.788c0-1.543.762-2.941 1.763-3.865"
      />
    </svg>
  );
}

/** Calendar with dots */
export function IconCalendar({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 16", rest)}>
      <path d="M5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M9 8.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0M11 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.75 1.75a.75.75 0 0 0-1.5 0v.75H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-.25v-.75a.75.75 0 0 0-1.5 0v.75h-4.5zm4.5 3V4h-4.5v.75a.75.75 0 0 1-1.5 0V4H4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 12 4h-.25v.75a.75.75 0 0 1-1.5 0"
      />
    </svg>
  );
}

/** Two stacked tickets */
export function IconTicket({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 16", rest)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.446 14C2.648 14 2 13.328 2 12.5v-9C2 2.672 2.648 2 3.446 2h1.768c0 .736.576 1.09 1.286 1.09S7.786 2.737 7.786 2h1.768C10.352 2 11 2.672 11 3.5v9c0 .828-.648 1.5-1.446 1.5H7.786c0-.736-.576-1.09-1.286-1.09s-1.286.354-1.286 1.09zm.736-1.5H3.5v-9h.682q.203.284.489.506c.569.442 1.247.585 1.829.585s1.26-.143 1.83-.585q.285-.222.488-.506H9.5v9h-.682a2.5 2.5 0 0 0-.489-.506c-.569-.442-1.247-.585-1.829-.585s-1.26.143-1.83.585q-.285.222-.488.506"
      />
      <path d="M14 5.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0z" />
    </svg>
  );
}

/** Info circle */
export function IconInfo({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 16", rest)}>
      <path d="M7.116 10.618a.882.882 0 1 0 1.764 0V7.862a.882.882 0 1 0-1.764 0zM7.384 5.843q.255.237.614.237.36 0 .614-.237a.75.75 0 0 0 .255-.569.75.75 0 0 0-.255-.569.87.87 0 0 0-.614-.236.87.87 0 0 0-.614.236.75.75 0 0 0-.255.57q0 .33.255.568" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0m-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
      />
    </svg>
  );
}

/** People / views */
export function IconUsers({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 18, "0 0 20 20", rest)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0m-1.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M2 16.6A5.6 5.6 0 0 1 7.6 11h4.8a5.6 5.6 0 0 1 5.6 5.6 1.4 1.4 0 0 1-1.4 1.4H3.4A1.4 1.4 0 0 1 2 16.6m1.757-.1a.24.24 0 0 1-.242-.256A4.1 4.1 0 0 1 7.6 12.5h4.8a4.1 4.1 0 0 1 4.085 3.744.24.24 0 0 1-.242.256z"
      />
    </svg>
  );
}

/** Clock */
export function IconClock({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 14, "0 0 16 16", rest)}>
      <path d="M11.529 1.29a.75.75 0 0 1 1.06 0l2.121 2.12a.75.75 0 0 1-1.06 1.061l-2.121-2.12a.75.75 0 0 1 0-1.062M1.29 3.41a.75.75 0 0 0 1.06 1.062L4.472 2.35A.75.75 0 1 0 3.41 1.29zM8.75 5.75a.75.75 0 1 0-1.5 0v2.56l1.809 1.81a.75.75 0 0 0 1.06-1.061L8.75 7.689z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0m-1.5 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0"
      />
    </svg>
  );
}

/** Solid guarantee check mark */
export function IconCheck({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 14", rest)}>
      <path d="M6 13.0234L0 7.26475L1.86067 5.35141L5.96467 9.26741L14.1047 0.976746L16 2.85475L6 13.0234Z" />
    </svg>
  );
}

export function IconChevronDown({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 16", rest)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.271 5.256a.9.9 0 0 1 1.273.015l3.277 3.357c.098.1.26.1.358 0l3.277-3.357a.9.9 0 1 1 1.288 1.258l-4.1 4.2a.9.9 0 0 1-1.288 0l-4.1-4.2a.9.9 0 0 1 .015-1.273"
      />
    </svg>
  );
}

export function IconChevronRight({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 20, "0 0 20 20", rest)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.258 3.269a.9.9 0 0 0 .01 1.273l5.368 5.28c.1.098.1.258 0 .356l-5.367 5.28a.9.9 0 0 0 1.262 1.284l6.2-6.1a.9.9 0 0 0 0-1.283l-6.2-6.1a.9.9 0 0 0-1.273.01"
      />
    </svg>
  );
}

export function IconChevronLeft({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 16, "0 0 16 16", rest)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.744 3.271a.9.9 0 0 1-.015 1.273L7.372 7.821a.25.25 0 0 0 0 .358l3.357 3.277a.9.9 0 0 1-1.258 1.288l-4.2-4.1a.9.9 0 0 1 0-1.288l4.2-4.1a.9.9 0 0 1 1.273.015"
      />
    </svg>
  );
}

export function IconClose({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 20, "0 0 20 20", rest)}>
      <path d="m11.273 10 5.09-5.09a.9.9 0 1 0-1.272-1.274L10 8.727l-5.09-5.09a.9.9 0 0 0-1.274 1.272L8.727 10l-5.09 5.09a.9.9 0 0 0 1.272 1.274L10 11.273l5.09 5.09a.9.9 0 0 0 1.274-1.272z" />
    </svg>
  );
}

export function IconMenu({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size ?? 22, "0 0 24 24", { fill: "none", ...rest })} stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
