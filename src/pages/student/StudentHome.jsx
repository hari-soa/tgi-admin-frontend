import { extractClassNum, isFormerStudent } from "../../utils/helpers";
import {
  CLASS_GROUP_LABELS,
  HISTORY_TYPE_LABELS,
  REMARK_CATEGORY_LABELS,
  formatDate,
} from "../../utils/labels";
import {
  CONTAINER_WRAPPER,
  BANNER_CONTAINER,
  BANNER_TAG,
  BANNER_TITLE,
  BANNER_DESCRIPTION,
  SECTION_BOX,
  SECTION_TITLE,
  SUBSECTION_TITLE,
  NEWS_CARD,
  NEWS_BADGE,
  NEWS_TITLE,
  NEWS_SUBTITLE,
  NEWS_BUTTON,
  GRID_TWO_COLS,
  ANNOUNCEMENT_CARD_URGENT,
  ANNOUNCEMENT_CARD_NORMAL,
  ANNOUNCEMENT_BADGE_URGENT,
  ANNOUNCEMENT_TITLE,
  ANNOUNCEMENT_CONTEXT,
  ANNOUNCEMENT_DATE,
  PREVIEW_GRID,
  PREVIEW_BOX,
  PREVIEW_TITLE,
  PREVIEW_LIST,
  PREVIEW_ITEM_RED,
  PREVIEW_ITEM_NORMAL,
  PREVIEW_ITEM_LABEL,
  EMPTY_PREVIEW_TEXT,
} from "../../styles/StudentHomeStyles";

export const StudentHome = ({
  currentUser,
  announcements,
  historyRecords,
  remarks,
  annualResults,
  setActiveTab,
}) => {
  const latestResult = annualResults[0];

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={BANNER_CONTAINER}>
        <span className={BANNER_TAG}>Espace Scolaire Élève</span>
        <h2 className={BANNER_TITLE}>
          Bonjour, {currentUser?.lastName} {currentUser?.firstName}
        </h2>
        <p className={BANNER_DESCRIPTION}>
          {isFormerStudent(currentUser)
            ? `Dossier d'Ancien Élève — Année de sortie : ${currentUser.graduationYear || "N/A"}`
            : `Classe : ${CLASS_GROUP_LABELS[currentUser?.classGroup] || "N/A"} | Matricule : ${currentUser?.matricule || "N/A"} (${extractClassNum(currentUser?.matricule)})`}
        </p>
      </div>

      {latestResult && (
        <div className={SECTION_BOX}>
          <h3 className={SECTION_TITLE}>Actualité des Examens</h3>
          <div className={NEWS_CARD}>
            <div>
              <span className={NEWS_BADGE}>Résultats disponibles</span>
              <h4 className={NEWS_TITLE}>
                Bulletin {latestResult.academicYear} disponible
              </h4>
              <p className={NEWS_SUBTITLE}>
                Moyenne générale : {latestResult.overallAverage} / 20
              </p>
            </div>
            <button
              onClick={() => setActiveTab("grades")}
              className={NEWS_BUTTON}
            >
              Voir le résultat →
            </button>
          </div>
        </div>
      )}

      <div>
        <h3 className={SUBSECTION_TITLE}>Annonces Générales</h3>
        <div className={GRID_TWO_COLS}>
          {announcements.map((announcement) => {
            const isUrgent = announcement.priority === "URGENT";
            return (
              <div
                key={announcement.id}
                className={
                  isUrgent ? ANNOUNCEMENT_CARD_URGENT : ANNOUNCEMENT_CARD_NORMAL
                }
              >
                {isUrgent && (
                  <span className={ANNOUNCEMENT_BADGE_URGENT}>Urgent</span>
                )}
                <h4 className={ANNOUNCEMENT_TITLE}>{announcement.title}</h4>
                <p className={ANNOUNCEMENT_CONTEXT}>{announcement.content}</p>
                <span className={ANNOUNCEMENT_DATE}>
                  {formatDate(announcement.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={PREVIEW_GRID}>
        <div className={PREVIEW_BOX}>
          <h4 className={PREVIEW_TITLE}>Historique Présences / Absences</h4>
          <div className={PREVIEW_LIST}>
            {historyRecords.slice(0, 2).map((record) => (
              <div key={record.id} className={PREVIEW_ITEM_NORMAL}>
                <span className={PREVIEW_ITEM_LABEL}>
                  {HISTORY_TYPE_LABELS[record.type]}
                </span>{" "}
                ({formatDate(record.startDate)}) — {record.reason}
              </div>
            ))}
            {historyRecords.length === 0 && (
              <p className={EMPTY_PREVIEW_TEXT}>Rien à signaler.</p>
            )}
          </div>
        </div>

        <div className={PREVIEW_BOX}>
          <h4 className={PREVIEW_TITLE}>Remarques Récentes</h4>
          <div className={PREVIEW_LIST}>
            {remarks.slice(0, 2).map((remark) => (
              <div
                key={remark.id}
                className={
                  remark.category === "WARNING"
                    ? PREVIEW_ITEM_RED
                    : PREVIEW_ITEM_NORMAL
                }
              >
                <span className={PREVIEW_ITEM_LABEL}>
                  {REMARK_CATEGORY_LABELS[remark.category]}
                </span>{" "}
                — {remark.content}
              </div>
            ))}
            {remarks.length === 0 && (
              <p className={EMPTY_PREVIEW_TEXT}>Aucune remarque.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
