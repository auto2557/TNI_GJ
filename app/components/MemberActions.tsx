"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { updateTeamMemberRole, removeTeamMember } from "../admin/teams/[id]/actions";

interface MemberActionsProps {
  memberId: number;
  currentRole: string;
  memberName: string;
}

export default function MemberActions({ memberId, currentRole, memberName }: MemberActionsProps) {
  const [loading, setLoading] = useState(false);


  async function handleEditRole() {
    const { value: newRole } = await Swal.fire({
      title: `Update Role for ${memberName}`,
      input: "select",
      inputOptions: {
        Programming: "Programming",
        Art: "Art",
        Music: "Music",
        Design: "Design",
        Writing: "Writing",
      },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonColor: "#00ed8a",
      cancelButtonColor: "#334155",
      confirmButtonText: "Save",
      background: "#101518",
      color: "#ffffff",
      customClass: {
        input: "bg-dark text-light border-secondary shadow-none",
      },
    });

    if (newRole) {
      setLoading(true);
      try {
        await updateTeamMemberRole(memberId, newRole);
        Swal.fire({
          title: "Success!",
          text: "Role updated successfully.",
          icon: "success",
          confirmButtonColor: "#00ed8a",
          background: "#101518",
          color: "#ffffff",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to update role";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#ff008c",
          background: "#101518",
          color: "#ffffff",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  // ฟังก์ชันกดปุ่มลบสมาชิกออกจากทีม
  async function handleDeleteMember() {
    const result = await Swal.fire({
      title: "Remove Member?",
      text: `Are you sure you want to remove ${memberName} from this team?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff008c",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, remove",
      background: "#101518",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await removeTeamMember(memberId);
        Swal.fire({
          title: "Removed!",
          text: "Member has been removed from the team.",
          icon: "success",
          confirmButtonColor: "#00ed8a",
          background: "#101518",
          color: "#ffffff",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to remove member";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#ff008c",
          background: "#101518",
          color: "#ffffff",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="d-flex gap-2">
      <button
        onClick={handleEditRole}
        disabled={loading}
        className="btn btn-sm btn-outline-info"
        style={{ padding: "0.2rem 0.5rem", fontSize: "0.8rem" }}
      >
        Edit Role
      </button>

      <button
        onClick={handleDeleteMember}
        disabled={loading}
        className="btn btn-sm btn-outline-danger"
        style={{ padding: "0.2rem 0.5rem", fontSize: "0.8rem" }}
      >
        Remove
      </button>
    </div>
  );
}