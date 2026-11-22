import { useState } from "react";
import GradeSessionEditor, {
  GRADE_EDITOR_MODES,
} from "../../components/common/GradeSessionEditor";
import {
  ACTIONS_CONTAINER,
  ADD_BUTTON,
  BADGE_EMERALD,
  BADGE_PURPLE,
  BADGE_VALIDATION,
  BANNER_CONTAINER,
  BANNER_MOTTO,
  BANNER_TAG,
  BANNER_TITLE,
  CONTAINER_WRAPPER,
  DANGER_ACTION_BUTTON,
  EMPTY_TEXT,
  ITEM_HEADER,
  ITEM_SUBTITLE,
  ITEM_TITLE,
  PENDING_ITEM,
  PENDING_ITEM_ACTIONS,
  PENDING_ITEM_CARD,
  PENDING_ITEM_HEADER,
  PENDING_ITEM_HIGHLIGHT,
  PENDING_ITEM_META,
  PENDING_ITEM_TITLE,
  PENDING_LIST_CONTAINER,
  PENDING_SECTION,
  PENDING_TITLE,
  PRIMARY_ACTION_BUTTON,
  SECONDARY_ACTION_BUTTON,
  SESSION_SECONDARY_BUTTON,
  SECTION_CONTAINER,
  SECTION_HEADER_ROW,
  SECTION_TITLE,
  STATS_GRID,
  STAT_CARD,
  STAT_LABEL_BLUE,
  STAT_LABEL_CYAN,
  STAT_LABEL_EMERALD,
  STAT_LABEL_PURPLE,
  STAT_VALUE,
  SUBJECTS_GRID,
  SUBJECT_CARD,
  SUBJECT_CARD_HEADER,
  SUBJECT_COEFFICIENT_BADGE,
  SUBJECT_DESCRIPTION,
  SUBJECT_EDIT_BUTTON,
  SUBJECT_NAME,
  VALIDATE_BUTTON,
} from "../../styles/AdminDashboardStyles";
import {
  CLASS_GROUP_LABELS,
  EXAM_TYPE_LABELS,
  TERM_LABELS,
} from "../../utils/labels";

export const AdminDashboard = ({
  currentUser,
  users,
  subjects,
  gradeSessions,
  announcements,
  setActiveModal,
  setFormState,
  onDeleteSubject,
  onValidateSession,
  onReviseSession,
}) => {
  const [selectedClassView, setSelectedClassView] = useState(null);
  const [editedSessionId, setEditedSessionId] = useState(null);

  const pendingSessions = gradeSessions.filter(
    (session) => session.status === "PENDING_REVIEW",
  );

  const subjectsArray = subjects;
  const flattenedSubjects = [];
  subjectsArray.forEach((subject) => {
    if (subject.assignments && subject.assignments.length > 0) {
      subject.assignments.forEach((assignment) => {
        flattenedSubjects.push({
          ...subject,
          classGroup: assignment.classGroup,
          teacherId: assignment.teacherId,
          teacherName:
            `${assignment.teacherFirstName || ""} ${assignment.teacherLastName || ""}`.trim() ||
            "Non assigné",
        });
      });
    } else {
      flattenedSubjects.push({
        ...subject,
        classGroup: "GÉNÉRAL",
        teacherName: "Non assigné",
      });
    }
  });

  const classesConfig = [
    { key: "SECONDE", label: "Seconde" },
    { key: "PREMIERE", label: "Première" },
    { key: "TERMINALE", label: "Terminale" },
  ];

  const handleEdit = (subject, assignmentClass) => {
    setFormState({
      id: subject.id,
      name: subject.name,
      coefficient: subject.coefficient,
      classGroup: assignmentClass,
      teacherId:
        subject.assignments?.find((a) => a.classGroup === assignmentClass)
          ?.teacherId || "",
    });
    setActiveModal("subject");
  };

  const editedSession =
    gradeSessions.find((session) => session.id === editedSessionId) || null;

  if (editedSession) {
    return (
      <GradeSessionEditor
        session={editedSession}
        users={users}
        mode={GRADE_EDITOR_MODES.ADMIN_MODE}
        onBack={() => setEditedSessionId(null)}
        onRevise={onReviseSession}
      />
    );
  }

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={BANNER_CONTAINER}>
        <span className={BANNER_TAG}>
          Panneau de contrôle - Admin{" "}
          {currentUser?.firstName ? `(${currentUser.firstName})` : ""}
        </span>
        <h2 className={BANNER_TITLE}>Collège Saint Michel Amparibe</h2>
        <p className={BANNER_MOTTO}>"Miorim-paka hanasoa olona"</p>

        <div className={ACTIONS_CONTAINER}>
          <button
            onClick={() => {
              setFormState({});
              setActiveModal("user");
            }}
            className={PRIMARY_ACTION_BUTTON}
          >
            + Créer un utilisateur
          </button>
          <button
            onClick={() => {
              setFormState({});
              setActiveModal("announcement");
            }}
            className={SECONDARY_ACTION_BUTTON}
          >
            + Créer une annonce
          </button>
          <button
            onClick={() => {
              setFormState({});
              setActiveModal("subject");
            }}
            className={SECONDARY_ACTION_BUTTON}
          >
            + Créer une matière
          </button>
          <button
            onClick={() => {
              setFormState({});
              setActiveModal("grade_session");
            }}
            className={SECONDARY_ACTION_BUTTON}
          >
            + Ouvrir une session de notes
          </button>
          <button
            onClick={() => {
              setFormState({});
              setActiveModal("attendance");
            }}
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
          <p className={STAT_VALUE}>{subjectsArray.length}</p>
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
        <div className={SECTION_HEADER_ROW}>
          <h3 className={SECTION_TITLE}>Gestion des Matières par Classe</h3>
          {selectedClassView && (
            <button
              onClick={() => setSelectedClassView(null)}
              className={ADD_BUTTON}
            >
              ← Retour aux cartes de classes
            </button>
          )}
        </div>

        {!selectedClassView ? (
          <div className={SUBJECTS_GRID}>
            {classesConfig.map((cls) => {
              const count = flattenedSubjects.filter(
                (s) => s.classGroup?.toUpperCase() === cls.key,
              ).length;
              return (
                <div key={cls.key} className={SUBJECT_CARD}>
                  <div>
                    <div className={SUBJECT_CARD_HEADER}>
                      <h4 className={SUBJECT_NAME}>Classe de {cls.label}</h4>
                      <span className={SUBJECT_COEFFICIENT_BADGE}>
                        {count} matière{count > 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className={SUBJECT_DESCRIPTION}>
                      Consulter et gérer les coefficients et professeurs de{" "}
                      {cls.label.toLowerCase()}.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedClassView(cls.key)}
                    className={SUBJECT_EDIT_BUTTON}
                  >
                    Voir la liste
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={PENDING_SECTION}>
            <h4 className={PENDING_TITLE}>
              Matières de la classe de {selectedClassView}
            </h4>
            <div className={PENDING_LIST_CONTAINER}>
              {flattenedSubjects.filter(
                (s) => s.classGroup?.toUpperCase() === selectedClassView,
              ).length === 0 ? (
                <p className={EMPTY_TEXT}>
                  Aucune matière enregistrée pour cette classe.
                </p>
              ) : (
                flattenedSubjects
                  .filter(
                    (s) => s.classGroup?.toUpperCase() === selectedClassView,
                  )
                  .map((sub, idx) => (
                    <div
                      key={`${sub.id}-${sub.classGroup}-${idx}`}
                      className={PENDING_ITEM}
                    >
                      <div>
                        <div className={PENDING_ITEM_HEADER}>
                          <h5 className={PENDING_ITEM_TITLE}>{sub.name}</h5>
                          <span className={BADGE_EMERALD}>
                            Coeff : {sub.coefficient}
                          </span>
                          <span className={BADGE_PURPLE}>
                            Classe : {sub.classGroup}
                          </span>
                        </div>
                        <p className={PENDING_ITEM_META}>
                          Professeur responsable :{" "}
                          <span className={PENDING_ITEM_HIGHLIGHT}>
                            {sub.teacherName}
                          </span>
                        </p>
                      </div>
                      <div className={PENDING_ITEM_ACTIONS}>
                        <button
                          onClick={() => handleEdit(sub, selectedClassView)}
                          className={SESSION_SECONDARY_BUTTON}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => onDeleteSubject(sub.id)}
                          className={DANGER_ACTION_BUTTON}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}
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
                      {session.subjectName} (
                      {CLASS_GROUP_LABELS[session.classGroup]} —{" "}
                      {EXAM_TYPE_LABELS[session.examType]},{" "}
                      {TERM_LABELS[session.term]})
                    </h4>
                    <span className={BADGE_VALIDATION}>Validation requise</span>
                  </div>
                  <p className={ITEM_SUBTITLE}>
                    Saisie complétée par la secrétaire
                    {session.absences.length > 0 &&
                      ` • ${session.absences.length} absent(s)`}
                    .
                  </p>
                </div>
                <div className={PENDING_ITEM_ACTIONS}>
                  <button
                    onClick={() => setEditedSessionId(session.id)}
                    className={SESSION_SECONDARY_BUTTON}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onValidateSession(session.id)}
                    className={VALIDATE_BUTTON}
                  >
                    Valider & publier les notes
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
