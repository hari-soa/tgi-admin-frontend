import React from "react";

const StudentHistory = ({ currentUser, historiques, remarques }) => {
  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Historique & Remarques Disciplinaires
        </h2>
        <p className="text-slate-400 text-sm">
          Registre d'absences, retards, infirmerie et mentions académiques
        </p>
      </div>

      {/* Disciplinary history section (Absences, Lates, Infirmary, Exits) */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Historique (Absences, Retards, Infirmerie, Sorties)
        </h3>
        <div className="space-y-3">
          {historiques
            .filter((h) => h.studentId === currentUser?.id)
            .map((h) => (
              <div
                key={h.id}
                className={`p-5 rounded-xl border flex items-center justify-between transition-all ${
                  h.type === "Absence" || h.isRed
                    ? "bg-red-950/20 border-red-800/50 text-red-100"
                    : "bg-slate-900 border-slate-800 text-slate-200"
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                        h.type === "Absence"
                          ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                          : "bg-blue-600/30 text-blue-300"
                      }`}
                    >
                      {h.type}
                    </span>
                    <span className="text-xs font-semibold">{h.detail}</span>
                  </div>
                  <p className="text-sm mt-2 font-medium">{h.raison}</p>
                  <p className="text-[10px] opacity-60 mt-2">
                    Auteur : {h.author || "Administration"}
                  </p>
                </div>
                <span className="text-xs font-mono opacity-70 whitespace-nowrap">
                  {h.date || "Récemment"}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Student remarks section (Warnings, Academic notes, Encouragements) */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Remarques (Avertissement, Académique, Encouragement)
        </h3>
        <div className="space-y-3">
          {remarques
            .filter((r) => r.studentId === currentUser?.id)
            .map((r) => (
              <div
                key={r.id}
                className={`p-5 rounded-xl border flex items-center justify-between transition-all ${
                  r.type === "Avertissement" || r.isRed
                    ? "bg-red-950/20 border-red-800/50 text-red-100"
                    : "bg-slate-900 border-slate-800 text-slate-200"
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                        r.type === "Avertissement"
                          ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                          : "bg-emerald-600/30 text-emerald-300"
                      }`}
                    >
                      {r.type}
                    </span>
                  </div>
                  <p className="text-sm mt-2 font-medium">{r.raison}</p>
                  <p className="text-[10px] opacity-60 mt-2">
                    Auteur : {r.author || "Corps Enseignant"}
                  </p>
                </div>
                <span className="text-xs font-mono opacity-70 whitespace-nowrap">
                  {r.date || "Récemment"}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHistory;
