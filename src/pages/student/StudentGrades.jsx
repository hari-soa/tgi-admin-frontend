import { useState } from "react";
import {
  CONTAINER_WRAPPER,
  HEADER_SECTION,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  HEADER_ACTIONS,
  SELECT_INPUT,
  EXPORT_BUTTON,
  TABLE_CONTAINER,
  TABLE_HEADER_BOX,
  TABLE_TITLE,
  TABLE_SCROLL,
  TABLE_ELEMENT,
  TABLE_HEAD,
  TABLE_BODY,
  TABLE_ROW,
  CELL_SUBJECT,
  CELL_AVERAGE,
  TABLE_HEAD_CELL,
  TABLE_HEAD_CELL_CENTER,
  TABLE_EMPTY_CELL,
  SUMMARY_BAR,
  SUMMARY_VALUE_LARGE,
  SUMMARY_VALUE,
  DECISION_BADGE,
} from "../../styles/StudentGradesStyles";
import {
  CLASS_GROUP_LABELS,
  ACADEMIC_DECISION_LABELS,
} from "../../utils/labels";

const GRADE_COLUMNS = [
  { label: "ST1", field: "term1SemiTrimesterGrade" },
  { label: "T1", field: "term1TrimesterGrade" },
  { label: "ST2", field: "term2SemiTrimesterGrade" },
  { label: "T2", field: "term2TrimesterGrade" },
  { label: "ST3", field: "term3SemiTrimesterGrade" },
  { label: "T3", field: "term3TrimesterGrade" },
];

const TABLE_COLUMN_COUNT = GRADE_COLUMNS.length + 3;

export const StudentGrades = ({ annualResults, onExportReportCard }) => {
  const [selectedResultId, setSelectedResultId] = useState("");

  // Results are loaded after the first render: default to the most recent one
  const currentReportCard =
    annualResults.find((result) => result.id === selectedResultId) ||
    annualResults[0];

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={HEADER_SECTION}>
        <div>
          <h2 className={HEADER_TITLE}>Résultats et Bulletins Annuels</h2>
          <p className={HEADER_SUBTITLE}>Suivi académique officiel</p>
        </div>
        <div className={HEADER_ACTIONS}>
          <select
            value={currentReportCard?.id || ""}
            onChange={(event) => setSelectedResultId(event.target.value)}
            className={SELECT_INPUT}
          >
            {annualResults.map((result) => (
              <option key={result.id} value={result.id}>
                {result.academicYear} — Classe :{" "}
                {CLASS_GROUP_LABELS[result.classGroup]}
              </option>
            ))}
          </select>
          {currentReportCard && (
            <button
              onClick={() => onExportReportCard(currentReportCard.id)}
              className={EXPORT_BUTTON}
            >
              Télécharger le Bulletin (PDF)
            </button>
          )}
        </div>
      </div>

      <div className={TABLE_CONTAINER}>
        <div className={TABLE_HEADER_BOX}>
          <h3 className={TABLE_TITLE}>
            Détail des Matières — Année{" "}
            {currentReportCard?.academicYear || "N/A"}
          </h3>
        </div>
        <div className={TABLE_SCROLL}>
          <table className={TABLE_ELEMENT}>
            <thead className={TABLE_HEAD}>
              <tr>
                <th className={TABLE_HEAD_CELL}>Matière</th>
                <th className={TABLE_HEAD_CELL}>Coef</th>
                {GRADE_COLUMNS.map(({ label }) => (
                  <th key={label} className={TABLE_HEAD_CELL_CENTER}>
                    {label}
                  </th>
                ))}
                <th className={TABLE_HEAD_CELL}>Moyenne Matière</th>
              </tr>
            </thead>
            <tbody className={TABLE_BODY}>
              {!currentReportCard || currentReportCard.subjects.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_COLUMN_COUNT} className={TABLE_EMPTY_CELL}>
                    Aucun résultat publié pour le moment.
                  </td>
                </tr>
              ) : (
                currentReportCard.subjects.map((subject) => (
                  <tr key={subject.subjectId} className={TABLE_ROW}>
                    <td className={CELL_SUBJECT}>{subject.subjectName}</td>
                    <td className={TABLE_HEAD_CELL}>{subject.coefficient}</td>
                    {GRADE_COLUMNS.map(({ field }) => (
                      <td key={field} className={TABLE_HEAD_CELL_CENTER}>
                        {subject[field] ?? "-"}
                      </td>
                    ))}
                    <td className={CELL_AVERAGE}>
                      {subject.subjectOverallAverage} / 20
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {currentReportCard && (
          <div className={SUMMARY_BAR}>
            <div>
              <span>Moyenne Générale : </span>
              <strong className={SUMMARY_VALUE_LARGE}>
                {currentReportCard.overallAverage} / 20
              </strong>
            </div>
            <div>
              <span>Rang : </span>
              <strong className={SUMMARY_VALUE}>
                {currentReportCard.classRank
                  ? `${currentReportCard.classRank}e`
                  : "N/A"}
              </strong>
            </div>
            <div>
              <span>Décision : </span>
              <span className={DECISION_BADGE}>
                {ACADEMIC_DECISION_LABELS[currentReportCard.decision]}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGrades;
