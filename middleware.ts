import { NextRequest, NextResponse } from "next/server";

const PUBLIC = ["/login", "/cadastro"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(token ? "/dashboard" : "/login", req.url));
  }
  const isPublic = PUBLIC.some((p) => pathname.startsWith(p));
  if (!token && !isPublic) return NextResponse.redirect(new URL("/login", req.url));
  if (token && isPublic) return NextResponse.redirect(new URL("/dashboard", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
