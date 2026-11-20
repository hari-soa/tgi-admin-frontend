import { apiFetch, jsonBody } from "./api";

export const getAllSubjects = async () => {
  const data = await apiFetch("/subjects");
  return data.subjects;
};

export const createSubject = async (subjectData) => {
  const data = await apiFetch("/subjects", {
    method: "POST",
    body: jsonBody(subjectData),
  });
  return data.subject;
};

export const updateSubject = async (subjectId, subjectData) => {
  const data = await apiFetch(`/subjects/${subjectId}`, {
    method: "PATCH",
    body: jsonBody(subjectData),
  });
  return data.subject;
};

export const deleteSubject = async (subjectId) => {
  await apiFetch(`/subjects/${subjectId}`, { method: "DELETE" });
};
