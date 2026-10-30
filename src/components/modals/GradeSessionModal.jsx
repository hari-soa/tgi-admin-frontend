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

  const subjectList = subjects || [];

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>Create Grade Session</h3>

          <div>
            <label className={FIELD_LABEL}>Target Subject</label>
            <select
              onChange={(e) => handleInputChange("matiere", e.target.value)}
              className={SELECT_INPUT}
            >
              <option value="">Select a subject...</option>
              {subjectList.map((s) => (
                <option key={s.id} value={s.nom}>
                  {s.nom} ({s.classe})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={FIELD_LABEL}>Target Class</label>
            <select
              onChange={(e) => handleInputChange("classe", e.target.value)}
              className={SELECT_INPUT}
            >
              <option value="Terminale">Terminale</option>
              <option value="Première">Première</option>
              <option value="Seconde">Seconde</option>
            </select>
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            Assign to Secretary
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeSessionModal;
