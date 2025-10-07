"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import ContextAuth from "../../context/ContextAuth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      const auth = JSON.parse(userStr);
      // ✅ arahkan hanya sekali
      if (auth.role === "pemilik" || auth.role === "karyawan") {
        router.replace("/dashboard"); // gunakan replace, bukan push
      } else {
        router.replace("/user");
      }
    }
  }, [router]);

  return <ContextAuth type="login" />;
}
