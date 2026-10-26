import React from "react";
import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  GRID_TWO_COLS,
  FIELD_LABEL,
  FIELD_LABEL_MUTED,
  TEXT_INPUT,
  SELECT_INPUT,
  MATRICULE_BOX,
  MATRICULE_TITLE,
  MATRICULE_INPUT,
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

  const selectedRole = formState?.role || "student";
  const isStudentOrAlumni =
    selectedRole === "student" || selectedRole === "ancien";

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>Create New User</h3>

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Last Name</label>
              <input
                type="text"
                placeholder="e.g. Doe"
                onChange={(e) => handleInputChange("nom", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
            <div>
              <label className={FIELD_LABEL}>First Name</label>
              <input
                type="text"
                placeholder="e.g. John"
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
          </div>

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Gender</label>
              <select
                onChange={(e) => handleInputChange("genre", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className={FIELD_LABEL}>Role</label>
              <select
                onChange={(e) => handleInputChange("role", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="student">Student</option>
                <option value="prof">Professor</option>
                <option value="secretaire">Secretary</option>
                <option value="ancien">Alumni</option>
              </select>
            </div>
          </div>

          <div className={MATRICULE_BOX}>
            <p className={MATRICULE_TITLE}>
              Mandatory Matricule Generation (
              {isStudentOrAlumni ? "TGI-YYNNN" : "PRF-YYNNN"})
            </p>
            <div className={GRID_TWO_COLS}>
              <div>
                <label className={FIELD_LABEL_MUTED}>
                  Entry Year (e.g. 25)
                </label>
                <input
                  type="text"
                  placeholder="25"
                  onChange={(e) =>
                    handleInputChange("anneeEntree", e.target.value)
                  }
                  className={MATRICULE_INPUT}
                />
              </div>
              <div>
                <label className={FIELD_LABEL_MUTED}>
                  Class Number (e.g. 020)
                </label>
                <input
                  type="text"
                  placeholder="020"
                  onChange={(e) =>
                    handleInputChange("numInClass", e.target.value)
                  }
                  className={MATRICULE_INPUT}
                />
              </div>
            </div>
          </div>

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Email Address</label>
              <input
                type="email"
                placeholder="user@st-exupery.edu"
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
            <div>
              <label className={FIELD_LABEL}>Contact Phone</label>
              <input
                type="text"
                placeholder="+33 6 00 00 00 00"
                onChange={(e) => handleInputChange("contact", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
          </div>

          <div className={GRID_TWO_COLS}>
            {isStudentOrAlumni && (
              <div>
                <label className={FIELD_LABEL}>Class</label>
                <select
                  onChange={(e) => handleInputChange("classe", e.target.value)}
                  className={SELECT_INPUT}
                >
                  <option value="Seconde">Seconde</option>
                  <option value="Première">Première</option>
                  <option value="Terminale">Terminale</option>
                </select>
              </div>
            )}
            <div className={isStudentOrAlumni ? "" : "col-span-2"}>
              <label className={FIELD_LABEL}>Place of Birth</label>
              <input
                type="text"
                placeholder="Paris"
                onChange={(e) =>
                  handleInputChange("lieuNaissance", e.target.value)
                }
                className={TEXT_INPUT}
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
