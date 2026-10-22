import React from "react";

export default function StudentProfileDetail({
  selectedStudent,
  setSelectedStudent,
  currentUser,
  handleProfilePhotoUpload,
  setActiveModal,
  handleToggleUserStatus,
  handleDeleteUser,
  computeStudentStats,
  handleConseilDecision,
  histories,
  remarques,
}) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <button
        onClick={() => setSelectedStudent(null)}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition-all"
      >
        <span>← Retour à la liste</span>
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative group">
            <img
              src={selectedStudent.photo}
              alt="Profil"
              className="w-28 h-28 rounded-2xl object-cover border-2 border-blue-500/30 shadow-lg"
            />
            <label className="absolute inset-0 bg-slate-950/70 rounded-2xl flex items-center justify-center text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-center p-1">
              Changer Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleProfilePhotoUpload(e, selectedStudent.id)
                }
              />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h2 className="text-2xl font-black text-white">
                {selectedStudent.prenom} {selectedStudent.nom}
              </h2>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  selectedStudent.statut === "Actif"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {selectedStudent.statut}
              </span>
            </div>
            <p className="text-xs font-semibold text-blue-400">
              Matricule : {selectedStudent.matricule} • Classe :{" "}
              {selectedStudent.classe || "N/A"} ({selectedStudent.numeroClasse})
            </p>

            {currentUser.role === "admin" && (
              <div className="pt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <button
                  onClick={() => setActiveModal("addHistory")}
                  className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
                >
                  + Ajouter Historique
                </button>
                <button
                  onClick={() => setActiveModal("addRemarque")}
                  className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
                >
                  + Ajouter Remarque
                </button>
                <button
                  onClick={() => handleToggleUserStatus(selectedStudent.id)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
                >
                  {selectedStudent.statut === "Actif"
                    ? "Désactiver"
                    : "Activer"}
                </button>
                <button
                  onClick={() => handleDeleteUser(selectedStudent.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {currentUser.role === "admin" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Décision du Conseil de Classe
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Validation annuelle, redoublement ou orientation
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">
                Moyenne Annuelle Calculée :
              </span>
              <span className="text-xl font-black text-blue-400">
                {computeStudentStats(selectedStudent.id, "ALL").average ||
                  "N/A"}{" "}
                / 20
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => handleConseilDecision(selectedStudent, "PASSAGE")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              Valider Passage
            </button>
            <button
              onClick={() =>
                handleConseilDecision(selectedStudent, "REDOUBLEMENT")
              }
              className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              Redoublement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
