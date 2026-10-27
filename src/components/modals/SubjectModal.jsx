import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  FIELD_LABEL,
  TEXT_INPUT,
  SELECT_INPUT,
  GRID_TWO_COLS,
  SUBMIT_BUTTON,
} from "../../styles/SubjectModalStyles";

export const SubjectModal = ({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
  staffUsers,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const professorList = staffUsers
    ? staffUsers.filter((s) => s.role === "prof")
    : [];

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>Create New Subject</h3>

          <div>
            <label className={FIELD_LABEL}>Subject Name</label>
            <input
              type="text"
              placeholder="e.g. Mathematics"
              onChange={(e) => handleInputChange("nom", e.target.value)}
              className={TEXT_INPUT}
              required
            />
          </div>

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Coefficient</label>
              <input
                type="number"
                defaultValue="2"
                onChange={(e) => handleInputChange("coeff", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
            <div>
              <label className={FIELD_LABEL}>Associated Class</label>
              <select
                onChange={(e) => handleInputChange("classe", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="Seconde">Seconde</option>
                <option value="Première">Première</option>
                <option value="Terminale">Terminale</option>
              </select>
            </div>
          </div>

          <div>
            <label className={FIELD_LABEL}>Responsible Professor</label>
            <select
              onChange={(e) => handleInputChange("prof", e.target.value)}
              className={SELECT_INPUT}
            >
              <option value="">Select a professor...</option>
              {professorList.map((p) => (
                <option key={p.id} value={`${p.nom} ${p.prenom}`}>
                  {p.nom} {p.prenom}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            Save Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
