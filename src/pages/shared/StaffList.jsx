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
  CARD_ACTIONS,
  CARD_PRIMARY_ACTION,
  DELETE_CARD_BUTTON,
} from "../../styles/StaffListStyles";
import { useState } from "react";
import Profile from "./Profile";
import { getAvatarSource, getFullName } from "../../utils/helpers";
import { CLASS_GROUP_LABELS, USER_ROLE_LABELS } from "../../utils/labels";

export const StaffList = ({
  staffUsers,
  deleteUser,
  onUpdateUser,
  isAdmin,
}) => {
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const selectedStaff =
    staffUsers.find((staff) => staff.id === selectedStaffId) || null;

  const handleDeleteStaff = async (staff) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer ${staff.firstName} ${staff.lastName} ?`,
    );
    if (!confirmed) return;
    await deleteUser(staff.id);
  };

  if (selectedStaff) {
    return (
      <Profile
        currentUser={selectedStaff}
        onUpdateUser={onUpdateUser}
        isAdmin={isAdmin}
        onBack={() => setSelectedStaffId(null)}
      />
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
                    {USER_ROLE_LABELS[staff.role]}
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
                    {CLASS_GROUP_LABELS[staff.homeroomClass] || staff.homeroomClass}
                  </p>
                )}
              </div>
            </div>
            <div className={`${ACTION_CONTAINER} ${CARD_ACTIONS}`}>
              <button
                onClick={() => setSelectedStaffId(staff.id)}
                className={`${ACTION_BUTTON} ${CARD_PRIMARY_ACTION}`}
              >
                Voir le profil
              </button>
              {isAdmin && !staff.isSuperAdmin && (
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
