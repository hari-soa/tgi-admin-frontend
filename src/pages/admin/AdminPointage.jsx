import React from "react";

export default function AdminPointage({
  currentUser,
  pointages,
  handleTogglePointage,
  setActiveModal,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Registre du Pointage Enseignants
          </h2>
          <p className="text-slate-400 text-sm">
            Suivi de présence aux cours fixés selon l'emploi du temps
          </p>
        </div>
        {currentUser.role === "admin" && (
          <button
            onClick={() => setActiveModal("pointage")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl"
          >
            + Nouveau Pointage Fixe
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pointages.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-400">{p.jour}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  p.status === "present"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : p.status === "retard"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : p.status === "absent"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-slate-800 text-slate-400"
                }`}
              >
                {p.status}
              </span>
            </div>

            <h4 className="font-bold text-white text-base">{p.profName}</h4>
            <p className="text-xs text-slate-300 mt-1">
              {p.matiere} • <span className="text-blue-400">{p.classe}</span>
            </p>

            {p.status === "retard" && (
              <p className="text-xs text-yellow-400 mt-2">
                Retard : +{p.retardMin} min
              </p>
            )}
            {p.status === "absent" && (
              <p className="text-xs text-red-400 mt-2">
                Motif : {p.motif || "Non spécifié"}
              </p>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">
                Fixe (Hebdomadaire)
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleTogglePointage(p.id, "present")}
                  className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white px-2 py-1 rounded text-[10px]"
                >
                  Présent
                </button>
                <button
                  onClick={() => handleTogglePointage(p.id, "retard", 15)}
                  className="bg-yellow-600/20 hover:bg-yellow-600 text-yellow-400 hover:text-white px-2 py-1 rounded text-[10px]"
                >
                  Retard
                </button>
                <button
                  onClick={() =>
                    handleTogglePointage(p.id, "absent", 0, "Injustifiée")
                  }
                  className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-2 py-1 rounded text-[10px]"
                >
                  Absent
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
