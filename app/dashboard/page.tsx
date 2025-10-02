"use client";
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

const data = [
  {name: "Jan", uv: 400},
  {name: "Feb", uv: 300},
  {name: "Mar", uv: 450},
  {name: "Apr", uv: 320},
  {name: "Mei", uv: 500},
  {name: "Jun", uv: 600},
  {name: "Jul", uv: 550},
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Card Statistik */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Total Karyawan</p>
          <h2 className="text-xl font-bold">125</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Total Cuti</p>
          <h2 className="text-xl font-bold">32</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Total Pendapatan</p>
          <h2 className="text-xl font-bold">Rp 500M</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Rata-rata Pendapatan</p>
          <h2 className="text-xl font-bold">Rp 4jt</h2>
        </div>
      </div>

      {/* Grafik */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold">Grafik Pendapatan</h2>
        <p className="text-2xl font-bold text-yellow-600">Rp 500.000.000</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
