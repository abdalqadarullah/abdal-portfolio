import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashIp } from "@/lib/hash";
import { getClientIp, lookupCountry } from "@/lib/geo";

/**
 * Visitor counter API
 * -------------------
 * POST /api/visitor — record a unique visit (idempotent via ipHash upsert),
 *                     then return aggregate { total, countries[] }.
 * GET  /api/visitor — return aggregate only (no insert). Useful for refresh
 *                     without re-counting; not used by the widget in MVP but
 *                     provided for flexibility per SPEC.md §11.2.
 *
 * Privacy: IP is SHA-256 hashed before storage. Raw IP is never persisted.
 */

type CountryAggregate = { code: string; name: string; count: number };

async function getAggregate(): Promise<{
  total: number;
  countries: CountryAggregate[];
}> {
  const [total, grouped] = await Promise.all([
    db.visitor.count(),
    db.visitor.groupBy({
      by: ["countryCode", "countryName"],
      _count: { _all: true },
      orderBy: { _count: { countryCode: "desc" } },
    }),
  ]);

  // Map grouped rows → {code, name, count}
  const all: CountryAggregate[] = grouped.map((g) => ({
    code: g.countryCode,
    name: g.countryName,
    count: g._count._all,
  }));

  // Sort: known countries descending by count, "Unknown" always last
  const known = all
    .filter((c) => c.code !== "XX")
    .sort((a, b) => b.count - a.count);
  const unknown = all.filter((c) => c.code === "XX");

  const countries = [...known, ...unknown].slice(0, 5);

  return { total, countries };
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const ipHash = await hashIp(ip);
    const { countryCode, countryName } = await lookupCountry(ip);

    // Idempotent: same IP hash → no new row, no count inflation on refresh.
    await db.visitor.upsert({
      where: { ipHash },
      update: {}, // existing visitor: do nothing (we keep first-seen country)
      create: { ipHash, countryCode, countryName },
    });

    const data = await getAggregate();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    // Database or unexpected error — log server-side, return graceful fallback
    console.error("[/api/visitor POST] error:", err);
    return NextResponse.json(
      { total: 0, countries: [], error: "visitor-counter-unavailable" },
      { status: 200 } // 200 so widget doesn't crash — it'll show "—"
    );
  }
}

export async function GET() {
  try {
    const data = await getAggregate();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[/api/visitor GET] error:", err);
    return NextResponse.json(
      { total: 0, countries: [], error: "visitor-counter-unavailable" },
      { status: 200 }
    );
  }
}
