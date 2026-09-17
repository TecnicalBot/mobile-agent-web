const fallbackSiteUrl = "https://mobile-agent.vercel.app";

/**
 * Canonical site URL without a trailing slash.
 *
 * NEXT_PUBLIC_SITE_URL is authoritative when set on the host, but the
 * fallback points at the live deployment so robots.txt, sitemap.xml,
 * Open Graph URLs, and JSON-LD structured data never reference a
 * non-resolving domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl
).replace(/\/+$/, "");
