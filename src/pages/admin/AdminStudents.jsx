import React from "react";
import { extractClassNum } from "../../utils/helpers";

const AdminStudents = ({
  studentUsers,
  selectedStudentFilter,
  setSelectedStudentFilter,
  targetStudent,
  setTargetStudent,
  setActiveModal,
  toggleUserStatus,
  deleteUser,
  setCurrentUser,
  setActiveTab,
  historiques,
  remarques,
}) => {
  return (
    <div className="space-y-6">
      {/* Header section with title, filter dropdown, and creation button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Gestion de la Liste des Étudiants
          </h2>
          <p className="text-slate-400 text-sm">
            Vue globale, filtrage et modification des dossiers
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedStudentFilter}
            onChange={(e) => setSelectedStudentFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none transition-all"
          >
            <option value="tout">Toutes les classes</option>
            <option value="Seconde">Seconde</option>
            <option value="Première">Première</option>
            <option value="Terminale">Terminale</option>
            <option value="ancien">Anciens élèves</option>
          </select>
          <button
            onClick={() => setActiveModal("user")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/30"
          >
            + Nouvel élève
          </button>
        </div>
      </div>

      {/* Conditional rendering: Detailed student profile or global student table */}
      {targetStudent ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Student Profile Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={targetStudent.photo}
                alt="target"
                className="w-16 h-16 rounded-2xl object-cover border border-blue-500/30"
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  {targetStudent.prenom} {targetStudent.nom}
                </h3>
                <p className="text-xs text-blue-400">
                  Matricule : {targetStudent.matricule} •{" "}
                  {extractClassNum(targetStudent.matricule)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {targetStudent.role === "ancien"
                    ? `Ancien élève (${targetStudent.anneeSortie})`
                    : `Classe : ${targetStudent.classe}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setTargetStudent(null)}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Fermer la fiche
            </button>
          </div>

          {/* Student Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500">Genre :</span>{" "}
              <span className="text-white capitalize">
                {targetStudent.genre}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Email :</span>{" "}
              <span className="text-white">{targetStudent.email}</span>
            </div>
            <div>
              <span className="text-slate-500">Contact :</span>{" "}
              <span className="text-white">{targetStudent.contact}</span>
            </div>
            <div>
              <span className="text-slate-500">Date/Lieu Naiss. :</span>{" "}
              <span className="text-white">
                {targetStudent.dateNaissance} ({targetStudent.lieuNaissance})
              </span>
            </div>
            <div>
              <span className="text-slate-500">Adresse :</span>{" "}
              <span className="text-white">{targetStudent.adresse}</span>
            </div>
            <div>
              <span className="text-slate-500">Statut :</span>{" "}
              <span
                className={`font-bold ${
                  targetStudent.statut === "active"
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {targetStudent.statut}
              </span>
            </div>
          </div>

          {/* Action Buttons for Student Profile */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setCurrentUser(targetStudent);
                setActiveTab("notes");
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              Voir résultat (Bulletin)
            </button>
            <button
              onClick={() => setActiveModal("target_history")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 transition-all"
            >
              + Créer un historique
            </button>
            <button
              onClick={() => setActiveModal("target_remark")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 transition-all"
            >
              + Créer une remarque
            </button>
          </div>

          {/* History and Remarks Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-white text-xs mb-2">
                Historique Discipline
              </h4>
              {historiques
                .filter((h) => h.studentId === targetStudent.id)
                .map((h) => (
                  <div
                    key={h.id}
                    className="text-[11px] border-b border-slate-800/60 py-1.5 text-slate-300"
                  >
                    <span className="font-bold text-blue-400">{h.type}</span> —{" "}
                    {h.raison} ({h.date})
                  </div>
                ))}
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-white text-xs mb-2">
                Remarques Dossier
              </h4>
              {remarques
                .filter((r) => r.studentId === targetStudent.id)
                .map((r) => (
                  <div
                    key={r.id}
                    className="text-[11px] border-b border-slate-800/60 py-1.5 text-slate-300"
                  >
                    <span className="font-bold text-emerald-400">{r.type}</span>{" "}
                    — {r.raison} ({r.date})
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Élève</th>
                  <th className="p-4">Matricule</th>
                  <th className="p-4">Classe / Num</th>
                  <th className="p-4">Genre</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {studentUsers.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4 font-bold text-white flex items-center space-x-3">
                      <img
                        src={student.photo}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <span>
                        {student.nom} {student.prenom}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-blue-400">
                      {student.matricule}
                    </td>
                    <td className="p-4">
                      {student.role === "ancien" ? (
                        <span className="text-slate-400">
                          Ancien ({student.anneeSortie})
                        </span>
                      ) : (
                        <span>
                          {student.classe} ({extractClassNum(student.matricule)}
                          )
                        </span>
                      )}
                    </td>
                    <td className="p-4 capitalize">{student.genre}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleUserStatus(student.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                          student.statut === "active"
                            ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                            : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        }`}
                      >
                        {student.statut.toUpperCase()}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setTargetStudent(student)}
                        className="bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        Voir le profil
                      </button>
                      <button
                        onClick={() => deleteUser(student.id)}
                        className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
