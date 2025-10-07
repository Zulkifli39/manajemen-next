"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useAuth} from "../context/AuthProvider";
import {Gem, Users, CalendarCheck, FileText, LogOut} from "lucide-react";

function ButtonLogout() {
  const router = useRouter();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <Button onClick={handleLogout} className="w-full justify-start bg-red-100 text-red-700 hover:bg-red-200 mt-5">
      <LogOut className="mr-2 w-4 h-4" /> Logout
    </Button>
  );
}

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const {user} = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem("user");
      if (!saved) {
        router.replace("/login");
      } else {
        const parsed = JSON.parse(saved);
        if (!["pemilik", "karyawan"].includes(parsed.role)) {
          router.replace("/login");
        }
      }
    }
    setIsChecking(false);
  }, [router, user]);

  if (isChecking) return <p className="p-5">Memeriksa sesi login...</p>;

  if (!user) return null;

  return (
    <section>
      {/* Navbar */}
      <nav className="border-b border-yellow-300 p-5 shadow-sm">
        <div className="flex flex-row items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-yellow-700 text-xl">
            <Gem className="w-7 h-7 text-yellow-500" />
            Mulia Utama Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Hi, {user?.username}</span>
            <Users className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
      </nav>

      {/* Layout wrapper */}
      <section className="flex flex-row gap-5 items-start flex-nowrap bg-yellow-50 min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 h-screen shadow-lg p-6 space-y-6 bg-white border-r border-yellow-200">
          <div className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/dashboard">
                <Gem className="mr-2 w-4 h-4 text-yellow-500 " /> Beranda
              </Link>
            </Button>
          </div>

          <div className="space-y-2">
            <div className="uppercase text-xs font-bold text-yellow-700">Menu Utama</div>

            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/karyawan">
                <Users className="mr-2 w-4 h-4 text-yellow-500" /> Data Karyawan
              </Link>
            </Button>

            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/cuti">
                <CalendarCheck className="mr-2 w-4 h-4 text-yellow-500" /> Pengajuan Cuti
              </Link>
            </Button>

            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/pendapatan">
                <Gem className="mr-2 w-4 h-4 text-yellow-500" /> Pendapatan Emas
              </Link>
            </Button>

            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/laporan">
                <FileText className="mr-2 w-4 h-4 text-yellow-500" /> Laporan
              </Link>
            </Button>

            {/* Logout button */}
            <ButtonLogout />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 bg-white rounded-xl shadow min-h-[80vh]">{children}</main>
      </section>
    </section>
  );
}
