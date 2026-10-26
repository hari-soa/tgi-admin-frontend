import React, { useState } from "react";
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
  CELL_NOTE,
  CELL_NOTE_COEFF,
  CELL_AVERAGE,
  MENTION_BADGE,
  CELL_RANK,
} from "../../styles/StudentGradesStyles";

export const StudentGrades = ({
  currentUser,
  examResults,
  handleSimulateExport,
}) => {
  const [selectedExamFilter, setSelectedExamFilter] = useState("Trimestre 1");

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={HEADER_SECTION}>
        <div>
          <h2 className={HEADER_TITLE}>Résultats & Notes d'Examens</h2>
          <p className={HEADER_SUBTITLE}>
            Bulletins détaillés et moyennes annuelles
          </p>
        </div>
        <div className={HEADER_ACTIONS}>
          <select
            value={selectedExamFilter}
            onChange={(e) => setSelectedExamFilter(e.target.value)}
            className={SELECT_INPUT}
          >
            <option value="Trimestre 1">Trimestre 1</option>
            <option value="Examen Blanc">Examen Blanc</option>
          </select>
          <button
            onClick={() => handleSimulateExport(`Examen_${selectedExamFilter}`)}
            className={EXPORT_BUTTON}
          >
            Exporter Examen (PDF)
          </button>
        </div>
      </div>

      <div className={TABLE_CONTAINER}>
        <div className={TABLE_HEADER_BOX}>
          <h3 className={TABLE_TITLE}>
            Détail des Matières — {selectedExamFilter}
          </h3>
        </div>
        <div className={TABLE_SCROLL}>
          <table className={TABLE_ELEMENT}>
            <thead className={TABLE_HEAD}>
              <tr>
                <th className="p-4">Matière</th>
                <th className="p-4">Coefficient</th>
                <th className="p-4">Note /20</th>
                <th className="p-4">Note Coeff</th>
                <th className="p-4">Moyenne Classe</th>
                <th className="p-4">Mention</th>
                <th className="p-4">Rang</th>
              </tr>
            </thead>
            <tbody className={TABLE_BODY}>
              {examResults
                .filter(
                  (res) =>
                    res.studentId === currentUser?.id &&
                    res.examName === selectedExamFilter,
                )
                .map((res) => (
                  <tr key={res.id} className={TABLE_ROW}>
                    <td className={CELL_SUBJECT}>{res.matiere}</td>
                    <td className="p-4">{res.coeff}</td>
                    <td className={CELL_NOTE}>{res.note} / 20</td>
                    <td className={CELL_NOTE_COEFF}>{res.noteCoeff}</td>
                    <td className={CELL_AVERAGE}>{res.moyenne}</td>
                    <td className="p-4">
                      <span className={MENTION_BADGE}>
                        {res.mention || "N/A"}
                      </span>
                    </td>
                    <td className={CELL_RANK}>{res.rang || "N/A"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;
