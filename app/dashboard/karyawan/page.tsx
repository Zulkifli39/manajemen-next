"use client";

import {useEffect, useState} from "react";
import {KaryawanTable} from "./components/table-column";

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

export default function KaryawanPage() {
  const [data, setData] = useState<Karyawan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Ambil object key user dari localStorage
        const userStr = localStorage.getItem("user");

        if (!userStr) {
          throw new Error("User belum login");
        }

        // Parse string JSON menjadi object
        const user = JSON.parse(userStr);
        const token = user.token;

        console.log("Token:", token); // Debug

        const res = await fetch("http://localhost:5000/api/karyawan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        console.log("Data dari API:", json);

        if (Array.isArray(json)) {
          setData(json);
        } else {
          console.warn("Respon API bukan array:", json);
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
    <div className="p-6">
      <KaryawanTable data={data} />
    </div>
  );
}
