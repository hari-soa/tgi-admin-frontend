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
} from "../../styles/StudentGradesStyles";

export const StudentGrades = ({
  currentUser,
  examResults,
  handleSimulateExport,
}) => {
  const resultsList = Array.isArray(examResults) ? examResults : [];
  const [selectedResultId, setSelectedResultId] = useState(
    resultsList[0]?.id || "",
  );

  const currentBulletin = resultsList.find((r) => r.id === selectedResultId);

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={HEADER_SECTION}>
        <div>
          <h2 className={HEADER_TITLE}>Résultats et Bulletins Annuels</h2>
          <p className={HEADER_SUBTITLE}>Suivi académique officiel</p>
        </div>
        <div className={HEADER_ACTIONS}>
          <select
            value={selectedResultId}
            onChange={(e) => setSelectedResultId(e.target.value)}
            className={SELECT_INPUT}
          >
            {resultsList.map((res) => (
              <option key={res.id} value={res.id}>
                {res.academicYear} — Classe : {res.classGroup} ({res.status})
              </option>
            ))}
          </select>
          {currentBulletin && (
            <button
              onClick={() => handleSimulateExport(currentBulletin.id)}
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
            Détail des Matières — Année {currentBulletin?.academicYear || "N/A"}
          </h3>
        </div>
        <div className={TABLE_SCROLL}>
          <table className={TABLE_ELEMENT}>
            <thead className={TABLE_HEAD}>
              <tr>
                <th className="p-4">Matière</th>
                <th className="p-4">Coef</th>
                <th className="p-4 text-center">ST1</th>
                <th className="p-4 text-center">T1</th>
                <th className="p-4 text-center">ST2</th>
                <th className="p-4 text-center">T2</th>
                <th className="p-4 text-center">ST3</th>
                <th className="p-4 text-center">T3</th>
                <th className="p-4">Moyenne Matière</th>
              </tr>
            </thead>
            <tbody className={TABLE_BODY}>
              {!currentBulletin ||
              !currentBulletin.subjects ||
              currentBulletin.subjects.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center p-6 text-slate-400">
                    Aucun résultat disponible pour cette période.
                  </td>
                </tr>
              ) : (
                currentBulletin.subjects.map((sub, idx) => (
                  <tr key={idx} className={TABLE_ROW}>
                    <td className={CELL_SUBJECT}>{sub.subjectName}</td>
                    <td className="p-4">{sub.coefficient}</td>
                    <td className="p-4 text-center">
                      {sub.term1SemiTrimesterGrade ?? "-"}
                    </td>
                    <td className="p-4 text-center">
                      {sub.term1TrimesterGrade ?? "-"}
                    </td>
                    <td className="p-4 text-center">
                      {sub.term2SemiTrimesterGrade ?? "-"}
                    </td>
                    <td className="p-4 text-center">
                      {sub.term2TrimesterGrade ?? "-"}
                    </td>
                    <td className="p-4 text-center">
                      {sub.term3SemiTrimesterGrade ?? "-"}
                    </td>
                    <td className="p-4 text-center">
                      {sub.term3TrimesterGrade ?? "-"}
                    </td>
                    <td className={CELL_AVERAGE}>
                      {sub.subjectOverallAverage} / 20
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {currentBulletin && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-sm text-slate-300">
            <div>
              <span>Moyenne Générale : </span>
              <strong className="text-white text-base">
                {currentBulletin.overallAverage} / 20
              </strong>
            </div>
            <div>
              <span>Rang : </span>
              <strong className="text-white">
                {currentBulletin.classRank
                  ? `${currentBulletin.classRank}e`
                  : "N/A"}
              </strong>
            </div>
            <div>
              <span>Décision : </span>
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                {currentBulletin.decision}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGrades;
