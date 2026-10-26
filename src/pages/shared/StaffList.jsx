import React from "react";

const StaffList = ({ staffUsers, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Liste du Personnel & Équipe Éducative
        </h2>
        <p className="text-slate-400 text-sm">
          Enseignants, administration et secrétariat
        </p>
      </div>

      {/* Staff members grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffUsers.map((staff) => (
          <div
            key={staff.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between transition-all"
          >
            <div>
              {/* Staff avatar and name header */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={staff.photo || "/default-avatar.png"}
                  alt="staff"
                  className="w-12 h-12 rounded-xl object-cover border border-blue-500/30"
                />
                <div>
                  <h3 className="font-bold text-white text-base">
                    {staff.prenom} {staff.nom}
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                    {staff.role}
                  </span>
                </div>
              </div>

              {/* Staff contact metadata */}
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <span className="text-slate-500">Email :</span>{" "}
                  {staff.email || "Non renseigné"}
                </p>
                <p>
                  <span className="text-slate-500">Contact :</span>{" "}
                  {staff.contact || "Non renseigné"}
                </p>
                <p>
                  <span className="text-slate-500">Genre :</span>{" "}
                  <span className="capitalize">
                    {staff.genre || "Non spécifié"}
                  </span>
                </p>
              </div>
            </div>

            {/* Conditional action for teachers to check attendance / pointage */}
            {staff.role === "prof" && (
              <div className="mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setActiveTab("pointage")}
                  className="w-full bg-slate-800 hover:bg-blue-600 text-white text-xs font-semibold py-2 rounded-xl transition-colors shadow-md"
                >
                  Voir le pointage →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffList;
