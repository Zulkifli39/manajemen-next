"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {ToastContainer, toast} from "react-toastify";
import {createKaryawan, updateKaryawan} from "@/lib/karyawan";
import SubmitButtonForm from "@/components/submit-button-form";
import {Button} from "@/components/ui/button";

interface FormKaryawanProps {
  type?: "ADD" | "EDIT";
  defaultValues?: any;
}

export default function FormKaryawan({type = "ADD", defaultValues}: FormKaryawanProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: defaultValues?.id ?? "",
    nama: defaultValues?.nama ?? "",
    jenis_kelamin: defaultValues?.jenis_kelamin ?? "",
    alamat: defaultValues?.alamat ?? "",
    no_hp: defaultValues?.no_hp ?? "",
    jam_masuk: defaultValues?.jam_masuk ?? "",
    jam_keluar: defaultValues?.jam_keluar ?? "",
    total_cuti: defaultValues?.total_cuti ?? "",
    sisa_cuti: defaultValues?.sisa_cuti ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.jenis_kelamin) {
      toast.error("Jenis kelamin wajib dipilih!");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        total_cuti: Number(formData.total_cuti) || 0,
        sisa_cuti: Number(formData.sisa_cuti) || 0,
      };

      if (type === "EDIT") {
        await updateKaryawan(formData.id, payload);
      } else {
        await createKaryawan(payload);
      }

      toast.success(`Karyawan berhasil ${type === "EDIT" ? "diperbarui" : "ditambahkan"}!`);

      // 🕒 Tambahkan delay agar tampilan loading lebih interaktif (1.5 detik)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/dashboard/karyawan");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menyimpan data.");
    } finally {
      // Delay 500ms tambahan agar tombol tidak langsung berubah
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" mx-auto p-6 bg-white shadow-md rounded-xl border border-gray-100 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          {type === "EDIT" ? "✏️ Edit Data Karyawan" : "➕ Tambah Karyawan"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Nama</label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Jenis Kelamin</label>
            <select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none">
              <option value="">Pilih...</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Alamat</label>
          <input
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Nomor HP</label>
          <input
            name="no_hp"
            value={formData.no_hp}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Jam Masuk</label>
            <input
              type="time"
              name="jam_masuk"
              value={formData.jam_masuk}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Jam Keluar</label>
            <input
              type="time"
              name="jam_keluar"
              value={formData.jam_keluar}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Total Cuti</label>
            <input
              type="number"
              name="total_cuti"
              value={formData.total_cuti}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Sisa Cuti</label>
            <input
              type="number"
              name="sisa_cuti"
              value={formData.sisa_cuti}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
        </div>

        <SubmitButtonForm label={type === "EDIT" ? "Simpan Perubahan" : "Tambah Karyawan"} loading={loading} />
        <Button
          type="button"
          className="w-full bg-red-400 text-white hover:bg-red-500 cu./rsor-pointer"
          onClick={() => router.push("/dashboard/karyawan")}>
          Cancel
        </Button>
      </form>

      <ToastContainer />
    </>
  );
}
