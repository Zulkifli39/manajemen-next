"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useAuth} from "../context/AuthProvider";
import {
  Gem,
  Users,
  CalendarCheck,
  LogOut,
  Menu,
  X,
  BriefcaseBusiness,
  ClockFading,
  NotebookPen,
  CloudUpload,
} from "lucide-react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // === Menu berdasarkan role ===
  const menuPemilik = [
    {href: "/dashboard", label: "Dashboard", icon: <Gem className="mr-2 w-4 h-4 text-yellow-500" />},
    {href: "/dashboard/karyawan", label: "Data Karyawan", icon: <Users className="mr-2 w-4 h-4 text-yellow-500" />},
    {href: "/dashboard/cuti", label: "Data Cuti", icon: <ClockFading className="mr-2 w-4 h-4 text-yellow-500" />},
    {href: "/dashboard/absensi", label: "Data Absensi", icon: <NotebookPen className="mr-2 w-4 h-4 text-yellow-500" />},
    {
      href: "/dashboard/penggajian",
      label: "Manajemen Penggajian",
      icon: <BriefcaseBusiness className="mr-2 w-4 h-4 text-yellow-500" />,
    },
    {href: "/dashboard/laporan", label: "Laporan", icon: <CloudUpload className="mr-2 w-4 h-4 text-yellow-500" />},
  ];

  const menuKaryawan = [
    {href: "/dashboard", label: "Dashboard", icon: <Gem className="mr-2 w-4 h-4 text-yellow-500" />},
    {
      href: "/dashboard/pengajuan",
      label: "Pengajuan Cuti",
      icon: <CalendarCheck className="mr-2 w-4 h-4 text-yellow-500" />,
    },

    {href: "/dashboard/pendapatan", label: "Pendapatan Emas", icon: <Gem className="mr-2 w-4 h-4 text-yellow-500" />},
  ];

  const menus = user.role === "pemilik" ? menuPemilik : menuKaryawan;

  return (
    <section className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="border-b bg-gray-100 border-yellow-300 p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-yellow-700 text-xl">
          <Gem className="w-7 h-7 text-yellow-500" />
          <Link href="/dashboard">Mulia Utama Dashboard</Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-yellow-600" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* User info */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm text-gray-600">Hi, {user?.username}</span>
          <Users className="w-6 h-6 text-yellow-500" />
        </div>
      </nav>

      {/* Layout wrapper */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={`fixed md:static z-40 top-0 left-0 md:h- screen h-full w-full md:w-64 bg-gray-100 border-r border-yellow-200 shadow-lg p-6 space-y-6 transform transition-transform duration-300 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0`}>
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="font-bold text-yellow-700">Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5 text-yellow-600" />
            </button>
          </div>

          <div className="space-y-4 md:mt-0 mt-8">
            {menus.map((item) => (
              <Button key={item.href} asChild className="w-full justify-start">
                <Link href={item.href}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
            <ButtonLogout />
          </div>
        </aside>

        {/* Overlay mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
            onClick={() => setIsSidebarOpen(false)}></div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 rounded-xl min-h-[80vh]">{children}</main>
      </div>
    </section>
  );
}
