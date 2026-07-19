import Image from "next/image";

/**
 * App install banner — matches viagogo.fr exactly: the green background with
 * the tilted phones is origin's own artwork (vgg-app-install-banner.webp,
 * 1200×160, cover @ 30% 0%), with title, store badges and QR overlaid.
 */
export default function DownloadApp() {
  return (
    <section>
      <div
        className="relative h-40 overflow-hidden rounded-xl bg-[#eef3e2] bg-cover bg-no-repeat"
        style={{ backgroundImage: "url(/images/app-phones.webp)", backgroundPosition: "30% 0%" }}
      >
        <div className="flex h-full items-center justify-between gap-4 px-6 sm:px-9">
          {/* Title block — origin: 28px/700, #2f343b */}
          <div className="max-w-[420px] flex-shrink-0">
            <h3 className="text-[22px] font-bold leading-7 text-[#2f343b] sm:text-[28px] sm:leading-8">
              Download the viagogo app
            </h3>
            <p className="mt-1.5 text-[15px] text-ink-soft sm:text-[16px]">
              Discover your favourite events with ease
            </p>
          </div>

          {/* Store badges + QR — origin: ~48px badges, 90×88 QR at far right */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <a href="#" aria-label="Download on the App Store">
              <Image
                src="/images/app-store-badge.svg"
                alt="Download on the App Store"
                width={144}
                height={48}
                className="h-12 w-auto"
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <Image
                src="/images/google-play-badge.png"
                alt="Get it on Google Play"
                width={162}
                height={48}
                className="h-12 w-auto"
              />
            </a>
            <Image
              src="/images/qr-code.webp"
              alt="Scan this QR code with your phone"
              width={90}
              height={88}
              className="hidden h-[88px] w-[90px] rounded-md md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
