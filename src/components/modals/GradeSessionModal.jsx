import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  FIELD_LABEL,
  SELECT_INPUT,
  SUBMIT_BUTTON,
  SELECTS_GRID,
} from "../../styles/GradeSessionModalStyles";
import { CLASS_GROUP_LABELS } from "../../utils/labels";

const SESSION_CLASS_GROUPS = ["TERMINALE", "PREMIERE", "SECONDE"];

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

  // One entry per subject and class it is taught in
  const subjectsOfSelectedClass = subjects.filter((subject) =>
    subject.assignments.some(
      (assignment) => assignment.classGroup === formState.classGroup,
    ),
  );

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
              {SESSION_CLASS_GROUPS.map((classGroup) => (
                <option key={classGroup} value={classGroup}>
                  {CLASS_GROUP_LABELS[classGroup]}
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
              disabled={!formState.classGroup}
            >
              <option value="">
                {formState.classGroup
                  ? subjectsOfSelectedClass.length > 0
                    ? "Sélectionner une matière..."
                    : "Aucune matière trouvée pour cette classe"
                  : "Veuillez d'abord choisir une classe"}
              </option>
              {subjectsOfSelectedClass.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className={SELECTS_GRID}>
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
            Créer la session
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeSessionModal;
