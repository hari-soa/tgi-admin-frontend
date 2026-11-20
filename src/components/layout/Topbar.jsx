import {
  TOPBAR_CONTAINER,
  TITLE_CONTAINER,
  TITLE_TEXT,
  ACTIONS_CONTAINER,
  PROFILE_WRAPPER,
  PROFILE_IMAGE,
  PROFILE_TEXT_CONTAINER,
  PROFILE_NAME,
  PROFILE_META,
  ROLE_BADGE,
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from "../../styles/TopbarStyles";
import { getAvatarSource } from "../../utils/helpers";

const TAB_TITLES = {
  dashboard: "Dashboard",
  home: "Accueil",
  students: "Liste des étudiants",
  staff: "Liste du personnel",
  attendance: "Pointage des professeurs",
  announcements: "Annonces",
  profile: "Mon profil",
  grades: "Mes notes",
  history: "Historique et remarques",
  "grade-sessions": "Gestion des notes",
};

export const Topbar = ({ currentUser, activeTab }) => {
  return (
    <header className={TOPBAR_CONTAINER}>
      <div className={TITLE_CONTAINER}>
        <h1 className={TITLE_TEXT}>{TAB_TITLES[activeTab] || activeTab}</h1>
      </div>

      <div className={ACTIONS_CONTAINER}>
        <div className={PROFILE_WRAPPER}>
          <img
            src={getAvatarSource(currentUser)}
            alt="profile"
            className={PROFILE_IMAGE}
          />
          <div className={PROFILE_TEXT_CONTAINER}>
            <p className={PROFILE_NAME}>
              {currentUser?.firstName || "Utilisateur"}
            </p>
            <div className={PROFILE_META}>
              <span className={ROLE_BADGE}>{currentUser?.role || "USER"}</span>
              <span
                className={
                  currentUser?.isActive !== false
                    ? STATUS_ACTIVE
                    : STATUS_INACTIVE
                }
              ></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
