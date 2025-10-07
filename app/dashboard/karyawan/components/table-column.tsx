"use client";

import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Edit} from "lucide-react";
import {Button} from "@/components/ui/button";
import DeleteKaryawanForm from "./delete-karyawan";

interface Karyawan {
  id: number;
  nama: string;
  jenis_kelamin: string | null;
  alamat: string | null;
  no_hp: string | null;
  jam_masuk: string | null;
  jam_keluar: string | null;
  total_cuti: number;
  sisa_cuti: number;
}

export function KaryawanTable({data}: {data?: Karyawan[]}) {
  const rows = Array.isArray(data) ? data : [];

  // 🔹 Helper untuk format waktu agar tampil "HH:MM"
  const formatTime = (time: string | null) => {
    if (!time) return "-";
    try {
      // Jika format dari backend adalah "08:00:00"
      return time.slice(0, 5); // ambil "08:00"
    } catch {
      return "-";
    }
  };

  // 🔹 Ubah enum ke teks agar lebih mudah dibaca
  const formatGender = (jk: string | null) => {
    if (!jk) return "-";
    if (jk === "L") return "Laki-laki";
    if (jk === "P") return "Perempuan";
    return jk; // fallback
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Daftar Karyawan</h2>

        <Link href="/dashboard/karyawan/create">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md rounded-lg px-4 py-2">
            + Tambah Karyawan
          </Button>
        </Link>
      </div>

      {/* Table Karyawan */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-yellow-500 text-center">
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">Nama</TableHead>
              <TableHead className="text-white">Jenis Kelamin</TableHead>
              <TableHead className="text-white">Alamat</TableHead>
              <TableHead className="text-white">No HP</TableHead>
              <TableHead className="text-white">Jam Masuk</TableHead>
              <TableHead className="text-white">Jam Keluar</TableHead>
              <TableHead className="text-white">Total Cuti</TableHead>
              <TableHead className="text-white">Sisa Cuti</TableHead>
              <TableHead className="text-white text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((k, index) => (
                <TableRow key={k.id ?? index} className="text-center hover:bg-yellow-50">
                  <TableCell>{k.id}</TableCell>
                  <TableCell>{k.nama}</TableCell>
                  <TableCell>{formatGender(k.jenis_kelamin)}</TableCell>
                  <TableCell>{k.alamat ?? "-"}</TableCell>
                  <TableCell>{k.no_hp ?? "-"}</TableCell>
                  <TableCell>{formatTime(k.jam_masuk)}</TableCell>
                  <TableCell>{formatTime(k.jam_keluar)}</TableCell>
                  <TableCell>{k.total_cuti}</TableCell>
                  <TableCell>{k.sisa_cuti}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/dashboard/karyawan/edit?id=${k.id}`}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md p-2 shadow"
                          title="Edit">
                          <Edit size={18} />
                        </Button>
                      </Link>

                      <DeleteKaryawanForm id={k.id} onSuccess={() => window.location.reload()} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-gray-500 py-6">
                  Tidak ada data karyawan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
