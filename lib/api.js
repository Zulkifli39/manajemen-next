export async function loginUser({username, password}) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password}),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login gagal");
  }

  const data = await res.json();
  // 🔹 Sesuaikan format agar frontend selalu dapat { username, role, token }
  return {
    username: data.user.username,
    role: data.user.role,
    token: data.token,
  };
}

export async function registerUser({username, password}) {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password}),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Register gagal");
  }

  return res.json(); // backend sudah balikin user baru
}
