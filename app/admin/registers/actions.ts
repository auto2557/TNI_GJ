
"use server";

import prisma from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function updateApplicant(formData: FormData) {
  const userId = await requireUser();

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const nickname = String(formData.get("nickname") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const uploadedFile = formData.get("paymentProof");

  if (!firstName || !lastName || !email) {
    throw new Error("กรุณากรอกชื่อ นามสกุล และอีเมล");
  }

  const existingApplicant = await prisma.applicant.findUnique({
    where: { userId },
    select: { paymentProof: true },
  });

  let paymentProof = existingApplicant?.paymentProof ?? null;
  let newFilePath: string | null = null;

  if (uploadedFile instanceof File && uploadedFile.size > 0) {
    const extension = ALLOWED_TYPES[uploadedFile.type];

    if (!extension) {
      throw new Error("รองรับเฉพาะไฟล์ JPG, PNG และ WebP");
    }

    if (uploadedFile.size > MAX_FILE_SIZE) {
      throw new Error("ขนาดไฟล์ต้องไม่เกิน 5 MB");
    }

    const bytes = await uploadedFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filename = `${randomUUID()}${extension}`;
    const absolutePath = path.join(uploadDir, filename);
    newFilePath = absolutePath;

    await writeFile(absolutePath, buffer);

    paymentProof = `/uploads/${filename}`;
  }

  try {
    await prisma.applicant.upsert({
      where: { userId },
      create: {
        firstName,
        lastName,
        nickname: nickname || null,
        email,
        paymentProof,
        status: "Pending",
        userId,
      },
      update: {
        firstName,
        lastName,
        nickname: nickname || null,
        email,
        paymentProof,
      },
    });
  } catch (error) {
    if (newFilePath) {
      await unlink(newFilePath).catch(() => {});
    }

    throw error;
  }

  revalidatePath("/admin");
  return { success: true };
}
