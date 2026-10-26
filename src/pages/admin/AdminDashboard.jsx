import React from "react";

const AdminDashboard = ({
  currentUser,
  users,
  subjects,
  gradeSessions,
  announcements,
  setActiveModal,
  handleAdminValidateSession,
}) => {
  // Filter grade sessions that require administrator validation
  const pendingSessions = gradeSessions.filter(
    (session) => session.statut === "attente_validation",
  );

  return (
    <div className="space-y-8">
      {/* Control Panel Header Banner */}
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-8">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          Panneau de Contrôle Administrateur
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          Direction du Lycée Saint-Exupéry
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Gérez les utilisateurs, diffusez les annonces, programmez les matières
          et validez les notes transmises par le secrétariat.
        </p>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => setActiveModal("user")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/35 transition-all"
          >
            + Créer un utilisateur
          </button>
          <button
            onClick={() => setActiveModal("announcement")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            + Créer une annonce
          </button>
          <button
            onClick={() => setActiveModal("subject")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            + Créer une matière
          </button>
          <button
            onClick={() => setActiveModal("grade_session")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            + Créer une note
          </button>
          <button
            onClick={() => setActiveModal("pointage")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            + Créer un pointage
          </button>
        </div>
      </div>

      {/* Statistics Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-blue-400 font-bold uppercase">
            Utilisateurs Totaux
          </span>
          <p className="text-3xl font-extrabold text-white mt-1">
            {users.length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-emerald-400 font-bold uppercase">
            Matières Enseignées
          </span>
          <p className="text-3xl font-extrabold text-white mt-1">
            {subjects.length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-purple-400 font-bold uppercase">
            Sessions de Notes
          </span>
          <p className="text-3xl font-extrabold text-white mt-1">
            {gradeSessions.length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-cyan-400 font-bold uppercase">
            Annonces Actives
          </span>
          <p className="text-3xl font-extrabold text-white mt-1">
            {announcements.length}
          </p>
        </div>
      </div>

      {/* Pending Grade Sessions Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Notes Transmises par la Secrétaire (En attente de validation)
        </h3>
        <div className="space-y-4">
          {pendingSessions.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              Aucune session en attente de validation.
            </p>
          ) : (
            pendingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-white text-base">
                      {session.matiere} ({session.classe})
                    </h4>
                    <span className="bg-purple-500/20 text-purple-400 text-xs px-2.5 py-0.5 rounded font-semibold">
                      Validation requise
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Saisie complétée par la secrétaire.
                  </p>
                </div>
                <button
                  onClick={() => handleAdminValidateSession(session.id)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
                >
                  Valider & Injecter les notes
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
