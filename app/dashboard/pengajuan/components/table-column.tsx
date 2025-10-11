"use client";

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Calendar} from "@/components/ui/calendar";
import {toast} from "react-toastify";
import {getAllCuti, updateCuti} from "@/lib/cuti";
import Link from "next/link";

// Format tanggal ke DD MMMM YYYY
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {day: "2-digit", month: "long", year: "numeric"});
};

interface Cuti {
  id: number;
  karyawan_id: number;
  pengajuan: string;
  jenis_cuti: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: string;
  createdAt: string;
  karyawan?: {
    nama: string;
    sisa_cuti: number;
    total_cuti: number;
  };
}

interface Karyawan {
  sisa_cuti: number;
  total_cuti: number;
}

interface PengajuanTableProps {
  data: Cuti[];
}

export default function PengajuanTable({data}: PengajuanTableProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [karyawanData, setKaryawanData] = useState<Karyawan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Ambil data dari localStorage untuk role
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.role || "karyawan");
    }
  }, []);

  // Ambil data karyawan untuk sisa cuti
  useEffect(() => {
    async function fetchKaryawanData() {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) throw new Error("User belum login");

        const res = await fetch("http://localhost:5000/api/karyawan", {
          headers: {
            Authorization: `Bearer ${JSON.parse(userStr).token}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const karyawanJson = await res.json();
        const karyawan = Array.isArray(karyawanJson) ? karyawanJson[0] : karyawanJson.data?.[0];
        setKaryawanData(karyawan || null);
      } catch (err) {
        console.error("Gagal fetch data karyawan", err);
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }
    fetchKaryawanData();
  }, []);

  // Fungsi untuk approve/reject cuti
  const handleCutiAction = async (id: number, status: "approved" | "rejected") => {
    try {
      await updateCuti(id, {status});
      toast.success(`Cuti berhasil ${status === "approved" ? "disetujui" : "ditolak"}!`);
    } catch (err) {
      console.error("Error saat memperbarui status cuti:", err);
      toast.error(err instanceof Error ? err.message : "Gagal memperbarui status cuti.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manajemen Cuti</h1>
        <Link href="/dashboard/pengajuan/create">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md rounded-lg px-4 py-2">
            + Ajukan Cuti
          </Button>
        </Link>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-[75%_25%] gap-6">
          {/* Left Column */}
          <div className="space-y-5 w-full">
            {/* Sisa Cuti */}
            <div className="bg-white p-4 flex justify-between rounded-lg shadow items-center w-full">
              <div>
                <h2 className="text-lg font-bold">Sisa Cuti Anda</h2>
                <span className="text-sm">Total cuti tahunan: {karyawanData?.total_cuti || 12} hari</span>
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-yellow-400">{karyawanData?.sisa_cuti || 0}</h2>
                <p className="text-sm">Hari Tersisa</p>
              </div>
            </div>
            {/* Riwayat Pengajuan */}
            <div className="bg-white p-4 rounded-lg shadow w-full max-h-[400px] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-2">Riwayat Pengajuan Cuti</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead>Jenis Cuti</TableHead>
                    <TableHead>Tanggal Cuti</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>Tidak ada data cuti.</TableCell>
                    </TableRow>
                  ) : (
                    data.map((cuti) => (
                      <TableRow key={cuti.id}>
                        <TableCell>{formatDate(cuti.createdAt)}</TableCell>
                        <TableCell>{cuti.jenis_cuti}</TableCell>
                        <TableCell>
                          {formatDate(cuti.tanggal_mulai)} - {formatDate(cuti.tanggal_selesai)}
                        </TableCell>
                        <TableCell>{cuti.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Right Column - Kalender */}
          <div className="bg-white p-4 rounded-lg shadow w-full max-h-[400px] flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Kalender Tim</h2>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border mx-auto flex-1" />
            <div className="text-center mt-2">
              <span>Hari Tersisa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Pengajuan Cuti (Admin) */}
      {userRole === "pemilik" && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Daftar Pengajuan Cuti (Admin)</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Jenis Cuti</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Sisa Cuti</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>Tidak ada data cuti.</TableCell>
                </TableRow>
              ) : (
                data.map((cuti) => (
                  <TableRow key={cuti.id}>
                    <TableCell>{cuti.karyawan?.nama || "Unknown"}</TableCell>
                    <TableCell>{cuti.jenis_cuti}</TableCell>
                    <TableCell>
                      {formatDate(cuti.tanggal_mulai)} - {formatDate(cuti.tanggal_selesai)}
                    </TableCell>
                    <TableCell>{cuti.karyawan?.sisa_cuti || 0} Hari</TableCell>
                    <TableCell>
                      {cuti.status === "pending" ? (
                        <>
                          <Button className="text-green-500 mr-2" onClick={() => handleCutiAction(cuti.id, "approved")}>
                            ✔
                          </Button>
                          <Button className="text-red-500" onClick={() => handleCutiAction(cuti.id, "rejected")}>
                            ✘
                          </Button>
                        </>
                      ) : (
                        <span className={cuti.status === "approved" ? "text-green-500" : "text-red-500"}>
                          {cuti.status}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
