import Image from "next/image";

export default function DownloadApp() {
  return (
    <section>
      <div className="relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-[#eef3e2] px-6 py-6 sm:px-10">
        {/* Left text */}
        <div className="relative z-10 flex-shrink-0">
          <h3 className="text-xl font-bold text-ink">Download the viagogo app</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Discover your favourite events with ease
          </p>
        </div>

        {/* Phone mockup (center, decorative) */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[560px] -translate-x-1/2 items-center lg:flex">
          <Image
            src="/images/app-banner.webp"
            alt="viagogo app on mobile"
            width={840}
            height={150}
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Badges + QR */}
        <div className="relative z-10 flex flex-shrink-0 items-center gap-3">
          <div className="flex flex-col gap-2">
            <a href="#" aria-label="Download on the App Store">
              <Image src="/images/app-store-badge.svg" alt="App Store" width={120} height={40} className="h-10 w-auto" />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <Image src="/images/google-play-badge.png" alt="Google Play" width={135} height={40} className="h-10 w-auto" />
            </a>
          </div>
          <Image
            src="/images/qr-code.webp"
            alt="Scan to download the viagogo app"
            width={84}
            height={84}
            className="hidden h-[84px] w-[84px] rounded-md sm:block"
          />
        </div>
      </div>
    </section>
  );
}
