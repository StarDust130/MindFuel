import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function to protect routes
export function middleware(req: NextRequest) {
  // Access cookies from the request
  const accessToken = req.cookies.get("accessToken")?.value;

  //! If no token, redirect to the login page
  if (!accessToken) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  //! If token , user is not vist /login page and /register page
    if (req.url === "/login" || req.url === "/register") {
        const profileUrl = new URL("/profile", req.url);
        return NextResponse.redirect(profileUrl);
    }

  // Allow access if the token exists
  return NextResponse.next();
}

// Apply the middleware only to protected routes
export const config = {
  matcher: ["/profile"], // Add other protected routes here
};
