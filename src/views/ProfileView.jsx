import React from "react";

export default function ProfileView({ currentUser }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white">Mon Profil</h2>
        <p className="text-slate-400 text-sm">
          Informations personnelles et coordonnées administratives
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-2xl">
            {currentUser.prenom[0]}
            {currentUser.nom[0]}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-extrabold text-white">
              {currentUser.prenom} {currentUser.nom}
            </h3>
            <p className="text-blue-400 text-sm font-medium mt-0.5">
              Matricule : {currentUser.matricule}
            </p>
            <span className="inline-block px-2.5 py-1 mt-2 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
              {currentUser.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">
              Email
            </label>
            <p className="text-white text-sm font-medium mt-1">
              {currentUser.email}
            </p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">
              Contact / Téléphone
            </label>
            <p className="text-white text-sm font-medium mt-1">
              {currentUser.contact}
            </p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">
              Sexe
            </label>
            <p className="text-white text-sm font-medium mt-1">
              {currentUser.sexe === "M" ? "Masculin" : "Féminin"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">
              Date de naissance
            </label>
            <p className="text-white text-sm font-medium mt-1">
              {currentUser.dateNaissance || "14/03/2008"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
