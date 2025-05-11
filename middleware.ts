import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { signToken, verifyToken } from "@/lib/auth/session";
import { WALLET_HEADER } from "@/lib/constants/blockchain";
import { SESSION_COOKIE } from "@/lib/constants/auth";
import { toH160Hex } from "@/lib/contract-utils";

/* -------------------------------------------------------------------------- */
/*                            P R O T E C T E D  P A T H S                    */
/* -------------------------------------------------------------------------- */

/** Every prefix inside this array requires a valid session cookie. */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/candidate",
  "/recruiter",
  "/issuer",
  "/admin",
  "/settings",
  "/invitations",
  "/pricing",
  "/api/credentials/verify",
] as const;

/** Path-prefix → role mapping used for coarse-grain role guards. */
const ROLE_PREFIX_MAP: Record<string, string> = {
  candidate: "candidate",
  recruiter: "recruiter",
  issuer: "issuer",
  admin: "admin",
};

/* -------------------------------------------------------------------------- */
/*                                 M I D D L E W A R E                        */
/* -------------------------------------------------------------------------- */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Ignore framework assets */
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  /* ----------------------------- Auth check ----------------------------- */
  const sessionCookie = request.cookies.get(SESSION_COOKIE);
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  /* Allow pre-session requests that forward a valid wallet header */
  if (!sessionCookie) {
    const walletHeader = request.headers.get(WALLET_HEADER);

    let hasValidWalletHeader = false;
    if (walletHeader) {
      try {
        toH160Hex(walletHeader);
        hasValidWalletHeader = true;
      } catch {
        /* invalid header – ignore */
      }
    }

    if (hasValidWalletHeader) {
      return NextResponse.next();
    }

    if (isProtected) {
      return NextResponse.redirect(new URL("/connect-wallet", request.url));
    }
    return NextResponse.next();
  }

  /* ----------------------- Validate + refresh JWT ----------------------- */
  let parsed: any;
  try {
    parsed = await verifyToken(sessionCookie.value);
  } catch {
    const res = NextResponse.redirect(new URL("/connect-wallet", request.url));
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }

  const res = NextResponse.next();

  /* Sliding-window refresh on GET requests */
  if (request.method === "GET") {
    const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
    res.cookies.set({
      name: SESSION_COOKIE,
      value: await signToken({ ...parsed, expires: expiresInOneDay.toISOString() }),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: expiresInOneDay,
    });
  }

  /* ------------------------ Role-based gate ----------------------------- */
  const firstSeg = pathname.split("/")[1];
  const requiredRole = ROLE_PREFIX_MAP[firstSeg];

  if (requiredRole && parsed?.role && parsed.role !== requiredRole) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return res;
}

/* -------------------------------------------------------------------------- */
/*                               M A T C H E R                                */
/* -------------------------------------------------------------------------- */

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};