import React from "react";

export default function CreateHistoryModal({
  formState,
  setFormState,
  handleCreateHistory,
  users,
}) {
  return (
    <form onSubmit={handleCreateHistory} className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-2">
        Créer un élément d'historique
      </h3>
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          Étudiant concerné
        </label>
        <select
          onChange={(e) =>
            setFormState({ ...formState, studentName: e.target.value })
          }
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
        >
          {users
            .filter((u) => u.role === "student")
            .map((u) => (
              <option key={u.id} value={`${u.prenom} ${u.nom}`}>
                {u.prenom} {u.nom}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          Titre de l'événement
        </label>
        <input
          type="text"
          placeholder="Ex: Avertissement de retard"
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          Contexte / Description
        </label>
        <textarea
          rows="2"
          onChange={(e) =>
            setFormState({ ...formState, context: e.target.value })
          }
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
          required
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Type
          </label>
          <select
            onChange={(e) =>
              setFormState({
                ...formState,
                isAvertissement: e.target.value === "true",
              })
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
          >
            <option value="true">Avertissement (Rouge)</option>
            <option value="false">Mention / Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Durée (si nécessaire)
          </label>
          <input
            type="text"
            placeholder="Ex: 1 semaine"
            onChange={(e) =>
              setFormState({ ...formState, duration: e.target.value })
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all mt-4"
      >
        Enregistrer dans l'historique
      </button>
    </form>
  );
}
