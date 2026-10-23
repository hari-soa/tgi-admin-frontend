import React from "react";

export default function Topbar({ currentUser, activeTab }) {
  return (
    <header className="fixed top-0 right-0 left-64 h-20 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-20">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold text-white capitalize">
          {activeTab === "dashboard"
            ? "Tableau de bord"
            : activeTab === "accueil"
              ? "Accueil"
              : activeTab.replace("_", " ")}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
          <img
            src={currentUser.photo}
            alt="profile"
            className="w-10 h-10 rounded-xl object-cover border border-blue-500/30"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-white leading-tight">
              {currentUser.prenom} {currentUser.nom}
            </p>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="inline-block px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                {currentUser.role}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${currentUser.statut === "active" ? "bg-emerald-500" : "bg-red-500"}`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
