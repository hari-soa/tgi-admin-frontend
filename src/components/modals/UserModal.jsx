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
          <h3 className={MODAL_TITLE}>Create New User</h3>

          <div className={GRID_TWO_COLS}>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Last Name</label>
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
              <label className={FIELD_LABEL}>First Name</label>
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
              <label className={FIELD_LABEL}>Gender</label>
              <select
                value={formState?.gender || "MALE"}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="MALE">Masculin</option>
                <option value="FEMALE">Féminin</option>
              </select>
            </div>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Role</label>
              <select
                value={currentRole}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Professor</option>
                <option value="SECRETARY">Secretary</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          {isStudent ? (
            <div className={SUB_CONTAINER}>
              <span className={SUB_TITLE}>
                Student Academic & Personal Details
              </span>

              <div className={GRID_TWO_COLS}>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Entry Year</label>
                  <input
                    type="number"
                    placeholder="2026"
                    value={formState?.entryYear || ""}
                    onChange={(e) =>
                      handleInputChange("entryYear", Number(e.target.value))
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Class Roll Number</label>
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

              <div className={GRID_TWO_COLS}>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Class Group</label>
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
                  <label className={FIELD_LABEL}>Date of Birth</label>
                  <input
                    type="date"
                    value={formState?.dateOfBirth || ""}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
              </div>

              <div className={GRID_TWO_COLS}>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Parents Email</label>
                  <input
                    type="email"
                    placeholder="parents@gmail.com"
                    value={formState?.parentsEmail || ""}
                    onChange={(e) =>
                      handleInputChange("parentsEmail", e.target.value)
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
                <div className={FIELD_GROUP}>
                  <label className={FIELD_LABEL}>Parents Contact</label>
                  <input
                    type="text"
                    placeholder="+261 34..."
                    value={formState?.parentsContactNumber || ""}
                    onChange={(e) =>
                      handleInputChange("parentsContactNumber", e.target.value)
                    }
                    className={TEXT_INPUT}
                    required
                  />
                </div>
              </div>

              <div className={FIELD_GROUP}>
                <label className={FIELD_LABEL}>Address</label>
                <input
                  type="text"
                  placeholder="Adresse complète"
                  value={formState?.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={TEXT_INPUT}
                  required
                />
              </div>
            </div>
          ) : currentRole === "TEACHER" ? (
            <div className={SUB_CONTAINER}>
              <span className={SUB_TITLE}>Teacher Details</span>
              <div className={FIELD_GROUP}>
                <label className={FIELD_LABEL}>
                  Subject IDs (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="subj_math_1, subj_phys_2"
                  value={formState?.subjectIds?.join(", ") || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "subjectIds",
                      e.target.value.split(",").map((s) => s.trim()),
                    )
                  }
                  className={TEXT_INPUT}
                  required
                />
              </div>
            </div>
          ) : null}

          {currentRole !== "TEACHER" && (
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Password (min 8 chars)</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formState?.password || ""}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={TEXT_INPUT}
                required
              />
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
              />
            </div>
            <div className={FIELD_GROUP}>
              <label className={FIELD_LABEL}>Contact</label>
              <input
                type="text"
                placeholder="+261 34 00 000 00"
                value={formState?.contactNumber || ""}
                onChange={(e) =>
                  handleInputChange("contactNumber", e.target.value)
                }
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
