"use client";

import {useEffect, useState} from "react";
import PengajuanTable from "./components/table-column";
import {getAllCuti} from "@/lib/cuti";

interface Cuti {
  id?: number;
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

export default function PengajuanPage() {
  const [data, setData] = useState<Cuti[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await getAllCuti();
      if (Array.isArray(response)) {
        setData(response);
      } else if (response?.data && Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Gagal fetch data", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <PengajuanTable data={data} />
    </div>
  );
}
