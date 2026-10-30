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
  BUTTON_LATE,
  BUTTON_ABSENT,
} from "../../styles/AdminPointageStyles";

export const AdminPointage = ({
  currentUser,
  pointages,
  handleTogglePointage,
  setActiveModal,
}) => {
  const getStatusBadgeClass = (status) => {
    if (status === "present") return STATUS_PRESENT;
    if (status === "retard") return STATUS_LATE;
    if (status === "absent") return STATUS_ABSENT;
    return STATUS_PENDING;
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={HEADER_SECTION}>
        <div>
          <h2 className={HEADER_TITLE}>Registre du Pointage Enseignants</h2>
          <p className={HEADER_SUBTITLE}>Suivi de présence</p>
        </div>
        {currentUser?.role === "admin" && (
          <button
            onClick={() => setActiveModal("pointage")}
            className={NEW_POINTAGE_BUTTON}
          >
            + Nouveau Pointage
          </button>
        )}
      </div>

      <div className={GRID_CONTAINER}>
        {pointages.map((p) => (
          <div key={p.id} className={CARD_BOX}>
            <div>
              <div className={CARD_HEADER}>
                <span className={DAY_TEXT}>{p.jour}</span>
                <span className={getStatusBadgeClass(p.status)}>
                  {p.status || "en attente"}
                </span>
              </div>

              <h4 className={PROF_NAME}>{p.profName}</h4>
              <p className={SUBJECT_LINE}>
                <span>{p.matiere}</span>
                <span className={CLASS_HIGHLIGHT}>({p.classe})</span>
              </p>

              {p.status === "retard" && (
                <p className={LATE_DETAIL_TEXT}>Retard : +{p.retardMin} min</p>
              )}
              {p.status === "absent" && (
                <p className={ABSENT_DETAIL_TEXT}>
                  Motif : {p.motif || "Non spécifié"}
                </p>
              )}
            </div>

            <div className={CARD_FOOTER}>
              <span className={FOOTER_NOTE}>Fixe (Hebdomadaire)</span>
              <div className={BUTTONS_GROUP}>
                <button
                  onClick={() => handleTogglePointage(p.id, "present")}
                  className={BUTTON_PRESENT}
                >
                  Présent
                </button>
                <button
                  onClick={() => handleTogglePointage(p.id, "retard", 15)}
                  className={BUTTON_LATE}
                >
                  Retard
                </button>
                <button
                  onClick={() =>
                    handleTogglePointage(p.id, "absent", 0, "Injustifiée")
                  }
                  className={BUTTON_ABSENT}
                >
                  Absent
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPointage;
