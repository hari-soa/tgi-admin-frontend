import { apiFetch } from "./api";

export const getAllSubjects = async () => {
  return await apiFetch("/subjects");
};

export const getSubjectById = async (subjectId) => {
  return await apiFetch(`/subjects/${subjectId}`);
};

export const createSubject = async (subjectData) => {
  return await apiFetch("/subjects", {
    method: "POST",
    body: JSON.stringify(subjectData),
  });
};

export const deleteSubject = async (subjectId) => {
  return await apiFetch(`/subjects/${subjectId}`, {
    method: "DELETE",
  });
};
