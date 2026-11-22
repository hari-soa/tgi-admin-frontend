import { API_ORIGIN, callOperation } from "./api";

export const getGradeSessions = async () => {
  const data = await callOperation("listGradeSessions");
  return data.sessions;
};

export const createGradeSession = async (sessionData) => {
  const data = await callOperation("createGradeSession", {
    body: sessionData,
  });
  return data.session;
};

export const saveGradeSessionDraft = async (sessionId, grades) => {
  const data = await callOperation("saveGradeSessionDraft", {
    pathParams: { id: sessionId },
    body: { grades },
  });
  return data.session;
};

export const submitGradeSession = async (sessionId, grades) => {
  const data = await callOperation("submitGradeSession", {
    pathParams: { id: sessionId },
    body: { grades },
  });
  return data.session;
};

export const reviseGradeSession = async (sessionId, grades, absences) => {
  const data = await callOperation("reviseGradeSession", {
    pathParams: { id: sessionId },
    body: { grades, absences },
  });
  return data.session;
};

export const validateGradeSession = async (sessionId) => {
  const data = await callOperation("validateGradeSession", {
    pathParams: { id: sessionId },
  });
  return data.session;
};

export const getStudentResults = async (studentId) => {
  const data = await callOperation("getStudentResults", {
    pathParams: { studentId },
  });
  return data.results;
};

export const exportResultPdf = async (resultId) => {
  const data = await callOperation("exportResultPdf", {
    pathParams: { id: resultId },
  });
  return `${API_ORIGIN}${data.pdfUrl}`;
};
