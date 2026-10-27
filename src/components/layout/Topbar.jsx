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

export const Topbar = ({ currentUser, activeTab }) => {
  return (
    <header className={TOPBAR_CONTAINER}>
      <div className={TITLE_CONTAINER}>
        <h1 className={TITLE_TEXT}>
          {activeTab === "dashboard"
            ? "Dashboard"
            : activeTab === "accueil"
              ? "Accueil"
              : activeTab.replace("_", " ")}
        </h1>
      </div>

      <div className={ACTIONS_CONTAINER}>
        <div className={PROFILE_WRAPPER}>
          <img
            src={currentUser?.photo}
            alt="profile"
            className={PROFILE_IMAGE}
          />
          <div className={PROFILE_TEXT_CONTAINER}>
            <p className={PROFILE_NAME}>{currentUser?.prenom}</p>
            <div className={PROFILE_META}>
              <span className={ROLE_BADGE}>{currentUser?.role}</span>
              <span
                className={
                  currentUser?.statut === "active"
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
