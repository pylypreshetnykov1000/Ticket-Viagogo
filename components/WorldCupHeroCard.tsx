import Link from "next/link";
import { IconHeart } from "./icons";

/**
 * Branded "World Cup" hero card pinned first in the Popular events carousel,
 * recreating viagogo's green FIFA 2026 promo tile (CSS-only, no image asset).
 */
export default function WorldCupHeroCard() {
  return (
    <Link href="/sport" className="group block w-full">
      <div className="relative aspect-[280/352] w-full overflow-hidden rounded-2xl bg-[#6ba714]">
        {/* geometric triangle pattern, echoing the origin artwork */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #87c93e 25%, transparent 25%), linear-gradient(225deg, #4e7c05 25%, transparent 25%), linear-gradient(45deg, #a5d96a 25%, transparent 25%), linear-gradient(315deg, #3f6600 25%, transparent 25%)",
            backgroundSize: "80px 80px",
            backgroundPosition: "0 0, 40px 0, 40px -40px, 0 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/50" />

        {/* centered wordmark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[34px] font-black leading-9 tracking-[2px] text-[#1e3200] drop-shadow-sm">
            W<span className="inline-block">⚽</span>RLD
          </span>
          <span className="text-[34px] font-black leading-9 tracking-[8px] text-[#1e3200] drop-shadow-sm">
            CUP
          </span>
        </div>

        <button
          type="button"
          aria-label="Add to favourites"
          className="absolute right-3 top-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-transform hover:scale-110"
        >
          <IconHeart size={20} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-[20px] font-bold leading-6 text-white">World Cup</h3>
          <p className="mt-1 text-[15px] font-medium leading-5 text-white">11 Jun - 19 Jul</p>
        </div>
      </div>
    </Link>
  );
}
