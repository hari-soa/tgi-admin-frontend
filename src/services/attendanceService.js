import { apiFetch, jsonBody } from "./api";

export const getDailyAttendance = async (dayOfWeek, attendanceDate) => {
  const query = new URLSearchParams({ day: dayOfWeek, date: attendanceDate });
  const data = await apiFetch(`/attendance/daily?${query}`);
  return data.cards;
};

export const createAttendanceSlot = async (slotData) => {
  const data = await apiFetch("/attendance/slots", {
    method: "POST",
    body: jsonBody(slotData),
  });
  return data.slot;
};

export const updateAttendanceSlot = async (slotId, slotData) => {
  const data = await apiFetch(`/attendance/slots/${slotId}`, {
    method: "PATCH",
    body: jsonBody(slotData),
  });
  return data.slot;
};

export const deleteAttendanceSlot = async (slotId) => {
  await apiFetch(`/attendance/slots/${slotId}`, { method: "DELETE" });
};

export const checkAttendance = async (slotId, attendanceDate) => {
  const data = await apiFetch("/attendance/check", {
    method: "POST",
    body: jsonBody({ slotId, attendanceDate }),
  });
  return data.attendance;
};

export const markAbsence = async (slotId, attendanceDate, motif) => {
  const data = await apiFetch("/attendance/absence", {
    method: "POST",
    body: jsonBody({ slotId, attendanceDate, motif }),
  });
  return data.attendance;
};
