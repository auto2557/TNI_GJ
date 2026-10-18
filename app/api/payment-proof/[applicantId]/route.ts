import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";

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

  const rawProof = applicant.paymentProof;
  const filename = path.basename(rawProof);
  const possibleDirectories = [
    path.join(process.cwd(), "public", "uploads"),
    path.join(process.cwd(), "storage", "payment-proofs"), 
  ];

  let targetFilePath: string | null = null;


  for (const dir of possibleDirectories) {
    const fullPath = path.join(dir, filename);
    if (fs.existsSync(fullPath)) {
      targetFilePath = fullPath;
      break;
    }
  }

  if (!targetFilePath) {
    return NextResponse.json(
      { error: "ไม่พบไฟล์สลิปในเซิร์ฟเวอร์" },
      { status: 404 }
    );
  }

  try {
    const file = await readFile(targetFilePath);
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
  } catch (error) {
    console.error("Read file error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอ่านไฟล์" },
      { status: 500 }
    );
  }
}