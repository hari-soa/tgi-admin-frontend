import {
  CONTAINER_WRAPPER,
  BANNER_CONTAINER,
  BANNER_TAG,
  BANNER_TITLE,
  BANNER_DESCRIPTION,
  SECTION_CONTAINER,
  SECTION_TITLE,
  SESSIONS_LIST,
  EMPTY_TEXT,
  SESSION_CARD,
  CARD_HEADER_ROW,
  SUBJECT_TITLE,
  CLASS_BADGE,
  STATUS_BADGE,
  CARD_META,
  ACTION_BUTTON,
} from "../../styles/SecretaryDashboardStyles";

export const SecretaryDashboard = ({
  gradeSessions,
  setActiveGradeSession,
  setActiveTab,
}) => {
  const pendingOrDraftSessions = gradeSessions.filter(
    (session) =>
      session.statut === "attente_saisie" || session.statut === "brouillon",
  );

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={BANNER_CONTAINER}>
        <span className={BANNER_TAG}>Secrétariat </span>
        <h2 className={BANNER_TITLE}>Espace de Gestion des Notes</h2>
        <p className={BANNER_DESCRIPTION}>
          Complétez la saisie des notes initiée par l'administrateur et
          transmettez-les pour validation finale.
        </p>
      </div>

      <div className={SECTION_CONTAINER}>
        <h3 className={SECTION_TITLE}>Sessions de notes en attente</h3>
        <div className={SESSIONS_LIST}>
          {pendingOrDraftSessions.length === 0 ? (
            <p className={EMPTY_TEXT}>Aucune session en attente.</p>
          ) : (
            pendingOrDraftSessions.map((session) => (
              <div key={session.id} className={SESSION_CARD}>
                <div>
                  <div className={CARD_HEADER_ROW}>
                    <span className={SUBJECT_TITLE}>{session.matiere}</span>
                    <span className={CLASS_BADGE}>{session.classe}</span>
                    <span className={STATUS_BADGE}>
                      {session.statut === "brouillon" ? "Brouillon" : "Nouveau"}
                    </span>
                  </div>
                  <p className={CARD_META}>
                    Créé par Admin le : {session.dateCreation || "Récemment"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveGradeSession(session);
                    setActiveTab("notes_secr");
                  }}
                  className={ACTION_BUTTON}
                >
                  Saisir les notes →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;
