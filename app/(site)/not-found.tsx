import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-2 text-xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-ink-soft">
        The event or page you&apos;re looking for doesn&apos;t exist or is no longer available.
      </p>
      <Link href="/" className="btn-brand mt-6">Back to home</Link>
    </div>
  );
}
