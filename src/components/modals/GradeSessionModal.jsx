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
    setFormState({ ...formState, [field]: value });
  };

  const subjectList = Array.isArray(subjects) ? subjects : [];

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>Créer une session de notes</h3>

          <div>
            <label className={FIELD_LABEL}>Matière</label>
            <select
              value={formState.subjectId || ""}
              onChange={(e) => handleInputChange("subjectId", e.target.value)}
              className={SELECT_INPUT}
              required
            >
              <option value="">Sélectionner une matière...</option>
              {subjectList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name || s.nom}
                </option>
              ))}
            </select>
          </div>

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
