import { useState, useEffect } from "react";
import {
  extractClassNum,
  getAvatarSource,
  getFullName,
} from "../../utils/helpers";
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
  ACTIVE_SESSION_CONTAINER,
  ACTIVE_SESSION_HEADER,
  ACTIVE_SESSION_TAG,
  ACTIVE_SESSION_TITLE,
  ACTIVE_SESSION_DATE,
  BACK_BUTTON,
  ROSTER_SECTION,
  ROSTER_TITLE,
  ROSTER_CARD,
  STUDENT_INFO_ROW,
  STUDENT_AVATAR,
  STUDENT_NAME,
  STUDENT_MATRICULE,
  GRADE_INPUT_ROW,
  GRADE_LABEL,
  GRADE_INPUT,
  FORM_ACTIONS_ROW,
  DRAFT_BUTTON,
  SUBMIT_BUTTON,
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
  EMPTY_TEXT,
  READ_ONLY_NOTE,
} from "../../styles/SecretaryGradesStyles";

const MAX_SCORE = 20;

const describeSession = (session) =>
  `${EXAM_TYPE_LABELS[session.examType]} • ${TERM_LABELS[session.term]} • ${session.academicYear}`;

const buildDraftValues = (session) =>
  Object.fromEntries(
    (session?.draftGrades ?? []).map((entry) => [
      entry.studentId,
      String(entry.value),
    ]),
  );

export const SecretaryGrades = ({
  users,
  gradeSessions,
  activeGradeSession,
  setActiveGradeSession,
  onSaveDraft,
  onSubmitSession,
}) => {
  // Marks typed in the grid, by student id (kept as text while typing)
  const [draftValues, setDraftValues] = useState({});

  useEffect(() => {
    setDraftValues(buildDraftValues(activeGradeSession));
  }, [activeGradeSession?.id]);

  const isSessionReadOnly = activeGradeSession?.status !== "OPEN";

  const rosterStudents = activeGradeSession
    ? users.filter(
        (user) =>
          user.role === "STUDENT" &&
          user.isActive !== false &&
          user.classGroup === activeGradeSession.classGroup,
      )
    : [];

  const toGradeEntries = () =>
    Object.entries(draftValues)
      .filter(([, value]) => value !== "")
      .map(([studentId, value]) => ({
        studentId,
        value: Number(value),
        maxScore: MAX_SCORE,
      }));

  const handleGradeChange = (studentId, value) => {
    setDraftValues({ ...draftValues, [studentId]: value });
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div>
        <h2 className={HEADER_TITLE}>Suivi des Sessions de Notes</h2>
        <p className={HEADER_SUBTITLE}>Gestion des enregistrements de notes</p>
      </div>

      {activeGradeSession ? (
        <div className={ACTIVE_SESSION_CONTAINER}>
          <div className={ACTIVE_SESSION_HEADER}>
            <div>
              <span className={ACTIVE_SESSION_TAG}>Grille d'évaluation</span>
              <h3 className={ACTIVE_SESSION_TITLE}>
                {activeGradeSession.subjectName} —{" "}
                {CLASS_GROUP_LABELS[activeGradeSession.classGroup]}
              </h3>
              <p className={ACTIVE_SESSION_DATE}>
                {describeSession(activeGradeSession)}
              </p>
            </div>
            <button
              onClick={() => setActiveGradeSession(null)}
              className={BACK_BUTTON}
            >
              ← Retour à la liste
            </button>
          </div>

          <div className={ROSTER_SECTION}>
            <h4 className={ROSTER_TITLE}>
              Liste des élèves (
              {CLASS_GROUP_LABELS[activeGradeSession.classGroup]})
            </h4>
            {rosterStudents.map((student) => (
              <div key={student.id} className={ROSTER_CARD}>
                <div className={STUDENT_INFO_ROW}>
                  <img
                    src={getAvatarSource(student)}
                    alt={getFullName(student)}
                    className={STUDENT_AVATAR}
                  />
                  <div>
                    <p className={STUDENT_NAME}>
                      {student.lastName} {student.firstName}
                    </p>
                    <p className={STUDENT_MATRICULE}>
                      {student.matricule} • {extractClassNum(student.matricule)}
                    </p>
                  </div>
                </div>
                <div className={GRADE_INPUT_ROW}>
                  <label className={GRADE_LABEL}>Note /{MAX_SCORE} :</label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max={MAX_SCORE}
                    value={draftValues[student.id] ?? ""}
                    disabled={isSessionReadOnly}
                    onChange={(event) =>
                      handleGradeChange(student.id, event.target.value)
                    }
                    className={GRADE_INPUT}
                  />
                </div>
              </div>
            ))}
            {rosterStudents.length === 0 && (
              <p className={EMPTY_TEXT}>Aucun élève actif dans cette classe.</p>
            )}
          </div>

          {isSessionReadOnly ? (
            <p className={READ_ONLY_NOTE}>
              Cette session a été soumise : elle est en attente de validation
              par l'administrateur.
            </p>
          ) : (
            <div className={FORM_ACTIONS_ROW}>
              <button
                onClick={() =>
                  onSaveDraft(activeGradeSession.id, toGradeEntries())
                }
                className={DRAFT_BUTTON}
              >
                Sauvegarder en brouillon
              </button>
              <button
                onClick={() =>
                  onSubmitSession(activeGradeSession.id, toGradeEntries())
                }
                className={SUBMIT_BUTTON}
              >
                Envoyer à l'Admin
              </button>
            </div>
          )}
        </div>
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
