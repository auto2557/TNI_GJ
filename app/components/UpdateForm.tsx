"use client";

import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

interface UpdateFormProps {
  applicant: {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string | null;
    email: string;
    paymentProof: string | null;
    status: string;
  } | null;
  updateAction: (formData: FormData) => Promise<{ success?: boolean } | void>; 
}

export default function UpdateForm({ applicant, updateAction }: UpdateFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await Swal.fire({
      title: "Confirm data saving?",
      text: "You want to Update Infomation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00ed8a",
      cancelButtonColor: "#334155",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      background: "#101518",
      color: "#ffffff",
    });

if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await updateAction(formData);

        await Swal.fire({
          title: "Complete!",
          text: "Update Complete!",
          icon: "success",
          confirmButtonColor: "#00ed8a",
          background: "#101518",
          color: "#ffffff",
        });

        window.location.href = "/admin";

      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "ไม่สามารถบันทึกข้อมูลได้";

        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#ff008c",
          background: "#101518",
          color: "#ffffff",
        });
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="firstName" className="form-label">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-control"
            placeholder="Enter first name"
            defaultValue={applicant?.firstName ?? ""}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="form-control"
            placeholder="Enter last name"
            defaultValue={applicant?.lastName ?? ""}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="nickname" className="form-label">
            Nickname
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            className="form-control"
            placeholder="Enter nickname"
            defaultValue={applicant?.nickname ?? ""}
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="example@email.com"
            defaultValue={applicant?.email ?? ""}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="paymentProof" className="form-label">
            Payment Proof Image
          </label>

          <input
            id="paymentProof"
            name="paymentProof"
            type="file"
            className="form-control"
            accept="image/png, image/jpeg, image/webp"
          />

          <small className="form-text">
            Optional. Upload a payment proof image (PNG, JPG, or WebP).
          </small>

          {applicant?.paymentProof && (
            <div className="mt-3">
              <p>Current Payment Proof:</p>
              <a
                href={`/api/payment-proof/${applicant.id}`}
                target="_blank"
                rel="noopener noreferrer"
                title="View full payment proof"
              >
                <img
                  src={`/api/payment-proof/${applicant.id}`}
                  alt="Current payment proof"
                  style={{
                    maxWidth: "250px",
                    maxHeight: "250px",
                    objectFit: "contain",
                    border: "1px solid #30383e",
                    borderRadius: "8px",
                  }}
                />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mt-4">
        <button
          type="submit"
          className="btn"
          disabled={loading}
          style={{
            backgroundColor: "#00ed8a",
            borderColor: "#00ed8a",
            color: "#000000",
            fontWeight: "600",
            boxShadow: "0 0 10px rgba(0, 237, 138, 0.5)",
          }}
        >
          {loading
            ? "Saving..."
            : applicant
            ? "Update Applicant Info"
            : "+ Register Applicant"}
        </button>

        <Link
          href="/admin"
          className="btn"
          style={{
            backgroundColor: "#f1f5f9",
            borderColor: "#cbd5e1",
            color: "#0f172a",
            fontWeight: "600",
            boxShadow:
              "0 0 12px rgba(255, 255, 255, 0.7), inset 0 0 4px rgba(255, 255, 255, 0.5)",
          }}
        >
          Cancel
        </Link>
      </div>

      <p className="dashboard-note mt-3">
        Status:{" "}
        <strong className="text-info">{applicant?.status ?? "Pending"}</strong>
      </p>
    </form>
  );
}