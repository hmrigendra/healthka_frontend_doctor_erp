import { NextResponse, NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/LoginPage" ||
    path === "/Signup" ||
    path === "/Auth" ||
    path === "/ClinicProfile" ||
    path === "/";

  const token = request.cookies.get("JWT")?.value || "";
  console.log("====================================");
  console.log(token);
  console.log("====================================");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/Dashboard", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/LoginPage", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Dashboard",
    "/MenuCard2",
    "/MenuCard",
    "/PatientProfile",
    "/InvoiceAgain",
    "/Bill",
    "/DoctorsProfile",
    "/Services",
    "/LoginPage",
    "/Signup",
    "/Auth",
    "/ClinicProfile",
    "/",
  ],
};
