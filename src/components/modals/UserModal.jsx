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

  const currentRole = formState?.role || "student";
  const isStudent = currentRole === "student";

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>Create New User</h3>

          <div className={GRID_TWO_COLS}>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Last Name</label>
              <input
                type="text"
                placeholder="Nom"
                value={formState?.nom || ""}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>First Name</label>
              <input
                type="text"
                placeholder="Prénom(s)"
                value={formState?.prenom || ""}
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
          </div>

          <div className={GRID_TWO_COLS}>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Gender</label>
              <select
                value={formState?.genre || "Masculin"}
                onChange={(e) => handleInputChange("genre", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
              </select>
            </div>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Role</label>
              <select
                value={currentRole}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="student">Student</option>
                <option value="prof">Professor</option>
                <option value="secrétaire">Secretary</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {isStudent ? (
            <div className={SUB_CONTAINER}>
              <span className={SUB_TITLE}>
                Student Academic - Personal Details
              </span>

              <div className={GRID_TWO_COLS}>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Entry Year</label>
                  <input
                    type="text"
                    placeholder="Année d'entrée"
                    value={formState?.entryYear || ""}
                    onChange={(e) =>
                      handleInputChange("entryYear", e.target.value)
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Class Number</label>
                  <input
                    type="text"
                    placeholder="n°01"
                    value={formState?.classNum || ""}
                    onChange={(e) =>
                      handleInputChange("classNum", e.target.value)
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
              </div>

              <div className={GRID_TWO_COLS}>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Class</label>
                  <select
                    value={formState?.classe || "Seconde"}
                    onChange={(e) =>
                      handleInputChange("classe", e.target.value)
                    }
                    className={SELECT_INPUT}
                  >
                    <option value="Seconde">Seconde</option>
                    <option value="Première">Première</option>
                    <option value="Terminale">Terminale</option>
                  </select>
                </div>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Date of Birth</label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={formState?.dateNaissance || ""}
                    onChange={(e) =>
                      handleInputChange("dateNaissance", e.target.value)
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
              </div>

              <div className={GRID_TWO_COLS}>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Place of Birth</label>
                  <input
                    type="text"
                    placeholder="Lieu de naissance"
                    value={formState?.lieuNaissance || ""}
                    onChange={(e) =>
                      handleInputChange("lieuNaissance", e.target.value)
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Address</label>
                  <input
                    type="text"
                    placeholder="Adresse"
                    value={formState?.adresse || ""}
                    onChange={(e) =>
                      handleInputChange("adresse", e.target.value)
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={SUB_CONTAINER}>
              <span className={SUB_TITLE}>Admin Matricule</span>
              <div className={FIELD_GROUP}>
                <label className={FIELD_LABEL}>Matricule</label>
                <input
                  type="text"
                  placeholder={
                    currentRole === "admin"
                      ? "ADM-001"
                      : currentRole === "prof"
                        ? "PRF-001"
                        : "SEC-001"
                  }
                  value={formState?.matricule || ""}
                  onChange={(e) =>
                    handleInputChange("matricule", e.target.value)
                  }
                  className={TEXT_INPUT}
                  required
                />
              </div>
            </div>
          )}

          <div className={GRID_TWO_COLS}>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Email</label>
              <input
                type="email"
                placeholder="user@gmail.com"
                value={formState?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Contact</label>
              <input
                type="text"
                placeholder="+261 34 00 000 00"
                value={formState?.contact || ""}
                onChange={(e) => handleInputChange("contact", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            Save User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
