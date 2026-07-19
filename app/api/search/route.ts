import { NextRequest, NextResponse } from "next/server";
import { getEvents } from "@/lib/store";
import { searchEvents } from "@/lib/derive";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const results = searchEvents(getEvents(), q).slice(0, 6);
  return NextResponse.json({ results });
}
