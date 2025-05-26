import { NextResponse, type NextRequest } from "next/server";
import { protectedMiddleware } from "./middlewares/protected";
import { rolesAllowlistMiddleware } from "./middlewares/roles-allowlist";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/auth/")) {
    return;
  }

  if (req.nextUrl.pathname.startsWith("/")) {
    try {
      await protectedMiddleware(req);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "UNAUTHORIZED") {
          return NextResponse.redirect(new URL("/auth/sign-in", req.url));
        }

        if (err.message === "NO_TOKEN" || err.message === "TOKEN_EXPIRED") {
          NextResponse.redirect("/auth/refresh-token");
        }
      }
      NextResponse.redirect("/auth/sign-out");
    }
  }

  if (req.nextUrl.pathname.startsWith("/cms")) {
    return await rolesAllowlistMiddleware(req, ["admin", "instructor"]);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
