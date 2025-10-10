"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast, ToastContainer} from "react-toastify";
import {Button} from "@/components/ui/button";
import SubmitButtonForm from "@/components/submit-button-form";
import {createCuti, updateCuti} from "@/lib/cuti";

interface FormCutiProps {
  type?: "ADD" | "EDIT";
  defaultValues?: any;
}

export default function FormCuti({type = "ADD", defaultValues}: FormCutiProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    karyawan_id: defaultValues?.karyawan_id ?? "",
    pengajuan: defaultValues?.pengajuan ?? "",
    jenis_cuti: defaultValues?.jenis_cuti ?? "",
    tanggal_mulai: defaultValues?.tanggal_mulai ?? "",
    tanggal_selesai: defaultValues?.tanggal_selesai ?? "",
    status: defaultValues?.status ?? "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.jenis_cuti) {
      toast.error("Jenis cuti wajib dipilih!");
      setLoading(false);
      return;
    }

    try {
      if (type === "EDIT") {
        await updateCuti(formData.id, formData);
      } else {
        await createCuti(formData);
      }

      toast.success(`Cuti berhasil ${type === "EDIT" ? "diperbarui" : "ditambahkan"}!`);
      await new Promise((res) => setTimeout(res, 1200));
      router.push("/dashboard/cuti");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menyimpan data cuti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-white shadow-md rounded-xl border border-gray-100 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          {type === "EDIT" ? "✏️ Edit Cuti" : "➕ Tambah Cuti"}
        </h2>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Karyawan ID</label>
          <input
            name="karyawan_id"
            value={formData.karyawan_id}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Jenis Cuti</label>
          <select
            name="jenis_cuti"
            value={formData.jenis_cuti}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none">
            <option value="">Pilih...</option>
            <option value="sakit">Cuti Sakit</option>
            <option value="tahunan">Cuti Tahunan</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Tanggal Mulai</label>
            <input
              type="date"
              name="tanggal_mulai"
              value={formData.tanggal_mulai}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Tanggal Selesai</label>
            <input
              type="date"
              name="tanggal_selesai"
              value={formData.tanggal_selesai}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
        </div>

        <SubmitButtonForm label={type === "EDIT" ? "Simpan Perubahan" : "Tambah Cuti"} loading={loading} />
        <Button
          type="button"
          className="w-full bg-red-400 text-white hover:bg-red-500 cursor-pointer"
          onClick={() => router.push("/dashboard/cuti")}>
          Cancel
        </Button>
      </form>

      <ToastContainer />
    </>
  );
}
