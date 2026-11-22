import { callOperation, setAuthToken } from "./api";

export const loginUser = async (email, matricule) => {
  const loginResult = await callOperation("login", {
    body: { email, matricule },
  });

  setAuthToken(loginResult.token);
  return loginResult;
};

export const getCurrentUserProfile = async () => {
  const data = await callOperation("getAuthenticatedUser");
  return data.user;
};

export const logoutUser = () => {
  setAuthToken(null);
};
