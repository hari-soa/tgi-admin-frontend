const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_STORAGE_KEY = "token";

/** Origin of the API server, used to open files served outside /api/v1 (PDFs). */
export const API_ORIGIN = new URL(API_URL, window.location.origin).origin;

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

/**
 * Calls the API and returns the `data` object of the response envelope
 * ({ status, message, data }). Responses without a body (204) give null.
 */
export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const validationDetails = body?.errors
      ?.map((error) => `${error.field}: ${error.message}`)
      .join(", ");
    const message = body?.message || response.statusText;
    throw new Error(
      validationDetails ? `${message} (${validationDetails})` : message,
    );
  }

  return body?.data ?? null;
};

export const jsonBody = (payload) => JSON.stringify(payload);
