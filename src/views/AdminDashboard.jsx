import React from "react";

export default function AdminDashboard({
  currentUser,
  notifications,
  subjects,
  users,
  setActiveModal,
  setActiveTab,
}) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
        <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block mb-1">
          Espace de Commandement
        </span>
        <h2 className="text-3xl font-black text-white">
          Bienvenue, {currentUser.prenom} {currentUser.nom}
        </h2>
        <p className="text-slate-400 text-xs mt-2 max-w-2xl leading-relaxed">
          Superviser la gestion académique, valider la création des créneaux
          d'évaluation et configurer les profils des étudiants et du personnel
          du Lycée Saint-Exupéry.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => setActiveModal("createUser")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
          >
            + Créer un utilisateur
          </button>
          <button
            onClick={() => setActiveModal("createSubject")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            + Créer une matière
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-slate-400">
          Notifications & Alertes de Saisie
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-white text-sm">{n.title}</h4>
                    <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      Nouveau
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {n.description}
                  </p>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold whitespace-nowrap ml-2">
                  {n.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-slate-400">
          Actions d'Administration
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Créer Utilisateur",
              desc: "Prof, Élève, Secrétaire, Admin",
              modal: "createUser",
              icon: "👤",
              date: "2026-10-22",
            },
            {
              title: "Créer Matière",
              desc: "Coefficient, prof, classe cible",
              modal: "createSubject",
              icon: "📚",
              date: "2026-10-22",
            },
            {
              title: "Créer Cours / Note",
              desc: "Ouverture du créneau de note",
              modal: "createSlot",
              icon: "📝",
              date: "2026-10-21",
            },
            {
              title: "Créer Annonce",
              desc: "Communication globale",
              modal: "createAnnounce",
              icon: "📢",
              date: "2026-10-20",
            },
          ].map((card, i) => (
            <div
              key={i}
              onClick={() => setActiveModal(card.modal)}
              className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 p-5 rounded-2xl cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-3">{card.icon}</div>
                <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h4>
                <p className="text-slate-400 text-xs mt-1">{card.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>Mise à jour : {card.date}</span>
                <span className="text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                  Lancer →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
