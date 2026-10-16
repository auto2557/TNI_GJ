import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

import prisma from "@/app/lib/prisma";
import { getSessionUserId } from "@/app/lib/auth";

export async function GET(
  _request: Request,
  context: { params: Promise<{ applicantId: string }> }
) {
  const viewerId = await getSessionUserId();

  if (!viewerId) {
    return NextResponse.json(
      { error: "กรุณาเข้าสู่ระบบ" },
      { status: 401 }
    );
  }

  const { applicantId } = await context.params;
  const id = Number(applicantId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return NextResponse.json(
      { error: "ไม่พบรายการ" },
      { status: 404 }
    );
  }

  const applicant = await prisma.applicant.findUnique({
    where: { id },
    select: {
      userId: true,
      paymentProof: true,
    },
  });

  if (!applicant?.paymentProof) {
    return NextResponse.json(
      { error: "ไม่พบไฟล์สลิป" },
      { status: 404 }
    );
  }

  const viewer = await prisma.user.findUnique({
    where: { id: viewerId },
    select: { role: true },
  });

  const isOwner = applicant.userId === viewerId;
  const isAdmin = viewer?.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return NextResponse.json(
      { error: "คุณไม่มีสิทธิ์ดูไฟล์นี้" },
      { status: 403 }
    );
  }

  const filename = applicant.paymentProof;

  // อนุญาตเฉพาะชื่อไฟล์ UUID ที่ระบบสร้าง
  const validFilename =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(png|jpg|webp)$/i;

  if (!validFilename.test(filename)) {
    return NextResponse.json(
      { error: "ชื่อไฟล์ไม่ถูกต้อง" },
      { status: 404 }
    );
  }

  const filePath = path.join(
    process.cwd(),
    "storage",
    "payment-proofs",
    filename
  );

  try {
    const file = await readFile(filePath);
    const extension = path.extname(filename).toLowerCase();

    const contentType =
      extension === ".png"
        ? "image/png"
        : extension === ".webp"
          ? "image/webp"
          : "image/jpeg";

    return new Response(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "ไม่พบไฟล์สลิปในเซิร์ฟเวอร์" },
      { status: 404 }
    );
  }
}