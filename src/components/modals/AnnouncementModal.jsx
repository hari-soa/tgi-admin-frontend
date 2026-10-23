import React from "react";

export default function AnnouncementModal({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
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

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <h3 className="text-base font-bold text-white mb-2">
            Diffuser une Annonce
          </h3>
          <div>
            <label className="block text-slate-400 mb-1">
              Titre de l'annonce
            </label>
            <input
              type="text"
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">
              Contexte / Description
            </label>
            <textarea
              rows="3"
              onChange={(e) =>
                setFormState({ ...formState, context: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Cible</label>
              <select
                onChange={(e) =>
                  setFormState({ ...formState, cible: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              >
                <option value="tout">Tous</option>
                <option value="Seconde">Seconde</option>
                <option value="Première">Première</option>
                <option value="Terminale">Terminale</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Urgence</label>
              <select
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    urgent: e.target.value === "true",
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              >
                <option value="false">Normal</option>
                <option value="true">Urgent (Rouge)</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
          >
            Publier immédiatement
          </button>
        </form>
      </div>
    </div>
  );
}
