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
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"], // only apply middleware to requests that don't start with /_next
};