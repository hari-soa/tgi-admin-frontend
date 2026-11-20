// Labels displayed in the interface for the values sent by the API.

export const HISTORY_TYPE_LABELS = {
  ABSENCE: "Absence",
  LATENESS: "Retard",
  SUSPENSION: "Suspension",
  INFIRMARY: "Infirmerie",
  EARLY_LEAVE_PERMIT: "Permission de sortie",
};

export const REMARK_CATEGORY_LABELS = {
  BEHAVIOR: "Comportement",
  ACADEMIC: "Académique",
  WARNING: "Avertissement",
  ENCOURAGEMENT: "Encouragement",
  OTHER: "Autre",
};

export const CLASS_GROUP_LABELS = {
  SECONDE: "Seconde",
  PREMIERE: "Première",
  TERMINALE: "Terminale",
  ANCIEN: "Ancien",
};

export const EXAM_TYPE_LABELS = {
  SEMI_TRIMESTER: "Semi-trimestre",
  TRIMESTER: "Trimestre",
};

export const TERM_LABELS = {
  FIRST_TRIMESTER: "1er trimestre",
  SECOND_TRIMESTER: "2e trimestre",
  THIRD_TRIMESTER: "3e trimestre",
};

export const GRADE_SESSION_STATUS_LABELS = {
  OPEN: "En saisie",
  PENDING_REVIEW: "En attente de validation",
  VALIDATED: "Validée",
};

export const ACADEMIC_DECISION_LABELS = {
  PROMOTE: "Admis(e) en classe supérieure",
  REPEAT: "Redoublement",
  ORIENTED: "Orienté(e)",
  PENDING: "En attente du conseil",
};

export const formatDate = (isoDate) =>
  isoDate ? new Date(isoDate).toLocaleDateString("fr-FR") : "";
