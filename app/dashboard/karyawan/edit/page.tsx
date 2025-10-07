"use client";

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import FormKaryawan from "../components/form-karyawan";

export default function EditKaryawanPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [karyawan, setKaryawan] = useState<any>(null);

  useEffect(() => {
    async function fetchKaryawan() {
      if (!id) return;

      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) throw new Error("User belum login");

        const user = JSON.parse(userStr);
        const token = user.token;

        const res = await fetch(`http://localhost:5000/api/karyawan/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        });

        if (!res.ok) throw new Error("Gagal mengambil data karyawan");

        const json = await res.json();
        setKaryawan(json);
      } catch (err) {
        console.error("Error ambil data:", err);
      }
    }

    fetchKaryawan();
  }, [id]);

  if (!karyawan) return <p className="p-6">Loading data karyawan...</p>;

  return (
    <div className="p-6">
      <FormKaryawan type="EDIT" defaultValues={karyawan} />
    </div>
  );
}
