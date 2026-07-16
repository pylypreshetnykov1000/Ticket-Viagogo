import Image from "next/image";

export default function SubscribeSection() {
  return (
    <section>
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-2">
        {/* Left: copy + form */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-[-0.5px] text-ink-strong">
            Never miss an event
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Subscribe to get the latest events, exclusive presales and personalised
            recommendations straight to your inbox.
          </p>
          <form className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row" action="#">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="h-11 flex-1 rounded-full border border-line bg-surface px-4 text-sm focus:border-brand focus:outline-none"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="h-11 rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-ink-faint">
            By subscribing you agree to our Privacy Policy. Unsubscribe any time.
          </p>
        </div>

        {/* Right: image collage */}
        <div className="relative hidden min-h-[220px] md:grid md:grid-cols-3 md:gap-0.5">
          {["/images/subscribe-1.jpg", "/images/subscribe-2.jpg", "/images/subscribe-3.jpg"].map(
            (src, i) => (
              <div key={src} className={`relative ${i === 1 ? "mt-6" : ""}`}>
                <Image src={src} alt="Live event" fill sizes="200px" className="object-cover" />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
