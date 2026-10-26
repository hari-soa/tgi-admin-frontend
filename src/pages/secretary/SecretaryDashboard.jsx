import React from "react";

const SecretaryDashboard = ({
  gradeSessions,
  setActiveGradeSession,
  setActiveTab,
}) => {
  // Filter sessions that are pending entry or currently saved as draft
  const pendingOrDraftSessions = gradeSessions.filter(
    (session) =>
      session.statut === "attente_saisie" || session.statut === "brouillon",
  );

  return (
    <div className="space-y-8">
      {/* Secretary header banner */}
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-8">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          Secrétariat Pédagogique
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          Espace de Gestion des Notes
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Complétez la saisie des notes initiée par l'administrateur et
          transmettez-les pour validation finale.
        </p>
      </div>

      {/* Grade sessions pending input section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Sessions de Notes en Attente de Saisie
        </h3>
        <div className="space-y-4">
          {pendingOrDraftSessions.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              Aucune session en attente de saisie.
            </p>
          ) : (
            pendingOrDraftSessions.map((session) => (
              <div
                key={session.id}
                className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-base">
                      {session.matiere}
                    </span>
                    <span className="bg-blue-600/20 text-blue-400 text-xs px-2.5 py-0.5 rounded font-semibold">
                      {session.classe}
                    </span>
                    <span className="bg-yellow-500/10 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {session.statut === "brouillon" ? "Brouillon" : "Nouveau"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Créé par Admin le : {session.dateCreation || "Récemment"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveGradeSession(session);
                    setActiveTab("notes_secr");
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-600/20"
                >
                  Saisir les notes →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;
