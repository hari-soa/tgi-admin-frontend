import React from "react";

export default function NotesView({ grades }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Mes Notes & Évaluations
        </h2>
        <p className="text-slate-400 text-sm">
          Consultation de vos résultats scolaires par matière
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="font-bold text-white">Bulletins du Trimestre</h3>
        </div>
        <div className="divide-y divide-slate-800">
          {grades.map((g) => (
            <div
              key={g.id}
              className="p-5 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
            >
              <div>
                <h4 className="font-semibold text-white text-sm">
                  {g.subject}
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Évalué par {g.addedBy} • {g.date}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-white">
                  {g.grade}{" "}
                  <span className="text-xs text-slate-400">/ {g.maxGrade}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
