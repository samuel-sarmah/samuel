import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles both auth return paths:
//  - OAuth (Google): ?code=...            -> exchangeCodeForSession
//  - Magic link:     ?token_hash=&type=   -> verifyOtp
//    (requires the Magic Link email template to point at this route)
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/writings";

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}${next}?auth_error=1`);
}
