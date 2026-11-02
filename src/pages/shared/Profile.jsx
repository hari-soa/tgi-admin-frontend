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

export const Profile = ({ currentUser }) => {
  if (!currentUser) return null;

  const isStudent = currentUser.role === "STUDENT";

  return (
    <div className={CONTAINER_WRAPPER}>
      <div>
        <h2 className={HEADER_TITLE}>Mon Profil</h2>
        <p className={HEADER_SUBTITLE}>
          Informations administratives enregistrées
        </p>
      </div>

      <div className={CARD_BOX}>
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
                <p className={FIELD_VALUE}>{currentUser.entryYear || "N/A"}</p>
              </div>
              <div>
                <label className={FIELD_LABEL}>Classe & Rôle / Numéro</label>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
