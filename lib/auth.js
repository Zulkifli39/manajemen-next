export function getUser() {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
}

export function getUserRole() {
  return getUser()?.role || null;
}

export function getUsername() {
  return getUser()?.username || null;
}

export function isAuthenticated() {
  return !!getUser();
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}
