import React from "react";

export default function Topbar({ activeTab, currentUser, handleLogin }) {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold text-white capitalize">
          {activeTab === "dashboard"
            ? "Tableau de bord"
            : activeTab === "accueil"
              ? "Accueil"
              : activeTab}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
          <span className="text-slate-400">Rôle actif :</span>
          <select
            value={currentUser.role}
            onChange={(e) => handleLogin(e.target.value)}
            className="bg-transparent text-blue-400 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="admin" className="bg-slate-900 text-slate-100">
              Admin
            </option>
            <option value="secretaire" className="bg-slate-900 text-slate-100">
              Secrétaire
            </option>
            <option value="student" className="bg-slate-900 text-slate-100">
              Étudiant
            </option>
          </select>
        </div>

        <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-sm">
            {currentUser.prenom[0]}
            {currentUser.nom[0]}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-white leading-tight">
              {currentUser.prenom} {currentUser.nom}
            </p>
            <span className="inline-block px-2 py-0.5 mt-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
