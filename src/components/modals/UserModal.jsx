import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  GRID_TWO_COLS,
  FIELD_GROUP,
  FIELD_LABEL,
  TEXT_INPUT,
  SELECT_INPUT,
  SUB_CONTAINER,
  SUB_TITLE,
  SUBMIT_BUTTON,
} from "../../styles/UserModalStyles";

export const UserModal = ({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const currentRole = formState?.role || "STUDENT";
  const isStudent = currentRole === "STUDENT";

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>Créer un utilisateur</h3>

          <div className={GRID_TWO_COLS}>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Nom</label>
              <input
                type="text"
                placeholder="Nom"
                value={formState?.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Prénom(s)</label>
              <input
                type="text"
                placeholder="Prénom(s)"
                value={formState?.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
          </div>

          <div className={GRID_TWO_COLS}>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Matricule</label>
              <input
                type="text"
                placeholder="Ex: MAT-001"
                value={formState?.matricule || ""}
                onChange={(e) => handleInputChange("matricule", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Genre</label>
              <select
                value={formState?.gender || "MALE"}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="MALE">Masculin</option>
                <option value="FEMALE">Féminin</option>
              </select>
            </div>
          </div>

          <div className={FIELD_GROUP}>
            <label className={FIELD_LABEL}>Rôle</label>
            <select
              value={currentRole}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className={SELECT_INPUT}
            >
              <option value="STUDENT">Élève</option>
              <option value="TEACHER">Professeur</option>
              <option value="SECRETARY">Secrétaire</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {isStudent && (
            <div className={SUB_CONTAINER}>
              <span className={SUB_TITLE}>
                Informations Académiques (Élève)
              </span>

              <div className={GRID_TWO_COLS}>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Classe</label>
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
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Numéro de classe</label>
                  <input
                    type="number"
                    placeholder="1"
                    value={formState?.classRollNumber || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "classRollNumber",
                        Number(e.target.value),
                      )
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className={SUBMIT_BUTTON}>
            Enregistrer l'utilisateur
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
