import {
  CONTAINER_WRAPPER,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  SECTION_TITLE,
  LIST_CONTAINER,
  CARD_RED,
  CARD_NORMAL,
  HEADER_ROW,
  BADGE_RED,
  BADGE_BLUE,
  BADGE_EMERALD,
  DETAIL_TEXT,
  REASON_TEXT,
  AUTHOR_TEXT,
  DATE_TEXT,
} from "../../styles/StudentHistoryStyles";

export const StudentHistory = ({ currentUser, historiques, remarques }) => {
  return (
    <div className={CONTAINER_WRAPPER}>
      <div>
        <h2 className={HEADER_TITLE}>Historique & Remarques Disciplinaires</h2>
        <p className={HEADER_SUBTITLE}>
          Registre d'absences, retards, infirmerie et mentions académiques
        </p>
      </div>

      <div>
        <h3 className={SECTION_TITLE}>Historiques</h3>
        <div className={LIST_CONTAINER}>
          {historiques
            .filter((h) => h.studentId === currentUser?.id)
            .map((h) => {
              const isRedCard = h.type === "Absence" || h.isRed;
              return (
                <div key={h.id} className={isRedCard ? CARD_RED : CARD_NORMAL}>
                  <div>
                    <div className={HEADER_ROW}>
                      <span
                        className={
                          h.type === "Absence" ? BADGE_RED : BADGE_BLUE
                        }
                      >
                        {h.type}
                      </span>
                      <span className={DETAIL_TEXT}>{h.detail}</span>
                    </div>
                    <p className={REASON_TEXT}>{h.raison}</p>
                    <p className={AUTHOR_TEXT}>
                      Auteur : {h.author || "Administration"}
                    </p>
                  </div>
                  <span className={DATE_TEXT}>{h.date || "Récemment"}</span>
                </div>
              );
            })}
        </div>
      </div>

      <div>
        <h3 className={SECTION_TITLE}>Remarques</h3>
        <div className={LIST_CONTAINER}>
          {remarques
            .filter((r) => r.studentId === currentUser?.id)
            .map((r) => {
              const isRedCard = r.type === "Avertissement" || r.isRed;
              return (
                <div key={r.id} className={isRedCard ? CARD_RED : CARD_NORMAL}>
                  <div>
                    <div className={HEADER_ROW}>
                      <span
                        className={
                          r.type === "Avertissement" ? BADGE_RED : BADGE_EMERALD
                        }
                      >
                        {r.type}
                      </span>
                    </div>
                    <p className={REASON_TEXT}>{r.raison}</p>
                    <p className={AUTHOR_TEXT}>
                      Auteur : {r.author || "Corps Enseignant"}
                    </p>
                  </div>
                  <span className={DATE_TEXT}>{r.date || "Récemment"}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StudentHistory;
