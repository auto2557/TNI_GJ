
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import Alert from "@/app/components/Alert";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    login,
    initialState
  );

  return (
    <main className="container-fluid bg-black text-light min-vh-100 py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center justify-content-center g-5">

          {/* LEFT: EVENT BRANDING */}
          <div className="col-lg-6">
            <div className="mb-4">
              <span className="badge bg-info text-dark rounded-0 px-3 py-2">
                TNI GAMEJAM 2026
              </span>
            </div>

            <div
              className="d-flex align-items-center justify-content-center border border-info text-info fw-bold mb-4"
              style={{
                width: 64,
                height: 64,
                fontSize: 30,
                boxShadow: "0 0 22px rgba(13, 202, 240, 0.2)",
              }}
            >
              G
            </div>

            <p className="text-info small fw-bold mb-2">
              HOSTED BY THAI-NICHI INSTITUTE OF TECHNOLOGY
            </p>

            <h1 className="display-4 fw-bold lh-1 mb-3">
              WELCOME
              <br />
              <span className="text-info">BACK.</span>
            </h1>

            <p className="text-secondary lh-lg mb-4">
              เข้าสู่ระบบเพื่อจัดการข้อมูลผู้สมัคร
              ตรวจสอบสถานะการสมัคร และติดตามการชำระค่าสมัคร
              ของคุณได้ในที่เดียว
            </p>

            <div className="border-start border-info border-3 ps-3 py-2 mb-4">
              <h2 className="h5 fw-bold mb-2">
                YOUR IDEA. YOUR GAME.
              </h2>
              <p className="text-secondary small mb-0">
                Sign in and continue your journey.
              </p>
            </div>

            <div className="d-flex align-items-center gap-3 text-secondary small">
              <span className="text-info">◆</span>
              Secure account access
            </div>

            <div className="d-flex align-items-center gap-3 text-secondary small mt-2">
              <span className="text-info">◆</span>
              Manage your registration
            </div>
          </div>

          {/* RIGHT: LOGIN FORM */}
          <div className="col-lg-5 col-xl-4">
            <div className="card bg-dark text-light border border-info rounded-0 shadow-lg">
              <div className="card-body p-4 p-md-5">

                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center border border-info text-info"
                    style={{ width: 48, height: 48 }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
                    </svg>
                  </div>

                  <div>
                    <div className="text-info small fw-bold mb-1">
                      PLAYER ACCESS
                    </div>
                    <h2 className="h3 fw-bold mb-0">
                      Login
                    </h2>
                  </div>
                </div>

                <p className="text-secondary small mb-4">
                  กรุณาเข้าสู่ระบบด้วยบัญชีของคุณ
                </p>

                <hr className="border-info opacity-50 mb-4" />

                <Alert message={state.error} type="error" />

                <form action={formAction}>
                  {/* USERNAME */}
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="form-label small fw-semibold"
                    >
                      Username
                      <span className="text-info ms-1">*</span>
                    </label>

                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="form-control bg-black text-light border-secondary rounded-0 py-3"
                      placeholder="กรอก Username ของคุณ"
                      autoComplete="username"
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-2">
                    <label
                      htmlFor="password"
                      className="form-label small fw-semibold"
                    >
                      Password
                      <span className="text-info ms-1">*</span>
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control bg-black text-light border-secondary rounded-0 py-3"
                      placeholder="กรอก Password ของคุณ"
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  {/* FORGOT PASSWORD */}
                  <div className="text-end mb-4">
                    <Link
                      href="/forgot-password"
                      className="link-info small text-decoration-none"
                    >
                      ลืมรหัสผ่าน?
                    </Link>
                  </div>

                  {/* LOGIN */}
                  <button
                    type="submit"
                    disabled={pending}
                    className="btn btn-info text-dark w-100 rounded-0 fw-bold py-3"
                  >
                    {pending ? "กำลังตรวจสอบ..." : "LOGIN"}
                    {!pending && (
                      <span className="ms-2">→</span>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-secondary small mb-2">
                    ยังไม่มีบัญชีผู้ใช้งาน?
                  </p>

                  <Link
                    href="/reg"
                    className="btn btn-outline-info rounded-0 w-100 py-2 fw-semibold"
                  >
                    CREATE ACCOUNT
                  </Link>
                </div>

                <hr className="border-secondary mt-4" />

                <div className="text-center">
                  <Link
                    href="/"
                    className="link-secondary small text-decoration-none"
                  >
                    ← กลับสู่หน้าหลัก
                  </Link>
                </div>

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
