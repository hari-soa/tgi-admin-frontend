import { apiFetch } from "./api";

export const getAllGrades = async () => {
  return await apiFetch("/grades");
};

export const getGradeById = async (gradeId) => {
  return await apiFetch(`/grades/${gradeId}`);
};

export const createGrade = async (gradeData) => {
  return await apiFetch("/grades", {
    method: "POST",
    body: JSON.stringify(gradeData),
  });
};

export const updateGrade = async (gradeId, gradeData) => {
  return await apiFetch(`/grades/${gradeId}`, {
    method: "PUT",
    body: JSON.stringify(gradeData),
  });
};

export const deleteGrade = async (gradeId) => {
  return await apiFetch(`/grades/${gradeId}`, {
    method: "DELETE",
  });
};

export const submitGradeSession = async (sessionData) => {
  return await apiFetch("/grades/session", {
    method: "POST",
    body: JSON.stringify(sessionData),
  });
};

export const reviewGrade = async (gradeId, reviewData) => {
  return await apiFetch(`/grades/${gradeId}/review`, {
    method: "PATCH",
    body: JSON.stringify(reviewData),
  });
};

export const getStudentResults = async (studentId) => {
  return await apiFetch(`/results/student/${studentId}`);
};

export const getResultById = async (resultId) => {
  return await apiFetch(`/results/${resultId}`);
};

export const createAnnualResult = async (resultData) => {
  return await apiFetch("/results", {
    method: "POST",
    body: JSON.stringify(resultData),
  });
};

export const reviewAnnualResult = async (resultId, reviewData) => {
  return await apiFetch(`/results/${resultId}/review`, {
    method: "PATCH",
    body: JSON.stringify(reviewData),
  });
};

export const exportBulletinPdf = async (resultId) => {
  return await apiFetch(`/results/${resultId}/pdf`);
};
