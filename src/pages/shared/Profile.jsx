import { useState, useEffect } from "react";
import {
  CONTAINER_WRAPPER,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  CARD_BOX,
  USER_HEADER_SECTION,
  PROFILE_IMAGE,
  USER_INFO_BOX,
  USER_NAME,
  USER_MATRICULE,
  BADGE_CONTAINER,
  ROLE_BADGE,
  STATUS_ACTIVE_BADGE,
  STATUS_INACTIVE_BADGE,
  DETAILS_GRID,
  FIELD_LABEL,
  FIELD_VALUE,
  FIELD_VALUE_CAPITALIZE,
  ADDRESS_GRID_SPAN,
} from "../../styles/ProfileStyles";

export const Profile = ({ currentUser, onUpdateUser, isAdmin }) => {
  if (!currentUser) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });

  useEffect(() => {
    setFormData({ ...currentUser });
  }, [currentUser]);

  const userRole = (currentUser.role || "").toUpperCase();
  const isStudent = userRole === "STUDENT" || userRole === "ANCIEN";
  const isTeacher = userRole === "TEACHER" || userRole === "PROF";
  const isSecretary = userRole === "SECRETARY" || userRole === "SECRETAIRE";

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
    if (onUpdateUser) {
      await onUpdateUser(currentUser.id, formData);
    }
    setIsEditing(false);
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={HEADER_TITLE}>Profil Utilisateur</h2>
          <p className={HEADER_SUBTITLE}>
            Informations administratives enregistrées
          </p>
        </div>
        {isAdmin && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Modifier le profil ✏️
          </button>
        )}
      </div>

      <div className={CARD_BOX}>
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-6">
            <div className={USER_HEADER_SECTION}>
              <div className="relative">
                <img
                  src={formData.profilePictureUrl || "/default-avatar.png"}
                  alt="profile"
                  className={PROFILE_IMAGE}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2 text-xs text-slate-400"
                />
              </div>
              <div className={USER_INFO_BOX}>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div>
                    <label className={FIELD_LABEL}>Nom</label>
                    <input
                      type="text"
                      value={formData.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
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
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
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
                  className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
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
                  className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                />
              </div>
              <div>
                <label className={FIELD_LABEL}>Genre</label>
                <select
                  value={formData.gender || "MALE"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
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
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                    >
                      <option value="SECONDE">Seconde</option>
                      <option value="PREMIERE">Première</option>
                      <option value="TERMINALE">Terminale</option>
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
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
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
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                    />
                  </div>
                  <div className={ADDRESS_GRID_SPAN}>
                    <label className={FIELD_LABEL}>Adresse</label>
                    <input
                      type="text"
                      value={formData.address || ""}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
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
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
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
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                    placeholder="Ex: Administration & Scolarité"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded font-semibold hover:bg-emerald-500"
              >
                Enregistrer les modifications
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={USER_HEADER_SECTION}>
              <img
                src={currentUser.profilePictureUrl || "/default-avatar.png"}
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
