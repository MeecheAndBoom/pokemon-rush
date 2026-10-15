import { site } from "@/lib/site";

/**
 * Single source of truth for the site's canonical origin.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL  (explicit, wins everywhere)
 *  2. VERCEL_PROJECT_PRODUCTION_URL  (stable production domain on Vercel)
 *  3. VERCEL_URL  (per-deployment preview domain)
 *  4. site.url  (static fallback, used for local development)
 *
 * localhost values are only honoured when nothing else is available, so a
 * leftover `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in a local .env file can
 * never leak into a deployed sitemap or robots.txt again.
 */
function normaliseOrigin(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

function isLocalOrigin(origin: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:\d+)?$/i.test(origin);
}

export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ]
    .map(normaliseOrigin)
    .filter((origin): origin is string => Boolean(origin));

  const remote = candidates.find((origin) => !isLocalOrigin(origin));
  if (remote) return remote;

  return candidates[0] ?? normaliseOrigin(site.url) ?? "http://localhost:3000";
}

/** The canonical origin, evaluated once per server process. */
export const siteUrl = getSiteUrl();

/** Resolves a site-relative path to an absolute URL. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = siteUrl.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return suffix === "/" ? base : `${base}${suffix}`;
}
