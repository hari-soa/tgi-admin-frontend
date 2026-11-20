import {
  CONTAINER_WRAPPER,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  GRID_CONTAINER,
  STAFF_CARD,
  CARD_HEADER,
  STAFF_AVATAR,
  STAFF_NAME,
  ROLE_BADGE,
  METADATA_CONTAINER,
  META_LABEL,
  ACTION_CONTAINER,
  ACTION_BUTTON,
  DETAIL_HEADER,
  DETAIL_HEADER_ACTIONS,
  BACK_BUTTON,
  DELETE_DETAIL_BUTTON,
  DETAIL_PANEL,
  CARD_ACTIONS,
  CARD_PRIMARY_ACTION,
  DELETE_CARD_BUTTON,
} from "../../styles/StaffListStyles";
import { useState } from "react";
import Profile from "./Profile";
import { getAvatarSource, getFullName } from "../../utils/helpers";

const STAFF_ROLE_LABELS = {
  ADMIN: "Administrateur",
  SECRETARY: "Secrétaire",
  TEACHER: "Enseignant",
};

export const StaffList = ({
  staffUsers,
  deleteUser,
  onUpdateUser,
  isAdmin,
}) => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleDeleteStaff = async (staff) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer ${staff.firstName} ${staff.lastName} ?`,
    );
    if (!confirmed) return;
    await deleteUser(staff.id);
    setSelectedStaff(null);
  };

  const handleUpdateStaff = async (userId, updatedData) => {
    await onUpdateUser(userId, updatedData);
    setSelectedStaff({ ...selectedStaff, ...updatedData });
  };

  if (selectedStaff) {
    return (
      <div className={CONTAINER_WRAPPER}>
        <div className={DETAIL_HEADER}>
          <div>
            <h2 className={HEADER_TITLE}>Fiche du Personnel</h2>
            <p className={HEADER_SUBTITLE}>
              Gestion, modification et suivi du profil
            </p>
          </div>
          <div className={DETAIL_HEADER_ACTIONS}>
            <button
              onClick={() => setSelectedStaff(null)}
              className={BACK_BUTTON}
            >
              ← Retour à la liste
            </button>
            {isAdmin && (
              <button
                onClick={() => handleDeleteStaff(selectedStaff)}
                className={DELETE_DETAIL_BUTTON}
              >
                Supprimer l'utilisateur
              </button>
            )}
          </div>
        </div>
        <div className={DETAIL_PANEL}>
          <Profile
            currentUser={selectedStaff}
            onUpdateUser={handleUpdateStaff}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={CONTAINER_WRAPPER}>
      <div>
        <h2 className={HEADER_TITLE}>Liste du Personnel</h2>
        <p className={HEADER_SUBTITLE}>
          Enseignants, administration et secrétariat
        </p>
      </div>

      <div className={GRID_CONTAINER}>
        {staffUsers.map((staff) => (
          <div key={staff.id} className={STAFF_CARD}>
            <div>
              <div className={CARD_HEADER}>
                <img
                  src={getAvatarSource(staff)}
                  alt={getFullName(staff)}
                  className={STAFF_AVATAR}
                />
                <div>
                  <h3 className={STAFF_NAME}>
                    {staff.lastName} {staff.firstName}
                  </h3>
                  <span className={ROLE_BADGE}>
                    {STAFF_ROLE_LABELS[staff.role]}
                  </span>
                </div>
              </div>
              <div className={METADATA_CONTAINER}>
                <p>
                  <span className={META_LABEL}>Email :</span>{" "}
                  {staff.email || "Non renseigné"}
                </p>
                <p>
                  <span className={META_LABEL}>Contact :</span>{" "}
                  {staff.contactNumber || "Non renseigné"}
                </p>
                {staff.department && (
                  <p>
                    <span className={META_LABEL}>Département :</span>{" "}
                    {staff.department}
                  </p>
                )}
                {staff.homeroomClass && (
                  <p>
                    <span className={META_LABEL}>Classe principale :</span>{" "}
                    {staff.homeroomClass}
                  </p>
                )}
              </div>
            </div>
            <div className={`${ACTION_CONTAINER} ${CARD_ACTIONS}`}>
              <button
                onClick={() => setSelectedStaff(staff)}
                className={`${ACTION_BUTTON} ${CARD_PRIMARY_ACTION}`}
              >
                {isAdmin ? "Voir / Modifier le profil →" : "Voir le profil →"}
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleDeleteStaff(staff)}
                  className={DELETE_CARD_BUTTON}
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffList;
