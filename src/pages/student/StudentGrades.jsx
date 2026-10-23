import React, { useState } from "react";

export default function StudentGrades({
  currentUser,
  examResults,
  handleSimulateExport,
}) {
  const [selectedExamFilter, setSelectedExamFilter] = useState("Trimestre 1");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Résultats & Notes d'Examens
          </h2>
          <p className="text-slate-400 text-sm">
            Bulletins détaillés et moyennes annuelles
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedExamFilter}
            onChange={(e) => setSelectedExamFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none"
          >
            <option value="Trimestre 1">Trimestre 1</option>
            <option value="Examen Blanc">Examen Blanc</option>
          </select>
          <button
            onClick={() => handleSimulateExport(`Examen_${selectedExamFilter}`)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700"
          >
            Exporter Examen (PDF)
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
          <h3 className="font-bold text-white text-sm">
            Détail des Matières — {selectedExamFilter}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Matière</th>
                <th className="p-4">Coefficient</th>
                <th className="p-4">Note /20</th>
                <th className="p-4">Note Coeff</th>
                <th className="p-4">Moyenne Classe</th>
                <th className="p-4">Mention</th>
                <th className="p-4">Rang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {examResults
                .filter(
                  (r) =>
                    r.studentId === currentUser.id &&
                    r.examName === selectedExamFilter,
                )
                .map((res) => (
                  <tr
                    key={res.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4 font-bold text-white">{res.matiere}</td>
                    <td className="p-4">{res.coeff}</td>
                    <td className="p-4 font-extrabold text-blue-400 text-sm">
                      {res.note} / 20
                    </td>
                    <td className="p-4 font-semibold">{res.noteCoeff}</td>
                    <td className="p-4 text-slate-400">{res.moyenne}</td>
                    <td className="p-4">
                      <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-semibold text-[10px]">
                        {res.mention}
                      </span>
                    </td>
                    <td className="p-4 font-bold">{res.rang}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
