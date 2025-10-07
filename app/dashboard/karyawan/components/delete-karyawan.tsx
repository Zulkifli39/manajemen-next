"use client";

import {useState} from "react";
import {Trash, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ToastContainer, toast} from "react-toastify";

import {deleteKaryawan} from "@/lib/karyawan";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteKaryawanProps {
  id: number;
  onSuccess?: () => void; // callback setelah delete berhasil
}

export default function DeleteKaryawanForm({id, onSuccess}: DeleteKaryawanProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // untuk kontrol dialog

  const handleDelete = async () => {
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user?.token;

      if (!token) {
        toast.error("Token tidak ditemukan, silakan login ulang.");
        setLoading(false);
        return;
      }

      await deleteKaryawan(id, token);
      toast.success("Data karyawan berhasil dihapus!");
      setOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // callback untuk refresh data
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error saat menghapus data:", err);
      toast.error(" Gagal menghapus data karyawan.");
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {/* Tombol trigger */}
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className={`bg-red-100 hover:bg-red-200 text-red-600 rounded-md p-2 shadow transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            title="Hapus">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash size={18} />}
          </Button>
        </AlertDialogTrigger>

        {/* Dialog konfirmasi */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data karyawan akan dihapus secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-gray-600">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menghapus...
                </div>
              ) : (
                "Ya, hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ToastContainer />
    </>
  );
}
