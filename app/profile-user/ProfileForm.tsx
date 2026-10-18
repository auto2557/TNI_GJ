"use client";

import { useActionState } from "react";
import {
  saveProfile,
  type ActionState,
} from "@/app/actions/auth";
import Alert from "@/app/components/Alert";

type Profile = {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
};

const initialState: ActionState = {};

export default function ProfileForm({
  initialData,
}: {
  initialData: Profile;
}) {
  const [state, formAction, pending] = useActionState(
    saveProfile,
    initialState
  );

  return (
    <>
      <Alert message={state.error} type="error" />
      <Alert message={state.success} type="success" />

      <form action={formAction}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label small">
              ชื่อ <span className="text-info">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              defaultValue={initialData.firstName}
              maxLength={100}
              className="form-control bg-black text-light border-secondary rounded-0"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label small">
              นามสกุล <span className="text-info">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              defaultValue={initialData.lastName}
              maxLength={100}
              className="form-control bg-black text-light border-secondary rounded-0"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="nickname" className="form-label small">
              ชื่อเล่น <span className="text-info">*</span>
            </label>
            <input
              id="nickname"
              name="nickname"
              defaultValue={initialData.nickname}
              maxLength={50}
              className="form-control bg-black text-light border-secondary rounded-0"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label small">
              อีเมล <span className="text-info">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={initialData.email}
              maxLength={254}
              className="form-control bg-black text-light border-secondary rounded-0"
              required
            />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mt-4">
          <button
            type="submit"
            disabled={pending}
            className="btn btn-info rounded-0 px-4 py-2 fw-bold"
          >
            {pending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </button>

          <button
            type="reset"
            disabled={pending}
            className="btn btn-outline-secondary rounded-0 px-4 py-2"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}