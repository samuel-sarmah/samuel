import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  return updateSession(request);
}

// Only the blog and auth routes touch sessions; everything else stays static.
export const config = {
  matcher: ["/writings/:path*", "/auth/:path*"],
};
