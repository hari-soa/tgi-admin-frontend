import { apiFetch } from "./api";

export const getGradeById = async (gradeId) => {
  return await apiFetch(`/grades/${gradeId}`);
};

export const createGrade = async (gradeData) => {
  return await apiFetch("/grades", {
    method: "POST",
    body: JSON.stringify(gradeData),
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

export const createAnnualResult = async (resultData) => {
  return await apiFetch("/results", {
    method: "POST",
    body: JSON.stringify(resultData),
  });
};
