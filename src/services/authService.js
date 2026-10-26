import { apiFetch, setAuthToken } from "./api";

export const loginUser = async (email, password) => {
  // Le backend attend "matricule" au lieu de "password"
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, matricule: password }),
  });

  // Si ton backend renvoie le token dans data.data.token (selon ton authController)
  const token = data?.data?.token || data?.token;

  if (token) {
    setAuthToken(token);
  }

  return data;
};

export const getCurrentUserProfile = async () => {
  const response = await apiFetch("/auth/me");
  return response?.data || response;
};

export const logoutUser = () => {
  setAuthToken(null);
};
