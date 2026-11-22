import { callOperation } from "./api";

export const getStudentHistory = async (studentId) => {
  const data = await callOperation("getStudentHistory", {
    pathParams: { studentId },
  });
  return data.records;
};

export const getStudentRemarks = async (studentId) => {
  const data = await callOperation("getStudentRemarks", {
    pathParams: { studentId },
  });
  return data.remarks;
};

export const createHistoryRecord = async (recordData) => {
  const data = await callOperation("createHistoryRecord", {
    body: recordData,
  });
  return data.record;
};

export const createRemark = async (remarkData) => {
  const data = await callOperation("createRemark", { body: remarkData });
  return data.remark;
};
