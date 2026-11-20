import {
  CONTAINER_WRAPPER,
  HEADER_SECTION,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  BROADCAST_BUTTON,
  GRID_CONTAINER,
  CARD_URGENT,
  CARD_NORMAL,
  CARD_HEADER,
  BADGE_URGENT,
  BADGE_NORMAL,
  DATE_TEXT,
  TITLE_TEXT,
  CONTEXT_TEXT,
  FOOTER_META,
  TARGET_TEXT,
  CARD_LAYOUT,
  CARD_FOOTER,
  ACTIONS_GROUP,
  EDIT_BUTTON,
  DELETE_BUTTON,
} from "../../styles/AnnouncementsStyles";
import { CLASS_GROUP_LABELS, formatDate } from "../../utils/labels";

const DEFAULT_ANNOUNCEMENT_FORM = { targetScope: "ALL", priority: "NORMAL" };

const describeTarget = (announcement) =>
  announcement.targetScope === "CLASS"
    ? announcement.targetClasses
        .map((classGroup) => CLASS_GROUP_LABELS[classGroup])
        .join(", ")
    : "Tout le monde";

export const Announcements = ({
  currentUser,
  announcements,
  setActiveModal,
  onDeleteAnnouncement,
  setFormState,
}) => {
  const isAdmin = currentUser.role === "ADMIN";

  const handleCreate = () => {
    setFormState(DEFAULT_ANNOUNCEMENT_FORM);
    setActiveModal("announcement");
  };

  const handleEdit = (announcement) => {
    setFormState(announcement);
    setActiveModal("announcement");
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={HEADER_SECTION}>
        <div>
          <h2 className={HEADER_TITLE}>Annonces Diffusées</h2>
          <p className={HEADER_SUBTITLE}>
            Communications officielles archivées
          </p>
        </div>
        {isAdmin && (
          <button onClick={handleCreate} className={BROADCAST_BUTTON}>
            + Diffuser une annonce
          </button>
        )}
      </div>

      <div className={GRID_CONTAINER}>
        {announcements.map((announcement) => {
          const isUrgent = announcement.priority === "URGENT";
          return (
            <div
              key={announcement.id}
              className={`${isUrgent ? CARD_URGENT : CARD_NORMAL} ${CARD_LAYOUT}`}
            >
              <div>
                <div className={CARD_HEADER}>
                  <span className={isUrgent ? BADGE_URGENT : BADGE_NORMAL}>
                    {isUrgent ? "Urgent" : "Général"}
                  </span>
                  <span className={DATE_TEXT}>
                    {formatDate(announcement.createdAt)}
                  </span>
                </div>
                <h3 className={TITLE_TEXT}>{announcement.title}</h3>
                <p className={CONTEXT_TEXT}>{announcement.content}</p>
              </div>
              <div className={CARD_FOOTER}>
                <span className={FOOTER_META}>
                  Cible :{" "}
                  <span className={TARGET_TEXT}>
                    {describeTarget(announcement)}
                  </span>
                </span>
                {isAdmin && (
                  <div className={ACTIONS_GROUP}>
                    <button
                      onClick={() => handleEdit(announcement)}
                      className={EDIT_BUTTON}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDeleteAnnouncement(announcement.id)}
                      className={DELETE_BUTTON}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
