import React from "react";

export default function HistoryRemarkModal({
  isOpen,
  onClose,
  type,
  onSubmit,
  formState,
  setFormState,
  targetStudent,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        {type === "target_history" ? (
          <form onSubmit={onSubmit} className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-white mb-2">
              Ajouter un Historique à {targetStudent?.prenom}{" "}
              {targetStudent?.nom}
            </h3>
            <div>
              <label className="block text-slate-400 mb-1">
                Type d'événement
              </label>
              <select
                onChange={(e) =>
                  setFormState({ ...formState, type: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              >
                <option value="Absence">Absence (Rouge)</option>
                <option value="Retard">Retard</option>
                <option value="Infirmerie">Passage Infirmerie</option>
                <option value="Permission de sortie">
                  Permission de sortie
                </option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Détails (Durée, heures)
              </label>
              <input
                type="text"
                placeholder="Ex: 08:00 - 10:00 ou 15 min"
                onChange={(e) =>
                  setFormState({ ...formState, detail: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Raison / Motif
              </label>
              <textarea
                rows="2"
                onChange={(e) =>
                  setFormState({ ...formState, raison: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
            >
              Enregistrer
            </button>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-white mb-2">
              Ajouter une Remarque à {targetStudent?.prenom}{" "}
              {targetStudent?.nom}
            </h3>
            <div>
              <label className="block text-slate-400 mb-1">
                Type de remarque
              </label>
              <select
                onChange={(e) =>
                  setFormState({ ...formState, type: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              >
                <option value="Avertissement">Avertissement (Rouge)</option>
                <option value="Encouragement">Encouragement</option>
                <option value="Académique">Académique</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Motif / Description
              </label>
              <textarea
                rows="3"
                onChange={(e) =>
                  setFormState({ ...formState, raison: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
            >
              Enregistrer la remarque
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
