import { callOperation } from "./api";

export const getAllAnnouncements = async () => {
  const data = await callOperation("listAnnouncements");
  return data.announcements;
};

export const createAnnouncement = async (announcementData) => {
  const data = await callOperation("createAnnouncement", {
    body: announcementData,
  });
  return data.announcement;
};

export const updateAnnouncement = async (announcementId, announcementData) => {
  const data = await callOperation("updateAnnouncement", {
    pathParams: { id: announcementId },
    body: announcementData,
  });
  return data.announcement;
};

export const deleteAnnouncement = async (announcementId) => {
  await callOperation("deleteAnnouncement", {
    pathParams: { id: announcementId },
  });
};
