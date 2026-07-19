/**
 * Minimal admin auth for the demo: a session cookie holding
 * sha256(ADMIN_PASSWORD + salt). middleware.ts verifies the same value
 * (via Web Crypto) for every /admin route.
 */
import { createHash } from "crypto";

export const SESSION_COOKIE = "vgg_admin";
export const AUTH_SALT = "viagogo-admin-salt-v1";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function sessionToken(): string {
  return createHash("sha256").update(adminPassword() + AUTH_SALT).digest("hex");
}

export function verifyPassword(input: string): boolean {
  return input === adminPassword();
}
