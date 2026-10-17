"use client";

import { useActionState } from "react";
import {
  updatePassword,
  type ActionState,
} from "@/app/actions/auth";
import Alert from "@/app/components/Alert";

const initialState: ActionState = {};

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(
    updatePassword,
    initialState
  );

  return (
    <>
      <Alert message={state.error} type="error" />
      <Alert message={state.success} type="success" />

      <form action={formAction}>
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label small">
            รหัสผ่านเดิม
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            autoComplete="current-password"
            className="form-control bg-black text-light border-secondary rounded-0"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label small">
            รหัสผ่านใหม่
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            minLength={8}
            maxLength={72}
            autoComplete="new-password"
            className="form-control bg-black text-light border-secondary rounded-0"
            required
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn btn-outline-info rounded-0 w-100 py-2"
        >
          {pending ? "กำลังเปลี่ยนรหัสผ่าน..." : "Update Password"}
        </button>

        <button
          type="reset"
          disabled={pending}
          className="btn btn-outline-secondary rounded-0 w-100 py-2 mt-2"
        >
          Reset
        </button>
      </form>
    </>
  );
}