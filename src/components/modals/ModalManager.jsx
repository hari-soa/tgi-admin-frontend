import React from "react";
import PdfBulletinModal from "./PdfBulletinModal";
import { EXAMS_LIST } from "../../data/mockData";

export default function ModalManager({
  activeModal,
  setActiveModal,
  modalData,
  setModalData,
  handleCreateUser,
  handleCreateSubject,
  handleCreateGradeSlot,
  handleAddHistory,
  handleAddRemarque,
  setAnnouncements,
  announcements,
  triggerToast,
  users,
  subjects,
  grades,
  excelBuffer,
  setExcelBuffer,
  handleSaveExcelDraft,
  handlePublishExcel,
  currentUser,
  computeStudentStats,
}) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold"
        >
          ✕
        </button>

        {activeModal === "createUser" && (
          <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
            <h3 className="text-base font-black text-white mb-2">
              Créer un nouvel utilisateur
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setModalData({ ...modalData, nom: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Prénom(s)
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setModalData({ ...modalData, prenom: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) =>
                    setModalData({ ...modalData, email: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Contact
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setModalData({ ...modalData, contact: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Rôle
                </label>
                <select
                  onChange={(e) =>
                    setModalData({ ...modalData, role: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="student">Étudiant</option>
                  <option value="prof">Professeur</option>
                  <option value="secretaire">Secrétaire</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Matricule
                </label>
                <input
                  type="text"
                  placeholder="Ex: ETU-2026-099"
                  onChange={(e) =>
                    setModalData({ ...modalData, matricule: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            {(!modalData.role || modalData.role === "student") && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 mt-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                  Informations Spécifiques Étudiant
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Date de Naissance
                    </label>
                    <input
                      type="date"
                      onChange={(e) =>
                        setModalData({
                          ...modalData,
                          dateNaissance: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Lieu de Naissance
                    </label>
                    <input
                      type="text"
                      placeholder="Paris 14e"
                      onChange={(e) =>
                        setModalData({
                          ...modalData,
                          lieuNaissance: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all mt-4"
            >
              Enregistrer l'utilisateur
            </button>
          </form>
        )}

        {activeModal === "createSubject" && (
          <form onSubmit={handleCreateSubject} className="space-y-4 text-xs">
            <h3 className="text-base font-black text-white mb-2">
              Créer une nouvelle matière
            </h3>
            <div>
              <label className="block text-slate-400 font-bold mb-1">
                Nom de la Matière
              </label>
              <input
                type="text"
                placeholder="Ex: Philosophie"
                onChange={(e) =>
                  setModalData({ ...modalData, nom: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Coefficient
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  defaultValue="2"
                  onChange={(e) =>
                    setModalData({ ...modalData, coeff: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Classe Cible
                </label>
                <select
                  onChange={(e) =>
                    setModalData({ ...modalData, classeCible: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Terminale">Terminale</option>
                  <option value="Première">Première</option>
                  <option value="Seconde">Seconde</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all mt-4"
            >
              Créer la matière
            </button>
          </form>
        )}

        {activeModal === "excelGradeEntry" && modalData.currentSlot && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white">
                  Saisie Mode Excel : {modalData.currentSlot.subjectName}
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Classe : {modalData.currentSlot.classe} • Examen :{" "}
                  {modalData.currentSlot.examCode}
                </p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold">
                Grille Active
              </span>
            </div>

            <div className="max-h-60 overflow-y-auto border border-slate-800 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-slate-950 text-[10px] uppercase font-bold text-slate-400">
                  <tr>
                    <th className="p-3">Matricule</th>
                    <th className="p-3">Nom & Prénom</th>
                    <th className="p-3 text-right">Note / 20</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {users
                    .filter(
                      (u) =>
                        u.role === "student" &&
                        u.classe === modalData.currentSlot.classe,
                    )
                    .map((stu) => (
                      <tr key={stu.id} className="hover:bg-slate-800/30">
                        <td className="p-3 font-mono text-blue-400">
                          {stu.matricule}
                        </td>
                        <td className="p-3 font-bold text-white">
                          {stu.nom} {stu.prenom}
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="20"
                            placeholder="Note /20"
                            onChange={(e) =>
                              setExcelBuffer({
                                ...excelBuffer,
                                [stu.id]: e.target.value,
                              })
                            }
                            className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-right text-white font-bold"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleSaveExcelDraft(modalData.currentSlot.id)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl"
              >
                Sauvegarder Brouillon
              </button>
              <button
                onClick={() => handlePublishExcel(modalData.currentSlot)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30"
              >
                Publier les Notes
              </button>
            </div>
          </div>
        )}

        {activeModal === "pdfPreview" && (
          <PdfBulletinModal
            currentUser={currentUser}
            subjects={subjects}
            grades={grades}
            computeStudentStats={computeStudentStats}
          />
        )}
      </div>
    </div>
  );
}
