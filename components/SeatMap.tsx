"use client";

type Zone = {
  key: string;
  label: string;
  active: boolean;
};

export default function SeatMap({
  activeZone,
  onZoneClick,
}: {
  activeZone: string | null;
  onZoneClick: (zone: string | null) => void;
}) {
  const zones: Zone[] = [
    { key: "Upper Tier", label: "Upper Tier", active: activeZone === "Upper Tier" },
    { key: "Balcony", label: "Balcony", active: activeZone === "Balcony" },
    { key: "Lower Tier", label: "Lower Tier", active: activeZone === "Lower Tier" },
    { key: "Golden Circle", label: "Golden Circle", active: activeZone === "Golden Circle" },
    { key: "Orchestra", label: "Orchestra", active: activeZone === "Orchestra" },
    { key: "Floor", label: "Floor", active: activeZone === "Floor" },
  ];

  const fill = (z: Zone, base: string) =>
    activeZone === null || z.active ? base : "#d7dce3";

  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-card">
      <p className="mb-3 text-sm font-semibold text-ink">Venue map</p>
      <svg viewBox="0 0 300 240" className="w-full">
        {/* Stage */}
        <rect x="90" y="14" width="120" height="20" rx="4" fill="#1a2332" />
        <text x="150" y="28" textAnchor="middle" fill="#fff" fontSize="10">
          STAGE
        </text>

        {/* Orchestra / Floor (front) */}
        <rect
          x="95" y="44" width="110" height="34" rx="4"
          fill={fill(zones[4], "#00a3ad")}
          className="cursor-pointer transition-colors"
          onClick={() => onZoneClick(activeZone === "Orchestra" ? null : "Orchestra")}
        />
        <text x="150" y="65" textAnchor="middle" fill="#fff" fontSize="9">Orchestra</text>

        <rect
          x="95" y="82" width="110" height="30" rx="4"
          fill={fill(zones[5], "#39b54a")}
          className="cursor-pointer transition-colors"
          onClick={() => onZoneClick(activeZone === "Floor" ? null : "Floor")}
        />
        <text x="150" y="101" textAnchor="middle" fill="#fff" fontSize="9">Floor</text>

        {/* Golden Circle ring */}
        <rect
          x="70" y="120" width="160" height="24" rx="4"
          fill={fill(zones[3], "#e0a52b")}
          className="cursor-pointer transition-colors"
          onClick={() => onZoneClick(activeZone === "Golden Circle" ? null : "Golden Circle")}
        />
        <text x="150" y="136" textAnchor="middle" fill="#fff" fontSize="9">Golden Circle</text>

        {/* Lower Tier */}
        <rect
          x="50" y="150" width="200" height="28" rx="4"
          fill={fill(zones[2], "#2b6cb0")}
          className="cursor-pointer transition-colors"
          onClick={() => onZoneClick(activeZone === "Lower Tier" ? null : "Lower Tier")}
        />
        <text x="150" y="168" textAnchor="middle" fill="#fff" fontSize="9">Lower Tier</text>

        {/* Balcony */}
        <rect
          x="40" y="184" width="220" height="22" rx="4"
          fill={fill(zones[1], "#805ad5")}
          className="cursor-pointer transition-colors"
          onClick={() => onZoneClick(activeZone === "Balcony" ? null : "Balcony")}
        />
        <text x="150" y="199" textAnchor="middle" fill="#fff" fontSize="9">Balcony</text>

        {/* Upper Tier */}
        <rect
          x="30" y="212" width="240" height="20" rx="4"
          fill={fill(zones[0], "#718096")}
          className="cursor-pointer transition-colors"
          onClick={() => onZoneClick(activeZone === "Upper Tier" ? null : "Upper Tier")}
        />
        <text x="150" y="226" textAnchor="middle" fill="#fff" fontSize="9">Upper Tier</text>
      </svg>
      {activeZone && (
        <button
          onClick={() => onZoneClick(null)}
          className="mt-2 w-full rounded-md border border-line py-1.5 text-xs text-ink-soft hover:border-brand hover:text-brand"
        >
          Reset selection ({activeZone})
        </button>
      )}
    </div>
  );
}
