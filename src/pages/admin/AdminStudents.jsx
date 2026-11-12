import { useState, useEffect } from "react";
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
  deleteUser,
  setCurrentUser,
  setActiveTab,
  historiques,
  remarques,
  onUpdateUser,
  isAdmin = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...targetStudent });

  useEffect(() => {
    if (targetStudent) {
      setFormData({ ...targetStudent });
      setIsEditing(false);
    }
  }, [targetStudent]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePictureUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (onUpdateUser && targetStudent) {
      await onUpdateUser(targetStudent.id, formData);
      setTargetStudent((prev) => ({ ...prev, ...formData }));
    }
    setIsEditing(false);
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      {!targetStudent && (
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
      )}

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
            <div className="flex items-center gap-3">
              {isAdmin && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-semibold hover:bg-blue-500 transition"
                >
                  Modifier le profil ✏️
                </button>
              )}
              <button
                onClick={() => {
                  setTargetStudent(null);
                  setIsEditing(false);
                }}
                className={CLOSE_BUTTON}
              >
                ← Fermer la fiche
              </button>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6 mt-6">
              <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="relative">
                  <img
                    src={formData.profilePictureUrl || "/default-avatar.png"}
                    alt="profile edit"
                    className="w-20 h-20 rounded-full object-cover border border-slate-700"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-2 text-xs text-slate-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div>
                    <label className={META_LABEL}>Nom</label>
                    <input
                      type="text"
                      value={formData.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className={META_LABEL}>Prénom</label>
                    <input
                      type="text"
                      value={formData.firstName || ""}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className={META_GRID}>
                <div>
                  <label className={META_LABEL}>Email</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                  />
                </div>
                <div>
                  <label className={META_LABEL}>Contact</label>
                  <input
                    type="text"
                    value={formData.contactNumber || ""}
                    onChange={(e) =>
                      handleChange("contactNumber", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                  />
                </div>
                <div>
                  <label className={META_LABEL}>Genre</label>
                  <select
                    value={formData.gender || "MALE"}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                  >
                    <option value="MALE">Masculin</option>
                    <option value="FEMALE">Féminin</option>
                  </select>
                </div>
                <div>
                  <label className={META_LABEL}>Classe</label>
                  <select
                    value={formData.classGroup || "SECONDE"}
                    onChange={(e) => handleChange("classGroup", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                  >
                    <option value="SECONDE">Seconde</option>
                    <option value="PREMIERE">Première</option>
                    <option value="TERMINALE">Terminale</option>
                  </select>
                </div>
                <div>
                  <label className={META_LABEL}>Numéro de classe</label>
                  <input
                    type="number"
                    value={formData.classRollNumber || ""}
                    onChange={(e) =>
                      handleChange("classRollNumber", Number(e.target.value))
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                  />
                </div>
                <div>
                  <label className={META_LABEL}>Date de Naissance</label>
                  <input
                    type="date"
                    value={
                      formData.dateOfBirth
                        ? formData.dateOfBirth.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      handleChange("dateOfBirth", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className={META_LABEL}>Adresse</label>
                  <input
                    type="text"
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded font-semibold hover:bg-emerald-500 text-sm"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          ) : (
            <>
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
                  <span className={META_LABEL}>Statut :</span>{" "}
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      targetStudent.isActive !== false
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {targetStudent.isActive !== false ? "ACTIF" : "INACTIF"}
                  </span>
                </div>
              </div>

              <div className="flex items-center mt-6 pt-4 border-t border-slate-800">
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
            </>
          )}
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
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setTargetStudent(student)}
                          className={PROFILE_VIEW_BUTTON}
                        >
                          Voir le profil
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => deleteUser(student.id)}
                            className="p-2 text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 rounded-lg transition"
                            title="Supprimer"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
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
