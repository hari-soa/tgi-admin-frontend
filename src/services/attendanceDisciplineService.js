import { apiFetch } from "./api";

// Teacher Attendance / Slots
export const createAttendanceSlot = async (slotData) => {
  return await apiFetch("/attendance/slots", {
    method: "POST",
    body: JSON.stringify(slotData),
  });
};

export const getDailyAttendance = async () => {
  return await apiFetch("/attendance/daily");
};

export const checkAttendance = async (checkData) => {
  return await apiFetch("/attendance/check", {
    method: "POST",
    body: JSON.stringify(checkData),
  });
};

export const updateAttendanceMotif = async (slotId, motifData) => {
  return await apiFetch(`/attendance/slots/${slotId}/motif`, {
    method: "PATCH",
    body: JSON.stringify(motifData),
  });
};

// Disciplinary History & Remarks
export const createHistoryRecord = async (historyData) => {
  return await apiFetch("/discipline/history", {
    method: "POST",
    body: JSON.stringify(historyData),
  });
};

export const updateHistoryRecord = async (historyId, historyData) => {
  return await apiFetch(`/discipline/history/${historyId}`, {
    method: "PATCH",
    body: JSON.stringify(historyData),
  });
};

export const deleteHistoryRecord = async (historyId) => {
  return await apiFetch(`/discipline/history/${historyId}`, {
    method: "DELETE",
  });
};

export const createRemarkRecord = async (remarkData) => {
  return await apiFetch("/discipline/remarks", {
    method: "POST",
    body: JSON.stringify(remarkData),
  });
};

export const updateRemarkRecord = async (remarkId, remarkData) => {
  return await apiFetch(`/discipline/remarks/${remarkId}`, {
    method: "PATCH",
    body: JSON.stringify(remarkData),
  });
};

export const deleteRemarkRecord = async (remarkId) => {
  return await apiFetch(`/discipline/remarks/${remarkId}`, {
    method: "DELETE",
  });
};
