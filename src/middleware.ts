// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth");
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (!auth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (auth && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf)).*)",
  ],// protect everything except static/assets
};