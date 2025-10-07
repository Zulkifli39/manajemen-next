// lib/api/karyawan.js
import api from "./api.js";

export async function getAllKaryawan(token) {
  return await api.get("/karyawan", token);
}

export async function getKaryawanById(id, token) {
  return await api.get(`/karyawan/${id}`, token);
}

export async function createKaryawan(data, token) {
  return await api.post("/karyawan", data, token);
}

export async function updateKaryawan(id, data, token) {
  return await api.put(`/karyawan/${id}`, data, token);
}

export async function deleteKaryawan(id, token) {
  return await api.delete(`/karyawan/${id}`, token);
}
