import React from "react";

export default function StudentAccueil({ currentUser, announcements }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-8">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          Espace Élève
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          Bonjour, {currentUser.prenom} {currentUser.nom}
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Retrouvez ici vos dernières notes, votre historique disciplinaire et
          les annonces importantes de l'établissement.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">Annonces Récentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
