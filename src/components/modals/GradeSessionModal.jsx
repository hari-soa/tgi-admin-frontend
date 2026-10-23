import React from "react";

export default function GradeSessionModal({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
  subjects,
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
            Créer une session de note (Pour Secrétaire)
          </h3>
          <div>
            <label className="block text-slate-400 mb-1">
              Matière concernée
            </label>
            <select
              onChange={(e) =>
                setFormState({ ...formState, matiere: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.nom}>
                  {s.nom} ({s.classe})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">
              Classe concernée
            </label>
            <select
              onChange={(e) =>
                setFormState({ ...formState, classe: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
            >
              <option value="Terminale">Terminale</option>
              <option value="Première">Première</option>
              <option value="Seconde">Seconde</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
          >
            Assigner au Secrétariat
          </button>
        </form>
      </div>
    </div>
  );
}
