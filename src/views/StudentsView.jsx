import React from "react";

export default function StudentsView({ users, currentUser, setActiveModal }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Liste des Étudiants</h2>
          <p className="text-slate-400 text-sm">
            Répartition par niveau et classe
          </p>
        </div>
        {currentUser.role === "admin" && (
          <button
            onClick={() => setActiveModal("user")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
          >
            + Ajouter un élève
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Seconde", "Première", "Terminale"].map((niveau) => {
          const etudiantsNiveau = users.filter(
            (u) =>
              u.role === "student" &&
              (!u.classe || u.classe.toLowerCase() === niveau.toLowerCase()),
          );
          return (
            <div
              key={niveau}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-lg">{niveau}</h3>
                  <span className="bg-blue-600/20 text-blue-400 text-xs px-2.5 py-1 rounded-full font-semibold">
                    {etudiantsNiveau.length} élèves
                  </span>
                </div>
                <div className="space-y-3">
                  {etudiantsNiveau.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">
                      Aucun élève enregistré.
                    </p>
                  ) : (
                    etudiantsNiveau.map((etu) => (
                      <div
                        key={etu.id}
                        className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {etu.nom} {etu.prenom}
                          </p>
                          <p className="text-xs text-slate-400">
                            {etu.matricule} • {etu.numeroClasse || "n°01"}
                          </p>
                        </div>
                        <span className="text-xs text-blue-400 font-medium">
                          {etu.contact}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
