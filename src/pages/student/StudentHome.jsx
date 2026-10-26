import React from "react";
import { extractClassNum } from "../../utils/helpers";

const StudentHome = ({
  currentUser,
  announcements,
  historiques,
  remarques,
  setActiveTab,
}) => {
  return (
    <div className="space-y-8">
      {/* Landing Page Banner */}
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          Espace Scolaire Élève
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          Bonjour, {currentUser?.prenom} {currentUser?.nom}
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          {currentUser?.role === "ancien"
            ? `Dossier d'Ancien Élève — Année de sortie : ${currentUser.anneeSortie}`
            : `Classe : ${currentUser?.classe || "N/A"} • Matricule : ${
                currentUser?.matricule || "N/A"
              } (${extractClassNum(currentUser?.matricule)})`}
        </p>
      </div>

      {/* News / Actualités section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">
          Actualité des Examens
        </h3>
        <div className="bg-blue-950/30 border border-blue-800/40 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Résultats Publiés
            </span>
            <h4 className="font-bold text-white text-base mt-1">
              Évaluation du Tronc Commun S1 disponible
            </h4>
            <p className="text-xs text-slate-400">
              Consultez vos notes individuelles, coefficients et moyennes
              globales.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("notes")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all whitespace-nowrap"
          >
            Voir le résultat →
          </button>
        </div>
      </div>

      {/* General announcements filtered by target */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Annonces Générales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements
            .filter(
              (ann) =>
                ann.cible === "tout" || ann.cible === currentUser?.classe,
            )
            .map((ann) => (
              <div
                key={ann.id}
                className={`p-5 rounded-2xl border transition-all ${
                  ann.urgent
                    ? "bg-red-950/20 border-red-800/50"
                    : "bg-slate-900 border-slate-800"
                }`}
              >
                {ann.urgent && (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                    Urgent
                  </span>
                )}
                <h4 className="font-bold text-white text-sm">{ann.title}</h4>
                <p className="text-slate-400 text-xs mt-2">{ann.context}</p>
                <span className="text-[10px] text-slate-500 block mt-4">
                  {ann.date || "Récemment"}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Student discipline history & remarks preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h4 className="font-bold text-white text-base mb-3">
            Historique Présences / Absences
          </h4>
          <div className="space-y-2">
            {historiques
              .filter((h) => h.studentId === currentUser?.id)
              .slice(0, 2)
              .map((h) => (
                <div
                  key={h.id}
                  className={`p-3 rounded-xl border text-xs ${
                    h.isRed
                      ? "bg-red-950/20 border-red-800/40 text-red-200"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  <span className="font-bold">{h.type}</span> ({h.detail}) —{" "}
                  {h.raison}
                </div>
              ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h4 className="font-bold text-white text-base mb-3">
            Remarques Récentes
          </h4>
          <div className="space-y-2">
            {remarques
              .filter((r) => r.studentId === currentUser?.id)
              .slice(0, 2)
              .map((r) => (
                <div
                  key={r.id}
                  className={`p-3 rounded-xl border text-xs ${
                    r.isRed
                      ? "bg-red-950/20 border-red-800/40 text-red-200"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  <span className="font-bold">{r.type}</span> — {r.raison}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
