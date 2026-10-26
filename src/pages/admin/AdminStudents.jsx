import React from "react";
import { extractClassNum } from "../../utils/helpers";
import {
  CONTAINER_WRAPPER,
  HEADER_SECTION,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  HEADER_ACTIONS,
  FILTER_SELECT,
  CREATE_BUTTON,
  PROFILE_CARD,
  PROFILE_HEADER,
  PROFILE_INFO_CONTAINER,
  PROFILE_AVATAR,
  PROFILE_NAME,
  PROFILE_MATRICULE,
  PROFILE_CLASS_INFO,
  CLOSE_BUTTON,
  META_GRID,
  META_LABEL,
  META_VALUE_WHITE,
  META_VALUE_CAPITALIZE,
  STATUS_ACTIVE,
  STATUS_INACTIVE,
  PROFILE_ACTIONS,
  ACTION_BLUE_BUTTON,
  ACTION_SECONDARY_BUTTON,
  SUB_SECTIONS_GRID,
  SUB_SECTION_BOX,
  SUB_SECTION_TITLE,
  SUB_SECTION_ITEM,
  ITEM_LABEL_BLUE,
  ITEM_LABEL_EMERALD,
  TABLE_CONTAINER,
  TABLE_SCROLL,
  TABLE_ELEMENT,
  TABLE_HEAD,
  TABLE_BODY,
  TABLE_ROW,
  TABLE_CELL_STUDENT,
  TABLE_AVATAR,
  TABLE_CELL_MATRICULE,
  TABLE_CELL_DEFAULT,
  ALUMNI_TEXT,
  STATUS_BUTTON_ACTIVE,
  STATUS_BUTTON_INACTIVE,
  TABLE_ACTIONS_CELL,
  PROFILE_VIEW_BUTTON,
  DELETE_BUTTON,
} from "../../styles/AdminStudentsStyles";

export const AdminStudents = ({
  studentUsers,
  selectedStudentFilter,
  setSelectedStudentFilter,
  targetStudent,
  setTargetStudent,
  setActiveModal,
  toggleUserStatus,
  deleteUser,
  setCurrentUser,
  setActiveTab,
  historiques,
  remarques,
}) => {
  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={HEADER_SECTION}>
        <div>
          <h2 className={HEADER_TITLE}>Gestion de la Liste des Étudiants</h2>
          <p className={HEADER_SUBTITLE}>
            Vue globale, filtrage et modification des dossiers
          </p>
        </div>
        <div className={HEADER_ACTIONS}>
          <select
            value={selectedStudentFilter}
            onChange={(e) => setSelectedStudentFilter(e.target.value)}
            className={FILTER_SELECT}
          >
            <option value="tout">Toutes les classes</option>
            <option value="Seconde">Seconde</option>
            <option value="Première">Première</option>
            <option value="Terminale">Terminale</option>
            <option value="ancien">Anciens élèves</option>
          </select>
          <button
            onClick={() => setActiveModal("user")}
            className={CREATE_BUTTON}
          >
            + Nouvel élève
          </button>
        </div>
      </div>

      {targetStudent ? (
        <div className={PROFILE_CARD}>
          <div className={PROFILE_HEADER}>
            <div className={PROFILE_INFO_CONTAINER}>
              <img
                src={targetStudent.photo}
                alt="target"
                className={PROFILE_AVATAR}
              />
              <div>
                <h3 className={PROFILE_NAME}>
                  {targetStudent.prenom} {targetStudent.nom}
                </h3>
                <p className={PROFILE_MATRICULE}>
                  Matricule : {targetStudent.matricule} •{" "}
                  {extractClassNum(targetStudent.matricule)}
                </p>
                <p className={PROFILE_CLASS_INFO}>
                  {targetStudent.role === "ancien"
                    ? `Ancien élève (${targetStudent.anneeSortie})`
                    : `Classe : ${targetStudent.classe}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setTargetStudent(null)}
              className={CLOSE_BUTTON}
            >
              ← Fermer la fiche
            </button>
          </div>

          <div className={META_GRID}>
            <div>
              <span className={META_LABEL}>Genre :</span>{" "}
              <span className={META_VALUE_CAPITALIZE}>
                {targetStudent.genre}
              </span>
            </div>
            <div>
              <span className={META_LABEL}>Email :</span>{" "}
              <span className={META_VALUE_WHITE}>{targetStudent.email}</span>
            </div>
            <div>
              <span className={META_LABEL}>Contact :</span>{" "}
              <span className={META_VALUE_WHITE}>{targetStudent.contact}</span>
            </div>
            <div>
              <span className={META_LABEL}>Date/Lieu Naiss. :</span>{" "}
              <span className={META_VALUE_WHITE}>
                {targetStudent.dateNaissance} ({targetStudent.lieuNaissance})
              </span>
            </div>
            <div>
              <span className={META_LABEL}>Adresse :</span>{" "}
              <span className={META_VALUE_WHITE}>{targetStudent.adresse}</span>
            </div>
            <div>
              <span className={META_LABEL}>Statut :</span>{" "}
              <span
                className={
                  targetStudent.statut === "active"
                    ? STATUS_ACTIVE
                    : STATUS_INACTIVE
                }
              >
                {targetStudent.statut}
              </span>
            </div>
          </div>

          <div className={PROFILE_ACTIONS}>
            <button
              onClick={() => {
                setCurrentUser(targetStudent);
                setActiveTab("notes");
              }}
              className={ACTION_BLUE_BUTTON}
            >
              Voir résultat (Bulletin)
            </button>
            <button
              onClick={() => setActiveModal("target_history")}
              className={ACTION_SECONDARY_BUTTON}
            >
              + Créer un historique
            </button>
            <button
              onClick={() => setActiveModal("target_remark")}
              className={ACTION_SECONDARY_BUTTON}
            >
              + Créer une remarque
            </button>
          </div>

          <div className={SUB_SECTIONS_GRID}>
            <div className={SUB_SECTION_BOX}>
              <h4 className={SUB_SECTION_TITLE}>Historique Discipline</h4>
              {historiques
                .filter((h) => h.studentId === targetStudent.id)
                .map((h) => (
                  <div key={h.id} className={SUB_SECTION_ITEM}>
                    <span className={ITEM_LABEL_BLUE}>{h.type}</span> —{" "}
                    {h.raison} ({h.date})
                  </div>
                ))}
            </div>
            <div className={SUB_SECTION_BOX}>
              <h4 className={SUB_SECTION_TITLE}>Remarques Dossier</h4>
              {remarques
                .filter((r) => r.studentId === targetStudent.id)
                .map((r) => (
                  <div key={r.id} className={SUB_SECTION_ITEM}>
                    <span className={ITEM_LABEL_EMERALD}>{r.type}</span> —{" "}
                    {r.raison} ({r.date})
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={TABLE_CONTAINER}>
          <div className={TABLE_SCROLL}>
            <table className={TABLE_ELEMENT}>
              <thead className={TABLE_HEAD}>
                <tr>
                  <th className="p-4">Élève</th>
                  <th className="p-4">Matricule</th>
                  <th className="p-4">Classe / Num</th>
                  <th className="p-4">Genre</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={TABLE_BODY}>
                {studentUsers.map((student) => (
                  <tr key={student.id} className={TABLE_ROW}>
                    <td className={TABLE_CELL_STUDENT}>
                      <img
                        src={student.photo}
                        alt="avatar"
                        className={TABLE_AVATAR}
                      />
                      <span>
                        {student.nom} {student.prenom}
                      </span>
                    </td>
                    <td className={TABLE_CELL_MATRICULE}>
                      {student.matricule}
                    </td>
                    <td className={TABLE_CELL_DEFAULT}>
                      {student.role === "ancien" ? (
                        <span className={ALUMNI_TEXT}>
                          Ancien ({student.anneeSortie})
                        </span>
                      ) : (
                        <span>
                          {student.classe} ({extractClassNum(student.matricule)}
                          )
                        </span>
                      )}
                    </td>
                    <td className="p-4 capitalize">{student.genre}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleUserStatus(student.id)}
                        className={
                          student.statut === "active"
                            ? STATUS_BUTTON_ACTIVE
                            : STATUS_BUTTON_INACTIVE
                        }
                      >
                        {student.statut.toUpperCase()}
                      </button>
                    </td>
                    <td className={TABLE_ACTIONS_CELL}>
                      <button
                        onClick={() => setTargetStudent(student)}
                        className={PROFILE_VIEW_BUTTON}
                      >
                        Voir le profil
                      </button>
                      <button
                        onClick={() => deleteUser(student.id)}
                        className={DELETE_BUTTON}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
