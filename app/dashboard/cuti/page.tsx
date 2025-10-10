"use client";

import {useEffect, useState} from "react";
import {CutiTable} from "./components/table-column";

interface Cuti {
  id: number;
  karyawan_id: number;
  jenis_cuti: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: string;
}

export default function CutiPage() {
  const [data, setData] = useState<Cuti[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) throw new Error("User belum login");

        const user = JSON.parse(userStr);
        const token = user.token;

        const res = await fetch("http://localhost:5000/api/cuti", {
          headers: {Authorization: `Bearer ${token}`},
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();

        if (Array.isArray(json)) {
          setData(json);
        } else if (json?.data && Array.isArray(json.data)) {
          // kalau API response dalam bentuk { data: [...] }
          setData(json.data);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Gagal fetch data", err);
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div>
      <CutiTable data={data} />
    </div>
  );
}
