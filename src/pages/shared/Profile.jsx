import { extractClassNum } from "../../utils/helpers";
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

  const isStudentOrAlumni =
    currentUser.role === "student" || currentUser.role === "ancien";

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
            src={currentUser.photo || "/default-avatar.png"}
            alt="profile"
            className={PROFILE_IMAGE}
          />
          <div className={USER_INFO_BOX}>
            <h3 className={USER_NAME}>
              {currentUser.nom} {currentUser.prenom}
            </h3>
            <p className={USER_MATRICULE}>
              Matricule : {currentUser.matricule || "N/A"}
            </p>
            <div className={BADGE_CONTAINER}>
              <span className={ROLE_BADGE}>{currentUser.role}</span>
              <span
                className={
                  currentUser.statut === "active"
                    ? STATUS_ACTIVE_BADGE
                    : STATUS_INACTIVE_BADGE
                }
              >
                {currentUser.statut
                  ? currentUser.statut.toUpperCase()
                  : "INACTIF"}
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
              {currentUser.contact || "Non renseigné"}
            </p>
          </div>
          <div>
            <label className={FIELD_LABEL}>Genre</label>
            <p className={FIELD_VALUE_CAPITALIZE}>
              {currentUser.genre || "Non spécifié"}
            </p>
          </div>

          {isStudentOrAlumni && (
            <>
              <div>
                <label className={FIELD_LABEL}>Année d'Entrée / Sortie</label>
                <p className={FIELD_VALUE}>
                  {currentUser.anneeEntree || "N/A"}{" "}
                  {currentUser.anneeSortie
                    ? `— Sortie en ${currentUser.anneeSortie}`
                    : ""}
                </p>
              </div>
              <div>
                <label className={FIELD_LABEL}>Classe & Numéro en classe</label>
                <p className={FIELD_VALUE}>
                  {currentUser.role === "ancien"
                    ? "Sans classe (Alumni)"
                    : `${currentUser.classe || "Non assignée"} (${extractClassNum(
                        currentUser.matricule,
                      )})`}
                </p>
              </div>
              <div>
                <label className={FIELD_LABEL}>Date & Lieu de Naissance</label>
                <p className={FIELD_VALUE}>
                  {currentUser.dateNaissance || "N/A"}{" "}
                  {currentUser.lieuNaissance
                    ? `(${currentUser.lieuNaissance})`
                    : ""}
                </p>
              </div>
              <div className={ADDRESS_GRID_SPAN}>
                <label className={FIELD_LABEL}>Adresse</label>
                <p className={FIELD_VALUE}>
                  {currentUser.adresse || "Non renseignée"}
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
