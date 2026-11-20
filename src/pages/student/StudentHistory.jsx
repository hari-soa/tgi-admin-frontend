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
  DATE_TEXT,
} from "../../styles/StudentHistoryStyles";
import {
  HISTORY_TYPE_LABELS,
  REMARK_CATEGORY_LABELS,
  formatDate,
} from "../../utils/labels";

const SERIOUS_HISTORY_TYPES = ["ABSENCE", "SUSPENSION"];

const describePeriod = (record) =>
  record.endDate === record.startDate
    ? formatDate(record.startDate)
    : `${formatDate(record.startDate)} → ${formatDate(record.endDate)}`;

export const StudentHistory = ({ historyRecords, remarks }) => {
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
          {historyRecords.map((record) => {
            const isSerious = SERIOUS_HISTORY_TYPES.includes(record.type);
            return (
              <div
                key={record.id}
                className={isSerious ? CARD_RED : CARD_NORMAL}
              >
                <div>
                  <div className={HEADER_ROW}>
                    <span className={isSerious ? BADGE_RED : BADGE_BLUE}>
                      {HISTORY_TYPE_LABELS[record.type]}
                    </span>
                    <span className={DETAIL_TEXT}>
                      {describePeriod(record)}
                    </span>
                  </div>
                  <p className={REASON_TEXT}>{record.reason}</p>
                </div>
                <span className={DATE_TEXT}>
                  {formatDate(record.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className={SECTION_TITLE}>Remarques</h3>
        <div className={LIST_CONTAINER}>
          {remarks.map((remark) => {
            const isWarning = remark.category === "WARNING";
            return (
              <div
                key={remark.id}
                className={isWarning ? CARD_RED : CARD_NORMAL}
              >
                <div>
                  <div className={HEADER_ROW}>
                    <span className={isWarning ? BADGE_RED : BADGE_EMERALD}>
                      {REMARK_CATEGORY_LABELS[remark.category]}
                    </span>
                  </div>
                  <p className={REASON_TEXT}>{remark.content}</p>
                </div>
                <span className={DATE_TEXT}>
                  {formatDate(remark.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentHistory;
