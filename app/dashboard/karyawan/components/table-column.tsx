"use client";
import {useState} from "react";
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
  const [rows, setRows] = useState<Karyawan[]>(Array.isArray(data) ? data : []);

  // helper
  const formatTime = (time: string | null) => (time ? time.slice(0, 5) : "-");
  const formatGender = (jk: string | null) => (jk === "L" ? "Laki-laki" : jk === "P" ? "Perempuan" : "-");

  const handleDeleteSuccess = (id: number) => {
    setRows((prev) => prev.filter((k) => k.id !== id)); // hapus dari state, tanpa reload
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

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className=" bg-yellow-500 hover:bg-yellow-500 text-center">
              <TableHead className="text-white text-center">ID</TableHead>
              <TableHead className="text-white text-center">Nama</TableHead>
              <TableHead className="text-white text-center">Jenis Kelamin</TableHead>
              <TableHead className="text-white text-center">Alamat</TableHead>
              <TableHead className="text-white text-center">No HP</TableHead>
              <TableHead className="text-white text-center">Jam Masuk</TableHead>
              <TableHead className="text-white text-center">Jam Keluar</TableHead>
              <TableHead className="text-white text-center">Total Cuti</TableHead>
              <TableHead className="text-white text-center">Sisa Cuti</TableHead>
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

                      <DeleteKaryawanForm id={k.id} onSuccess={() => handleDeleteSuccess(k.id)} />
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
