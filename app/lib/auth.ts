import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secret = process.env.SESSION_SECRET;

if (!secret || secret.length < 32) {
  throw new Error(
    "กรุณากำหนด SESSION_SECRET อย่างน้อย 32 ตัวอักษรใน .env"
  );
}

const key = new TextEncoder().encode(secret);

export async function createSession(userId: number) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSessionUserId(): Promise<number | null> {
  const token = (await cookies()).get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, key);

    if (typeof payload.userId !== "number") {
      return null;
    }

    return payload.userId;
  } catch {
    return null;
  }
}

export async function requireUser(): Promise<number> {
  const userId = await getSessionUserId();

  if (!userId) {
    redirect("/login");
  }

  return userId;
}