import { useState, useEffect } from "react";
import {
  ADDRESS_GRID_SPAN,
  AVATAR_WRAPPER,
  BADGE_CONTAINER,
  CANCEL_BUTTON,
  CARD_BOX,
  CONTAINER_WRAPPER,
  DETAILS_GRID,
  EDIT_BUTTON,
  EDIT_FORM,
  EDIT_INPUT,
  FIELD_LABEL,
  FIELD_VALUE,
  FIELD_VALUE_CAPITALIZE,
  FILE_INPUT,
  FORM_ACTIONS,
  HEADER_SUBTITLE,
  HEADER_TITLE,
  NAME_FIELDS_GRID,
  PAGE_HEADER_ROW,
  PROFILE_IMAGE,
  ROLE_BADGE,
  SAVE_BUTTON,
  STATUS_ACTIVE_BADGE,
  STATUS_INACTIVE_BADGE,
  USER_HEADER_SECTION,
  USER_INFO_BOX,
  USER_MATRICULE,
  USER_NAME,
} from "../../styles/ProfileStyles";
import { getAvatarSource, getChangedFields } from "../../utils/helpers";

export const Profile = ({ currentUser, onUpdateUser, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });

  useEffect(() => {
    setFormData({ ...currentUser });
  }, [currentUser]);

  if (!currentUser) return null;

  const userRole = currentUser.role;
  const isStudent = userRole === "STUDENT";
  const isTeacher = userRole === "TEACHER";
  const isSecretary = userRole === "SECRETARY";

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePictureUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const changedFields = getChangedFields(currentUser, formData);
    if (Object.keys(changedFields).length > 0) {
      await onUpdateUser(currentUser.id, changedFields);
    }
    setIsEditing(false);
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={PAGE_HEADER_ROW}>
        <div>
          <h2 className={HEADER_TITLE}>Profil Utilisateur</h2>
          <p className={HEADER_SUBTITLE}>
            Informations administratives enregistrées
          </p>
        </div>
        {isAdmin && !isEditing && (
          <button onClick={() => setIsEditing(true)} className={EDIT_BUTTON}>
            Modifier le profil ✏️
          </button>
        )}
      </div>

      <div className={CARD_BOX}>
        {isEditing ? (
          <form onSubmit={handleSave} className={EDIT_FORM}>
            <div className={USER_HEADER_SECTION}>
              <div className={AVATAR_WRAPPER}>
                <img
                  src={getAvatarSource(formData)}
                  alt="profile"
                  className={PROFILE_IMAGE}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={FILE_INPUT}
                />
              </div>
              <div className={USER_INFO_BOX}>
                <div className={NAME_FIELDS_GRID}>
                  <div>
                    <label className={FIELD_LABEL}>Nom</label>
                    <input
                      type="text"
                      value={formData.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={EDIT_INPUT}
                    />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Prénom</label>
                    <input
                      type="text"
                      value={formData.firstName || ""}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      className={EDIT_INPUT}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={DETAILS_GRID}>
              <div>
                <label className={FIELD_LABEL}>Email</label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={EDIT_INPUT}
                />
              </div>
              <div>
                <label className={FIELD_LABEL}>Contact</label>
                <input
                  type="text"
                  value={formData.contactNumber || ""}
                  onChange={(e) =>
                    handleChange("contactNumber", e.target.value)
                  }
                  className={EDIT_INPUT}
                />
              </div>
              <div>
                <label className={FIELD_LABEL}>Genre</label>
                <select
                  value={formData.gender || "MALE"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className={EDIT_INPUT}
                >
                  <option value="MALE">Masculin</option>
                  <option value="FEMALE">Féminin</option>
                </select>
              </div>

              {isStudent && (
                <>
                  <div>
                    <label className={FIELD_LABEL}>Classe</label>
                    <select
                      value={formData.classGroup || "SECONDE"}
                      onChange={(e) =>
                        handleChange("classGroup", e.target.value)
                      }
                      className={EDIT_INPUT}
                    >
                      <option value="SECONDE">Seconde</option>
                      <option value="PREMIERE">Première</option>
                      <option value="TERMINALE">Terminale</option>
                      <option value="ANCIEN">Ancien</option>
                    </select>
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Numéro de classe</label>
                    <input
                      type="number"
                      value={formData.classRollNumber || ""}
                      onChange={(e) =>
                        handleChange("classRollNumber", Number(e.target.value))
                      }
                      className={EDIT_INPUT}
                    />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Date de Naissance</label>
                    <input
                      type="date"
                      value={
                        formData.dateOfBirth
                          ? formData.dateOfBirth.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleChange("dateOfBirth", e.target.value)
                      }
                      className={EDIT_INPUT}
                    />
                  </div>
                  <div className={ADDRESS_GRID_SPAN}>
                    <label className={FIELD_LABEL}>Adresse</label>
                    <input
                      type="text"
                      value={formData.address || ""}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className={EDIT_INPUT}
                    />
                  </div>
                </>
              )}

              {isTeacher && (
                <div>
                  <label className={FIELD_LABEL}>
                    Classe Titulaire / Spécialité
                  </label>
                  <input
                    type="text"
                    value={formData.homeroomClass || ""}
                    onChange={(e) =>
                      handleChange("homeroomClass", e.target.value)
                    }
                    className={EDIT_INPUT}
                    placeholder="Ex: Terminale C / Mathématiques"
                  />
                </div>
              )}

              {isSecretary && (
                <div>
                  <label className={FIELD_LABEL}>Département / Service</label>
                  <input
                    type="text"
                    value={formData.department || ""}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className={EDIT_INPUT}
                    placeholder="Ex: Administration & Scolarité"
                  />
                </div>
              )}
            </div>

            <div className={FORM_ACTIONS}>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={CANCEL_BUTTON}
              >
                Annuler
              </button>
              <button type="submit" className={SAVE_BUTTON}>
                Enregistrer les modifications
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={USER_HEADER_SECTION}>
              <img
                src={getAvatarSource(currentUser)}
                alt="profile"
                className={PROFILE_IMAGE}
              />
              <div className={USER_INFO_BOX}>
                <h3 className={USER_NAME}>
                  {currentUser.lastName} {currentUser.firstName}
                </h3>
                <p className={USER_MATRICULE}>
                  Matricule : {currentUser.matricule || "N/A"}
                </p>
                <div className={BADGE_CONTAINER}>
                  <span className={ROLE_BADGE}>{currentUser.role}</span>
                  <span
                    className={
                      currentUser.isActive !== false
                        ? STATUS_ACTIVE_BADGE
                        : STATUS_INACTIVE_BADGE
                    }
                  >
                    {currentUser.isActive !== false ? "ACTIVE" : "INACTIF"}
                  </span>
                </div>
              </div>
            </div>

            <div className={DETAILS_GRID}>
              <div>
                <label className={FIELD_LABEL}>Email</label>
                <p className={FIELD_VALUE}>
                  {currentUser.email || "Non renseigné"}
                </p>
              </div>
              <div>
                <label className={FIELD_LABEL}>Contact</label>
                <p className={FIELD_VALUE}>
                  {currentUser.contactNumber || "Non renseigné"}
                </p>
              </div>
              <div>
                <label className={FIELD_LABEL}>Genre</label>
                <p className={FIELD_VALUE_CAPITALIZE}>
                  {currentUser.gender || "Non spécifié"}
                </p>
              </div>

              {isStudent && (
                <>
                  <div>
                    <label className={FIELD_LABEL}>Année d'Entrée</label>
                    <p className={FIELD_VALUE}>
                      {currentUser.entryYear || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Classe & Numéro</label>
                    <p className={FIELD_VALUE}>
                      {currentUser.classGroup || "Non assignée"} (N°
                      {currentUser.classRollNumber || "N/A"})
                    </p>
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Date de Naissance</label>
                    <p className={FIELD_VALUE}>
                      {currentUser.dateOfBirth
                        ? new Date(currentUser.dateOfBirth).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className={ADDRESS_GRID_SPAN}>
                    <label className={FIELD_LABEL}>Adresse</label>
                    <p className={FIELD_VALUE}>
                      {currentUser.address || "Non renseignée"}
                    </p>
                  </div>
                </>
              )}

              {isTeacher && (
                <div>
                  <label className={FIELD_LABEL}>
                    Classe Titulaire / Spécialité
                  </label>
                  <p className={FIELD_VALUE}>
                    {currentUser.homeroomClass || "Non renseignée"}
                  </p>
                </div>
              )}

              {isSecretary && (
                <div>
                  <label className={FIELD_LABEL}>Département</label>
                  <p className={FIELD_VALUE}>
                    {currentUser.department || "Non renseigné"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
