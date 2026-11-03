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
} from "../../styles/AnnouncementsStyles";

export const Announcements = ({
  currentUser,
  announcements = [],
  setActiveModal,
  onDeleteAnnouncement,
  onSelectAnnouncementToEdit, // Fonction pour charger l'annonce à modifier dans le formulaire
}) => {
  const validAnnouncements = Array.isArray(announcements)
    ? announcements
    : announcements?.announcements || announcements?.data?.announcements || [];

  const isAdmin = currentUser?.role?.toUpperCase() === "ADMIN";

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
          <button
            onClick={() => {
              if (onSelectAnnouncementToEdit) onSelectAnnouncementToEdit(null); // Mode création (vide)
              setActiveModal("announcement");
            }}
            className={BROADCAST_BUTTON}
          >
            + Diffuser une annonce
          </button>
        )}
      </div>

      <div className={GRID_CONTAINER}>
        {validAnnouncements.map((ann) => {
          const isUrgent = ann.priority === "URGENT";
          return (
            <div
              key={ann.id}
              className={`${isUrgent ? CARD_URGENT : CARD_NORMAL} relative group`}
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  {onSelectAnnouncementToEdit && (
                    <button
                      onClick={() => {
                        onSelectAnnouncementToEdit(ann); // Charge les données de l'annonce dans le state du formulaire
                        setActiveModal("announcement");
                      }}
                      className="text-slate-400 hover:text-blue-400 transition-colors p-1"
                      title="Modifier l'annonce"
                    >
                      ✏️
                    </button>
                  )}
                  {onDeleteAnnouncement && (
                    <button
                      onClick={() => onDeleteAnnouncement(ann.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors p-1"
                      title="Supprimer l'annonce"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              )}

              <div className={CARD_HEADER}>
                <span className={isUrgent ? BADGE_URGENT : BADGE_NORMAL}>
                  {isUrgent ? "Urgent" : "Général"}
                </span>
                <span className={DATE_TEXT}>
                  {ann.createdAt
                    ? new Date(ann.createdAt).toLocaleDateString()
                    : "Récemment"}
                </span>
              </div>
              <h3 className={TITLE_TEXT}>{ann.title}</h3>
              <p className={CONTEXT_TEXT}>{ann.content}</p>
              <span className={FOOTER_META}>
                Cible :{" "}
                <span className={TARGET_TEXT}>
                  {ann.targetScope || "ALL"}
                  {ann.targetValue ? ` (${ann.targetValue})` : ""}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
