import React from "react";

export default function StudentsView({
  users,
  currentUser,
  setActiveModal,
  setSelectedStudent,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">
            Registre des Étudiants
          </h2>
          <p className="text-slate-400 text-xs">
            Sélectionnez un étudiant pour ouvrir sa fiche individuelle complète
          </p>
        </div>
        {currentUser.role === "admin" && (
          <button
            onClick={() => setActiveModal("createUser")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
          >
            + Ajouter un étudiant
          </button>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Élève</th>
                <th className="p-4">Matricule</th>
                <th className="p-4">Classe</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users
                .filter((u) => u.role === "student")
                .map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4 flex items-center space-x-3">
                      <img
                        src={student.photo}
                        alt=""
                        className="w-8 h-8 rounded-xl object-cover border border-slate-700"
                      />
                      <span className="font-bold text-white">
                        {student.nom} {student.prenom}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-blue-400">
                      {student.matricule}
                    </td>
                    <td className="p-4">
                      {student.classe} ({student.numeroClasse})
                    </td>
                    <td className="p-4">{student.contact}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          student.statut === "Actif"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {student.statut}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="bg-slate-800 hover:bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-xl transition-all text-[11px]"
                      >
                        Voir Profil →
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
