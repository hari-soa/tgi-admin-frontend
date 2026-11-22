import { useState, useEffect } from "react";
import {
  buildAbsenceMotifs,
  buildGradeValues,
  extractClassNum,
  getAvatarSource,
  getFullName,
  isValidGradeValue,
  sortStudentsByClassAndMatricule,
  toAbsenceMotifEntries,
  toGradeEntries,
} from "../../utils/helpers";
import {
  CLASS_GROUP_LABELS,
  EXAM_TYPE_LABELS,
  TERM_LABELS,
} from "../../utils/labels";
import {
  ABSENT_HINT,
  ACTIVE_SESSION_CONTAINER,
  ACTIVE_SESSION_DATE,
  ACTIVE_SESSION_HEADER,
  ACTIVE_SESSION_TAG,
  ACTIVE_SESSION_TITLE,
  ADMIN_NOTE,
  BACK_BUTTON,
  DRAFT_BUTTON,
  EMPTY_TEXT,
  FORM_ACTIONS_ROW,
  GRADE_FIELD_COLUMN,
  GRADE_INPUT,
  GRADE_INPUT_ROW,
  GRADE_LABEL,
  MOTIF_INPUT,
  READ_ONLY_NOTE,
  ROSTER_CARD,
  ROSTER_SECTION,
  ROSTER_TITLE,
  STUDENT_AVATAR,
  STUDENT_INFO_ROW,
  STUDENT_MATRICULE,
  STUDENT_NAME,
  SUBMIT_BUTTON,
} from "../../styles/GradeSessionEditorStyles";

const MAX_SCORE = 20;
const SECRETARY_MODE = "secretary";
const ADMIN_MODE = "admin";

export const GRADE_EDITOR_MODES = { SECRETARY_MODE, ADMIN_MODE };

const describeSession = (session) =>
  `${EXAM_TYPE_LABELS[session.examType]} • ${TERM_LABELS[session.term]} • ${session.academicYear}`;

export const GradeSessionEditor = ({
  session,
  users,
  mode,
  onBack,
  onSaveDraft,
  onSubmit,
  onRevise,
}) => {
  const [gradeValues, setGradeValues] = useState(() =>
    buildGradeValues(session),
  );
  const [motifs, setMotifs] = useState(() => buildAbsenceMotifs(session));

  useEffect(() => {
    setGradeValues(buildGradeValues(session));
    setMotifs(buildAbsenceMotifs(session));
  }, [session.id]);

  const isAdminMode = mode === ADMIN_MODE;
  const isEditable = isAdminMode
    ? session.status === "PENDING_REVIEW"
    : session.status === "OPEN";

  const rosterStudents = sortStudentsByClassAndMatricule(
    users.filter(
      (user) =>
        user.role === "STUDENT" &&
        user.isActive !== false &&
        user.classGroup === session.classGroup,
    ),
  );
  const hasInvalidValue = Object.values(gradeValues).some(
    (value) => !isValidGradeValue(value),
  );

  const handleGradeChange = (studentId, value) => {
    setGradeValues({ ...gradeValues, [studentId]: value });
  };

  const handleMotifChange = (studentId, value) => {
    setMotifs({ ...motifs, [studentId]: value });
  };

  const handleRevise = async () => {
    const succeeded = await onRevise(
      session.id,
      toGradeEntries(rosterStudents, gradeValues),
      toAbsenceMotifEntries(rosterStudents, gradeValues, motifs),
    );
    if (succeeded) onBack();
  };

  return (
    <div className={ACTIVE_SESSION_CONTAINER}>
      <div className={ACTIVE_SESSION_HEADER}>
        <div>
          <span className={ACTIVE_SESSION_TAG}>
            {isAdminMode ? "Correction des notes soumises" : "Grille d'évaluation"}
          </span>
          <h3 className={ACTIVE_SESSION_TITLE}>
            {session.subjectName} — {CLASS_GROUP_LABELS[session.classGroup]}
          </h3>
          <p className={ACTIVE_SESSION_DATE}>{describeSession(session)}</p>
        </div>
        <button onClick={onBack} className={BACK_BUTTON}>
          ← Retour à la liste
        </button>
      </div>

      <div className={ROSTER_SECTION}>
        <h4 className={ROSTER_TITLE}>
          Liste des élèves ({CLASS_GROUP_LABELS[session.classGroup]})
        </h4>
        {isEditable && (
          <p className={ADMIN_NOTE}>
            Une note laissée vide marque l'élève comme absent : il est ajouté
            automatiquement à son dossier et n'est pas classé dans cette
            matière.
          </p>
        )}
        {rosterStudents.map((student) => {
          const isAbsent = (gradeValues[student.id] ?? "") === "";
          return (
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
              <div className={GRADE_FIELD_COLUMN}>
                <div className={GRADE_INPUT_ROW}>
                  <label className={GRADE_LABEL}>Note /{MAX_SCORE} :</label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max={MAX_SCORE}
                    value={gradeValues[student.id] ?? ""}
                    disabled={!isEditable}
                    onChange={(event) =>
                      handleGradeChange(student.id, event.target.value)
                    }
                    className={GRADE_INPUT}
                  />
                </div>
                {isAbsent && (
                  <p className={ABSENT_HINT}>Absent(e)</p>
                )}
                {isAbsent && isAdminMode && isEditable && (
                  <input
                    type="text"
                    placeholder="Motif de l'absence"
                    value={motifs[student.id] ?? ""}
                    onChange={(event) =>
                      handleMotifChange(student.id, event.target.value)
                    }
                    className={MOTIF_INPUT}
                  />
                )}
              </div>
            </div>
          );
        })}
        {rosterStudents.length === 0 && (
          <p className={EMPTY_TEXT}>Aucun élève actif dans cette classe.</p>
        )}
      </div>

      {!isEditable && (
        <p className={READ_ONLY_NOTE}>
          {isAdminMode
            ? "Cette session n'est plus en attente de validation : ses notes ne peuvent plus être corrigées."
            : "Cette session a été soumise : elle est en attente de validation par l'administrateur."}
        </p>
      )}

      {isEditable && !isAdminMode && (
        <div className={FORM_ACTIONS_ROW}>
          <button
            disabled={hasInvalidValue}
            onClick={() =>
              onSaveDraft(
                session.id,
                toGradeEntries(rosterStudents, gradeValues),
              )
            }
            className={DRAFT_BUTTON}
          >
            Sauvegarder en brouillon
          </button>
          <button
            disabled={hasInvalidValue}
            onClick={() =>
              onSubmit(session.id, toGradeEntries(rosterStudents, gradeValues))
            }
            className={SUBMIT_BUTTON}
          >
            Envoyer à l'Admin
          </button>
        </div>
      )}

      {isEditable && isAdminMode && (
        <div className={FORM_ACTIONS_ROW}>
          <button
            disabled={hasInvalidValue}
            onClick={handleRevise}
            className={SUBMIT_BUTTON}
          >
            Enregistrer les corrections
          </button>
        </div>
      )}
    </div>
  );
};

export default GradeSessionEditor;
