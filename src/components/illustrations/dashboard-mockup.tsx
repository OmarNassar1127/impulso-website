import { ArrowUpRight, Check, Clock3, Search, Bell } from "lucide-react";

/**
 * Realistic internal-dashboard mockup for the software page. Real labels and
 * numbers instead of grey bars, so it reads as an actual product screenshot.
 */
export function DashboardMockup({ className = "" }: { className?: string }) {
  const rows = [
    { id: "#2418", klant: "Van Dijk BV", bedrag: "€ 1.240", status: "Betaald" },
    { id: "#2417", klant: "Bakkerij Roos", bedrag: "€ 385", status: "Open" },
    { id: "#2416", klant: "Meijer Techniek", bedrag: "€ 2.900", status: "Betaald" },
    { id: "#2415", klant: "Studio Vier", bedrag: "€ 640", status: "Verwerkt" },
  ];

  const statusStyle: Record<string, string> = {
    Betaald: "bg-emerald-500/10 text-emerald-700",
    Open: "bg-amber-500/15 text-amber-700",
    Verwerkt: "bg-blue-500/10 text-blue-700",
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-hidden rounded-xl border border-foreground/15 bg-card shadow-lg">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-foreground/10 bg-muted/40 px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          </div>
          <div className="mx-2 flex-1 rounded-md bg-background/80 px-3 py-1 text-[10px] font-mono text-muted-foreground/60">
            portaal.jouwbedrijf.nl/orders
          </div>
        </div>

        {/* App bar */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-terracotta text-[10px] font-bold text-white">
              JB
            </div>
            <span className="text-[12px] font-semibold text-foreground">Orderportaal</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground/60">
            <Search className="h-3.5 w-3.5" />
            <Bell className="h-3.5 w-3.5" />
            <div className="h-5 w-5 rounded-full bg-muted" />
          </div>
        </div>

        <div className="p-4">
          {/* KPI row */}
          <div className="mb-4 grid grid-cols-3 gap-2.5">
            {[
              { label: "Omzet deze maand", value: "€ 48.２K".replace("２", "2"), delta: "+12%" },
              { label: "Open orders", value: "23", delta: "−4" },
              { label: "Verwerkt vandaag", value: "17", delta: "+5" },
            ].map((k) => (
              <div key={k.label} className="rounded-lg border border-foreground/10 bg-muted/30 p-2.5">
                <div className="text-[9px] uppercase tracking-wide text-muted-foreground/70">
                  {k.label}
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-[15px] font-bold text-foreground">{k.value}</span>
                  <span className="flex items-center text-[9px] font-semibold text-emerald-600">
                    <ArrowUpRight className="h-2.5 w-2.5" />
                    {k.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-lg border border-foreground/10">
            <div className="grid grid-cols-[1fr_2fr_1.2fr_1.2fr] gap-2 border-b border-foreground/10 bg-muted/30 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground/70">
              <span>Order</span>
              <span>Klant</span>
              <span>Bedrag</span>
              <span>Status</span>
            </div>
            {rows.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[1fr_2fr_1.2fr_1.2fr] items-center gap-2 border-b border-foreground/[0.06] px-3 py-2 text-[11px] last:border-b-0"
              >
                <span className="font-mono text-muted-foreground">{r.id}</span>
                <span className="truncate font-medium text-foreground">{r.klant}</span>
                <span className="text-foreground/80">{r.bedrag}</span>
                <span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${statusStyle[r.status]}`}
                  >
                    {r.status === "Open" ? (
                      <Clock3 className="h-2.5 w-2.5" />
                    ) : (
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    )}
                    {r.status}
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* Sync footer */}
          <div className="mt-3 flex items-center justify-between rounded-lg border border-terracotta/20 bg-terracotta/[0.05] px-3 py-2">
            <span className="text-[10px] text-foreground/70">
              Gekoppeld met <span className="font-semibold">Exact Online</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              live sync
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
