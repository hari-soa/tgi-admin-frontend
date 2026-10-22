import React from "react";

export default function SecretaryDashboard({
  currentUser,
  grades,
  announcements,
  setActiveModal,
}) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-8">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          Secrétariat Pédagogique
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          Bienvenue, {currentUser.prenom} {currentUser.nom}
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Gérez les notes des étudiants par classe et par matière, consultez les
          annonces et facilitez la communication administrative.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Saisie Rapide des Notes
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Ajoutez une note en sélectionnant la matière et la classe
              configurées.
            </p>
          </div>
          <button
            onClick={() => setActiveModal("secr_grade")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
          >
            + Ajouter une note
          </button>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-3">
            Notes récemment enregistrées
          </h4>
          <div className="space-y-3">
            {grades.slice(0, 3).map((g) => (
              <div
                key={g.id}
                className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-white">
                    {g.studentName}{" "}
                    <span className="text-xs font-normal text-slate-400">
                      ({g.classe})
                    </span>
                  </p>
                  <p className="text-xs text-blue-400 mt-0.5">
                    {g.subject} • Saisi par {g.addedBy}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-white">
                    {g.grade}{" "}
                    <span className="text-xs text-slate-400">
                      / {g.maxGrade}
                    </span>
                  </span>
                  <p className="text-[10px] text-slate-500">{g.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Annonces Officielles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`p-5 rounded-xl border ${ann.urgent ? "bg-red-950/20 border-red-800/50" : "bg-slate-900 border-slate-800"}`}
            >
              {ann.urgent && (
                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">
                  Urgent
                </span>
              )}
              <h4 className="font-semibold text-white text-sm mt-1">
                {ann.title}
              </h4>
              <p className="text-slate-400 text-xs mt-2">{ann.context}</p>
              <span className="text-[10px] text-slate-500 block mt-4">
                {ann.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
