"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Alert from "@/app/components/Alert";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    login,
    initialState
  );

  return (
    <main style={containerStyle}>
      <Alert message={state.error} type="error" />

      <h1>เข้าสู่ระบบ</h1>

      <form action={formAction}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          style={inputStyle}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={pending}
          style={buttonStyle}
        >
          {pending ? "กำลังตรวจสอบ..." : "Login"}
        </button>

        <button
          type="reset"
          style={{ ...buttonStyle, background: "#777" }}
        >
          Reset
        </button>
      </form>

      <p>
        ยังไม่มีบัญชี? <a href="/reg">สมัครสมาชิก</a>
      </p>
    </main>
  );
}

const containerStyle = {
  maxWidth: 420,
  margin: "60px auto",
  padding: 24,
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: 10,
  margin: "8px 0 16px",
  boxSizing: "border-box" as const,
};

const buttonStyle = {
  display: "block",
  width: "100%",
  padding: 12,
  marginTop: 8,
  cursor: "pointer",
};