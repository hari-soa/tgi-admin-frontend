import React from "react";
import { extractClassNum } from "../../utils/helpers";
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
  STATUS_VALIDATED,
  STATUS_PENDING_VALIDATION,
  STATUS_DEFAULT,
  SESSION_CLASS_TEXT,
  SESSION_CLASS_HIGHLIGHT,
  SESSION_CREATION_DATE,
  SESSION_VALIDATION_DATE,
  EDIT_GRADES_BUTTON,
} from "../../styles/SecretaryGradesStyles";

export const SecretaryGrades = ({
  users,
  gradeSessions,
  activeGradeSession,
  setActiveGradeSession,
  handleSecretarySaveDraft,
  handleSecretarySubmitToAdmin,
}) => {
  const getStatusBadgeClass = (status) => {
    if (status === "valide") return STATUS_VALIDATED;
    if (status === "attente_validation") return STATUS_PENDING_VALIDATION;
    return STATUS_DEFAULT;
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div>
        <h2 className={HEADER_TITLE}>Saisie & Suivi des Sessions de Notes</h2>
        <p className={HEADER_SUBTITLE}>
          Gestion des enregistrements de notes par matière et par classe
        </p>
      </div>

      {activeGradeSession ? (
        <div className={ACTIVE_SESSION_CONTAINER}>
          <div className={ACTIVE_SESSION_HEADER}>
            <div>
              <span className={ACTIVE_SESSION_TAG}>Grille d'évaluation</span>
              <h3 className={ACTIVE_SESSION_TITLE}>
                {activeGradeSession.matiere} — {activeGradeSession.classe}
              </h3>
              <p className={ACTIVE_SESSION_DATE}>
                Date de création :{" "}
                {activeGradeSession.dateCreation || "Récemment"}
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
              Roster des étudiants ({activeGradeSession.classe})
            </h4>
            {users
              .filter(
                (u) =>
                  u.role === "student" &&
                  u.classe === activeGradeSession.classe,
              )
              .map((student) => {
                const currentVal =
                  activeGradeSession.notesDraft?.[student.id] || "";
                return (
                  <div key={student.id} className={ROSTER_CARD}>
                    <div className={STUDENT_INFO_ROW}>
                      <img
                        src={student.photo}
                        alt="etu"
                        className={STUDENT_AVATAR}
                      />
                      <div>
                        <p className={STUDENT_NAME}>
                          {student.nom} {student.prenom}
                        </p>
                        <p className={STUDENT_MATRICULE}>
                          {student.matricule} •{" "}
                          {extractClassNum(student.matricule)}
                        </p>
                      </div>
                    </div>
                    <div className={GRADE_INPUT_ROW}>
                      <label className={GRADE_LABEL}>Note /20 :</label>
                      <input
                        type="number"
                        step="0.5"
                        max="20"
                        min="0"
                        defaultValue={currentVal}
                        onChange={(e) => {
                          if (!activeGradeSession.notesDraft) {
                            activeGradeSession.notesDraft = {};
                          }
                          activeGradeSession.notesDraft[student.id] =
                            e.target.value;
                        }}
                        className={GRADE_INPUT}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <div className={FORM_ACTIONS_ROW}>
            <button
              onClick={() =>
                handleSecretarySaveDraft(
                  activeGradeSession.id,
                  activeGradeSession.notesDraft || {},
                )
              }
              className={DRAFT_BUTTON}
            >
              Sauvegarder en brouillon
            </button>
            <button
              onClick={() =>
                handleSecretarySubmitToAdmin(
                  activeGradeSession.id,
                  activeGradeSession.notesDraft || {},
                )
              }
              className={SUBMIT_BUTTON}
            >
              Envoyer à l'Admin pour validation
            </button>
          </div>
        </div>
      ) : (
        <div className={SESSIONS_GRID}>
          {gradeSessions.map((session) => (
            <div key={session.id} className={SESSION_CARD}>
              <div>
                <div className={SESSION_CARD_HEADER}>
                  <h3 className={SESSION_SUBJECT_TITLE}>{session.matiere}</h3>
                  <span className={getStatusBadgeClass(session.statut)}>
                    {session.statut?.replace("_", " ") || "brouillon"}
                  </span>
                </div>
                <p className={SESSION_CLASS_TEXT}>
                  Classe :{" "}
                  <span className={SESSION_CLASS_HIGHLIGHT}>
                    {session.classe}
                  </span>
                </p>
                <p className={SESSION_CREATION_DATE}>
                  Créée : {session.dateCreation || "Récemment"}
                </p>
                {session.dateValidation && (
                  <p className={SESSION_VALIDATION_DATE}>
                    Validée le : {session.dateValidation}
                  </p>
                )}
              </div>

              {session.statut !== "valide" && (
                <button
                  onClick={() => setActiveGradeSession(session)}
                  className={EDIT_GRADES_BUTTON}
                >
                  Saisir / Modifier les notes
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecretaryGrades;
