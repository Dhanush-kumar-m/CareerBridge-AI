import { NextResponse } from "next/server";

export async function GET() {
  const service = "careerbridge-ai";
  const timestamp = new Date().toISOString();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { status: "error", service, timestamp, message: "Configuration unavailable" },
      { status: 503 }
    );
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout limit

    const res = await fetch(`${supabaseUrl}/rest/v1/profiles?select=id&limit=1`, {
      method: "GET",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json(
        { status: "error", service, timestamp },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { status: "ok", service, timestamp },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { status: "error", service, timestamp },
      { status: 503 }
    );
  }
}
