import React from "react";

export default function HistoryView({ history }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Mon Historique Disciplinaire
        </h2>
        <p className="text-slate-400 text-sm">
          Suivi des avertissements et mentions officielles
        </p>
      </div>

      <div className="space-y-4">
        {history.map((hist) => (
          <div
            key={hist.id}
            className={`p-6 rounded-2xl border ${
              hist.isAvertissement
                ? "bg-red-950/20 border-red-800/50 text-red-100"
                : "bg-slate-900 border-slate-800 text-slate-100"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-base">{hist.title}</h3>
                {hist.isAvertissement && (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Avertissement
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">{hist.date}</span>
            </div>
            <p className="text-sm text-slate-300 mt-2">{hist.context}</p>
            {hist.duration && (
              <div className="mt-4 pt-3 border-t border-slate-800/50 text-xs text-slate-400 font-medium">
                Durée / Portée :{" "}
                <span className="text-white font-semibold">
                  {hist.duration}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
