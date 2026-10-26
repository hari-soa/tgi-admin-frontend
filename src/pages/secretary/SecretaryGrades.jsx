import React from "react";
import { extractClassNum } from "../../utils/helpers";

const SecretaryGrades = ({
  users,
  gradeSessions,
  activeGradeSession,
  setActiveGradeSession,
  handleSecretarySaveDraft,
  handleSecretarySubmitToAdmin,
}) => {
  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Saisie & Suivi des Sessions de Notes
        </h2>
        <p className="text-slate-400 text-sm">
          Gestion des enregistrements de notes par matière et par classe
        </p>
      </div>

      {/* Conditional rendering: Active grade session roster or session list */}
      {activeGradeSession ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase">
                Grille d'évaluation
              </span>
              <h3 className="text-xl font-bold text-white">
                {activeGradeSession.matiere} — {activeGradeSession.classe}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Date de création :{" "}
                {activeGradeSession.dateCreation || "Récemment"}
              </p>
            </div>
            <button
              onClick={() => setActiveGradeSession(null)}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Retour à la liste
            </button>
          </div>

          {/* Student roster for grade input */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200">
              Roster des étudiants ({activeGradeSession.classe})
            </h4>
            {users
              .filter(
                (u) =>
                  u.role === "student" &&
                  u.classe === activeGradeSession.classe,
              )
              .map((student) => {
                const currentVal =
                  activeGradeSession.notesDraft?.[student.id] || "";
                return (
                  <div
                    key={student.id}
                    className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.photo}
                        alt="etu"
                        className="w-8 h-8 rounded-lg object-cover border border-slate-800"
                      />
                      <div>
                        <p className="text-sm font-bold text-white">
                          {student.nom} {student.prenom}
                        </p>
                        <p className="text-xs text-slate-400">
                          {student.matricule} •{" "}
                          {extractClassNum(student.matricule)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-xs text-slate-400">
                        Note /20 :
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        max="20"
                        min="0"
                        defaultValue={currentVal}
                        onChange={(e) => {
                          if (!activeGradeSession.notesDraft) {
                            activeGradeSession.notesDraft = {};
                          }
                          activeGradeSession.notesDraft[student.id] =
                            e.target.value;
                        }}
                        className="w-20 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white font-bold focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Action buttons for saving draft or submitting to admin */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
            <button
              onClick={() =>
                handleSecretarySaveDraft(
                  activeGradeSession.id,
                  activeGradeSession.notesDraft || {},
                )
              }
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-5 py-2.5 rounded-xl border border-slate-700 transition-all"
            >
              Sauvegarder en brouillon
            </button>
            <button
              onClick={() =>
                handleSecretarySubmitToAdmin(
                  activeGradeSession.id,
                  activeGradeSession.notesDraft || {},
                )
              }
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
            >
              Envoyer à l'Admin pour validation
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gradeSessions.map((session) => (
            <div
              key={session.id}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-base">
                    {session.matiere}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      session.statut === "valide"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : session.statut === "attente_validation"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {session.statut?.replace("_", " ") || "brouillon"}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Classe :{" "}
                  <span className="text-white font-semibold">
                    {session.classe}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 mt-2">
                  Créée : {session.dateCreation || "Récemment"}
                </p>
                {session.dateValidation && (
                  <p className="text-[11px] text-emerald-400 mt-1">
                    Validée le : {session.dateValidation}
                  </p>
                )}
              </div>

              {session.statut !== "valide" && (
                <button
                  onClick={() => setActiveGradeSession(session)}
                  className="w-full mt-4 bg-slate-800 hover:bg-blue-600 text-white text-xs font-semibold py-2 rounded-xl transition-colors"
                >
                  Saisir / Modifier les notes
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecretaryGrades;
