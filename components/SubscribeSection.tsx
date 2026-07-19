import Image from "next/image";

/**
 * Slim dark banner — matches viagogo.fr: overlapping circular artist photos on
 * the left, one bold white line of copy, and a "Subscribe" button on the right.
 */
const avatars = [
  "/images/the-weeknd.jpg",
  "/images/pitbull.jpg",
  "/images/lenny-kravitz.jpg",
  "/images/westlife.jpg",
  "/images/moby.jpg",
];

export default function SubscribeSection() {
  return (
    <section>
      <div className="flex flex-col items-start gap-4 rounded-xl bg-announce px-6 py-4 text-white sm:flex-row sm:items-center">
        <div className="flex flex-shrink-0 -space-x-3">
          {avatars.map((src) => (
            <span
              key={src}
              className="relative block h-10 w-10 overflow-hidden rounded-full border-2 border-announce"
            >
              <Image src={src} alt="" fill sizes="40px" className="object-cover" />
            </span>
          ))}
        </div>
        <p className="flex-1 text-[16px] font-bold sm:px-2">
          Find out when your favourite artists are on tour
        </p>
        <button className="flex-shrink-0 rounded-lg bg-white/10 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
          Subscribe
        </button>
      </div>
    </section>
  );
}
