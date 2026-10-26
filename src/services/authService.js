import { apiFetch, setAuthToken } from "./api";

export const loginUser = async (email, password) => {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data && data.token) {
    setAuthToken(data.token);
  }

  return data;
};

export const getCurrentUserProfile = async () => {
  return await apiFetch("/auth/me");
};

export const logoutUser = () => {
  setAuthToken(null);
};
