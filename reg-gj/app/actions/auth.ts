
"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

import prisma from "@/app/lib/prisma";
import { createSession, requireUser } from "@/app/lib/auth";

export type ActionState = {
  error?: string;
  success?: string;
};

// ตรวจสอบลายเซ็นไฟล์ภาพจริง ไม่พึ่งนามสกุลไฟล์เพียงอย่างเดียว
function detectSlipImage(buffer: Buffer) {
  const isPng =
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
    );

  const isJpeg =
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff;

  const isWebp =
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP";

  if (isPng) {
    return { extension: "png", mime: "image/png" };
  }

  if (isJpeg) {
    return { extension: "jpg", mime: "image/jpeg" };
  }

  if (isWebp) {
    return { extension: "webp", mime: "image/webp" };
  }

  return null;
}

// ================================
// CREATE ACCOUNT
// ================================
export async function register(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = String(
    formData.get("username") ?? ""
  ).trim();

  const password = String(
    formData.get("password") ?? ""
  );

  if (!/^[a-zA-Z0-9_]{4,30}$/.test(username)) {
    return {
      error:
        "Username ต้องมี 4-30 ตัว ใช้ภาษาอังกฤษ ตัวเลข หรือ _",
    };
  }

  if (
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return {
      error:
        "Password ต้องมีอย่างน้อย 8 ตัวอักษร และไม่เกิน 72 ไบต์",
    };
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      return {
        error: "Username นี้ถูกใช้งานแล้ว",
      };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
        role: "USER",
      },
    });

    await createSession(user.id);
  } catch (error) {
    console.error("Register failed:", error);

    return {
      error: "สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่",
    };
  }

  redirect("/profile-user");
}

// ================================
// LOGIN
// ================================
export async function login(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = String(
    formData.get("username") ?? ""
  ).trim();

  const password = String(
    formData.get("password") ?? ""
  );

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.passwordHash))
    ) {
      return {
        error: "Username หรือ Password ไม่ถูกต้อง",
      };
    }

    await createSession(user.id);
  } catch (error) {
    console.error("Login failed:", error);

    return {
      error: "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่",
    };
  }

  redirect("/profile-user");
}

// ================================
// CREATE / UPDATE PROFILE
// ================================
export async function saveProfile(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const userId = await requireUser();

  const firstName = String(
    formData.get("firstName") ?? ""
  ).trim();

  const lastName = String(
    formData.get("lastName") ?? ""
  ).trim();

  const nickname = String(
    formData.get("nickname") ?? ""
  ).trim();

  const email = String(
    formData.get("email") ?? ""
  ).trim().toLowerCase();

  if (!firstName || !lastName || !nickname || !email) {
    return {
      error: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
    };
  }

  if (
    firstName.length > 100 ||
    lastName.length > 100 ||
    nickname.length > 50 ||
    email.length > 254
  ) {
    return {
      error: "ข้อมูลบางช่องยาวเกินกำหนด",
    };
  }

  // ตรวจสอบรูปแบบอีเมล
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      error: "รูปแบบอีเมลไม่ถูกต้อง",
    };
  }

  try {
    // ตรวจสอบว่าอีเมลถูกใช้โดยผู้สมัครคนอื่นหรือไม่
    const existingEmail = await prisma.applicant.findUnique({
      where: { email },
    });

    if (existingEmail && existingEmail.userId !== userId) {
      return {
        error: "อีเมลนี้ถูกใช้กับบัญชีอื่นแล้ว",
      };
    }

    await prisma.applicant.upsert({
      where: { userId },

      // สร้างข้อมูลผู้สมัครใหม่
      // ใช้ PENDING ตาม Constraint ของฐานข้อมูลปัจจุบัน
      create: {
        userId,
        firstName,
        lastName,
        nickname,
        email,
        paymentStatus: "PENDING",
      },

      // อัปเดตเฉพาะข้อมูลส่วนตัว
      // ไม่เปลี่ยนสถานะชำระเงินของผู้ใช้เดิม
      update: {
        firstName,
        lastName,
        nickname,
        email,
      },
    });

    revalidatePath("/profile-user");
    revalidatePath("/admin/applicants");
  } catch (error) {
    console.error("Save profile failed:", error);

    return {
      error: "บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบ Terminal",
    };
  }

  return {
    success: "บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว",
  };
}

// ================================
// UPDATE PASSWORD
// ================================
export async function updatePassword(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const userId = await requireUser();

  const oldPassword = String(
    formData.get("oldPassword") ?? ""
  );

  const newPassword = String(
    formData.get("newPassword") ?? ""
  );

  if (
    newPassword.length < 8 ||
    Buffer.byteLength(newPassword, "utf8") > 72
  ) {
    return {
      error:
        "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัว และไม่เกิน 72 ไบต์",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (
      !user ||
      !(await bcrypt.compare(oldPassword, user.passwordHash))
    ) {
      return {
        error: "รหัสผ่านเดิมไม่ถูกต้อง",
      };
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  } catch (error) {
    console.error("Update password failed:", error);

    return {
      error: "เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาลองใหม่",
    };
  }

  return {
    success: "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว",
  };
}

// ================================
// SUBMIT BANK TRANSFER SLIP
// ================================
export async function submitPaymentProof(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const userId = await requireUser();

  const uploaded = formData.get("paymentProof");

  if (!(uploaded instanceof File) || uploaded.size === 0) {
    return {
      error: "กรุณาเลือกภาพสลิปโอนเงินจากธนาคาร",
    };
  }

  // จำกัดขนาดไฟล์ 5 MB
  const maxSize = 5 * 1024 * 1024;

  if (uploaded.size > maxSize) {
    return {
      error: "ไฟล์สลิปต้องมีขนาดไม่เกิน 5 MB",
    };
  }

  // รับเฉพาะภาพสามประเภทนี้
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
  ];

  if (!allowedTypes.includes(uploaded.type)) {
    return {
      error: "รับเฉพาะภาพสลิป PNG, JPG หรือ WebP เท่านั้น",
    };
  }

  const buffer = Buffer.from(await uploaded.arrayBuffer());
  const image = detectSlipImage(buffer);

  // ตรวจ MIME และลายเซ็นไฟล์ให้ตรงกัน
  if (!image || image.mime !== uploaded.type) {
    return {
      error: "ไฟล์ภาพไม่ถูกต้องหรือไม่ใช่ประเภทที่รองรับ",
    };
  }

  let savedPath: string | null = null;

  try {
    const applicant = await prisma.applicant.findUnique({
      where: { userId },
    });

    if (!applicant) {
      return {
        error: "กรุณากรอกและบันทึกข้อมูลส่วนตัวก่อนส่งสลิป",
      };
    }

    if (
      !applicant.firstName.trim() ||
      !applicant.lastName.trim() ||
      !applicant.nickname.trim() ||
      !applicant.email.trim()
    ) {
      return {
        error: "กรุณากรอกข้อมูลส่วนตัวให้ครบก่อนส่งสลิป",
      };
    }

    if (applicant.paymentStatus === "APPROVED") {
      return {
        error: "รายการนี้ได้รับการยืนยันชำระเงินแล้ว",
      };
    }

    if (
      applicant.paymentStatus === "PENDING" &&
      applicant.paymentProof
    ) {
      return {
        error: "ระบบได้รับสลิปแล้ว กรุณารอ Admin ตรวจสอบ",
      };
    }

    // เก็บไฟล์ในพื้นที่ส่วนตัว ไม่เก็บไว้ใน public
    const directory = path.join(
      process.cwd(),
      "storage",
      "payment-proofs"
    );

    await mkdir(directory, { recursive: true });

    const filename = `${randomUUID()}.${image.extension}`;

    savedPath = path.join(directory, filename);

    await writeFile(savedPath, buffer, {
      flag: "wx",
    });

    // บันทึกชื่อไฟล์และสถานะลงฐานข้อมูล
    await prisma.applicant.update({
      where: { userId },
      data: {
        paymentProof: filename,
        paymentStatus: "PENDING",
      },
    });

    // ลบสลิปเก่าหลังบันทึกใหม่สำเร็จ
    // อนุญาตเฉพาะชื่อไฟล์รูปแบบที่ระบบสร้าง
    const oldFilename = applicant.paymentProof;

    if (
      oldFilename &&
      /^[0-9a-f-]+\.(png|jpg|webp)$/i.test(oldFilename)
    ) {
      await unlink(
        path.join(directory, oldFilename)
      ).catch(() => {});
    }

    // บันทึกสำเร็จแล้ว ไม่ให้ catch ลบไฟล์ใหม่
    savedPath = null;

    revalidatePath("/profile-user");
    revalidatePath("/admin/applicants");
  } catch (error) {
    // ลบไฟล์ใหม่หากการบันทึกฐานข้อมูลล้มเหลว
    if (savedPath) {
      await unlink(savedPath).catch(() => {});
    }

    console.error("Submit payment proof failed:", error);

    return {
      error: "ส่งสลิปไม่สำเร็จ กรุณาตรวจสอบ Terminal",
    };
  }

  return {
    success: "ส่งสลิปเรียบร้อยแล้ว กรุณารอ Admin ตรวจสอบ",
  };
}

// ================================
// LOGOUT
// ================================
export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("session");

  redirect("/login");
}
