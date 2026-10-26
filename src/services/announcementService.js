import { apiFetch } from "./api";

export const getAllAnnouncements = async () => {
  return await apiFetch("/announcements");
};

export const getAnnouncementById = async (announcementId) => {
  return await apiFetch(`/announcements/${announcementId}`);
};

export const createAnnouncement = async (announcementData) => {
  return await apiFetch("/announcements", {
    method: "POST",
    body: JSON.stringify(announcementData),
  });
};

export const deleteAnnouncement = async (announcementId) => {
  return await apiFetch(`/announcements/${announcementId}`, {
    method: "DELETE",
  });
};
