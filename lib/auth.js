import api from "./api";

export async function loginUser({username, password}) {
  try {
    const res = await api.post("/auth/login", {username, password});
    const data = res.data;

    const userData = {
      username: data.user.username,
      role: data.user.role,
      token: data.token,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  } catch (err) {
    console.error("Login error:", err);
    throw new Error(err.response?.data?.message || "Login gagal");
  }
}

export async function registerUser({username, password}) {
  try {
    const res = await api.post("/auth/register", {username, password});
    return res.data;
  } catch (err) {
    console.error("Register error:", err);
    throw new Error(err.response?.data?.message || "Register gagal");
  }
}
