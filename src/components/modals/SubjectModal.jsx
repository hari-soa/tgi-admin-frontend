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
    ? staffUsers.filter((s) => {
        const role = (s.role || "").toUpperCase();
        return ["TEACHER", "PROF"].includes(role);
      })
    : [];

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>
            {formState?.id ? "Modifier la matière" : "Créer une matière"}
          </h3>

          <div>
            <label className={FIELD_LABEL}>Nom de la matière</label>
            <input
              type="text"
              placeholder="Ex : Mathématiques"
              value={formState?.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={TEXT_INPUT}
              required
            />
          </div>

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Coefficient</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                placeholder="1"
                value={formState?.coefficient || ""}
                onChange={(e) =>
                  handleInputChange("coefficient", parseFloat(e.target.value))
                }
                className={TEXT_INPUT}
                required
              />
            </div>
            <div>
              <label className={FIELD_LABEL}>Classe associée</label>
              <select
                value={formState?.classGroup || "SECONDE"}
                onChange={(e) =>
                  handleInputChange("classGroup", e.target.value)
                }
                className={SELECT_INPUT}
              >
                <option value="SECONDE">Seconde</option>
                <option value="PREMIERE">Première</option>
                <option value="TERMINALE">Terminale</option>
              </select>
            </div>
          </div>

          <div>
            <label className={FIELD_LABEL}>Professeur responsable</label>
            <select
              value={formState?.teacherId || ""}
              onChange={(e) => handleInputChange("teacherId", e.target.value)}
              className={SELECT_INPUT}
              required
            >
              <option value="">Sélectionner un professeur...</option>
              {professorList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.lastName || p.nom} {p.firstName || p.prenom}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            {formState?.id ? "Mettre à jour la matière" : "Enregistrer la matière"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
