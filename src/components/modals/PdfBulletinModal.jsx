import React from "react";

export default function PdfBulletinModal({
  currentUser,
  subjects,
  grades,
  computeStudentStats,
}) {
  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-black text-white">
          Générateur de Relevé Officiel A4
        </h3>
        <button
          onClick={() => window.print()}
          className="bg-emerald-600 text-white font-bold px-4 py-1.5 rounded-xl"
        >
          🖨 Imprimer / Enregistrer PDF
        </button>
      </div>

      <div className="bg-white text-slate-900 p-8 rounded-xl font-serif space-y-6 shadow-2xl border border-slate-300 select-none">
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase">
              Lycée Saint-Exupéry
            </h1>
            <p className="text-[10px] font-sans text-slate-600">
              Ministère de l'Éducation Nationale • Édition Officielle
            </p>
          </div>
          <div className="text-right font-sans text-[10px]">
            <p className="font-bold">BULLETIN ANNUEL RÉCAPITULATIF</p>
            <p className="text-slate-500">Année Académique : 2025-2026</p>
          </div>
        </div>

        <div className="font-sans text-[11px] grid grid-cols-2 gap-4 bg-slate-100 p-4 rounded-lg">
          <div>
            <p>
              <strong>Élève :</strong> {currentUser.prenom} {currentUser.nom}
            </p>
            <p>
              <strong>Matricule :</strong> {currentUser.matricule}
            </p>
          </div>
          <div>
            <p>
              <strong>Classe :</strong> {currentUser.classe || "Terminale"}
            </p>
            <p>
              <strong>N° dans la classe :</strong>{" "}
              {currentUser.numeroClasse || "N°01"}
            </p>
          </div>
        </div>

        <table className="w-full text-left font-sans text-[10px] border-collapse border border-slate-300">
          <thead className="bg-slate-200">
            <tr>
              <th className="border border-slate-300 p-2">Matière</th>
              <th className="border border-slate-300 p-1 text-center">Coeff</th>
              <th className="border border-slate-300 p-1 text-center">ST1</th>
              <th className="border border-slate-300 p-1 text-center">T1</th>
              <th className="border border-slate-300 p-1 text-center">ST2</th>
              <th className="border border-slate-300 p-1 text-center">T2</th>
              <th className="border border-slate-300 p-1 text-center">ST3</th>
              <th className="border border-slate-300 p-1 text-center">T3</th>
              <th className="border border-slate-300 p-1 text-center font-bold">
                Moy.
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub) => {
              const subGrades = grades.filter(
                (g) =>
                  g.studentId === currentUser.id &&
                  g.subjectId === sub.id &&
                  g.status === "PUBLISHED",
              );
              const getNote = (code) => {
                const match = subGrades.find((g) => g.examCode === code);
                return match ? match.note.toFixed(1) : "-";
              };
              const avg =
                subGrades.length > 0
                  ? (
                      subGrades.reduce((a, b) => a + b.note, 0) /
                      subGrades.length
                    ).toFixed(2)
                  : "-";

              return (
                <tr key={sub.id}>
                  <td className="border border-slate-300 p-2 font-bold">
                    {sub.nom}
                  </td>
                  <td className="border border-slate-300 p-1 text-center">
                    {sub.coeff}
                  </td>
                  <td className="border border-slate-300 p-1 text-center">
                    {getNote("ST1")}
                  </td>
                  <td className="border border-slate-300 p-1 text-center">
                    {getNote("T1")}
                  </td>
                  <td className="border border-slate-300 p-1 text-center">
                    {getNote("ST2")}
                  </td>
                  <td className="border border-slate-300 p-1 text-center">
                    {getNote("T2")}
                  </td>
                  <td className="border border-slate-300 p-1 text-center">
                    {getNote("ST3")}
                  </td>
                  <td className="border border-slate-300 p-1 text-center">
                    {getNote("T3")}
                  </td>
                  <td className="border border-slate-300 p-1 text-center font-bold bg-slate-50">
                    {avg}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="font-sans flex justify-between items-end pt-6 border-t border-slate-300 text-[10px]">
          <div>
            <p>
              <strong>Moyenne Générale Annuelle :</strong>{" "}
              {computeStudentStats(currentUser.id, "ALL").average || "N/A"} / 20
            </p>
            <p>
              <strong>Décision du Conseil :</strong> Vœu d'Admission Validé
            </p>
          </div>
          <div className="text-center italic">
            <p>Le Chef d'Établissement</p>
            <p className="mt-8 font-bold font-serif text-slate-800">
              A. Saint-Exupéry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
