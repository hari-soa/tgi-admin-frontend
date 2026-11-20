import { apiFetch, jsonBody } from "./api";

export const getStudentHistory = async (studentId) => {
  const data = await apiFetch(`/disciplinary/history/student/${studentId}`);
  return data.records;
};

export const getStudentRemarks = async (studentId) => {
  const data = await apiFetch(`/disciplinary/remarks/student/${studentId}`);
  return data.remarks;
};

export const createHistoryRecord = async (recordData) => {
  const data = await apiFetch("/disciplinary/history", {
    method: "POST",
    body: jsonBody(recordData),
  });
  return data.record;
};

export const createRemark = async (remarkData) => {
  const data = await apiFetch("/disciplinary/remarks", {
    method: "POST",
    body: jsonBody(remarkData),
  });
  return data.remark;
};
