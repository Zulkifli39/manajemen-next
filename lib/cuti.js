import api from "./api.js";

export async function getAllCuti() {
  return await api.get("/cuti");
}

export async function getCutiById(id) {
  return await api.get(`/cuti/${id}`);
}

export async function createCuti(data) {
  return await api.post("/cuti", data);
}

export async function updateCuti(id, data) {
  return await api.put(`/cuti/${id}`, data);
}

export async function deleteCuti(id) {
  return await api.delete(`/cuti/${id}`);
}
