import { useState } from "react";
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
  setFormState,
  onDeleteSubject,
  handleAdminValidateSession,
}) => {
  const [selectedClassView, setSelectedClassView] = useState(null); // "SECONDE", "PREMIERE", "TERMINALE" ou null

  const pendingSessions = gradeSessions.filter(
    (session) =>
      session.status === "DRAFT" || session.statut === "attente_validation",
  );

  // Sécurisation et extraction du tableau des matières pour éviter les erreurs de type
  const subjectsArray = Array.isArray(subjects)
    ? subjects
    : subjects?.subjects || subjects?.data?.subjects || [];

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
      description: subject.description,
      classGroup: assignmentClass,
      teacherId:
        subject.assignments?.find((a) => a.classGroup === assignmentClass)
          ?.teacherId || "",
    });
    setActiveModal("subject");
  };

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
            + Créer une note
          </button>
          <button
            onClick={() => {
              setFormState({});
              setActiveModal("pointage");
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
        <div className="flex justify-between items-center mb-4">
          <h3 className={SECTION_TITLE}>Gestion des Matières par Classe</h3>
          {selectedClassView && (
            <button
              onClick={() => setSelectedClassView(null)}
              className="text-sm text-blue-400 hover:underline bg-blue-950/40 px-3 py-1 rounded-lg border border-blue-800/50"
            >
              ← Retour aux cartes de classes
            </button>
          )}
        </div>

        {!selectedClassView ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classesConfig.map((cls) => {
              const count = flattenedSubjects.filter(
                (s) => s.classGroup?.toUpperCase() === cls.key,
              ).length;
              return (
                <div
                  key={cls.key}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-blue-600/50 transition-all"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-slate-100">
                        Classe de {cls.label}
                      </h4>
                      <span className="bg-blue-950 text-blue-400 text-xs px-2.5 py-1 rounded-full border border-blue-800/60 font-medium">
                        {count} matière{count > 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">
                      Consulter et gérer les coefficients et professeurs de{" "}
                      {cls.label.toLowerCase()}.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedClassView(cls.key)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors shadow-sm"
                  >
                    Voir la liste
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <h4 className="text-md font-semibold text-blue-400 mb-4 uppercase tracking-wider">
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
                      className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <h5 className="font-bold text-slate-100 text-base">
                            {sub.name}
                          </h5>
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/50 text-xs px-2.5 py-0.5 rounded-full">
                            Coeff : {sub.coefficient}
                          </span>
                          <span className="bg-purple-950 text-purple-300 border border-purple-800/50 text-xs px-2.5 py-0.5 rounded-full">
                            Classe : {sub.classGroup}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          Professeur responsable :{" "}
                          <span className="text-slate-200 font-medium">
                            {sub.teacherName}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleEdit(sub, selectedClassView)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => onDeleteSubject(sub.id)}
                          className="bg-red-950/60 hover:bg-red-900/80 text-red-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-800/50 transition-colors"
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
                      {session.matiere || session.subjectName} (
                      {session.classe || session.classGroup})
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
