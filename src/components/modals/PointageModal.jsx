import { useState, useEffect } from "react";
import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  FIELD_LABEL,
  SELECT_INPUT,
  TEXT_INPUT,
  GRID_TWO_COLS,
  SUBMIT_BUTTON,
} from "../../styles/PointageModalStyles";

export const PointageModal = ({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
  staffUsers,
  subjects,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  // Filtrage robuste des professeurs
  const professorList = (staffUsers || []).filter((s) => {
    const role = (s.role || "").toUpperCase();
    return role === "TEACHER" || role === "PROF";
  });

  // Extraction et aplatissement des matières pour gérer le filtrage par classe
  const subjectsArray = Array.isArray(subjects)
    ? subjects
    : subjects?.subjects || subjects?.data?.subjects || [];

  const flattenedSubjects = [];
  subjectsArray.forEach((subject) => {
    if (subject.assignments && subject.assignments.length > 0) {
      subject.assignments.forEach((assignment) => {
        flattenedSubjects.push({
          subjectId: subject.id,
          name: subject.name,
          classGroup: assignment.classGroup?.toUpperCase(),
        });
      });
    } else {
      flattenedSubjects.push({
        subjectId: subject.id,
        name: subject.name,
        classGroup: "GÉNÉRAL",
      });
    }
  });

  // Classe sélectionnée par défaut ou "SECONDE"
  const selectedClass = (formState.targetClass || "SECONDE").toUpperCase();

  // Filtrer les matières par classe sélectionnée
  const availableSubjects = flattenedSubjects.filter(
    (s) => s.classGroup === selectedClass || s.classGroup === "GÉNÉRAL",
  );

  const daysOfWeek = [
    { key: "MONDAY", label: "Lundi" },
    { key: "TUESDAY", label: "Mardi" },
    { key: "WEDNESDAY", label: "Mercredi" },
    { key: "THURSDAY", label: "Jeudi" },
    { key: "FRIDAY", label: "Vendredi" },
    { key: "SATURDAY", label: "Samedi" },
  ];

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>
            {formState.id
              ? "Modifier le créneau de pointage"
              : "Créer un créneau de pointage"}
          </h3>

          {/* PROFESSEUR */}
          <div>
            <label className={FIELD_LABEL}>Professeur</label>
            <select
              value={formState.teacherId || ""}
              onChange={(e) => handleInputChange("teacherId", e.target.value)}
              className={SELECT_INPUT}
              required
            >
              <option value="">Sélectionner un professeur...</option>
              {professorList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName || p.nom} {p.lastName || p.prenom}
                </option>
              ))}
            </select>
          </div>

          {/* CLASSE & MATIÈRE DÉPENDANTE */}
          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Classe</label>
              <select
                value={formState.targetClass || "SECONDE"}
                onChange={(e) =>
                  handleInputChange("targetClass", e.target.value)
                }
                className={SELECT_INPUT}
                required
              >
                <option value="SECONDE">Seconde</option>
                <option value="PREMIERE">Première</option>
                <option value="TERMINALE">Terminale</option>
              </select>
            </div>

            <div>
              <label className={FIELD_LABEL}>Matière</label>
              <select
                value={formState.subjectId || ""}
                onChange={(e) => handleInputChange("subjectId", e.target.value)}
                className={SELECT_INPUT}
                required
              >
                <option value="">Sélectionner une matière...</option>
                {availableSubjects.map((sub, idx) => (
                  <option key={`${sub.subjectId}-${idx}`} value={sub.subjectId}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* JOUR & SALLE */}
          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Jour de la semaine</label>
              <select
                value={formState.dayOfWeek || "MONDAY"}
                onChange={(e) => handleInputChange("dayOfWeek", e.target.value)}
                className={SELECT_INPUT}
                required
              >
                {daysOfWeek.map((day) => (
                  <option key={day.key} value={day.key}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={FIELD_LABEL}>Salle de classe</label>
              <input
                type="text"
                placeholder="ex: Salle 102"
                value={formState.classroom || ""}
                onChange={(e) => handleInputChange("classroom", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
          </div>

          {/* HORAIRES SÉPARÉS (DÉBUT & FIN) */}
          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Heure de début</label>
              <input
                type="time"
                value={formState.startTime || "08:00"}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>

            <div>
              <label className={FIELD_LABEL}>Heure de fin</label>
              <input
                type="time"
                value={formState.endTime || "10:00"}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            {formState.id
              ? "Mettre à jour le créneau"
              : "Enregistrer le créneau"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PointageModal;
