"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm({ from }: { from: string }) {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="from" value={from} />
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-ink-soft">Password</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="••••••••"
          className="w-full rounded-md border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </label>
      {error && <p className="text-sm text-pink">{error}</p>}
      <button type="submit" disabled={pending} className="btn-brand w-full disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
