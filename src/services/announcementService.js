import { apiFetch, jsonBody } from "./api";

export const getAllAnnouncements = async () => {
  const data = await apiFetch("/announcements");
  return data.announcements;
};

export const createAnnouncement = async (announcementData) => {
  const data = await apiFetch("/announcements", {
    method: "POST",
    body: jsonBody(announcementData),
  });
  return data.announcement;
};

export const updateAnnouncement = async (announcementId, announcementData) => {
  const data = await apiFetch(`/announcements/${announcementId}`, {
    method: "PATCH",
    body: jsonBody(announcementData),
  });
  return data.announcement;
};

export const deleteAnnouncement = async (announcementId) => {
  await apiFetch(`/announcements/${announcementId}`, { method: "DELETE" });
};
