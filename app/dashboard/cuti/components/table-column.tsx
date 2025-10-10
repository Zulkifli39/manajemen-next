"use client";

import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Edit} from "lucide-react";
import {Button} from "@/components/ui/button";

interface Cuti {
  karyawan_id: number;
  pengajuan: string | null;
  jenis_cuti: string | null;
  tanggal_mulai: string | null;
  tanggal_selesai: string | null;
  status: string | null;
}

export function CutiTable({data}: {data?: Cuti[]}) {
  const rows = Array.isArray(data) ? data : [];

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    try {
      return new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD
    } catch {
      return "-";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Daftar Cuti Karyawan</h2>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className=" bg-yellow-500 hover:bg-yellow-500 text-center">
              <TableHead className="text-white text-center">Karyawan ID</TableHead>
              <TableHead className="text-white text-center">Jenis Cuti</TableHead>
              <TableHead className="text-white text-center">Tanggal Mulai</TableHead>
              <TableHead className="text-white text-center">Tanggal Selesai</TableHead>
              <TableHead className="text-white text-center">Status</TableHead>
              <TableHead className="text-white text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((k) => (
                <TableRow key={k.karyawan_id} className="text-center hover:bg-yellow-50">
                  <TableCell>{k.karyawan_id}</TableCell>
                  <TableCell>{k.jenis_cuti}</TableCell>
                  <TableCell>{formatDate(k.tanggal_mulai)}</TableCell>
                  <TableCell>{formatDate(k.tanggal_selesai)}</TableCell>
                  <TableCell>{k.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/dashboard/cuti/edit?id=${k.id}`}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md p-2 shadow"
                          title="Edit">
                          <Edit size={18} />
                        </Button>
                      </Link>
                      {/* Tambah DeleteCutiForm kalau sudah bikin */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                  Tidak ada data cuti karyawan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
