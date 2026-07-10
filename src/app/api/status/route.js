import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      version: "1.0.0",
      region: process.env.VERCEL_REGION || "local",
      commit: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
      status: "active",
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}
