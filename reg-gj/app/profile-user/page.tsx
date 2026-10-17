
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { logout } from "@/app/actions/auth";

import ProfileForm from "./ProfileForm";
import PaymentForm from "./PaymentForm";

export default async function ProfileUserPage() {
  const userId = await requireUser();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { applicant: true },
  });

  if (!user) redirect("/login");

  const applicant = user.applicant;
  const hasProof = Boolean(applicant?.paymentProof);

  const isApproved = applicant?.paymentStatus === "APPROVED";
  const isRejected = applicant?.paymentStatus === "REJECTED";
  const isPending =
    applicant?.paymentStatus === "PENDING" && hasProof;

  const profileComplete = Boolean(
    applicant?.firstName?.trim() &&
    applicant?.lastName?.trim() &&
    applicant?.nickname?.trim() &&
    applicant?.email?.trim()
  );

  let paymentLabel = "รอกรอกข้อมูล";
  let paymentDescription = "กรอกข้อมูลส่วนตัวก่อนส่งสลิป";
  let paymentClass = "text-bg-secondary";

  if (isApproved) {
    paymentLabel = "ชำระเงินแล้ว";
    paymentDescription = "ยืนยันการชำระเงินเรียบร้อยแล้ว";
    paymentClass = "text-bg-success";
  } else if (isRejected) {
    paymentLabel = "ต้องส่งสลิปใหม่";
    paymentDescription = "หลักฐานไม่ผ่าน กรุณาตรวจสอบและส่งใหม่";
    paymentClass = "text-bg-danger";
  } else if (isPending) {
    paymentLabel = "รอตรวจสอบ";
    paymentDescription = "ได้รับสลิปแล้ว กรุณารอเจ้าหน้าที่ตรวจสอบ";
    paymentClass = "text-bg-warning";
  } else if (applicant) {
    paymentLabel = "รอชำระเงิน";
    paymentDescription = "โอนเงินตามประกาศของผู้จัดงาน แล้วแนบสลิป";
    paymentClass = "text-bg-info";
  }

  const canUploadSlip =
    profileComplete &&
    !isApproved &&
    !(isPending && hasProof);

  const displayName =
    applicant?.firstName?.trim() || user.username;

  const currentStep = !profileComplete
    ? 1
    : isApproved
      ? 4
      : isRejected || !hasProof
        ? 2
        : 3;

  const steps = [
    {
      number: "01",
      title: "ข้อมูลผู้สมัคร",
      description: "กรอกข้อมูลส่วนตัว",
      done: profileComplete,
      active: currentStep === 1,
    },
    {
      number: "02",
      title: "ชำระค่าสมัคร",
      description: "โอนเงินและส่งสลิป",
      done: hasProof && !isRejected,
      active: currentStep === 2,
    },
    {
      number: "03",
      title: "ยืนยันการสมัคร",
      description: "รอเจ้าหน้าที่ตรวจสอบ",
      done: isApproved,
      active: currentStep === 3,
    },
  ];

  const completedSteps = steps.filter((step) => step.done).length;

  return (
    <main
      className="text-light py-3 py-md-4"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at top left, rgba(0,217,255,.07), transparent 38%), #050708",
      }}
    >
      <div className="container px-3 px-md-4" style={{ maxWidth: 1120 }}>

        {/* PAGE HEADER */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                className="rounded-circle bg-info"
                style={{ width: 7, height: 7 }}
              />
              <span className="text-info small fw-bold">
                TNI GAMEJAM 2026
              </span>
            </div>

            <h1 className="h3 fw-bold mb-1">
              Dashboard
            </h1>

            <p className="text-secondary small mb-0">
              จัดการข้อมูลและติดตามสถานะการสมัคร
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="btn btn-outline-info rounded-3 px-3 py-2"
            >
              ออกจากระบบ ↗
            </button>
          </form>
        </div>

        {/* APPLICATION STEPS */}
        <div className="mb-4">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
            <div>
              <h2 className="h5 fw-bold mb-1">
                ขั้นตอนการสมัคร
              </h2>
              <p className="text-secondary small mb-0">
                ทำตามขั้นตอนเพื่อให้การสมัครสมบูรณ์
              </p>
            </div>

            <span className="badge bg-dark border border-secondary text-secondary rounded-pill px-3 py-2">
              {completedSteps}/3 เสร็จแล้ว
            </span>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-3">
            {steps.map((step) => (
              <div className="col" key={step.number}>
                <div
                  className="card h-100 rounded-4"
                  style={{
                    background: step.done
                      ? "rgba(25,135,84,.12)"
                      : step.active
                        ? "rgba(0,217,255,.07)"
                        : "#101518",
                    borderColor: step.done
                      ? "rgba(25,135,84,.65)"
                      : step.active
                        ? "rgba(0,217,255,.65)"
                        : "#30383e",
                  }}
                >
                  <div className="card-body p-3 d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                      style={{
                        width: 42,
                        height: 42,
                        background: step.done
                          ? "#198754"
                          : step.active
                            ? "#00d9ff"
                            : "#20282e",
                        color: step.done
                          ? "#fff"
                          : step.active
                            ? "#001014"
                            : "#aab4bb",
                      }}
                    >
                      {step.done ? "✓" : step.number}
                    </div>

                    <div className="flex-grow-1">
                      <div
                        className={`fw-bold mb-1 ${
                          step.active ? "text-info" : "text-light"
                        }`}
                      >
                        {step.title}
                      </div>

                      <div className="text-secondary small">
                        {step.description}
                      </div>

                      <div
                        className="small mt-2"
                        style={{
                          color: step.done
                            ? "#75d9a5"
                            : step.active
                              ? "#00d9ff"
                              : "#7c878f",
                        }}
                      >
                        {step.done
                          ? "ดำเนินการแล้ว"
                          : step.active
                            ? "ขั้นตอนปัจจุบัน"
                            : "รอดำเนินการ"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* USER CARD */}
        <div
          className="card text-light rounded-4 mb-4"
          style={{
            background: "linear-gradient(110deg, #101c22, #0b0e11)",
            border: "1px solid rgba(0,217,255,.3)",
          }}
        >
          <div className="card-body p-3 p-md-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-info flex-shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  background: "#071116",
                  border: "1px solid #00d9ff",
                  boxShadow: "0 0 20px rgba(0,217,255,.1)",
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  role="img"
                  aria-label="User icon"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
                </svg>
              </div>

              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <div className="small text-info mb-1">
                  ยินดีต้อนรับ
                </div>

                <h2 className="h5 fw-bold text-break mb-1">
                  {displayName}
                </h2>

                <div className="text-secondary small text-break">
                  @{user.username}
                </div>
              </div>

              <div className="text-end flex-shrink-0">
                <div className="small text-secondary mb-2 d-none d-sm-block">
                  สถานะชำระเงิน
                </div>
                <span className={`badge ${paymentClass} rounded-pill px-3 py-2`}>
                  {paymentLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT: DIVS USED TO AVOID GLOBAL SECTION CSS */}
        <div className="row g-4">

          {/* PERSONAL INFORMATION */}
          <div className="col-12 col-lg-7">
            <div
              className="card h-100 text-light rounded-4"
              style={{
                background: "#101518",
                border: "1px solid #30383e",
              }}
            >
              <div className="card-header bg-transparent border-secondary p-3 p-md-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 text-info flex-shrink-0"
                    style={{
                      width: 42,
                      height: 42,
                      background: "rgba(0,217,255,.09)",
                    }}
                  >
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4Z" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="h5 fw-bold mb-1">
                      ข้อมูลผู้สมัคร
                    </h2>
                    <p className="text-secondary small mb-0">
                      กรอกข้อมูลให้ครบถ้วนก่อนชำระค่าสมัคร
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-body p-3 p-md-4">
                <ProfileForm
                  initialData={{
                    firstName: applicant?.firstName ?? "",
                    lastName: applicant?.lastName ?? "",
                    nickname: applicant?.nickname ?? "",
                    email: applicant?.email ?? "",
                  }}
                />
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="col-12 col-lg-5">
            <div
              className="card text-light rounded-4"
              style={{
                background: "#101518",
                border: "1px solid rgba(0,217,255,.4)",
              }}
            >
              <div className="card-body p-3 p-md-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center text-info flex-shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      background: "rgba(0,217,255,.09)",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20M6 15h4" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="h5 fw-bold mb-1">
                      ชำระค่าสมัคร
                    </h2>
                    <div className="small text-secondary">
                      Registration payment
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-3 p-3 mb-3"
                  style={{
                    background: "#080d10",
                    border: "1px solid #30383e",
                  }}
                >
                  <div className="small text-secondary mb-2">
                    สถานะปัจจุบัน
                  </div>

                  <span className={`badge ${paymentClass} rounded-pill px-3 py-2`}>
                    {paymentLabel}
                  </span>

                  <p className="small text-secondary lh-lg mt-3 mb-0">
                    {paymentDescription}
                  </p>
                </div>

                <h3 className="small fw-bold mb-2">
                  วิธีชำระเงิน
                </h3>

                <ol className="small text-secondary lh-lg ps-3 mb-3">
                  <li className="mb-1">
                    ตรวจสอบยอดเงินจากประกาศของผู้จัดงาน
                  </li>
                  <li className="mb-1">
                    โอนเงินผ่านธนาคารและบันทึกภาพสลิป
                  </li>
                  <li>
                    อัปโหลดภาพเพื่อให้เจ้าหน้าที่ตรวจสอบ
                  </li>
                </ol>

                {applicant && hasProof && (
                  <a
                    href={`/api/payment-proof/${applicant.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-info rounded-3 w-100 mb-3"
                  >
                    ดูสลิปที่ส่งแล้ว ↗
                  </a>
                )}

                {canUploadSlip && <PaymentForm />}

                {!applicant && (
                  <div className="alert alert-secondary small rounded-3 mb-0">
                    กรุณาบันทึกข้อมูลผู้สมัครก่อนส่งสลิป
                  </div>
                )}

                {isPending && (
                  <div className="alert alert-warning small rounded-3 mt-3 mb-0">
                    ได้รับสลิปแล้ว กรุณารอเจ้าหน้าที่ตรวจสอบ
                  </div>
                )}

                {isRejected && (
                  <div className="alert alert-danger small rounded-3 mt-3 mb-0">
                    สลิปไม่ผ่าน กรุณาส่งหลักฐานใหม่
                  </div>
                )}

                {isApproved && (
                  <div className="alert alert-success small rounded-3 mt-3 mb-0">
                    ยืนยันการชำระเงินเรียบร้อยแล้ว
                  </div>
                )}

                <div className="text-secondary small mt-3">
                  รองรับ PNG, JPG และ WebP ขนาดไม่เกิน 5 MB
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="text-center text-secondary small mt-4 pt-3 border-top border-secondary">
          GLOBAL GAME JAM 2026 · TNI GAMEJAM
        </footer>

      </div>
    </main>
  );
}
