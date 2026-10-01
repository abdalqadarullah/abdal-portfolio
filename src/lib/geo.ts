/**
 * IP geolocation via ip-api.com (free tier, no API key needed).
 * https://ip-api.com/docs/api-3
 *
 * Fallback policy (see SPEC.md §11.2/§11.3):
 * - Localhost IPs (127.0.0.1, ::1) in development → return Indonesia dummy
 *   to avoid hitting the API and to make the widget testable offline.
 * - Any network failure / non-200 / rate-limit → return "XX"/"Unknown".
 *   We still record the visit (total count matters more than geo accuracy).
 */

export type GeoResult = {
  countryCode: string;
  countryName: string;
};

const LOCALHOST_IPS = new Set(["127.0.0.1", "::1", "localhost", ""]);

export async function lookupCountry(ip: string): Promise<GeoResult> {
  // Localhost / dev: return dummy Indonesia without calling external API
  if (LOCALHOST_IPS.has(ip) || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    if (process.env.NODE_ENV === "development") {
      return { countryCode: "ID", countryName: "Indonesia" };
    }
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4s timeout
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,countryCode,country`,
      { signal: controller.signal, cache: "no-store" }
    );
    clearTimeout(timeout);

    if (!res.ok) {
      return { countryCode: "XX", countryName: "Unknown" };
    }
    const data = (await res.json()) as {
      status?: string;
      countryCode?: string;
      country?: string;
    };
    if (data.status !== "success" || !data.countryCode || !data.country) {
      return { countryCode: "XX", countryName: "Unknown" };
    }
    return {
      countryCode: data.countryCode,
      countryName: data.country,
    };
  } catch {
    return { countryCode: "XX", countryName: "Unknown" };
  }
}

/**
 * Extract the client IP from a Next.js Route Handler request.
 * Tries x-forwarded-for (first entry), then x-real-ip, then falls back to "127.0.0.1".
 */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();
  return "127.0.0.1";
}
