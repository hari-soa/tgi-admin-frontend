import React from "react";

export default function ModalManager({
  activeModal,
  setActiveModal,
  formState,
  setFormState,
  handleCreateUser,
  handleCreateSubject,
  handleCreateGrade,
  handleCreateAnnouncement,
  handleCreateHistory,
  users,
  subjects,
}) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        {activeModal === "user" && (
          <form onSubmit={handleCreateUser} className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">
              Créer un nouvel utilisateur
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormState({ ...formState, nom: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormState({ ...formState, prenom: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Rôle
              </label>
              <select
                onChange={(e) =>
                  setFormState({ ...formState, role: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
              >
                <option value="student">Étudiant</option>
                <option value="personnel">Personnel / Prof</option>
                <option value="secretaire">Secrétaire</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Email
              </label>
              <input
                type="email"
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all mt-4"
            >
              Enregistrer l'utilisateur
            </button>
          </form>
        )}

        {activeModal === "subject" && (
          <form onSubmit={handleCreateSubject} className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">
              Créer une nouvelle matière
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Nom de la matière
              </label>
              <input
                type="text"
                placeholder="Ex: Philosophie..."
                onChange={(e) => setFormState({ subjectName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all mt-4"
            >
              Créer la matière
            </button>
          </form>
        )}

        {(activeModal === "grade" || activeModal === "secr_grade") && (
          <form onSubmit={handleCreateGrade} className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">
              Ajouter une note
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
                      {u.prenom} {u.nom} ({u.classe})
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Matière
              </label>
              <select
                onChange={(e) =>
                  setFormState({ ...formState, subject: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
              >
                {subjects.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Note (sur 20)
              </label>
              <input
                type="number"
                step="0.5"
                max="20"
                min="0"
                onChange={(e) =>
                  setFormState({ ...formState, grade: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all mt-4"
            >
              Enregistrer la note
            </button>
          </form>
        )}

        {activeModal === "announcement" && (
          <form onSubmit={handleCreateAnnouncement} className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">
              Publier une annonce
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Titre
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setFormState({ ...formState, title: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Contenu
              </label>
              <textarea
                rows="3"
                onChange={(e) =>
                  setFormState({ ...formState, context: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all mt-4"
            >
              Publier
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
