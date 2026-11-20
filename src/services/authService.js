import { apiFetch, jsonBody, setAuthToken } from "./api";

/** The API calls the password "matricule". Stores the token and returns { token, user }. */
export const loginUser = async (email, matricule) => {
  const loginResult = await apiFetch("/auth/login", {
    method: "POST",
    body: jsonBody({ email, matricule }),
  });

  setAuthToken(loginResult.token);
  return loginResult;
};

export const getCurrentUserProfile = async () => {
  const data = await apiFetch("/auth/me");
  return data.user;
};

export const logoutUser = () => {
  setAuthToken(null);
};
