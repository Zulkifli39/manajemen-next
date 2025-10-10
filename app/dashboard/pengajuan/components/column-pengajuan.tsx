"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Calendar} from "@/components/ui/calendar";

export default function ColumnPengajuan() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manajemen Cuti</h1>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">+ Ajukan Cuti</Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Sisa Cuti */}
          <div className="bg-white p-4 flex justify-between rounded-lg shadow items-center">
            <div>
              <h2 className="text-lg font-bold">Sisa Cuti Anda</h2>
              <span className="text-sm">Total cuti tahunan: 12 hari</span>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-yellow-400">8</h2>
              <p className="text-sm">Hari Tersisa</p>
            </div>
          </div>
          {/* Riwayat Pengajuan */}
          <div className="bg-white p-4 rounded-lg shadow">
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
                <TableRow>
                  <TableCell>20 Mei 2024</TableCell>
                  <TableCell>Cuti Sakit</TableCell>
                  <TableCell>21 Mei 2024 - 22 Mei 2024</TableCell>
                  <TableCell>Menunggu</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10 April 2024</TableCell>
                  <TableCell>Cuti Tahunan</TableCell>
                  <TableCell>15 April 2024 - 16 April 2024</TableCell>
                  <TableCell>Disetujui</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>01 Maret 2024</TableCell>
                  <TableCell>Cuti Tahunan</TableCell>
                  <TableCell>05 Maret 2024</TableCell>
                  <TableCell>Ditolak</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Column - Kalender */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Kalender Tim</h2>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
          <div className="text-center mt-2">
            <span>Hari Tersisa</span>
          </div>
        </div>
      </div>

      {/* Daftar Pengajuan Cuti (Admin) */}
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
            <TableRow>
              <TableCell>Ahmad Zulfiqi</TableCell>
              <TableCell>Cuti Sakit</TableCell>
              <TableCell>21 Mei - 22 Mei 2024</TableCell>
              <TableCell>8 Hari</TableCell>
              <TableCell>
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-red-500">✘</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Citra Lestari</TableCell>
              <TableCell>Cuti Tahunan</TableCell>
              <TableCell>27 Mei - 29 Mei 2024</TableCell>
              <TableCell>5 Hari</TableCell>
              <TableCell>
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-red-500">✘</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Budi Santoso</TableCell>
              <TableCell>Cuti Tahunan</TableCell>
              <TableCell>09 Mei 2024, 14 Mei 2024</TableCell>
              <TableCell>10 Hari</TableCell>
              <TableCell className="text-green-500">Disetujui</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
