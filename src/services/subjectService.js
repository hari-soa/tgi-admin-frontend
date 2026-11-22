import { callOperation } from "./api";

export const getAllSubjects = async () => {
  const data = await callOperation("listSubjects");
  return data.subjects;
};

export const createSubject = async (subjectData) => {
  const data = await callOperation("createSubject", { body: subjectData });
  return data.subject;
};

export const updateSubject = async (subjectId, subjectData) => {
  const data = await callOperation("updateSubject", {
    pathParams: { id: subjectId },
    body: subjectData,
  });
  return data.subject;
};

export const deleteSubject = async (subjectId) => {
  await callOperation("deleteSubject", { pathParams: { id: subjectId } });
};
