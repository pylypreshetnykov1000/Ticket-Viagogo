import Logo from "@/components/Logo";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin login | viagogo" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from = "/admin" } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface/40 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-card">
        <div className="mb-4 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-xl font-bold text-ink">Admin panel</h1>
        <p className="mt-1 text-sm text-ink-soft">Sign in to manage events and images.</p>
        <LoginForm from={from} />
        <p className="mt-4 text-center text-[11px] text-ink-faint">
          Password is set via <code>ADMIN_PASSWORD</code> in <code>.env.local</code>
        </p>
      </div>
    </div>
  );
}
