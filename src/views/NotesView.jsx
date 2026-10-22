import React from "react";
import { EXAMS_LIST } from "../data/mockData";

export default function NotesView({
  currentUser,
  computeStudentStats,
  modalData,
  setModalData,
  setActiveModal,
}) {
  const stats = computeStudentStats(
    currentUser.id,
    modalData.filterExam || "ALL",
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">
            Relevé de Notes & Évaluations
          </h2>
          <p className="text-slate-400 text-xs">
            Consultation numérique avec coefficients et calcul automatique des
            moyennes
          </p>
        </div>

        <button
          onClick={() => setActiveModal("pdfPreview")}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
        >
          <span>📄 Exporter Relevé PDF Offi.</span>
        </button>
      </div>

      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setModalData({ ...modalData, filterExam: "ALL" })}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            !modalData.filterExam || modalData.filterExam === "ALL"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Bilan Annuel Complet
        </button>
        {EXAMS_LIST.map((ex) => (
          <button
            key={ex.code}
            onClick={() => setModalData({ ...modalData, filterExam: ex.code })}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              modalData.filterExam === ex.code
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Matière</th>
              <th className="p-4">Professeur</th>
              <th className="p-4 text-center">Coefficient</th>
              <th className="p-4 text-center">Note / 20</th>
              <th className="p-4 text-right">Total Pondéré</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {stats.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white">{row.subject.nom}</td>
                <td className="p-4 text-slate-400">
                  {row.subject.profAssocie}
                </td>
                <td className="p-4 text-center font-bold text-blue-400">
                  {row.subject.coeff}
                </td>
                <td className="p-4 text-center font-black text-white text-sm">
                  {row.note !== null ? row.note.toFixed(2) : "-"}
                </td>
                <td className="p-4 text-right font-mono font-bold text-emerald-400">
                  {row.weighted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">
              Total Coefficients Cumulés : <strong>{stats.totalCoeff}</strong>
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">
              Moyenne Générale :
            </span>
            <span className="text-2xl font-black text-blue-400">
              {stats.average ? `${stats.average} / 20` : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
