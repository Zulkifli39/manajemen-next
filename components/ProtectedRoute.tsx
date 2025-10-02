"use client";

import {useAuth} from "../context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function ProtectedRoute({children, allowedRoles}) {
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [user, router, allowedRoles]);

  return <>{children}</>;
}
