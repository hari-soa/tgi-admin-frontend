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
  targetStudent,
  setTargetStudent,
  deleteUser,
}) => {
  return (
    <div className={CONTAINER_WRAPPER}>
      <div>
        <h2 className={HEADER_TITLE}>Liste du Personnel</h2>
        <p className={HEADER_SUBTITLE}>
          Enseignants, administration et secrétariat
        </p>
      </div>

      {targetStudent ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6 shadow-xl">
          <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={targetStudent.profilePictureUrl || "/default-avatar.png"}
                alt="target"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-100">
                  {targetStudent.lastName} {targetStudent.firstName}
                </h3>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-blue-900/60 text-blue-300 mt-1 uppercase">
                  {targetStudent.role}
                </span>
              </div>
            </div>
            <button
              onClick={() => setTargetStudent(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors"
            >
              ← Fermer la fiche
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div>
              <span className="text-slate-500 font-medium">Email :</span>{" "}
              <span className="text-white">
                {targetStudent.email || "Non renseigné"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Contact :</span>{" "}
              <span className="text-white">
                {targetStudent.contactNumber || "Non renseigné"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Genre :</span>{" "}
              <span className="capitalize">
                {targetStudent.gender || "Non spécifié"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Statut :</span>{" "}
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  targetStudent.isActive !== false
                    ? "bg-emerald-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {targetStudent.isActive !== false ? "ACTIVE" : "INACTIF"}
              </span>
            </div>
          </div>

          <div className="mt-8 flex gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => deleteUser(targetStudent.id)}
              className="px-4 py-2 bg-red-900/40 text-red-400 rounded-lg hover:bg-red-900/60 text-sm font-bold transition-colors"
            >
              Supprimer l'utilisateur
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default StaffList;
