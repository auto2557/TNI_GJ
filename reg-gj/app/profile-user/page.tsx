import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { logout } from "@/app/actions/auth";

import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import PaymentForm from "./PaymentForm";

export default async function ProfileUserPage() {
  const userId = await requireUser();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { applicant: true },
  });

  if (!user) {
    redirect("/login");
  }

  const applicant = user.applicant;
  const hasProof = Boolean(applicant?.paymentProof);

  let paymentLabel = "ยังไม่กรอกข้อมูลส่วนตัว";
  let paymentClass = "text-bg-secondary";
  let paymentDescription =
    "กรอกข้อมูลส่วนตัวและบันทึกก่อนเริ่มชำระค่าสมัคร";

  if (applicant) {
    if (applicant.paymentStatus === "APPROVED") {
      paymentLabel = "ชำระเงินแล้ว";
      paymentClass = "text-bg-success";
      paymentDescription = "Admin ยืนยันการชำระเงินเรียบร้อยแล้ว";
    } else if (applicant.paymentStatus === "REJECTED") {
      paymentLabel = "สลิปไม่ผ่าน";
      paymentClass = "text-bg-danger";
      paymentDescription =
        "กรุณาตรวจสอบเหตุผลที่ Admin แจ้งก่อนส่งสลิปใหม่";
    } else if (applicant.paymentStatus === "PENDING" && hasProof) {
      paymentLabel = "รอตรวจสอบ";
      paymentClass = "text-bg-warning";
      paymentDescription =
        "ระบบได้รับสลิปแล้ว กำลังรอ Admin ตรวจสอบ";
    } else {
      paymentLabel = "รอชำระเงิน";
      paymentClass = "text-bg-info";
      paymentDescription =
        "โอนเงินตามรายละเอียดจากผู้จัดงาน แล้วแนบสลิปเพื่อรอตรวจสอบ";
    }
  }

  const canUploadSlip =
    Boolean(applicant) &&
    applicant?.paymentStatus !== "APPROVED" &&
    !(applicant?.paymentStatus === "PENDING" && hasProof);

  const displayName =
    applicant?.firstName?.trim() || user.username;

  return (
    <main className="min-vh-100 bg-black text-light py-4 py-lg-5">
      <div className="container" style={{ maxWidth: 1100 }}>
        {/* Dashboard header */}
        <header className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 mb-lg-5">
          <div>
            <div className="small text-info fw-bold mb-2">
              GLOBAL GAME JAM 2026
            </div>
            <h1 className="h3 fw-bold mb-1">USER DASHBOARD</h1>
            <p className="text-secondary small mb-0">
              จัดการบัญชีและข้อมูลการสมัครของคุณ
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="btn btn-outline-info rounded-0 px-4"
            >
              ออกจากระบบ ↗
            </button>
          </form>
        </header>

        {/* User identity card */}
        <section className="card bg-dark text-light border border-secondary rounded-0 mb-4">
          <div className="card-body p-4 p-lg-5">
            <div className="row align-items-center g-4">
              <div className="col-auto">
                <div
                  className="rounded-circle border border-info d-flex align-items-center justify-content-center text-info"
                  style={{
                    width: 88,
                    height: 88,
                    background: "#050b0e",
                    boxShadow: "0 0 25px rgba(0,217,255,.12)",
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    role="img"
                    aria-label="User icon"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
                    <path d="M9 12.5l3 2 3-2" />
                  </svg>
                </div>
              </div>

              <div className="col">
                <div className="small text-info fw-bold mb-2">
                  WELCOME BACK
                </div>
                <h2 className="h3 fw-bold mb-2">{displayName}</h2>
                <p className="text-secondary mb-2">@{user.username}</p>
                <span className="badge border border-info text-info bg-black rounded-0 px-3 py-2">
                  MEMBER
                </span>
              </div>

              <div className="col-12 col-lg-auto">
                <div className="border border-secondary p-3">
                  <div className="text-secondary small mb-2">
                    PAYMENT STATUS
                  </div>
                  <span className={`badge ${paymentClass} rounded-0 px-3 py-2`}>
                    {paymentLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="row g-4">
          {/* Personal information */}
          <div className="col-lg-7">
            <section className="card bg-dark text-light border border-secondary rounded-0 h-100">
              <div className="card-header bg-transparent border-secondary p-4">
                <div className="text-info small fw-bold mb-2">
                  PERSONAL INFORMATION
                </div>
                <h2 className="h4 fw-bold mb-1">ข้อมูลผู้สมัคร</h2>
                <p className="text-secondary small mb-0">
                  กรอกหรือแก้ไขข้อมูลส่วนตัวของคุณ
                </p>
              </div>

              <div className="card-body p-4">
                <ProfileForm
                  initialData={{
                    firstName: applicant?.firstName ?? "",
                    lastName: applicant?.lastName ?? "",
                    nickname: applicant?.nickname ?? "",
                    email: applicant?.email ?? "",
                  }}
                />
              </div>
            </section>
          </div>

          {/* Payment section */}
          <div className="col-lg-5">
            <section className="card bg-dark text-light border border-info rounded-0 mb-4">
              <div className="card-header bg-transparent border-secondary p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center border border-info text-info"
                    style={{ width: 48, height: 48 }}
                  >
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="1" />
                      <path d="M2 10h20M6 15h4" />
                    </svg>
                  </div>

                  <div>
                    <div className="text-info small fw-bold mb-1">
                      REGISTRATION PAYMENT
                    </div>
                    <h2 className="h5 fw-bold mb-0">ชำระค่าสมัคร</h2>
                  </div>
                </div>
              </div>

              <div className="card-body p-4">
                <div className="mb-3">
                  <span className={`badge ${paymentClass} rounded-0 px-3 py-2`}>
                    {paymentLabel}
                  </span>
                </div>

                <p className="text-secondary small lh-lg">
                  {paymentDescription}
                </p>

                <div className="alert bg-black border border-secondary text-light rounded-0 small">
                  <div className="text-info fw-bold mb-2">
                    วิธีชำระเงิน
                  </div>
                  1. โอนเงินผ่านบัญชีธนาคารตามรายละเอียดที่ผู้จัดงานประกาศ
                  <br />
                  2. บันทึกภาพสลิปโอนเงินจากธนาคาร
                  <br />
                  3. เลือกภาพสลิปและส่งให้ Admin ตรวจสอบ
                </div>

                {applicant && hasProof && (
                  <a
                    href={`/api/payment-proof/${applicant.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-info rounded-0 w-100 mb-3"
                  >
                    เปิดสลิปที่ส่งแล้ว ↗
                  </a>
                )}

                {canUploadSlip && <PaymentForm />}

                {!applicant && (
                  <div className="alert alert-secondary rounded-0 small mb-0">
                    กรุณากรอกและบันทึกข้อมูลส่วนตัวก่อนส่งสลิป
                  </div>
                )}

                {applicant?.paymentStatus === "PENDING" && hasProof && (
                  <div className="alert bg-black border border-warning text-warning rounded-0 small mt-3 mb-0">
                    ได้รับสลิปเรียบร้อยแล้ว กรุณารอ Admin ตรวจสอบ
                  </div>
                )}

                {applicant?.paymentStatus === "APPROVED" && (
                  <div className="alert bg-black border border-success text-success rounded-0 small mt-3 mb-0">
                    ยืนยันการชำระเงินเรียบร้อยแล้ว
                  </div>
                )}
              </div>
            </section>

            {/* Account security */}
            <section className="card bg-dark text-light border border-secondary rounded-0">
              <div className="card-body p-4">
                <div className="text-info small fw-bold mb-2">
                  ACCOUNT SECURITY
                </div>
                <h2 className="h5 fw-bold mb-3">เปลี่ยนรหัสผ่าน</h2>
                <PasswordForm />
              </div>
            </section>
          </div>
        </div>

        <footer className="text-center text-secondary small mt-5 pt-4 border-top border-secondary">
          GLOBAL GAME JAM 2026 · TNI GAMEJAM
        </footer>
      </div>
    </main>
  );
}