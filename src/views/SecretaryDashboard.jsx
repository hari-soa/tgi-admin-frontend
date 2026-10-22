import React from "react";

export default function SecretaryDashboard({
  currentUser,
  gradeSlots,
  setModalData,
  setActiveModal,
}) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-8">
        <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block mb-1">
          Espace Secrétariat Pédagogique
        </span>
        <h2 className="text-3xl font-black text-white">
          Bienvenue, {currentUser.prenom} {currentUser.nom}
        </h2>
        <p className="text-slate-400 text-xs mt-2 max-w-2xl">
          Saisissez manuellement les évaluations dans la grille Excel pour
          chaque cours et examen créés par l'administration.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <h3 className="text-base font-bold text-white mb-4">
          Créneaux d'Évaluation à Saisir (Saisie Excel)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gradeSlots.map((slot) => (
            <div
              key={slot.id}
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-white text-sm">
                    {slot.subjectName}
                  </h4>
                  <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {slot.examCode}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Classe :{" "}
                  <strong className="text-slate-200">{slot.classe}</strong>
                </p>
                <span className="text-[10px] text-slate-500 block mt-2">
                  Créé le : {slot.updatedAt}
                </span>
              </div>
              <div>
                <button
                  onClick={() => {
                    setModalData({ currentSlot: slot });
                    setActiveModal("excelGradeEntry");
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
                >
                  Ouvrir Grille Excel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
