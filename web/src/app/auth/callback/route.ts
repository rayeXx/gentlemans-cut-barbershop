import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code && supabase) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect kembali ke halaman utama setelah login berhasil
  return NextResponse.redirect(`${origin}/`);
}
