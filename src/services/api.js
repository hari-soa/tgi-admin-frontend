import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_STORAGE_KEY = "token";
const REQUEST_TIMEOUT_MS = 15000;
const SPECIFICATION_PATH = "/spec";
const HTTP_METHODS = ["get", "post", "put", "patch", "delete"];

export const CONNECTION_ERROR_MESSAGE =
  "Pas de connexion, veuillez réessayer";

export const API_ORIGIN = new URL(API_URL, window.location.origin).origin;

export class ConnectionError extends Error {
  constructor() {
    super(CONNECTION_ERROR_MESSAGE);
    this.name = "ConnectionError";
  }
}

const getAuthToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

const httpClient = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((requestConfig) => {
  const token = getAuthToken();
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});

const buildServerErrorMessage = (responseBody, fallbackMessage) => {
  const validationDetails = responseBody?.errors
    ?.map((error) => `${error.field}: ${error.message}`)
    .join(", ");
  const message = responseBody?.message || fallbackMessage;
  return validationDetails ? `${message} (${validationDetails})` : message;
};

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new ConnectionError());
    }
    return Promise.reject(
      new Error(
        buildServerErrorMessage(error.response.data, error.response.statusText),
      ),
    );
  },
);

const specificationCache = { request: null, operations: null };

const indexOperations = (specification) =>
  Object.fromEntries(
    Object.entries(specification.paths).flatMap(([path, pathItem]) =>
      HTTP_METHODS.filter((method) => pathItem[method]).map((method) => [
        pathItem[method].operationId,
        { path, method },
      ]),
    ),
  );

const loadOperations = () => {
  if (!specificationCache.request) {
    specificationCache.request = httpClient
      .get(SPECIFICATION_PATH)
      .then((response) => {
        specificationCache.operations = indexOperations(response.data);
        return specificationCache.operations;
      })
      .catch((error) => {
        specificationCache.request = null;
        throw error;
      });
  }
  return specificationCache.request;
};

const fillPathParameters = (path, pathParams) =>
  path.replace(/\{(\w+)\}/g, (_match, name) =>
    encodeURIComponent(pathParams[name]),
  );

export const callOperation = async (
  operationId,
  { pathParams = {}, query, body } = {},
) => {
  const operations = await loadOperations();
  const operation = operations[operationId];

  if (!operation) {
    throw new Error(`Opération inconnue dans la spécification : ${operationId}`);
  }

  const response = await httpClient.request({
    url: fillPathParameters(operation.path, pathParams),
    method: operation.method,
    params: query,
    data: body,
  });

  return response.data?.data ?? null;
};
