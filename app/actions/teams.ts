
"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const allowedRoles = [
  "Programming",
  "Art",
  "Music",
  "Design",
  "Writing",
] as const;

export async function joinTeam(formData: FormData) {
  const applicantId = Number(formData.get("applicantId"));
  const teamId = Number(formData.get("teamId"));
  const role = String(formData.get("role") ?? "");

  if (
    !Number.isInteger(applicantId) ||
    applicantId <= 0 ||
    !Number.isInteger(teamId) ||
    teamId <= 0
  ) {
    throw new Error("Invalid applicant or team ID");
  }

  if (!allowedRoles.includes(role as (typeof allowedRoles)[number])) {
    throw new Error("Invalid role");
  }

  const applicant = await prisma.applicant.findUnique({
    where: { id: applicantId },
    select: {
      id: true,
      status: true,
      teammember: {
        select: { id: true, teamId: true },
      },
    },
  });

  if (!applicant || applicant.status !== "Approved") {
    throw new Error("Only approved applicants can join a team");
  }

  if (applicant.teammember) {
    throw new Error("This applicant has already joined a team");
  }

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: { id: true },
  });

  if (!team) {
    throw new Error("Team not found");
  }

  await prisma.teammember.create({
    data: {
      applicantId,
      teamId,
      role,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/teams");
  revalidatePath(`/admin/teams/${teamId}`);

  redirect(`/admin/teams/${teamId}`);
}
