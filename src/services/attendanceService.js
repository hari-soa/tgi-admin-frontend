import { callOperation } from "./api";

export const getDailyAttendance = async (dayOfWeek, attendanceDate) => {
  const data = await callOperation("getDailyAttendance", {
    query: { day: dayOfWeek, date: attendanceDate },
  });
  return data.cards;
};

export const createAttendanceSlot = async (slotData) => {
  const data = await callOperation("createAttendanceSlot", { body: slotData });
  return data.slot;
};

export const updateAttendanceSlot = async (slotId, slotData) => {
  const data = await callOperation("updateAttendanceSlot", {
    pathParams: { slotId },
    body: slotData,
  });
  return data.slot;
};

export const deleteAttendanceSlot = async (slotId) => {
  await callOperation("deleteAttendanceSlot", { pathParams: { slotId } });
};

export const checkAttendance = async (slotId, attendanceDate) => {
  const data = await callOperation("checkAttendance", {
    body: { slotId, attendanceDate },
  });
  return data.attendance;
};

export const markAbsence = async (slotId, attendanceDate, motif) => {
  const data = await callOperation("markAttendanceAbsence", {
    body: { slotId, attendanceDate, motif },
  });
  return data.attendance;
};
