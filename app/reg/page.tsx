
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/app/actions/auth";
import Alert from "@/app/components/Alert";

const initialState = { error: "" };

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    register,
    initialState
  );

  return (
    <main className="container-fluid bg-black text-light py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center justify-content-center g-5">

          {/* Event Information */}
          <div className="col-lg-6">
            <div className="mb-4">
              <span className="badge bg-info text-dark rounded-0 px-3 py-2">
                REGISTRATION OPEN
              </span>
            </div>

            <div
              className="border border-info text-info d-flex align-items-center justify-content-center mb-4"
              style={{ width: 60, height: 60 }}
            >
              <span className="fs-2 fw-bold">G</span>
            </div>

            <h1 className="display-4 fw-bold lh-1 mb-3">
              GLOBAL GAME
              <br />
              <span className="text-info">JAM 2026</span>
            </h1>

            <p className="text-info small mb-4">
              TNI GAMEJAM
            </p>

            <hr className="border-info opacity-75 w-25 mb-4" />

            <h2 className="h3 fw-bold mb-3">
              YOUR IDEA.
              <br />
              <span className="text-info">YOUR GAME.</span>
            </h2>

            <p className="text-secondary lh-lg mb-4">
              สร้างบัญชีเพื่อเข้าร่วมกิจกรรม
              กรอกข้อมูลส่วนตัว และติดตามสถานะการสมัคร
              ผ่านหน้าโปรไฟล์ของคุณ
            </p>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="border border-info text-info px-3 py-2">
                01
              </div>
              <div>
                <div className="fw-semibold">
                  Create Account
                </div>
                <small className="text-secondary">
                  สร้างบัญชีผู้ใช้งาน
                </small>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="border border-info text-info px-3 py-2">
                02
              </div>
              <div>
                <div className="fw-semibold">
                  Complete Your Profile
                </div>
                <small className="text-secondary">
                  กรอกข้อมูลส่วนตัวของผู้สมัคร
                </small>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="border border-info text-info px-3 py-2">
                03
              </div>
              <div>
                <div className="fw-semibold">
                  Registration Status
                </div>
                <small className="text-secondary">
                  ติดตามสถานะการสมัครและชำระเงิน
                </small>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="col-lg-5 col-xl-4">
            <div className="card bg-dark text-light border border-info rounded-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <Alert message={state.error} type="error" />

                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="border border-info text-info d-flex align-items-center justify-content-center fw-bold fs-4"
                    style={{ width: 48, height: 48 }}
                  >
                    G
                  </div>

                  <div>
                    <div className="text-info small fw-bold">
                      JOIN THE JAM
                    </div>
                    <h2 className="h3 fw-bold mb-1">
                      Create Account
                    </h2>
                  </div>
                </div>

                <p className="text-secondary small mb-4">
                  สร้างบัญชีเพื่อเริ่มต้นการสมัครเข้าร่วมงาน
                </p>

                <hr className="border-info opacity-50 mb-4" />

                <form action={formAction}>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="form-label small fw-semibold"
                    >
                      Username <span className="text-info">*</span>
                    </label>

                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="form-control rounded-0 bg-black text-light border-secondary"
                      placeholder="ตั้งชื่อผู้ใช้งาน"
                      minLength={4}
                      maxLength={30}
                      pattern="[a-zA-Z0-9_]+"
                      title="ใช้ภาษาอังกฤษ ตัวเลข หรือ _ จำนวน 4-30 ตัว"
                      autoComplete="username"
                      required
                    />

                    <div className="form-text text-secondary">
                      ภาษาอังกฤษ ตัวเลข หรือ _ จำนวน 4-30 ตัว
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label small fw-semibold"
                    >
                      Password <span className="text-info">*</span>
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control rounded-0 bg-black text-light border-secondary"
                      placeholder="สร้างรหัสผ่านของคุณ"
                      minLength={8}
                      maxLength={72}
                      autoComplete="new-password"
                      required
                    />

                    <div className="form-text text-secondary">
                      ต้องมีอย่างน้อย 8 ตัวอักษร
                    </div>
                  </div>

                  <div className="alert bg-black border border-secondary text-secondary rounded-0 small">
                    <span className="text-info me-2">◆</span>
                    รหัสผ่านจะถูกเข้ารหัสก่อนบันทึกลงฐานข้อมูล
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="btn btn-info w-100 rounded-0 fw-bold py-3 mt-2"
                  >
                    {pending ? "กำลังสมัคร..." : "CREATE ACCOUNT"}
                    {!pending && <span className="ms-2">→</span>}
                  </button>

                  <button
                    type="reset"
                    disabled={pending}
                    className="btn btn-outline-secondary w-100 rounded-0 mt-2 py-2"
                  >
                    RESET FORM
                  </button>
                </form>

                <hr className="border-secondary mt-4" />

                <p className="text-secondary text-center small mb-0">
                  มีบัญชีแล้ว?{" "}
                  <Link
                    href="/login"
                    className="link-info text-decoration-none fw-bold"
                  >
                    เข้าสู่ระบบ ↗
                  </Link>
                </p>
              </div>
            </div>

            <p className="text-secondary text-center small mt-3">
              GLOBAL GAME JAM 2026 · TNI GAMEJAM
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
