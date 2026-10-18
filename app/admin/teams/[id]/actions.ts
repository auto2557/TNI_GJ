"use server";

import prisma from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateTeamMemberRole(teamMemberId: number, newRole: string) {
  await requireUser();

  if (!Number.isInteger(teamMemberId) || teamMemberId <= 0) {
    throw new Error("Invalid team member ID");
  }

  if (!newRole || newRole.trim() === "") {
    throw new Error("Role cannot be empty");
  }

  await prisma.teammember.update({
    where: { id: teamMemberId },
    data: { role: newRole },
  });

  revalidatePath("/admin/teams");
}

export async function removeTeamMember(teamMemberId: number) {
  await requireUser();

  if (!Number.isInteger(teamMemberId) || teamMemberId <= 0) {
    throw new Error("Invalid team member ID");
  }

  await prisma.teammember.delete({
    where: { id: teamMemberId },
  });

  revalidatePath("/admin/teams");
}