import { useState } from "react";
import {
  CONTAINER_WRAPPER,
  HEADER_SECTION,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  NEW_POINTAGE_BUTTON,
  GRID_CONTAINER,
  CARD_BOX,
  CARD_HEADER,
  DAY_TEXT,
  STATUS_PRESENT,
  STATUS_LATE,
  STATUS_ABSENT,
  STATUS_PENDING,
  PROF_NAME,
  SUBJECT_LINE,
  CLASS_HIGHLIGHT,
  LATE_DETAIL_TEXT,
  ABSENT_DETAIL_TEXT,
  CARD_FOOTER,
  FOOTER_NOTE,
  BUTTONS_GROUP,
  BUTTON_PRESENT,
} from "../../styles/AdminPointageStyles";

export const AdminPointage = ({
  currentUser,
  pointages,
  handleTogglePointage,
  setActiveModal,
  setFormState,
  onDeleteSlot,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const pointagesList = Array.isArray(pointages)
    ? pointages
    : pointages?.data ||
      pointages?.pointages ||
      pointages?.data?.pointages ||
      [];

  const getStatusBadgeClass = (status) => {
    if (status === "PRESENT") return STATUS_PRESENT;
    if (status === "LATE") return STATUS_LATE;
    if (status === "ABSENT") return STATUS_ABSENT;
    return STATUS_PENDING;
  };

  const handleEditSlot = (slot) => {
    setFormState({
      id: slot.slotId,
      teacherId: slot.teacherId,
      subjectId: slot.subjectId,
      targetClass: slot.targetClass,
      dayOfWeek: slot.dayOfWeek || "MONDAY",
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
    setActiveModal("pointage");
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={HEADER_SECTION}>
        <div>
          <h2 className={HEADER_TITLE}>Registre du Pointage Enseignants</h2>
          <p className={HEADER_SUBTITLE}>
            Suivi dynamique des présences et créneaux
          </p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
          {currentUser?.role?.toUpperCase() === "ADMIN" && (
            <button
              onClick={() => {
                setFormState({});
                setActiveModal("pointage");
              }}
              className={NEW_POINTAGE_BUTTON}
            >
              + Nouveau Créneau
            </button>
          )}
        </div>
      </div>

      <div className={GRID_CONTAINER}>
        {pointagesList.length === 0 ? (
          <p className="text-slate-400 col-span-full text-center py-8">
            Aucun créneau de pointage enregistré pour cette période.
          </p>
        ) : (
          pointagesList.map((p) => (
            <div key={p.slotId} className={CARD_BOX}>
              <div>
                <div className={CARD_HEADER}>
                  <span className={DAY_TEXT}>
                    {p.startTime} - {p.endTime}
                  </span>
                  <span className={getStatusBadgeClass(p.status)}>
                    {p.status || "PENDING"}
                  </span>
                </div>

                <h4 className={PROF_NAME}>
                  {p.teacherFirstName} {p.teacherLastName}
                </h4>
                <p className={SUBJECT_LINE}>
                  <span>{p.subjectName}</span>
                  <span className={CLASS_HIGHLIGHT}>({p.targetClass})</span>
                </p>

                {p.status === "LATE" && (
                  <p className={LATE_DETAIL_TEXT}>
                    Retard : +{p.lateDurationMinutes} min
                  </p>
                )}
                {p.status === "ABSENT" && (
                  <p className={ABSENT_DETAIL_TEXT}>
                    Motif : {p.motif || "Non spécifié (Absence injustifiée)"}
                  </p>
                )}
              </div>

              <div className={CARD_FOOTER}>
                <div className="flex items-center gap-2">
                  {currentUser?.role?.toUpperCase() === "ADMIN" && (
                    <>
                      <button
                        onClick={() => handleEditSlot(p)}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => onDeleteSlot(p.slotId)}
                        className="text-xs bg-red-950/60 hover:bg-red-900/80 text-red-300 px-2.5 py-1 rounded border border-red-800/50"
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </div>

                <div className={BUTTONS_GROUP}>
                  <button
                    onClick={() => handleTogglePointage(p.slotId, selectedDate)}
                    className={BUTTON_PRESENT}
                    title="Pointer la présence (automatique Present / Retard selon l'heure)"
                  >
                    Pointer Présent
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPointage;
