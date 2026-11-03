import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  FIELD_LABEL,
  SELECT_INPUT,
  TEXT_INPUT,
  GRID_TWO_COLS,
  SUBMIT_BUTTON,
} from "../../styles/PointageModalStyles";

export const PointageModal = ({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
  staffUsers,
  subjects,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const subjectsArray = Array.isArray(subjects)
    ? subjects
    : subjects?.subjects || subjects?.data?.subjects || [];

  const flattenedAssignments = [];
  subjectsArray.forEach((subject) => {
    if (subject.assignments && subject.assignments.length > 0) {
      subject.assignments.forEach((assignment) => {
        flattenedAssignments.push({
          subjectId: subject.id,
          subjectName: subject.name,
          classGroup: (assignment.classGroup || "").toUpperCase(),
          teacherId: assignment.teacherId,
        });
      });
    }
  });

  const professorList = (staffUsers || []).filter((s) => {
    const role = (s.role || "").toUpperCase();
    return role === "TEACHER" || role === "PROF";
  });

  const selectedTeacherId = formState.teacherId || "";
  const selectedClass = (formState.targetClass || "").toUpperCase();
  const selectedSubjectId = formState.subjectId || "";

  const availableProfessors = professorList.filter((p) => {
    if (selectedClass && selectedSubjectId) {
      return flattenedAssignments.some(
        (a) =>
          a.teacherId === p.id &&
          a.classGroup === selectedClass &&
          a.subjectId === selectedSubjectId,
      );
    }
    if (selectedClass) {
      return flattenedAssignments.some(
        (a) => a.teacherId === p.id && a.classGroup === selectedClass,
      );
    }
    if (selectedSubjectId) {
      return flattenedAssignments.some(
        (a) => a.teacherId === p.id && a.subjectId === selectedSubjectId,
      );
    }
    return true;
  });

  const allClasses = ["SECONDE", "PREMIERE", "TERMINALE"];
  const availableClasses = allClasses.filter((cls) => {
    if (selectedTeacherId && selectedSubjectId) {
      return flattenedAssignments.some(
        (a) =>
          a.classGroup === cls &&
          a.teacherId === selectedTeacherId &&
          a.subjectId === selectedSubjectId,
      );
    }
    if (selectedTeacherId) {
      return flattenedAssignments.some(
        (a) => a.classGroup === cls && a.teacherId === selectedTeacherId,
      );
    }
    if (selectedSubjectId) {
      return flattenedAssignments.some(
        (a) => a.classGroup === cls && a.subjectId === selectedSubjectId,
      );
    }
    return true;
  });

  const availableSubjects = flattenedAssignments.filter((a) => {
    if (selectedTeacherId && selectedClass) {
      return (
        a.teacherId === selectedTeacherId && a.classGroup === selectedClass
      );
    }
    if (selectedTeacherId) {
      return a.teacherId === selectedTeacherId;
    }
    if (selectedClass) {
      return a.classGroup === selectedClass;
    }
    return true;
  });

  const uniqueSubjectsMap = new Map();
  availableSubjects.forEach((sub) => {
    if (!uniqueSubjectsMap.has(sub.subjectName)) {
      uniqueSubjectsMap.set(sub.subjectName, sub.subjectId);
    }
  });
  const uniqueSubjectsList = Array.from(uniqueSubjectsMap.entries()).map(
    ([name, id]) => ({ id, name }),
  );

  const daysOfWeek = [
    { key: "MONDAY", label: "Lundi" },
    { key: "TUESDAY", label: "Mardi" },
    { key: "WEDNESDAY", label: "Mercredi" },
    { key: "THURSDAY", label: "Jeudi" },
    { key: "FRIDAY", label: "Vendredi" },
    { key: "SATURDAY", label: "Samedi" },
  ];

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>
            {formState.id
              ? "Modifier le créneau de pointage"
              : "Créer un créneau de pointage"}
          </h3>

          <div>
            <label className={FIELD_LABEL}>Professeur</label>
            <select
              value={formState.teacherId || ""}
              onChange={(e) => handleInputChange("teacherId", e.target.value)}
              className={SELECT_INPUT}
              required
            >
              <option value="">Sélectionner un professeur...</option>
              {availableProfessors.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName || p.nom} {p.lastName || p.prenom}
                </option>
              ))}
            </select>
          </div>

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Classe</label>
              <select
                value={formState.targetClass || ""}
                onChange={(e) =>
                  handleInputChange("targetClass", e.target.value)
                }
                className={SELECT_INPUT}
                required
              >
                <option value="">Sélectionner une classe...</option>
                {availableClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls.charAt(0) + cls.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={FIELD_LABEL}>Matière</label>
              <select
                value={formState.subjectId || ""}
                onChange={(e) => handleInputChange("subjectId", e.target.value)}
                className={SELECT_INPUT}
                required
              >
                <option value="">Sélectionner une matière...</option>
                {uniqueSubjectsList.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={FIELD_LABEL}>Jour de la semaine</label>
            <select
              value={formState.dayOfWeek || "MONDAY"}
              onChange={(e) => handleInputChange("dayOfWeek", e.target.value)}
              className={SELECT_INPUT}
              required
            >
              {daysOfWeek.map((day) => (
                <option key={day.key} value={day.key}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          {/* HEURES DE DÉBUT & FIN */}
          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Heure de début</label>
              <input
                type="time"
                value={formState.startTime || "08:00"}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>

            <div>
              <label className={FIELD_LABEL}>Heure de fin</label>
              <input
                type="time"
                value={formState.endTime || "10:00"}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            {formState.id
              ? "Mettre à jour le créneau"
              : "Enregistrer le créneau"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PointageModal;
