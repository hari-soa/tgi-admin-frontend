import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  FIELD_LABEL,
  SELECT_INPUT,
  SUBMIT_BUTTON,
} from "../../styles/GradeSessionModalStyles";

export const GradeSessionModal = ({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
  subjects,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    if (field === "classGroup") {
      setFormState({ ...formState, [field]: value, subjectId: "" });
    } else {
      setFormState({ ...formState, [field]: value });
    }
  };

  const subjectsArray = Array.isArray(subjects)
    ? subjects
    : subjects?.subjects || subjects?.data?.subjects || [];

  const flattenedSubjects = [];
  subjectsArray.forEach((subject) => {
    if (Array.isArray(subject.assignments) && subject.assignments.length > 0) {
      subject.assignments.forEach((assignment) => {
        flattenedSubjects.push({
          id: subject.id || subject._id,
          name: subject.name || subject.nom,
          coefficient: subject.coefficient,
          classGroup: (assignment.classGroup || "").trim().toUpperCase(),
        });
      });
    } else {
      flattenedSubjects.push({
        id: subject.id || subject._id,
        name: subject.name || subject.nom,
        coefficient: subject.coefficient,
        classGroup: (subject.classe || subject.classGroup || "GÉNÉRAL")
          .trim()
          .toUpperCase(),
      });
    }
  });

  const selectedClass = (formState.classGroup || "").trim().toUpperCase();
  const filteredSubjects = selectedClass
    ? flattenedSubjects.filter((s) => s.classGroup === selectedClass)
    : [];

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>Créer une session de notes</h3>

          <div>
            <label className={FIELD_LABEL}>Classe</label>
            <select
              value={formState.classGroup || ""}
              onChange={(e) => handleInputChange("classGroup", e.target.value)}
              className={SELECT_INPUT}
              required
            >
              <option value="">Sélectionner une classe...</option>
              <option value="TERMINALE">Terminale</option>
              <option value="PREMIERE">Première</option>
              <option value="SECONDE">Seconde</option>
            </select>
          </div>

          <div>
            <label className={FIELD_LABEL}>Matière</label>
            <select
              value={formState.subjectId || ""}
              onChange={(e) => handleInputChange("subjectId", e.target.value)}
              className={SELECT_INPUT}
              required
              disabled={!formState.classGroup}
            >
              <option value="">
                {formState.classGroup
                  ? filteredSubjects.length > 0
                    ? "Sélectionner une matière..."
                    : "Aucune matière trouvée pour cette classe"
                  : "Veuillez d'abord choisir une classe"}
              </option>
              {filteredSubjects.map((s, index) => (
                <option key={`${s.id}-${index}`} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={FIELD_LABEL}>Type d'examen</label>
              <select
                value={formState.examType || "TRIMESTER"}
                onChange={(e) => handleInputChange("examType", e.target.value)}
                className={SELECT_INPUT}
                required
              >
                <option value="TRIMESTER">Trimestre</option>
                <option value="SEMI_TRIMESTER">Semi-Trimestre</option>
              </select>
            </div>

            <div>
              <label className={FIELD_LABEL}>Trimestre</label>
              <select
                value={formState.term || "FIRST_TRIMESTER"}
                onChange={(e) => handleInputChange("term", e.target.value)}
                className={SELECT_INPUT}
                required
              >
                <option value="FIRST_TRIMESTER">Premier Trimestre</option>
                <option value="SECOND_TRIMESTER">Second Trimestre</option>
                <option value="THIRD_TRIMESTER">Troisième Trimestre</option>
              </select>
            </div>
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            Soumettre la session
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeSessionModal;
