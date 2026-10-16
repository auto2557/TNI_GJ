"use client";

import { useActionState } from "react";
import {
  submitPaymentProof,
  type ActionState,
} from "@/app/actions/auth";
import Alert from "@/app/components/Alert";

const initialState: ActionState = {};

export default function PaymentForm() {
  const [state, formAction, pending] = useActionState(
    submitPaymentProof,
    initialState
  );

  return (
    <>
      <Alert message={state.error} type="error" />
      <Alert message={state.success} type="success" />

      <form action={formAction} encType="multipart/form-data">
        <label
          htmlFor="paymentProof"
          className="form-label small fw-semibold"
        >
          รูปสลิปโอนเงินธนาคาร
        </label>

        <input
          id="paymentProof"
          name="paymentProof"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="form-control bg-black text-light border-secondary rounded-0"
          required
        />

        <div className="form-text text-secondary mt-2">
          รับเฉพาะ PNG, JPG และ WebP ขนาดไม่เกิน 5 MB
        </div>

        <div className="alert bg-black border border-secondary text-light rounded-0 small mt-3">
          <span className="text-info fw-bold me-2">!</span>
          แนบภาพสลิปโอนเงินจริงจากธนาคารที่ชัดเจน
          และตรวจสอบยอดเงินก่อนส่ง
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn btn-info w-100 rounded-0 fw-bold py-3"
        >
          {pending ? "กำลังส่งสลิป..." : "ส่งสลิปชำระค่าสมัคร ↗"}
        </button>

        <button
          type="reset"
          disabled={pending}
          className="btn btn-outline-secondary w-100 rounded-0 mt-2 py-2"
        >
          Reset
        </button>
      </form>
    </>
  );
}