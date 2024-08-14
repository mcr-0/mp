import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const ip =
    req.ip ||
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip");
  console.log("User IP:", ip);

  // Możesz przekazać adres IP jako nagłówek do kolejnych requestów
  const response = NextResponse.next();
  response.headers.set("x-user-ip", ip || "");

  return response;
}

export const config = {
  matcher: "/:path*", // Działa na wszystkich stronach
};
