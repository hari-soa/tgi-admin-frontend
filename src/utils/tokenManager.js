export const TOKEN_STORAGE_KEY = "token";
export const USER_STORAGE_KEY = "user";

export const saveAuthData = (token, user) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};
