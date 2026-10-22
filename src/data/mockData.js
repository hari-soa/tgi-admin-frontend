export const INITIAL_SUBJECTS = [
  {
    id: 1,
    nom: "Mathématiques",
    coeff: 4,
    classeCible: "Terminale",
    profAssocie: "Claire Moreau",
  },
  {
    id: 2,
    nom: "Physique-Chimie",
    coeff: 3,
    classeCible: "Terminale",
    profAssocie: "Claire Moreau",
  },
  {
    id: 3,
    nom: "Français & Philosophie",
    coeff: 3,
    classeCible: "Terminale",
    profAssocie: "Jean Valjean",
  },
  {
    id: 4,
    nom: "Histoire-Géo",
    coeff: 2,
    classeCible: "Terminale",
    profAssocie: "Marc Bloch",
  },
  {
    id: 5,
    nom: "Anglais LV1",
    coeff: 2,
    classeCible: "Terminale",
    profAssocie: "Sarah Connor",
  },
  {
    id: 6,
    nom: "SVT",
    coeff: 2,
    classeCible: "Terminale",
    profAssocie: "Gregor Mendel",
  },
];

export const INITIAL_USERS = [
  {
    id: 1,
    matricule: "ADM-2026-001",
    nom: "Saint-Exupéry",
    prenom: "Antoine",
    role: "admin",
    email: "admin@st-exupery.edu",
    contact: "+33 1 42 68 55 00",
    sexe: "M",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    updatedAt: "2026-10-22 08:30",
  },
  {
    id: 2,
    matricule: "SEC-2026-001",
    nom: "Dupont",
    prenom: "Hélène",
    role: "secretaire",
    email: "h.dupont@st-exupery.edu",
    contact: "+33 1 42 68 55 12",
    sexe: "F",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    updatedAt: "2026-10-21 09:15",
  },
  {
    id: 3,
    matricule: "ETU-2026-001",
    nom: "Martin",
    prenom: "Lucas",
    role: "student",
    email: "lucas.martin@student.edu",
    contact: "+33 6 12 34 56 78",
    sexe: "M",
    dateNaissance: "2008-03-14",
    lieuNaissance: "Paris 14e",
    anneeEntree: "2023",
    classe: "Terminale",
    numeroClasse: "N°01",
    statut: "Actif",
    photo:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250",
    adresse: "22 boulevard Saint-Germain, 75005 Paris",
    updatedAt: "2026-10-22 10:00",
    archivesReleve: [],
  },
  {
    id: 4,
    matricule: "ETU-2026-002",
    nom: "Bernard",
    prenom: "Chloé",
    role: "student",
    email: "chloe.bernard@student.edu",
    contact: "+33 6 98 76 54 32",
    sexe: "F",
    dateNaissance: "2009-07-21",
    lieuNaissance: "Lyon",
    anneeEntree: "2024",
    classe: "Première",
    numeroClasse: "N°05",
    statut: "Actif",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    adresse: "45 rue de Rennes, 75006 Paris",
    updatedAt: "2026-10-19 14:20",
    archivesReleve: [],
  },
  {
    id: 5,
    matricule: "ETU-2026-003",
    nom: "Petit",
    prenom: "Thomas",
    role: "student",
    email: "thomas.petit@student.edu",
    contact: "+33 6 45 55 66 77",
    sexe: "M",
    dateNaissance: "2010-11-05",
    lieuNaissance: "Marseille",
    anneeEntree: "2025",
    classe: "Seconde",
    numeroClasse: "N°12",
    statut: "Actif",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    adresse: "12 rue Monge, 75005 Paris",
    updatedAt: "2026-10-18 11:45",
    archivesReleve: [],
  },
  {
    id: 6,
    matricule: "PRF-2026-101",
    nom: "Moreau",
    prenom: "Claire",
    role: "prof",
    email: "c.moreau@st-exupery.edu",
    contact: "+33 1 42 68 55 40",
    sexe: "F",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
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
      "La rentrée officielle aura lieu dans la grande agora à 08h00. Les présences seront rigoureusement enregistrées.",
    date: "2026-10-22 08:00",
    urgent: true,
  },
  {
    id: 2,
    title: "Examens du Premier Semestriel - Consignes",
    context:
      "Les convocations pour l’épreuve Semi-trimestriel 1 sont à récupérer auprès du secrétariat.",
    date: "2026-10-21 14:30",
    urgent: false,
  },
  {
    id: 3,
    title: "Réunion Parents-Professeurs Terminales",
    context:
      "Série de rencontres individuelles planifiée ce vendredi à partir de 17h00.",
    date: "2026-10-20 10:15",
    urgent: false,
  },
];

export const EXAMS_LIST = [
  { code: "ST1", label: "Semi-trimestriel 1" },
  { code: "T1", label: "Trimestriel 1" },
  { code: "ST2", label: "Semi-trimestriel 2" },
  { code: "T2", label: "Trimestriel 2" },
  { code: "ST3", label: "Semi-trimestriel 3" },
  { code: "T3", label: "Trimestriel 3" },
];

export const INITIAL_GRADES = [
  {
    studentId: 3,
    subjectId: 1,
    examCode: "ST1",
    note: 14.5,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 1,
    examCode: "T1",
    note: 15.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 1,
    examCode: "ST2",
    note: 13.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 1,
    examCode: "T2",
    note: 16.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 1,
    examCode: "ST3",
    note: 12.5,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 1,
    examCode: "T3",
    note: 14.0,
    status: "PUBLISHED",
  },

  {
    studentId: 3,
    subjectId: 2,
    examCode: "ST1",
    note: 16.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 2,
    examCode: "T1",
    note: 17.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 2,
    examCode: "ST2",
    note: 15.5,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 2,
    examCode: "T2",
    note: 14.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 2,
    examCode: "ST3",
    note: 16.5,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 2,
    examCode: "T3",
    note: 17.5,
    status: "PUBLISHED",
  },

  {
    studentId: 3,
    subjectId: 3,
    examCode: "ST1",
    note: 11.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 3,
    examCode: "T1",
    note: 12.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 3,
    examCode: "ST2",
    note: 10.5,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 3,
    examCode: "T2",
    note: 13.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 3,
    examCode: "ST3",
    note: 12.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 3,
    examCode: "T3",
    note: 11.5,
    status: "PUBLISHED",
  },

  {
    studentId: 3,
    subjectId: 4,
    examCode: "ST1",
    note: 13.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 4,
    examCode: "T1",
    note: 14.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 4,
    examCode: "ST2",
    note: 13.5,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 4,
    examCode: "T2",
    note: 15.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 4,
    examCode: "ST3",
    note: 14.0,
    status: "PUBLISHED",
  },
  {
    studentId: 3,
    subjectId: 4,
    examCode: "T3",
    note: 14.5,
    status: "PUBLISHED",
  },
];

export const INITIAL_GRADE_SLOTS = [
  {
    id: 101,
    subjectId: 1,
    subjectName: "Mathématiques",
    classe: "Terminale",
    examCode: "ST1",
    status: "COMPLETED",
    updatedAt: "2026-10-21 14:00",
  },
  {
    id: 102,
    subjectId: 2,
    subjectName: "Physique-Chimie",
    classe: "Terminale",
    examCode: "T1",
    status: "PENDING",
    updatedAt: "2026-10-22 09:30",
  },
];

export const INITIAL_HISTORIES = [
  {
    id: 1,
    studentId: 3,
    type: "Retard",
    duree: "15 min",
    date: "2026-10-18 08:15",
    raison: "Embouteillage sur les grands boulevards",
    auteur: "Mme Hélène Dupont (Secrétariat)",
  },
  {
    id: 2,
    studentId: 3,
    type: "Absence",
    duree: "1 jour",
    date: "2026-10-12 08:00",
    raison: "Consultation médicale (billet fourni)",
    auteur: "Mme Hélène Dupont (Secrétariat)",
  },
];

export const INITIAL_REMARQUES = [
  {
    id: 1,
    studentId: 3,
    type: "Avertissement",
    titre: "Bavardages intempestifs",
    context:
      "Perturbation répétée des activités expérimentales en Physique-Chimie.",
    date: "2026-10-15 11:00",
    auteur: "Antoine Saint-Exupéry (Admin)",
  },
  {
    id: 2,
    studentId: 3,
    type: "Académique",
    titre: "Très bon esprit d’analyse",
    context:
      "Excellente contribution lors de l’atelier de recherche mathématique.",
    date: "2026-10-10 16:30",
    auteur: "Claire Moreau (Professeur)",
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Nouvelle saisie de notes transmise",
    description:
      "Le secrétariat a complété la grille des notes de Physique-Chimie (Terminale - T1).",
    time: "2026-10-22 09:30",
    isNew: true,
  },
  {
    id: 2,
    title: "Module Relevé Annuel mis à jour",
    description:
      "L’exportation officielle A4 en PDF intégrant les 6 évaluations périodiques est désormais active.",
    time: "2026-10-21 16:00",
    isNew: true,
  },
];
