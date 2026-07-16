import Image from "next/image";

export default function SpotifyBanner() {
  return (
    <section>
      <div className="flex flex-col items-start gap-4 rounded-2xl bg-announce px-6 py-5 text-white sm:flex-row sm:items-center">
        <div className="flex flex-shrink-0 items-center">
          <Image
            src="/images/spotify-logo.png"
            alt="Spotify"
            width={110}
            height={33}
            className="h-8 w-auto"
          />
        </div>
        <div className="flex-1 sm:px-4">
          <p className="text-base font-bold">
            Connect your Spotify account and sync your favorite artists
          </p>
          <p className="text-sm text-white/70">
            Discover events from who you actually listen to
          </p>
        </div>
        <button className="flex-shrink-0 rounded-full bg-[#1ED760] px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#1fdf64]">
          Connect Spotify
        </button>
      </div>
    </section>
  );
}
