import { extractClassNum } from "../../utils/helpers";
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
} from "../../styles/StudentHomeStyles";

export const StudentHome = ({
  currentUser,
  announcements,
  historiques,
  remarques,
  setActiveTab,
}) => {
  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={BANNER_CONTAINER}>
        <span className={BANNER_TAG}>Espace Scolaire Élève</span>
        <h2 className={BANNER_TITLE}>
          Bonjour, {currentUser?.nom} {currentUser?.prenom}
        </h2>
        <p className={BANNER_DESCRIPTION}>
          {currentUser?.role === "ancien"
            ? `Dossier d'Ancien Élève — Année de sortie : ${currentUser.anneeSortie}`
            : `Classe : ${currentUser?.classe || "N/A"} • Matricule : ${
                currentUser?.matricule || "N/A"
              } (${extractClassNum(currentUser?.matricule)})`}
        </p>
      </div>

      <div className={SECTION_BOX}>
        <h3 className={SECTION_TITLE}>Actualité des Examens</h3>
        <div className={NEWS_CARD}>
          <div>
            <span className={NEWS_BADGE}>Résultats disponibles</span>
            <h4 className={NEWS_TITLE}>
              Évaluation du Tronc Commun S1 disponible
            </h4>
            <p className={NEWS_SUBTITLE}>Consultez vos notes</p>
          </div>
          <button onClick={() => setActiveTab("notes")} className={NEWS_BUTTON}>
            Voir le résultat →
          </button>
        </div>
      </div>

      <div>
        <h3 className={SUBSECTION_TITLE}>Annonces Générales</h3>
        <div className={GRID_TWO_COLS}>
          {announcements
            .filter(
              (ann) =>
                ann.cible === "tout" || ann.cible === currentUser?.classe,
            )
            .map((ann) => (
              <div
                key={ann.id}
                className={
                  ann.urgent
                    ? ANNOUNCEMENT_CARD_URGENT
                    : ANNOUNCEMENT_CARD_NORMAL
                }
              >
                {ann.urgent && (
                  <span className={ANNOUNCEMENT_BADGE_URGENT}>Urgent</span>
                )}
                <h4 className={ANNOUNCEMENT_TITLE}>{ann.title}</h4>
                <p className={ANNOUNCEMENT_CONTEXT}>{ann.context}</p>
                <span className={ANNOUNCEMENT_DATE}>
                  {ann.date || "Récemment"}
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className={PREVIEW_GRID}>
        <div className={PREVIEW_BOX}>
          <h4 className={PREVIEW_TITLE}>Historique Présences / Absences</h4>
          <div className={PREVIEW_LIST}>
            {historiques
              .filter((h) => h.studentId === currentUser?.id)
              .slice(0, 2)
              .map((h) => (
                <div
                  key={h.id}
                  className={h.isRed ? PREVIEW_ITEM_RED : PREVIEW_ITEM_NORMAL}
                >
                  <span className="font-bold">{h.type}</span> ({h.detail}) —{" "}
                  {h.raison}
                </div>
              ))}
          </div>
        </div>

        <div className={PREVIEW_BOX}>
          <h4 className={PREVIEW_TITLE}>Remarques Récentes</h4>
          <div className={PREVIEW_LIST}>
            {remarques
              .filter((r) => r.studentId === currentUser?.id)
              .slice(0, 2)
              .map((r) => (
                <div
                  key={r.id}
                  className={r.isRed ? PREVIEW_ITEM_RED : PREVIEW_ITEM_NORMAL}
                >
                  <span className="font-bold">{r.type}</span> — {r.raison}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
