import React from "react";
import { extractClassNum } from "../../utils/helpers";

const Profile = ({ currentUser }) => {
  if (!currentUser) return null;

  const isStudentOrAlumni =
    currentUser.role === "student" || currentUser.role === "ancien";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header title */}
      <div>
        <h2 className="text-2xl font-bold text-white">Mon Profil Personnel</h2>
        <p className="text-slate-400 text-sm">
          Informations administratives enregistrées
        </p>
      </div>

      {/* Main profile card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        {/* User header section */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-800">
          <img
            src={currentUser.photo || "/default-avatar.png"}
            alt="profile"
            className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-500/40"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-black text-white">
              {currentUser.prenom} {currentUser.nom}
            </h3>
            <p className="text-blue-400 text-sm font-semibold mt-1">
              Matricule : {currentUser.matricule || "N/A"}
            </p>
            <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                {currentUser.role}
              </span>
              <span
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  currentUser.statut === "active"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {currentUser.statut
                  ? currentUser.statut.toUpperCase()
                  : "INACTIF"}
              </span>
            </div>
          </div>
        </div>

        {/* User detailed metadata grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">
              Email
            </label>
            <p className="text-white font-medium mt-1">
              {currentUser.email || "Non renseigné"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">
              Contact / Téléphone
            </label>
            <p className="text-white font-medium mt-1">
              {currentUser.contact || "Non renseigné"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">
              Genre
            </label>
            <p className="text-white font-medium mt-1 capitalize">
              {currentUser.genre || "Non spécifié"}
            </p>
          </div>

          {/* Conditional fields for students and alumni */}
          {isStudentOrAlumni && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">
                  Année d'Entrée / Sortie
                </label>
                <p className="text-white font-medium mt-1">
                  {currentUser.anneeEntree || "N/A"}{" "}
                  {currentUser.anneeSortie
                    ? `— Sortie en ${currentUser.anneeSortie}`
                    : ""}
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">
                  Classe & Numéro en classe
                </label>
                <p className="text-white font-medium mt-1">
                  {currentUser.role === "ancien"
                    ? "Sans classe (Alumni)"
                    : `${currentUser.classe || "Non assignée"} (${extractClassNum(
                        currentUser.matricule,
                      )})`}
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">
                  Date & Lieu de Naissance
                </label>
                <p className="text-white font-medium mt-1">
                  {currentUser.dateNaissance || "N/A"}{" "}
                  {currentUser.lieuNaissance
                    ? `(${currentUser.lieuNaissance})`
                    : ""}
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase">
                  Adresse Résidentielle
                </label>
                <p className="text-white font-medium mt-1">
                  {currentUser.adresse || "Non renseignée"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
