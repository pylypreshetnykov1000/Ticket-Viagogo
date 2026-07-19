import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** Public site chrome — the admin panel under /admin has its own layout. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
