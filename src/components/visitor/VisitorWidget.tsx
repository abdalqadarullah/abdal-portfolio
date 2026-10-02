"use client";

import { useEffect, useState } from "react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { footer } from "@/data/content";

/**
 * VisitorWidget — records the current visitor on mount and refreshes stats
 * periodically while rendering a small
 * dashboard-style block in footer column 4.
 *
 * Behavior:
 * - POST /api/visitor once on mount (records this visit + returns aggregate).
 * - GET /api/visitor every 60 seconds (refreshes aggregate without recounting).
 * - LIVE dot indicates that the widget is actively refreshing its data.
 * - Loading: skeleton shimmer blocks.
 * - Error / no data: graceful "—" so footer layout never breaks.
 */

type Country = { code: string; name: string; count: number };
type VisitorData = { total: number; countries: Country[] };
const REFRESH_INTERVAL_MS = 60_000;

export function VisitorWidget() {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchVisitorData = async (method: "POST" | "GET") => {
      try {
        const res = await fetch("/api/visitor", {
          method,
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("fetch-failed");
        const json = (await res.json()) as VisitorData;
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch {
        // Keep the last successful result during refresh failures.
        if (!cancelled && method === "POST") {
          setData(null);
          setLoading(false);
        }
      }
    };

    void fetchVisitorData("POST");
    const intervalId = window.setInterval(() => {
      void fetchVisitorData("GET");
    }, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  const maxCount = data
    ? Math.max(...data.countries.map((c) => c.count), 1)
    : 1;

  return (
    <AnimatedWrapper className="w-full">
      <div className="border border-[#2A2A2A] p-4 sm:p-5 bg-[#0A0A0A] text-[#FAFAFA]">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAFAFA]/60">
            {footer.visitor.title}
          </span>
          <span className="inline-flex items-center gap-1.5 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#FAFAFA]/80">
            <span
              className="live-dot inline-block w-2 h-2 bg-[#22C55E]"
              aria-hidden="true"
            />
            {footer.visitor.liveLabel}
          </span>
        </div>

        {/* Total count — big */}
        <div className="mb-5">
          {loading ? (
            <div className="skeleton-brutal h-12 w-32 mb-1" />
          ) : (
            <div className="font-heading text-4xl sm:text-5xl leading-none text-[#FAFAFA]">
              {data && data.total > 0 ? data.total : footer.visitor.noDataLabel}
            </div>
          )}
          <span className="font-body text-[10px] uppercase tracking-[0.15em] text-[#FAFAFA]/50">
            {footer.visitor.totalLabel}
          </span>
        </div>

        {/* Bar chart — top countries */}
        <div className="space-y-2.5">
          {loading ? (
            <>
              <div className="skeleton-brutal h-5 w-full" />
              <div className="skeleton-brutal h-5 w-3/4" />
              <div className="skeleton-brutal h-5 w-1/2" />
            </>
          ) : data && data.countries.length > 0 ? (
            data.countries.map((c) => {
              const pct = Math.max(8, Math.round((c.count / maxCount) * 100));
              return (
                <div key={c.code} className="font-body text-[11px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold tracking-wide text-[#FAFAFA]/90">
                      {c.code} · {c.name}
                    </span>
                    <span className="text-[#D4FF00] font-bold tabular-nums">
                      {c.count}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1A1A1A]">
                    <div
                      className="h-full bg-[#D4FF00]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="font-body text-[11px] text-[#FAFAFA]/40">
              Belum ada data pengunjung.
            </div>
          )}
        </div>
      </div>
    </AnimatedWrapper>
  );
}
