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
  META_CAPITALIZE,
  ACTION_CONTAINER,
  ACTION_BUTTON,
} from "../../styles/StaffListStyles";

export const StaffList = ({
  staffUsers,
  setTargetStudent,
  toggleUserStatus,
  deleteUser,
  setActiveTab,
}) => {
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
                  src={staff.profilePictureUrl || "/default-avatar.png"}
                  alt="staff"
                  className={STAFF_AVATAR}
                />
                <div>
                  <h3 className={STAFF_NAME}>
                    {staff.lastName} {staff.firstName}
                  </h3>
                  <span className={ROLE_BADGE}>{staff.role}</span>
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
                <p>
                  <span className={META_LABEL}>Genre :</span>{" "}
                  <span className={META_CAPITALIZE}>
                    {staff.gender || "Non spécifié"}
                  </span>
                </p>
                <p>
                  <span className={META_LABEL}>Statut :</span>{" "}
                  <button
                    onClick={() => toggleUserStatus(staff.id)}
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      staff.isActive !== false
                        ? "bg-emerald-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {staff.isActive !== false ? "ACTIVE" : "INACTIF"}
                  </button>
                </p>
              </div>
            </div>

            <div
              className={ACTION_CONTAINER}
              style={{ display: "flex", gap: "8px", marginTop: "12px" }}
            >
              <button
                onClick={() => {
                  setTargetStudent(staff); // Stocke le membre du staff sélectionné
                  setActiveTab("profil"); // Bascule vers l'onglet Profil
                }}
                className={ACTION_BUTTON}
                style={{ flex: 1 }}
              >
                Voir / Modifier le profil →
              </button>
              <button
                onClick={() => deleteUser(staff.id)}
                className="px-3 py-2 bg-red-900/40 text-red-400 rounded hover:bg-red-900/60 text-xs font-bold"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffList;
