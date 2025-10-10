"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "./AuthProvider";
import {loginUser, registerUser} from "@/lib/auth";

export default function ContextAuth({type}: {type: "login" | "register"}) {
  const router = useRouter();
  const {login} = useAuth();
  const [form, setForm] = useState({username: "", password: ""});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === "login") {
        const res = await loginUser(form);

        if (!res.username || !res.role || !res.token) {
          throw new Error("Respon server tidak lengkap");
        }

        login(res);
        router.push("/dashboard");
      } else {
        const res = await registerUser(form);
        alert(res?.message || "Register berhasil, silakan login!");
        router.push("/login");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="space-y-5 max-w-sm w-full p-8 bg-white rounded-xl shadow-md">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">{type === "login" ? "Login" : "Register"}</h1>
          <h2 className="text-lg font-semibold text-gray-600">Toko Emas Mulia Utama</h2>
          <p className="text-sm text-gray-500">Silakan {type === "login" ? "masuk" : "buat akun"} untuk melanjutkan</p>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
            className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-md transition disabled:opacity-50">
          {loading ? "Loading..." : type === "login" ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600">
          {type === "login" ? (
            <>
              Belum punya akun?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-yellow-600 font-medium hover:underline cursor-pointer">
                Daftar sekarang
              </span>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-yellow-600 font-medium hover:underline cursor-pointer">
                Login di sini
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
