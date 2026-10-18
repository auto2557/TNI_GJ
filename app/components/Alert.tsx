"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

type Props = {
  message?: string;
  type?: "success" | "error" | "info";
};

export default function Alert({
  message,
  type = "success",
}: Props) {
  useEffect(() => {
    if (!message) return;

    void Swal.fire({
      icon: type,
      title:
        type === "success"
          ? "สำเร็จ"
          : type === "error"
            ? "เกิดข้อผิดพลาด"
            : "แจ้งเตือน",
      text: message,
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#00d9ff",
      background: "#0b1013",
      color: "#f4f7f9",
    });
  }, [message, type]);

  return null;
}