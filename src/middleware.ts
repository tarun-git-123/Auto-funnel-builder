import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth");
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (!auth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (auth && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
