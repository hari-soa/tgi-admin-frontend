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
import {
  CLASS_GROUP_LABELS,
  EXAM_TYPE_LABELS,
  TERM_LABELS,
  GRADE_SESSION_STATUS_LABELS,
  formatDate,
} from "../../utils/labels";

export const SecretaryDashboard = ({
  gradeSessions,
  setActiveGradeSession,
  setActiveTab,
}) => {
  const openSessions = gradeSessions.filter(
    (session) => session.status === "OPEN",
  );

  const handleEnterGrades = (session) => {
    setActiveGradeSession(session);
    setActiveTab("grade-sessions");
  };

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
        <h3 className={SECTION_TITLE}>Sessions de notes à saisir</h3>
        <div className={SESSIONS_LIST}>
          {openSessions.length === 0 ? (
            <p className={EMPTY_TEXT}>Aucune session en attente.</p>
          ) : (
            openSessions.map((session) => (
              <div key={session.id} className={SESSION_CARD}>
                <div>
                  <div className={CARD_HEADER_ROW}>
                    <span className={SUBJECT_TITLE}>{session.subjectName}</span>
                    <span className={CLASS_BADGE}>
                      {CLASS_GROUP_LABELS[session.classGroup]}
                    </span>
                    <span className={STATUS_BADGE}>
                      {GRADE_SESSION_STATUS_LABELS[session.status]}
                    </span>
                  </div>
                  <p className={CARD_META}>
                    {EXAM_TYPE_LABELS[session.examType]} •{" "}
                    {TERM_LABELS[session.term]} • ouverte le{" "}
                    {formatDate(session.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => handleEnterGrades(session)}
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
