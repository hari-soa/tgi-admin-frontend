import GradeSessionEditor, {
  GRADE_EDITOR_MODES,
} from "../../components/common/GradeSessionEditor";
import {
  CLASS_GROUP_LABELS,
  EXAM_TYPE_LABELS,
  TERM_LABELS,
  GRADE_SESSION_STATUS_LABELS,
  formatDate,
} from "../../utils/labels";
import {
  CONTAINER_WRAPPER,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  SESSIONS_GRID,
  SESSION_CARD,
  SESSION_CARD_HEADER,
  SESSION_SUBJECT_TITLE,
  STATUS_PENDING_VALIDATION,
  STATUS_DEFAULT,
  SESSION_CLASS_TEXT,
  SESSION_CLASS_HIGHLIGHT,
  SESSION_CREATION_DATE,
  EDIT_GRADES_BUTTON,
} from "../../styles/SecretaryGradesStyles";
import { EMPTY_TEXT } from "../../styles/GradeSessionEditorStyles";

const describeSession = (session) =>
  `${EXAM_TYPE_LABELS[session.examType]} • ${TERM_LABELS[session.term]} • ${session.academicYear}`;

export const SecretaryGrades = ({
  users,
  gradeSessions,
  activeGradeSession,
  setActiveGradeSession,
  onSaveDraft,
  onSubmitSession,
}) => {
  const openedSession = activeGradeSession
    ? gradeSessions.find((session) => session.id === activeGradeSession.id) ||
      activeGradeSession
    : null;

  return (
    <div className={CONTAINER_WRAPPER}>
      <div>
        <h2 className={HEADER_TITLE}>Suivi des Sessions de Notes</h2>
        <p className={HEADER_SUBTITLE}>Gestion des enregistrements de notes</p>
      </div>

      {openedSession ? (
        <GradeSessionEditor
          session={openedSession}
          users={users}
          mode={GRADE_EDITOR_MODES.SECRETARY_MODE}
          onBack={() => setActiveGradeSession(null)}
          onSaveDraft={onSaveDraft}
          onSubmit={onSubmitSession}
        />
      ) : (
        <div className={SESSIONS_GRID}>
          {gradeSessions.length === 0 && (
            <p className={EMPTY_TEXT}>Aucune session de notes ouverte.</p>
          )}
          {gradeSessions.map((session) => (
            <div key={session.id} className={SESSION_CARD}>
              <div>
                <div className={SESSION_CARD_HEADER}>
                  <h3 className={SESSION_SUBJECT_TITLE}>
                    {session.subjectName}
                  </h3>
                  <span
                    className={
                      session.status === "PENDING_REVIEW"
                        ? STATUS_PENDING_VALIDATION
                        : STATUS_DEFAULT
                    }
                  >
                    {GRADE_SESSION_STATUS_LABELS[session.status]}
                  </span>
                </div>
                <p className={SESSION_CLASS_TEXT}>
                  Classe :{" "}
                  <span className={SESSION_CLASS_HIGHLIGHT}>
                    {CLASS_GROUP_LABELS[session.classGroup]}
                  </span>
                </p>
                <p className={SESSION_CREATION_DATE}>
                  {describeSession(session)} • créée le{" "}
                  {formatDate(session.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setActiveGradeSession(session)}
                className={EDIT_GRADES_BUTTON}
              >
                {session.status === "OPEN"
                  ? "Saisir / Modifier les notes"
                  : "Consulter les notes"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecretaryGrades;
