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
          <h3 className={MODAL_TITLE}>Create Schedule Pointage</h3>

          <div>
            <label className={FIELD_LABEL}>Professor</label>
            <select
              onChange={(e) => handleInputChange("profName", e.target.value)}
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

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Subject</label>
              <input
                type="text"
                placeholder="e.g. Mathematics"
                onChange={(e) => handleInputChange("matiere", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
            <div>
              <label className={FIELD_LABEL}>Class</label>
              <select
                onChange={(e) => handleInputChange("classe", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="Terminale">Terminale</option>
                <option value="Première">Première</option>
                <option value="Seconde">Seconde</option>
              </select>
            </div>
          </div>

          <div>
            <label className={FIELD_LABEL}>
              Time Slot (e.g. Monday 08:00 - 10:00)
            </label>
            <input
              type="text"
              placeholder="Monday 08:00 - 10:00"
              onChange={(e) => handleInputChange("jour", e.target.value)}
              className={TEXT_INPUT}
              required
            />
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            Save Pointage Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default PointageModal;
