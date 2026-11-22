import { useState } from "react";
import StudentGrades from "../student/StudentGrades";
import { extractClassNum, isFormerStudent } from "../../utils/helpers";
import {
  CLASS_GROUP_LABELS,
  HISTORY_TYPE_LABELS,
  REMARK_CATEGORY_LABELS,
  GENDER_LABELS,
  formatDate,
  formatDateOrDateTime,
} from "../../utils/labels";
import {
  ACTION_BLUE_BUTTON,
  ACTION_SECONDARY_BUTTON,
  ALUMNI_TEXT,
  AVATAR_WRAPPER,
  BUTTONS_ROW,
  CANCEL_BUTTON,
  CLOSE_BUTTON,
  CONTAINER_WRAPPER,
  CREATE_BUTTON,
  DELETE_ICON_BUTTON,
  DETAIL_ACTIONS_ROW,
  EDIT_AVATAR,
  EDIT_BUTTON,
  EDIT_FORM,
  EDIT_HEADER_BOX,
  EDIT_INPUT,
  FILE_INPUT,
  FILTER_SELECT,
  FORM_ACTIONS,
  FULL_WIDTH_FIELD,
  HEADER_ACTIONS,
  HEADER_SECTION,
  HEADER_SUBTITLE,
  HEADER_TITLE,
  META_GRID,
  META_LABEL,
  META_VALUE_CAPITALIZE,
  META_VALUE_WHITE,
  NAME_FIELDS_GRID,
  PROFILE_ACTIONS,
  PROFILE_AVATAR,
  PROFILE_CARD,
  PROFILE_CLASS_INFO,
  PROFILE_HEADER,
  PROFILE_INFO_CONTAINER,
  PROFILE_MATRICULE,
  PROFILE_NAME,
  PROFILE_VIEW_BUTTON,
  ROW_ACTIONS,
  SAVE_BUTTON,
  RECORD_BADGE_HISTORY,
  RECORD_BADGE_REMARK,
  RECORD_CARD,
  RECORD_CARD_HEADER,
  RECORD_DATE,
  RECORD_EMPTY,
  RECORD_GRID,
  RECORD_SECTION,
  RECORD_SECTION_TITLE,
  RECORD_TEXT,
  SUB_SECTIONS_GRID,
  TABLE_ACTIONS_CELL,
  TABLE_AVATAR,
  TABLE_BODY,
  TABLE_CELL_CAPITALIZE,
  TABLE_CELL_DEFAULT,
  TABLE_CELL_MATRICULE,
  TABLE_CELL_STUDENT,
  TABLE_CONTAINER,
  TABLE_ELEMENT,
  TABLE_HEAD,
  TABLE_HEAD_CELL,
  TABLE_HEAD_CELL_RIGHT,
  TABLE_ROW,
  TABLE_SCROLL,
  TOGGLE_INPUT,
  TOGGLE_LABEL,
  TOGGLE_TEXT,
  TOGGLE_TRACK,
} from "../../styles/AdminStudentsStyles";
import { getAvatarSource } from "../../utils/helpers";

export const AdminStudents = ({
  studentUsers,
  selectedStudentFilter,
  setSelectedStudentFilter,
  targetStudent,
  setTargetStudent,
  setActiveModal,
  setFormState,
  toggleUserStatus,
  deleteUser,
  historyRecords,
  remarks,
  annualResults,
  onExportReportCard,
  onUpdateUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const startEditing = () => {
    setFormData({ ...targetStudent });
    setIsEditing(true);
  };

  const closeStudentFile = () => {
    setTargetStudent(null);
    setIsEditing(false);
    setIsReportCardOpen(false);
  };

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
    await onUpdateUser(targetStudent.id, formData);
    setIsEditing(false);
  };

  const openModal = (modalName) => {
    setFormState({});
    setActiveModal(modalName);
  };

  const handleDeleteStudent = (student) => {
    const confirmed = window.confirm(
      `Supprimer définitivement ${student.firstName} ${student.lastName} ?`,
    );
    if (confirmed) deleteUser(student.id);
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
              <option value="all">Tout</option>
              <option value="SECONDE">Seconde</option>
              <option value="PREMIERE">Première</option>
              <option value="TERMINALE">Terminale</option>
              <option value="ANCIEN">Anciens</option>
            </select>
            <button onClick={() => openModal("user")} className={CREATE_BUTTON}>
              + Nouvel élève
            </button>
          </div>
        </div>
      )}

      {targetStudent && isReportCardOpen ? (
        <StudentGrades
          student={targetStudent}
          annualResults={annualResults}
          onExportReportCard={onExportReportCard}
          onBack={() => setIsReportCardOpen(false)}
        />
      ) : targetStudent ? (
        <div className={PROFILE_CARD}>
          <div className={PROFILE_HEADER}>
            <div className={PROFILE_INFO_CONTAINER}>
              <img
                src={getAvatarSource(targetStudent)}
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
                  {isFormerStudent(targetStudent)
                    ? `Ancien élève (${targetStudent.graduationYear})`
                    : `Classe : ${CLASS_GROUP_LABELS[targetStudent.classGroup] || "N/A"}`}
                </p>
              </div>
            </div>
            <div className={BUTTONS_ROW}>
              {!isEditing && (
                <button
                  onClick={startEditing}
                  className={EDIT_BUTTON}
                >
                  Modifier le profil ✏️
                </button>
              )}
              <button onClick={closeStudentFile} className={CLOSE_BUTTON}>
                ← Fermer la fiche
              </button>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className={EDIT_FORM}>
              <div className={EDIT_HEADER_BOX}>
                <div className={AVATAR_WRAPPER}>
                  <img
                    src={getAvatarSource(formData)}
                    alt="profile edit"
                    className={EDIT_AVATAR}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={FILE_INPUT}
                  />
                </div>
                <div className={NAME_FIELDS_GRID}>
                  <div>
                    <label className={META_LABEL}>Nom</label>
                    <input
                      type="text"
                      value={formData.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={EDIT_INPUT}
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
                      className={EDIT_INPUT}
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
                    className={EDIT_INPUT}
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
                    className={EDIT_INPUT}
                  />
                </div>
                <div>
                  <label className={META_LABEL}>Genre</label>
                  <select
                    value={formData.gender || "MALE"}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className={EDIT_INPUT}
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
                    className={EDIT_INPUT}
                  >
                    <option value="SECONDE">Seconde</option>
                    <option value="PREMIERE">Première</option>
                    <option value="TERMINALE">Terminale</option>
                    <option value="ANCIEN">Ancien</option>
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
                    className={EDIT_INPUT}
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
                    className={EDIT_INPUT}
                  />
                </div>
                <div className={FULL_WIDTH_FIELD}>
                  <label className={META_LABEL}>Adresse</label>
                  <input
                    type="text"
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className={EDIT_INPUT}
                  />
                </div>
              </div>

              <div className={FORM_ACTIONS}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={CANCEL_BUTTON}
                >
                  Annuler
                </button>
                <button type="submit" className={SAVE_BUTTON}>
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
                    {GENDER_LABELS[targetStudent.gender]}
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
                    {formatDate(targetStudent.dateOfBirth) || "N/A"}
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

              <div className={DETAIL_ACTIONS_ROW}>
                <div className={PROFILE_ACTIONS}>
                  <button
                    onClick={() => setIsReportCardOpen(true)}
                    className={ACTION_BLUE_BUTTON}
                  >
                    Voir résultat (Bulletin)
                  </button>
                  <button
                    onClick={() => openModal("target_history")}
                    className={ACTION_SECONDARY_BUTTON}
                  >
                    + Créer un historique
                  </button>
                  <button
                    onClick={() => openModal("target_remark")}
                    className={ACTION_SECONDARY_BUTTON}
                  >
                    + Créer une remarque
                  </button>
                </div>
              </div>

              <div className={SUB_SECTIONS_GRID}>
                <div className={RECORD_SECTION}>
                  <h4 className={RECORD_SECTION_TITLE}>Historique Discipline</h4>
                  <div className={RECORD_GRID}>
                    {historyRecords.length === 0 && (
                      <p className={RECORD_EMPTY}>Aucun événement enregistré.</p>
                    )}
                    {historyRecords.map((record) => (
                      <div key={record.id} className={RECORD_CARD}>
                        <div className={RECORD_CARD_HEADER}>
                          <span className={RECORD_BADGE_HISTORY}>
                            {HISTORY_TYPE_LABELS[record.type]}
                          </span>
                          <span className={RECORD_DATE}>
                            {formatDateOrDateTime(record.startDate)}
                            {formatDate(record.endDate) !==
                              formatDate(record.startDate) &&
                              ` → ${formatDate(record.endDate)}`}
                          </span>
                        </div>
                        <p className={RECORD_TEXT}>{record.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={RECORD_SECTION}>
                  <h4 className={RECORD_SECTION_TITLE}>Remarques Dossier</h4>
                  <div className={RECORD_GRID}>
                    {remarks.length === 0 && (
                      <p className={RECORD_EMPTY}>Aucune remarque enregistrée.</p>
                    )}
                    {remarks.map((remark) => (
                      <div key={remark.id} className={RECORD_CARD}>
                        <div className={RECORD_CARD_HEADER}>
                          <span className={RECORD_BADGE_REMARK}>
                            {REMARK_CATEGORY_LABELS[remark.category]}
                          </span>
                          <span className={RECORD_DATE}>
                            {formatDate(remark.createdAt)}
                          </span>
                        </div>
                        <p className={RECORD_TEXT}>{remark.content}</p>
                      </div>
                    ))}
                  </div>
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
                  <th className={TABLE_HEAD_CELL}>Élève</th>
                  <th className={TABLE_HEAD_CELL}>Matricule</th>
                  <th className={TABLE_HEAD_CELL}>Classe / Num</th>
                  <th className={TABLE_HEAD_CELL}>Genre</th>
                  <th className={TABLE_HEAD_CELL}>Statut (Actif / Inactif)</th>
                  <th className={TABLE_HEAD_CELL_RIGHT}>Actions</th>
                </tr>
              </thead>
              <tbody className={TABLE_BODY}>
                {studentUsers.map((student) => (
                  <tr key={student.id} className={TABLE_ROW}>
                    <td className={TABLE_CELL_STUDENT}>
                      <img
                        src={getAvatarSource(student)}
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
                      {isFormerStudent(student) ? (
                        <span className={ALUMNI_TEXT}>
                          Ancien ({student.graduationYear})
                        </span>
                      ) : (
                        <span>
                          {CLASS_GROUP_LABELS[student.classGroup] || "N/A"} (N°
                          {student.classRollNumber || "—"})
                        </span>
                      )}
                    </td>
                    <td className={TABLE_CELL_CAPITALIZE}>
                      {GENDER_LABELS[student.gender]}
                    </td>
                    <td className={TABLE_HEAD_CELL}>
                      <label className={TOGGLE_LABEL}>
                        <input
                          type="checkbox"
                          checked={student.isActive !== false}
                          onChange={() => toggleUserStatus(student.id)}
                          className={TOGGLE_INPUT}
                        />
                        <div className={TOGGLE_TRACK}></div>
                        <span className={TOGGLE_TEXT}>
                          {student.isActive !== false ? "ACTIF" : "INACTIF"}
                        </span>
                      </label>
                    </td>
                    <td className={TABLE_ACTIONS_CELL}>
                      <div className={ROW_ACTIONS}>
                        <button
                          onClick={() => setTargetStudent(student)}
                          className={PROFILE_VIEW_BUTTON}
                        >
                          Voir le profil
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student)}
                          className={DELETE_ICON_BUTTON}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
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
