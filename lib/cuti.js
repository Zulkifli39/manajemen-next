// lib/api/cuti.js
import api from "./api.js";

export async function getAllCuti(token) {
  return await api.get("/cuti", token);
}

export async function getCutiById(id, token) {
  return await api.get(`/cuti/${id}`, token);
}

export async function createCuti(data, token) {
  return await api.post("/cuti", data, token);
}

export async function updateCuti(id, data, token) {
  return await api.put(`/cuti/${id}`, data, token);
}

export async function deleteCuti(id, token) {
  return await api.delete(`/cuti/${id}`, token);
}
