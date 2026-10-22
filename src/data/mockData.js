export const INITIAL_USERS = [
  {
    id: 1,
    matricule: "ADM-001",
    nom: "Saint-Exupéry",
    prenom: "Antoine",
    role: "admin",
    email: "admin@st-exupery.edu",
    contact: "+33 1 42 68 55 00",
    sexe: "M",
    dateNaissance: "1975-06-29",
    adresse: "15 rue de la Paix, Paris",
    updatedAt: "2026-10-20 08:30",
  },
  {
    id: 2,
    matricule: "SEC-001",
    nom: "Dupont",
    prenom: "Hélène",
    role: "secretaire",
    email: "h.dupont@st-exupery.edu",
    contact: "+33 1 42 68 55 12",
    sexe: "F",
    dateNaissance: "1985-04-12",
    adresse: "8 avenue Victor Hugo, Paris",
    updatedAt: "2026-10-21 09:15",
  },
  {
    id: 3,
    matricule: "ETU-2026-01",
    nom: "Martin",
    prenom: "Lucas",
    role: "student",
    email: "lucas.martin@student.edu",
    contact: "+33 6 12 34 56 78",
    sexe: "M",
    dateNaissance: "2008-03-14",
    adresse: "22 boulevard Saint-Germain, Paris",
    classe: "Terminale",
    numeroClasse: "n°01",
    updatedAt: "2026-10-22 10:00",
  },
  {
    id: 4,
    matricule: "ETU-2026-02",
    nom: "Bernard",
    prenom: "Chloé",
    role: "student",
    email: "chloe.bernard@student.edu",
    contact: "+33 6 98 76 54 32",
    sexe: "F",
    dateNaissance: "2009-07-21",
    adresse: "45 rue de Rennes, Paris",
    classe: "Première",
    numeroClasse: "n°05",
    updatedAt: "2026-10-19 14:20",
  },
  {
    id: 5,
    matricule: "ETU-2026-03",
    nom: "Petit",
    prenom: "Thomas",
    role: "student",
    email: "thomas.petit@student.edu",
    contact: "+33 6 45 55 66 77",
    sexe: "M",
    dateNaissance: "2010-11-05",
    adresse: "12 rue Monge, Paris",
    classe: "Seconde",
    numeroClasse: "n°12",
    updatedAt: "2026-10-18 11:45",
  },
  {
    id: 6,
    matricule: "PRF-101",
    nom: "Moreau",
    prenom: "Claire",
    role: "personnel",
    email: "c.moreau@st-exupery.edu",
    contact: "+33 1 42 68 55 40",
    sexe: "F",
    dateNaissance: "1980-09-10",
    adresse: "3 rue des Écoles, Paris",
    matieres: ["Mathématiques", "Physique-Chimie"],
    classesAssociees: ["Terminale", "Première"],
    updatedAt: "2026-10-15 16:00",
  },
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Rentrée Solennelle et Accueil des Nouveaux Élèves",
    context:
      "La rentrée officielle aura lieu dans la cour principale à 8h00. Veuillez vous munir de votre carnet de correspondance.",
    date: "2026-10-22 08:00",
    urgent: true,
  },
  {
    id: 2,
    title: "Maintenance du Portail Numérique",
    context:
      "Le système de gestion sera temporairement indisponible ce dimanche de 02h00 à 05h00 pour mise à jour.",
    date: "2026-10-21 17:30",
    urgent: false,
  },
  {
    id: 3,
    title: "Conseils de Classe du 1er Trimestre",
    context:
      "Le calendrier prévisionnel des conseils de classe est désormais consultable sur l’espace enseignant.",
    date: "2026-10-20 10:15",
    urgent: false,
  },
];

export const INITIAL_GRADES = [
  {
    id: 1,
    studentName: "Lucas Martin",
    classe: "Terminale",
    subject: "Mathématiques",
    grade: 16.5,
    maxGrade: 20,
    date: "2026-10-21 14:00",
    addedBy: "Hélène Dupont (Secrétaire)",
  },
  {
    id: 2,
    studentName: "Lucas Martin",
    classe: "Terminale",
    subject: "Physique-Chimie",
    grade: 14.0,
    maxGrade: 20,
    date: "2026-10-20 11:30",
    addedBy: "Hélène Dupont (Secrétaire)",
  },
  {
    id: 3,
    studentName: "Chloé Bernard",
    classe: "Première",
    subject: "Histoire-Géo",
    grade: 15.0,
    maxGrade: 20,
    date: "2026-10-21 09:45",
    addedBy: "Hélène Dupont (Secrétaire)",
  },
  {
    id: 4,
    studentName: "Thomas Petit",
    classe: "Seconde",
    subject: "Français",
    grade: 13.5,
    maxGrade: 20,
    date: "2026-10-19 16:10",
    addedBy: "Hélène Dupont (Secrétaire)",
  },
];

export const INITIAL_HISTORY = [
  {
    id: 1,
    studentName: "Lucas Martin",
    title: "Avertissement de Retard",
    context:
      "Retards répétés au cours de Mathématiques sans justification valable.",
    date: "2026-10-18 08:15",
    duration: "1 semaine",
    isAvertissement: true,
  },
  {
    id: 2,
    studentName: "Lucas Martin",
    title: "Félicitations du Conseil",
    context:
      "Excellents résultats trimestriels et participation active en classe.",
    date: "2026-10-10 17:00",
    duration: "Trimestre 1",
    isAvertissement: false,
  },
  {
    id: 3,
    studentName: "Chloé Bernard",
    title: "Rappel au Règlement",
    context: "Oubli du matériel de laboratoire lors de la séance de TP.",
    date: "2026-10-15 10:30",
    duration: "24h",
    isAvertissement: true,
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Nouvelle note ajoutée",
    description:
      "Une note de 16.5/20 a été enregistrée en Mathématiques pour Lucas Martin.",
    time: "2026-10-21 14:00",
    type: "grade",
  },
  {
    id: 2,
    title: "Mise à jour de l’application",
    description:
      "Ajout du module de suivi disciplinaire et des étiquettes dynamiques.",
    time: "2026-10-22 07:00",
    type: "feature",
  },
];

export const INITIAL_SUBJECTS = [
  "Mathématiques",
  "Physique-Chimie",
  "Français",
  "Histoire-Géo",
  "Anglais",
  "SVT",
  "Philosophie",
];

export const INITIAL_ALUMNI = [
  {
    id: 101,
    nom: "Leroy",
    prenom: "Alexandre",
    promo: "2025",
    mention: "Très Bien",
    updatedAt: "2026-06-30 12:00",
  },
  {
    id: 102,
    nom: "Rousseau",
    prenom: "Camille",
    promo: "2024",
    mention: "Bien",
    updatedAt: "2025-06-30 14:00",
  },
];

export const isWithin72Hours = (dateString) => {
  const itemDate = new Date(dateString);
  const now = new Date();
  const diffHours = (now - itemDate) / (1000 * 60 * 60);
  return diffHours <= 72;
};
