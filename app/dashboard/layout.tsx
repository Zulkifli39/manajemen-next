"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getUser} from "@/lib/auth";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push("/login"); // kalau belum login
    } else if (!["pemilik", "karyawan"].includes(user.role)) {
      router.push("/login"); // kalau role tidak sesuai
    } else {
      setAuth(user);
    }
  }, [router]);

  if (!auth) return <p className="p-5">Loading...</p>;

  return (
    <>
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center bg-white px-6 py-4 shadow-sm">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-full" />
          <span className="font-bold text-lg text-gray-800">Emas Muliautama</span>
        </div>

        {/* Menu */}
        <div className="flex space-x-6 text-gray-700">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/karyawan">Karyawan</Link>
          <Link href="/dashboard/cuti">Cuti</Link>
          <Link href="/dashboard/pendapatan">Pendapatan</Link>
          <Link href="/dashboard/laporan">Laporan</Link>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </nav>
      <main className="p-6">{children}</main>
    </>
  );
}
