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
} from "../../styles/AdminStudentsStyles";

export const AdminStudents = ({
  studentUsers,
  selectedStudentFilter,
  setSelectedStudentFilter,
  targetStudent,
  setTargetStudent,
  setActiveModal,
  toggleUserStatus,
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
          <p className={HEADER_SUBTITLE}>Vue globale</p>
        </div>
        <div className={HEADER_ACTIONS}>
          <select
            value={selectedStudentFilter}
            onChange={(e) => setSelectedStudentFilter(e.target.value)}
            className={FILTER_SELECT}
          >
            <option value="tout">Tout</option>
            <option value="SECONDE">Seconde</option>
            <option value="PREMIERE">Première</option>
            <option value="TERMINALE">Terminale</option>
            <option value="ancien">Anciens</option>
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
                src={targetStudent.profilePictureUrl || "/default-avatar.png"}
                alt="target"
                className={PROFILE_AVATAR}
              />
              <div>
                <h3 className={PROFILE_NAME}>
                  {targetStudent.lastName} {targetStudent.firstName}
                </h3>
                <p className={PROFILE_MATRICULE}>
                  Matricule : {targetStudent.matricule} •{" "}
                  {extractClassNum(targetStudent.matricule)}
                </p>
                <p className={PROFILE_CLASS_INFO}>
                  {targetStudent.role === "ANCIEN"
                    ? `Ancien élève (${targetStudent.graduationYear})`
                    : `Classe : ${targetStudent.classGroup || "N/A"}`}
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
                {targetStudent.gender}
              </span>
            </div>
            <div>
              <span className={META_LABEL}>Email :</span>{" "}
              <span className={META_VALUE_WHITE}>
                {targetStudent.email || "Non renseigné"}
              </span>
            </div>
            <div>
              <span className={META_LABEL}>Contact :</span>{" "}
              <span className={META_VALUE_WHITE}>
                {targetStudent.contactNumber || "Non renseigné"}
              </span>
            </div>
            <div>
              <span className={META_LABEL}>Date de Naissance :</span>{" "}
              <span className={META_VALUE_WHITE}>
                {targetStudent.dateOfBirth
                  ? new Date(targetStudent.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div>
              <span className={META_LABEL}>Adresse :</span>{" "}
              <span className={META_VALUE_WHITE}>
                {targetStudent.address || "Non renseignée"}
              </span>
            </div>
            <div>
              <span className={META_LABEL}>Statut (Désactivation) :</span>{" "}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={targetStudent.isActive !== false}
                  onChange={() => toggleUserStatus(targetStudent.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-3 text-xs font-medium text-slate-300">
                  {targetStudent.isActive !== false ? "Actif" : "Inactif"}
                </span>
              </label>
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
                    {h.reason || h.raison} ({h.startDate || h.date})
                  </div>
                ))}
            </div>
            <div className={SUB_SECTION_BOX}>
              <h4 className={SUB_SECTION_TITLE}>Remarques Dossier</h4>
              {remarques
                .filter((r) => r.studentId === targetStudent.id)
                .map((r) => (
                  <div key={r.id} className={SUB_SECTION_ITEM}>
                    <span className={ITEM_LABEL_EMERALD}>
                      {r.category || r.type}
                    </span>{" "}
                    — {r.content || r.raison}
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
                  <th className="p-4">Statut (Actif / Inactif)</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={TABLE_BODY}>
                {studentUsers.map((student) => (
                  <tr key={student.id} className={TABLE_ROW}>
                    <td className={TABLE_CELL_STUDENT}>
                      <img
                        src={student.profilePictureUrl || "/default-avatar.png"}
                        alt="avatar"
                        className={TABLE_AVATAR}
                      />
                      <span>
                        {student.lastName} {student.firstName}
                      </span>
                    </td>
                    <td className={TABLE_CELL_MATRICULE}>
                      {student.matricule}
                    </td>
                    <td className={TABLE_CELL_DEFAULT}>
                      {student.role === "ANCIEN" ? (
                        <span className={ALUMNI_TEXT}>
                          Ancien ({student.graduationYear})
                        </span>
                      ) : (
                        <span>
                          {student.classGroup || "N/A"} (N°
                          {student.classRollNumber || "—"})
                        </span>
                      )}
                    </td>
                    <td className="p-4 capitalize">{student.gender}</td>
                    <td className="p-4">
                      {/* Checkbox / Switch interactif de désactivation */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={student.isActive !== false}
                          onChange={() => toggleUserStatus(student.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        <span className="ml-3 text-xs font-bold text-slate-300">
                          {student.isActive !== false ? "ACTIF" : "INACTIF"}
                        </span>
                      </label>
                    </td>
                    <td className={TABLE_ACTIONS_CELL}>
                      <button
                        onClick={() => setTargetStudent(student)}
                        className={PROFILE_VIEW_BUTTON}
                      >
                        Voir le profil
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
