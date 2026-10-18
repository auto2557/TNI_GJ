
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  updateApplicantStatus,
  deleteApplicant
} from "../components/ApplicantStatus";

type Props = {
  id: number;
  status: string;
};

export default function ApplicantStatusButtons({
  id,
  status,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(
    newStatus: "Approved" | "Rejected"
  ) {
    const result = await Swal.fire({
      title:
        newStatus === "Approved"
          ? "Approve applicant?"
          : "Reject applicant?",
      text:
        newStatus === "Approved"
          ? "This applicant will be approved."
          : "This applicant will be rejected.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor:
        newStatus === "Approved" ? "#00ed8a" : "#ff1744",
      background: "#10131f",
      color: "#ffffff",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("id", String(id));
      formData.set("status", newStatus);

      await updateApplicantStatus(formData);

      await Swal.fire({
        title: "Success!",
        text: `Applicant status: ${newStatus}`,
        icon: "success",
        background: "#10131f",
        color: "#ffffff",
        confirmButtonColor: "#00ed8a",
      });

      router.refresh();
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Unable to update applicant status.",
        icon: "error",
        background: "#10131f",
        color: "#ffffff",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Delete applicant?",
      text: "This will permanently delete this applicant.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff1744",
      background: "#10131f",
      color: "#ffffff",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      await deleteApplicant(id);

      await Swal.fire({
        title: "Deleted!",
        text: "Applicant has been deleted.",
        icon: "success",
        background: "#10131f",
        color: "#ffffff",
        confirmButtonColor: "#ff1744",
      });

      router.refresh();
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Unable to delete applicant.",
        icon: "error",
        background: "#10131f",
        color: "#ffffff",
      });
    } finally {
      setLoading(false);
    }
  }

  if (status === "Approved") {
    return (
      <button
        type="button"
        className="action-neon-btn join-team-btn"
        onClick={() => router.push(`/admin/join-team/${id}`)}
      >
        JOIN TEAM
      </button>
    );
  }

  if (status === "Rejected") {
    return (
      <button
        type="button"
        className="action-neon-btn delete-btn"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "DELETING..." : "DELETE"}
      </button>
    );
  }

  if (status === "Pending") {
    return (
      <div className="applicant-status-actions">
        <button
          type="button"
          className="action-neon-btn apporved-btn"
          onClick={() => handleStatusChange("Approved")}
          disabled={loading}
        >
          APPROVE
        </button>

        <button
          type="button"
          className="action-neon-btn delete-btn"
          onClick={() => handleStatusChange("Rejected")}
          disabled={loading}
        >
          REJECT
        </button>
      </div>
    );
  }

  return <span className="muted-text">No action</span>;
}
