import React from "react";

export default function UserModal({
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
            Créer un utilisateur
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Nom</label>
              <input
                type="text"
                onChange={(e) =>
                  setFormState({ ...formState, nom: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Prénom(s)</label>
              <input
                type="text"
                onChange={(e) =>
                  setFormState({ ...formState, prenom: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Genre</label>
              <select
                onChange={(e) =>
                  setFormState({ ...formState, genre: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              >
                <option value="male">Homme</option>
                <option value="femelle">Femme</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Rôle</label>
              <select
                onChange={(e) =>
                  setFormState({ ...formState, role: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              >
                <option value="student">Étudiant</option>
                <option value="prof">Professeur</option>
                <option value="secretaire">Secrétaire</option>
                <option value="ancien">Ancien élève</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
            <p className="font-bold text-blue-400">
              Génération du Matricule Obligatoire (TGI-YYNNN)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500">
                  Année Entrée (ex: 25)
                </label>
                <input
                  type="text"
                  placeholder="25"
                  onChange={(e) =>
                    setFormState({ ...formState, anneeEntree: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-500">
                  N° en classe (ex: 020)
                </label>
                <input
                  type="text"
                  placeholder="020"
                  onChange={(e) =>
                    setFormState({ ...formState, numInClass: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Email</label>
              <input
                type="email"
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Contact</label>
              <input
                type="text"
                onChange={(e) =>
                  setFormState({ ...formState, contact: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">
                Classe (si élève)
              </label>
              <select
                onChange={(e) =>
                  setFormState({ ...formState, classe: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              >
                <option value="Seconde">Seconde</option>
                <option value="Première">Première</option>
                <option value="Terminale">Terminale</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Lieu de Naissance
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setFormState({ ...formState, lieuNaissance: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
          >
            Enregistrer l'utilisateur
          </button>
        </form>
      </div>
    </div>
  );
}
