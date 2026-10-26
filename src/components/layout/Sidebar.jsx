import React from "react";
import logoImage from "../../assets/logo-tgi.jpg";
import {
  SIDEBAR_CONTAINER,
  HEADER_CONTAINER,
  LOGO_IMAGE,
  SCHOOL_TITLE,
  SCHOOL_SUBTITLE,
  NAV_CONTAINER,
  NAV_BUTTON_ACTIVE,
  NAV_BUTTON_INACTIVE,
  NAV_ICON,
  FOOTER_CONTAINER,
  LOGOUT_BUTTON,
  LOGOUT_ICON,
} from "../../styles/SidebarStyles";

export const Sidebar = ({
  currentUser,
  activeTab,
  setActiveTab,
  setTargetStudent,
  handleLogout,
}) => {
  const userRole = currentUser?.role?.toLowerCase() || "";

  const renderIcon = (type) => {
    switch (type) {
      case "dashboard":
        return (
          <svg
            className={NAV_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            className={NAV_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "personnel":
        return (
          <svg
            className={NAV_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "attendance":
        return (
          <svg
            className={NAV_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        );
      case "announcements":
        return (
          <svg
            className={NAV_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        );
      case "profile":
        return (
          <svg
            className={NAV_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "grades":
        return (
          <svg
            className={NAV_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
      default:
        return (
          <svg
            className={NAV_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <aside className={SIDEBAR_CONTAINER}>
      <div className={HEADER_CONTAINER}>
        <img src={logoImage} alt="School Logo" className={LOGO_IMAGE} />
        <div>
          <h2 className={SCHOOL_TITLE}>Collège Saint Michel</h2>
          <span className={SCHOOL_SUBTITLE}>TGI - Amparibe</span>
        </div>
      </div>

      <nav className={NAV_CONTAINER}>
        {userRole === "admin" && (
          <>
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setTargetStudent(null);
              }}
              className={
                activeTab === "dashboard"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("dashboard")}
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("etudiants");
                setTargetStudent(null);
              }}
              className={
                activeTab === "etudiants"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("users")}
              <span>Liste des étudiants</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("personnel");
                setTargetStudent(null);
              }}
              className={
                activeTab === "personnel"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("personnel")}
              <span>Liste du personnel</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("pointage");
                setTargetStudent(null);
              }}
              className={
                activeTab === "pointage"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("attendance")}
              <span>Pointage Professeurs</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("annonces");
                setTargetStudent(null);
              }}
              className={
                activeTab === "annonces"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("announcements")}
              <span>Annonces</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("profil");
                setTargetStudent(null);
              }}
              className={
                activeTab === "profil" ? NAV_BUTTON_ACTIVE : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("profile")}
              <span>Mon profil</span>
            </button>
          </>
        )}

        {(userRole === "secretaire" || userRole === "secretary") && (
          <>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={
                activeTab === "dashboard"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("dashboard")}
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("notes_secr")}
              className={
                activeTab === "notes_secr"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("grades")}
              <span>Gestion des Notes</span>
            </button>
            <button
              onClick={() => setActiveTab("personnel")}
              className={
                activeTab === "personnel"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("personnel")}
              <span>Liste du personnel</span>
            </button>
            <button
              onClick={() => setActiveTab("profil")}
              className={
                activeTab === "profil" ? NAV_BUTTON_ACTIVE : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("profile")}
              <span>Mon profil</span>
            </button>
          </>
        )}

        {(userRole === "student" || userRole === "ancien") && (
          <>
            <button
              onClick={() => setActiveTab("accueil")}
              className={
                activeTab === "accueil"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("dashboard")}
              <span>Accueil</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={
                activeTab === "notes" ? NAV_BUTTON_ACTIVE : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("grades")}
              <span>Notes & Bulletins</span>
            </button>
            <button
              onClick={() => setActiveTab("historique_remarque")}
              className={
                activeTab === "historique_remarque"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("attendance")}
              <span>Historique & Remarques</span>
            </button>
            <button
              onClick={() => setActiveTab("personnel")}
              className={
                activeTab === "personnel"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("personnel")}
              <span>Liste du personnel</span>
            </button>
            <button
              onClick={() => setActiveTab("annonces")}
              className={
                activeTab === "annonces"
                  ? NAV_BUTTON_ACTIVE
                  : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("announcements")}
              <span>Annonces</span>
            </button>
            <button
              onClick={() => setActiveTab("profil")}
              className={
                activeTab === "profil" ? NAV_BUTTON_ACTIVE : NAV_BUTTON_INACTIVE
              }
            >
              {renderIcon("profile")}
              <span>Mon profil</span>
            </button>
          </>
        )}
      </nav>

      <div className={FOOTER_CONTAINER}>
        <button onClick={handleLogout} className={LOGOUT_BUTTON}>
          <svg
            className={LOGOUT_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
