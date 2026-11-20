import {
  CONTAINER_WRAPPER,
  HEADER_SECTION,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  HEADER_ACTIONS,
  DATE_INPUT,
  NEW_POINTAGE_BUTTON,
  GRID_CONTAINER,
  EMPTY_TEXT,
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
  CLASSROOM_TEXT,
  LATE_DETAIL_TEXT,
  ABSENT_DETAIL_TEXT,
  CARD_FOOTER,
  SLOT_ACTIONS,
  EDIT_BUTTON,
  DELETE_BUTTON,
  BUTTONS_GROUP,
  BUTTON_PRESENT,
  BUTTON_ABSENT,
} from "../../styles/AdminAttendanceStyles";

const STATUS_BADGE_CLASSES = {
  PRESENT: STATUS_PRESENT,
  LATE: STATUS_LATE,
  ABSENT: STATUS_ABSENT,
};

const STATUS_LABELS = {
  PRESENT: "Présent",
  LATE: "En retard",
  ABSENT: "Absent",
  PENDING: "En attente",
};

// The API sends times as HH:MM:SS, the cards only need HH:MM
const formatTime = (time) => time.slice(0, 5);

export const AdminAttendance = ({
  attendanceCards,
  attendanceDate,
  onAttendanceDateChange,
  onCheckAttendance,
  onMarkAbsence,
  onDeleteSlot,
  setActiveModal,
  setFormState,
}) => {
  const handleCreateSlot = () => {
    setFormState({});
    setActiveModal("attendance");
  };

  const handleEditSlot = (card) => {
    setFormState({
      id: card.slotId,
      teacherId: card.teacherId,
      subjectId: card.subjectId,
      targetClass: card.targetClass,
      dayOfWeek: card.dayOfWeek,
      startTime: formatTime(card.startTime),
      endTime: formatTime(card.endTime),
      classroom: card.classroom,
    });
    setActiveModal("attendance");
  };

  const handleMarkAbsence = (card) => {
    const motif = window.prompt("Motif de l'absence (facultatif) :", "");
    if (motif === null) return;
    onMarkAbsence(card.slotId, attendanceDate, motif.trim() || undefined);
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
        <div className={HEADER_ACTIONS}>
          <input
            type="date"
            value={attendanceDate}
            onChange={(event) => onAttendanceDateChange(event.target.value)}
            className={DATE_INPUT}
          />
          <button onClick={handleCreateSlot} className={NEW_POINTAGE_BUTTON}>
            + Nouveau Créneau
          </button>
        </div>
      </div>

      <div className={GRID_CONTAINER}>
        {attendanceCards.length === 0 ? (
          <p className={EMPTY_TEXT}>Aucun créneau enregistré pour ce jour.</p>
        ) : (
          attendanceCards.map((card) => (
            <div key={card.slotId} className={CARD_BOX}>
              <div>
                <div className={CARD_HEADER}>
                  <span className={DAY_TEXT}>
                    {formatTime(card.startTime)} - {formatTime(card.endTime)}
                  </span>
                  <span
                    className={
                      STATUS_BADGE_CLASSES[card.status] || STATUS_PENDING
                    }
                  >
                    {STATUS_LABELS[card.status]}
                  </span>
                </div>

                <h4 className={PROF_NAME}>
                  {card.teacherFirstName} {card.teacherLastName}
                </h4>
                <p className={SUBJECT_LINE}>
                  <span>{card.subjectName}</span>
                  <span className={CLASS_HIGHLIGHT}>({card.targetClass})</span>
                </p>
                <p className={CLASSROOM_TEXT}>Salle : {card.classroom}</p>

                {card.status === "LATE" && (
                  <p className={LATE_DETAIL_TEXT}>
                    Retard : +{card.lateDurationMinutes} min
                  </p>
                )}
                {card.status === "ABSENT" && (
                  <p className={ABSENT_DETAIL_TEXT}>
                    Motif : {card.motif || "Non spécifié (absence injustifiée)"}
                  </p>
                )}
              </div>

              <div className={CARD_FOOTER}>
                <div className={SLOT_ACTIONS}>
                  <button
                    onClick={() => handleEditSlot(card)}
                    className={EDIT_BUTTON}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDeleteSlot(card.slotId)}
                    className={DELETE_BUTTON}
                  >
                    Supprimer
                  </button>
                </div>

                <div className={BUTTONS_GROUP}>
                  <button
                    onClick={() =>
                      onCheckAttendance(card.slotId, attendanceDate)
                    }
                    className={BUTTON_PRESENT}
                    title="Présent ou en retard, selon l'heure d'arrivée"
                  >
                    Pointer Présent
                  </button>
                  <button
                    onClick={() => handleMarkAbsence(card)}
                    className={BUTTON_ABSENT}
                  >
                    Absent
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

export default AdminAttendance;
