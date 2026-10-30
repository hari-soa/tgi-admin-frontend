import {
  CONTAINER_WRAPPER,
  BANNER_CONTAINER,
  BANNER_TAG,
  BANNER_TITLE,
  BANNER_MOTTO,
  ACTIONS_CONTAINER,
  PRIMARY_ACTION_BUTTON,
  SECONDARY_ACTION_BUTTON,
  STATS_GRID,
  STAT_CARD,
  STAT_LABEL_BLUE,
  STAT_LABEL_EMERALD,
  STAT_LABEL_PURPLE,
  STAT_LABEL_CYAN,
  STAT_VALUE,
  SECTION_CONTAINER,
  SECTION_TITLE,
  PENDING_LIST_CONTAINER,
  EMPTY_TEXT,
  PENDING_ITEM_CARD,
  ITEM_HEADER,
  ITEM_TITLE,
  BADGE_VALIDATION,
  ITEM_SUBTITLE,
  VALIDATE_BUTTON,
} from "../../styles/AdminDashboardStyles";

export const AdminDashboard = ({
  currentUser,
  users,
  subjects,
  gradeSessions,
  announcements,
  setActiveModal,
  handleAdminValidateSession,
}) => {
  const pendingSessions = gradeSessions.filter(
    (session) => session.statut === "attente_validation",
  );

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={BANNER_CONTAINER}>
        <span className={BANNER_TAG}>Panneau de contrôle - Admin</span>
        <h2 className={BANNER_TITLE}>TGI - Technologie Générale Industriel</h2>
        <p className={BANNER_MOTTO}>"Miorim-paka hanasoa olona"</p>

        <div className={ACTIONS_CONTAINER}>
          <button
            onClick={() => setActiveModal("user")}
            className={PRIMARY_ACTION_BUTTON}
          >
            + Créer un utilisateur
          </button>
          <button
            onClick={() => setActiveModal("announcement")}
            className={SECONDARY_ACTION_BUTTON}
          >
            + Créer une annonce
          </button>
          <button
            onClick={() => setActiveModal("subject")}
            className={SECONDARY_ACTION_BUTTON}
          >
            + Créer une matière
          </button>
          <button
            onClick={() => setActiveModal("grade_session")}
            className={SECONDARY_ACTION_BUTTON}
          >
            + Créer une note
          </button>
          <button
            onClick={() => setActiveModal("pointage")}
            className={SECONDARY_ACTION_BUTTON}
          >
            + Créer un pointage
          </button>
        </div>
      </div>

      <div className={STATS_GRID}>
        <div className={STAT_CARD}>
          <span className={STAT_LABEL_BLUE}>Utilisateurs</span>
          <p className={STAT_VALUE}>{users.length}</p>
        </div>
        <div className={STAT_CARD}>
          <span className={STAT_LABEL_EMERALD}>Matières totales</span>
          <p className={STAT_VALUE}>{subjects.length}</p>
        </div>
        <div className={STAT_CARD}>
          <span className={STAT_LABEL_PURPLE}>Sessions de Notes</span>
          <p className={STAT_VALUE}>{gradeSessions.length}</p>
        </div>
        <div className={STAT_CARD}>
          <span className={STAT_LABEL_CYAN}>Annonces</span>
          <p className={STAT_VALUE}>{announcements.length}</p>
        </div>
      </div>

      <div className={SECTION_CONTAINER}>
        <h3 className={SECTION_TITLE}>Notes en cours de validation</h3>
        <div className={PENDING_LIST_CONTAINER}>
          {pendingSessions.length === 0 ? (
            <p className={EMPTY_TEXT}>Aucune session en cours de validation.</p>
          ) : (
            pendingSessions.map((session) => (
              <div key={session.id} className={PENDING_ITEM_CARD}>
                <div>
                  <div className={ITEM_HEADER}>
                    <h4 className={ITEM_TITLE}>
                      {session.matiere} ({session.classe})
                    </h4>
                    <span className={BADGE_VALIDATION}>Validation requise</span>
                  </div>
                  <p className={ITEM_SUBTITLE}>
                    Saisie complétée par la secrétaire.
                  </p>
                </div>
                <button
                  onClick={() => handleAdminValidateSession(session.id)}
                  className={VALIDATE_BUTTON}
                >
                  Valider & Injecter les notes
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
