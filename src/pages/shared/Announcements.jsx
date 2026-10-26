import React from "react";
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
  announcements,
  setActiveModal,
}) => {
  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={HEADER_SECTION}>
        <div>
          <h2 className={HEADER_TITLE}>Annonces Diffusées</h2>
          <p className={HEADER_SUBTITLE}>
            Communications officielles archivées
          </p>
        </div>
        {currentUser?.role === "admin" && (
          <button
            onClick={() => setActiveModal("announcement")}
            className={BROADCAST_BUTTON}
          >
            + Diffuser une annonce
          </button>
        )}
      </div>

      <div className={GRID_CONTAINER}>
        {announcements.map((ann) => (
          <div key={ann.id} className={ann.urgent ? CARD_URGENT : CARD_NORMAL}>
            <div className={CARD_HEADER}>
              <span className={ann.urgent ? BADGE_URGENT : BADGE_NORMAL}>
                {ann.urgent ? "Urgent" : "Général"}
              </span>
              <span className={DATE_TEXT}>{ann.date || "Récemment"}</span>
            </div>
            <h3 className={TITLE_TEXT}>{ann.title}</h3>
            <p className={CONTEXT_TEXT}>{ann.context}</p>
            <span className={FOOTER_META}>
              Cible : <span className={TARGET_TEXT}>{ann.cible || "tout"}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
