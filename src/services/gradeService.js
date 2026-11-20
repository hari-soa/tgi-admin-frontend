import { API_ORIGIN, apiFetch, jsonBody } from "./api";

export const getGradeSessions = async () => {
  const data = await apiFetch("/grades/sessions");
  return data.sessions;
};

export const createGradeSession = async (sessionData) => {
  const data = await apiFetch("/grades/sessions", {
    method: "POST",
    body: jsonBody(sessionData),
  });
  return data.session;
};

export const saveGradeSessionDraft = async (sessionId, grades) => {
  const data = await apiFetch(`/grades/sessions/${sessionId}/draft`, {
    method: "PUT",
    body: jsonBody({ grades }),
  });
  return data.session;
};

export const submitGradeSession = async (sessionId, grades) => {
  const data = await apiFetch(`/grades/sessions/${sessionId}/submit`, {
    method: "POST",
    body: jsonBody({ grades }),
  });
  return data.session;
};

export const validateGradeSession = async (sessionId) => {
  const data = await apiFetch(`/grades/sessions/${sessionId}/validate`, {
    method: "PATCH",
  });
  return data.session;
};

export const getStudentResults = async (studentId) => {
  const data = await apiFetch(`/results/student/${studentId}`);
  return data.results;
};

/** Generates the PDF of a bulletin and returns its absolute URL. */
export const exportResultPdf = async (resultId) => {
  const data = await apiFetch(`/results/${resultId}/pdf`);
  return `${API_ORIGIN}${data.pdfUrl}`;
};
