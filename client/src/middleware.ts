import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const pathname = req.nextUrl.pathname;

  // 1. User is not authenticated, redirect to login unless they are already on login or sign-up
  if (!refreshToken && pathname !== "/login" && pathname !== "/sign-up") {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. User is authenticated, prevent access to login or sign-up
  if (refreshToken && (pathname === "/login" || pathname === "/sign-up")) {
    const profileUrl = new URL("/profile", req.url);
    return NextResponse.redirect(profileUrl);
  }

  // Allow access to the route
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login", "/sign-up"], // List of routes the middleware applies to
};
