"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateApplicantStatus(
  formData: FormData
) {
  const id = Number(formData.get("id"));
  const status = formData.get("status");

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid applicant ID");
  }

  if (
    status !== "Approved" &&
    status !== "Rejected"
  ) {
    throw new Error("Invalid applicant status");
  }

  await prisma.applicant.update({
    where: { id },
    data: {
      status,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteApplicant(id: number) {

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid applicant ID");
  }

  const applicant = await prisma.applicant.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!applicant) {
    throw new Error("Applicant not found");
  }

  await prisma.applicant.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/applicants");
}

