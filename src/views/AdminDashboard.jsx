import React from "react";
import { isWithin72Hours } from "../data/mockData";

export default function AdminDashboard({
  currentUser,
  notifications,
  alumni,
  subjects,
  setActiveModal,
  setActiveTab,
}) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          Administration Générale
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          Bienvenue, {currentUser.prenom} {currentUser.nom}
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Pilotez l'ensemble des structures du Lycée Saint-Exupéry, gérez les
          utilisateurs, suivez les notifications en temps réel et supervisez le
          parcours des élèves.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => setActiveModal("user")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
          >
            <span>+ Créer un utilisateur</span>
          </button>
          <button
            onClick={() => setActiveModal("announcement")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-5 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            + Publier une annonce
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
          <span>Notifications & Mises à jour en direct</span>
          <span className="text-xs text-slate-400 font-normal">
            Dernières 72 heures
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notifications.map((notif) => {
            const isNew = isWithin72Hours(notif.time);
            return (
              <div
                key={notif.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-white text-sm">
                        {notif.title}
                      </h4>
                      {isNew && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs mt-1">
                      {notif.description}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap ml-2">
                    {notif.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Panneau de Création & Gestion
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Créer utilisateur",
              desc: "Ajouter élèves ou profs",
              modal: "user",
              icon: "👤",
            },
            {
              title: "Créer matière",
              desc: "Nouvelle discipline",
              modal: "subject",
              icon: "📚",
            },
            {
              title: "Créer note",
              desc: "Ajouter une évaluation",
              modal: "grade",
              icon: "📝",
            },
            {
              title: "Créer annonce",
              desc: "Diffuser une information",
              modal: "announcement",
              icon: "📢",
            },
            {
              title: "Créer historique",
              desc: "Avertissement ou exploit",
              modal: "history",
              icon: "⚖️",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={() => setActiveModal(card.modal)}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="text-2xl mb-3">{card.icon}</div>
                <h4 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h4>
                <p className="text-slate-400 text-xs mt-1">{card.desc}</p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-400">
                <span>Lancer</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Aperçu des Effectifs & Registres
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            onClick={() => setActiveTab("etudiants")}
            className="bg-slate-900 border border-slate-800 p-5 rounded-xl cursor-pointer hover:border-slate-700"
          >
            <span className="text-xs text-blue-400 font-semibold uppercase">
              Étudiants
            </span>
            <h4 className="text-xl font-bold text-white mt-1">Seconde</h4>
          </div>
          <div
            onClick={() => setActiveTab("etudiants")}
            className="bg-slate-900 border border-slate-800 p-5 rounded-xl cursor-pointer hover:border-slate-700"
          >
            <span className="text-xs text-blue-400 font-semibold uppercase">
              Étudiants
            </span>
            <h4 className="text-xl font-bold text-white mt-1">Première</h4>
          </div>
          <div
            onClick={() => setActiveTab("etudiants")}
            className="bg-slate-900 border border-slate-800 p-5 rounded-xl cursor-pointer hover:border-slate-700"
          >
            <span className="text-xs text-blue-400 font-semibold uppercase">
              Étudiants
            </span>
            <h4 className="text-xl font-bold text-white mt-1">Terminale</h4>
          </div>
          <div
            onClick={() => setActiveTab("personnel")}
            className="bg-slate-900 border border-slate-800 p-5 rounded-xl cursor-pointer hover:border-slate-700"
          >
            <span className="text-xs text-cyan-400 font-semibold uppercase">
              Personnel
            </span>
            <h4 className="text-xl font-bold text-white mt-1">Enseignants</h4>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-emerald-400 font-semibold uppercase">
              Anciens
            </span>
            <h4 className="text-xl font-bold text-white mt-1">
              Alumni ({alumni.length})
            </h4>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-purple-400 font-semibold uppercase">
              Matières
            </span>
            <h4 className="text-xl font-bold text-white mt-1">
              {subjects.length} cours
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
