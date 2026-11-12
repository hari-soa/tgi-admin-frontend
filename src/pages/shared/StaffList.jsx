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
import Profile from "./Profile";

export const StaffList = ({
  staffUsers,
  targetStudent,
  setTargetStudent,
  deleteUser,
  onUpdateUser,
  isAdmin,
}) => {
  if (targetStudent) {
    return (
      <div className={CONTAINER_WRAPPER}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className={HEADER_TITLE}>Fiche du Personnel</h2>
            <p className={HEADER_SUBTITLE}>
              Gestion, modification et suivi du profil
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setTargetStudent(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors"
            >
              ← Retour à la liste
            </button>
            {isAdmin && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Voulez-vous vraiment supprimer cet utilisateur ?",
                    )
                  ) {
                    deleteUser(targetStudent.id || targetStudent._id);
                    setTargetStudent(null);
                  }
                }}
                className="px-4 py-2 bg-red-900/60 hover:bg-red-900 text-red-300 rounded-lg text-sm font-bold transition-colors"
              >
                Supprimer l'utilisateur
              </button>
            )}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <Profile
            currentUser={targetStudent}
            onUpdateUser={async (userId, updatedData) => {
              await onUpdateUser(userId, updatedData);
              setTargetStudent({ ...targetStudent, ...updatedData });
            }}
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
        {staffUsers.map((staff) => {
          const userId = staff.id || staff._id;
          return (
            <div key={userId} className={STAFF_CARD}>
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
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        staff.isActive !== false
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {staff.isActive !== false ? "ACTIVE" : "INACTIF"}
                    </span>
                  </p>
                </div>
              </div>

              <div
                className={ACTION_CONTAINER}
                style={{ display: "flex", gap: "8px", marginTop: "12px" }}
              >
                <button
                  onClick={() => {
                    setTargetStudent(staff);
                  }}
                  className={ACTION_BUTTON}
                  style={{ flex: 1 }}
                >
                  Voir / Modifier le profil →
                </button>
                {isAdmin && (
                  <button
                    onClick={() => deleteUser(userId)}
                    className="px-3 py-2 bg-red-900/40 text-red-400 rounded hover:bg-red-900/60 text-xs font-bold"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaffList;
