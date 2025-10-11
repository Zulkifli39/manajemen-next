"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast, ToastContainer} from "react-toastify";
import {Button} from "@/components/ui/button";
import SubmitButtonForm from "@/components/submit-button-form";
import {createCuti, updateCuti} from "@/lib/cuti";

interface FormPengajuanProps {
  type?: "ADD" | "EDIT";
  defaultValues?: any;
  onCutiAdded?: () => void; // Callback untuk memperbarui data
}

export default function FormPengajuan({type = "ADD", defaultValues, onCutiAdded}: FormPengajuanProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jenis_cuti: defaultValues?.jenis_cuti ?? "",
    tanggal_mulai: defaultValues?.tanggal_mulai ?? "",
    tanggal_selesai: defaultValues?.tanggal_selesai ?? "",
    status: defaultValues?.status ?? "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validasi input
    if (!formData.jenis_cuti) {
      toast.error("Jenis cuti  wajib diisi!");
      setLoading(false);
      return;
    }

    // Validasi tanggal
    const today = new Date().toISOString().split("T")[0];
    if (formData.tanggal_mulai < today) {
      toast.error("Tanggal mulai tidak boleh di masa lalu!");
      setLoading(false);
      return;
    }
    if (formData.tanggal_selesai < formData.tanggal_mulai) {
      toast.error("Tanggal selesai harus setelah tanggal mulai!");
      setLoading(false);
      return;
    }

    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("User belum login");

      if (type === "EDIT") {
        await updateCuti(defaultValues.id, formData);
      } else {
        await createCuti(formData);
      }

      toast.success(`Cuti berhasil ${type === "EDIT" ? "diperbarui" : "ditambahkan"}!`);
      if (onCutiAdded) onCutiAdded(); // Panggil callback untuk refresh data
      setLoading(false);

      // Reset form setelah pengajuan berhasil
      setFormData({
        jenis_cuti: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        status: "pending",
      });
    } catch (err) {
      console.error("Error saat menyimpan data cuti:", err);
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan data cuti.");
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
          onClick={() => router.push("/dashboard/pengajuan")}>
          Cancel
        </Button>
      </form>

      <ToastContainer />
    </>
  );
}
