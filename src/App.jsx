import React, { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import AppRouter from "./pages/AppRouter";
import Toast from "./components/common/Toast";

// Modaux
import UserModal from "./components/modals/UserModal";
import AnnouncementModal from "./components/modals/AnnouncementModal";
import SubjectModal from "./components/modals/SubjectModal";
import GradeSessionModal from "./components/modals/GradeSessionModal";
import PointageModal from "./components/modals/PointageModal";
import HistoryRemarkModal from "./components/modals/HistoryRemarkModal";

import {
  INITIAL_USERS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SUBJECTS,
  INITIAL_EXAM_RESULTS,
  INITIAL_GRADE_SESSIONS,
  INITIAL_HISTORIQUE,
  INITIAL_REMARQUES,
  INITIAL_POINTAGES,
} from "./data/mockData";

export default function App() {
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]); // Default Admin
  const [activeTab, setActiveTab] = useState("dashboard");

  const [users, setUsers] = useState(INITIAL_USERS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [examResults, setExamResults] = useState(INITIAL_EXAM_RESULTS);
  const [gradeSessions, setGradeSessions] = useState(INITIAL_GRADE_SESSIONS);
  const [historiques, setHistoriques] = useState(INITIAL_HISTORIQUE);
  const [remarques, setRemarques] = useState(INITIAL_REMARQUES);
  const [pointages, setPointages] = useState(INITIAL_POINTAGES);

  const [selectedStudentFilter, setSelectedStudentFilter] = useState("tout");
  const [activeModal, setActiveModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const [targetStudent, setTargetStudent] = useState(null);
  const [activeGradeSession, setActiveGradeSession] = useState(null);
  const [formState, setFormState] = useState({});

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleSwitchUser = (role) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      if (role === "admin" || role === "secretaire") setActiveTab("dashboard");
      else setActiveTab("accueil");
      showToast(
        `Connecté en tant que ${found.prenom} ${found.nom} (${role.toUpperCase()})`,
      );
    }
  };

  // Handlers pour modaux
  const handleCreateUser = (e) => {
    e.preventDefault();
    const entryYear = formState.anneeEntree || "25";
    const numInClass = formState.numInClass || "020";
    const matricule =
      formState.role === "student"
        ? `TGI-${entryYear}${numInClass}`
        : `PRF-${entryYear}${numInClass}`;

    const newUser = {
      id: users.length + 1,
      matricule,
      nom: formState.nom || "Nouveau",
      prenom: formState.prenom || "Utilisateur",
      role: formState.role || "student",
      email: formState.email || "user@st-exupery.edu",
      contact: formState.contact || "+33 6 00 00 00 00",
      genre: formState.genre || "male",
      dateNaissance: formState.dateNaissance || "2008-01-01",
      lieuNaissance: formState.lieuNaissance || "Paris",
      adresse: formState.adresse || "Paris",
      classe:
        formState.role === "student" ? formState.classe || "Seconde" : null,
      anneeEntree: `20${entryYear}`,
      anneeSortie: formState.role === "ancien" ? "2025" : null,
      statut: "active",
      photo:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    setUsers([...users, newUser]);
    setActiveModal(null);
    setFormState({});
    showToast(
      `Utilisateur ${newUser.nom} ${newUser.prenom} créé (${newUser.matricule})`,
    );
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    const newAnn = {
      id: announcements.length + 1,
      title: formState.title || "Annonce Officielle",
      context: formState.context || "Détails...",
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      urgent: formState.urgent === true || formState.urgent === "true",
      cible: formState.cible || "tout",
    };
    setAnnouncements([newAnn, ...announcements]);
    setActiveModal(null);
    setFormState({});
    showToast("Annonce diffusée avec succès !");
  };

  const handleCreateSubject = (e) => {
    e.preventDefault();
    const newSub = {
      id: subjects.length + 1,
      nom: formState.nom || "Nouvelle Discipline",
      coeff: parseInt(formState.coeff) || 2,
      prof: formState.prof || "Claire Moreau",
      classe: formState.classe || "Seconde",
    };
    setSubjects([...subjects, newSub]);
    setActiveModal(null);
    setFormState({});
    showToast(`Matière ${newSub.nom} (Coeff ${newSub.coeff}) créée !`);
  };

  const handleCreateGradeSession = (e) => {
    e.preventDefault();
    const newSession = {
      id: gradeSessions.length + 1,
      matiere: formState.matiere || subjects[0]?.nom || "Mathématiques",
      classe: formState.classe || "Terminale",
      dateCreation: new Date().toISOString().replace("T", " ").substring(0, 16),
      dateValidation: null,
      statut: "attente_saisie",
      notesDraft: {},
    };
    setGradeSessions([newSession, ...gradeSessions]);
    setActiveModal(null);
    setFormState({});
    showToast("Session de note créée et assignée au secrétariat !");
  };

  const handleCreatePointage = (e) => {
    e.preventDefault();
    const newP = {
      id: pointages.length + 1,
      profName: formState.profName || "Claire Moreau",
      matiere: formState.matiere || "Mathématiques",
      classe: formState.classe || "Terminale",
      jour: formState.jour || "Lundi 08:00 - 10:00",
      date: new Date().toISOString().substring(0, 10),
      status: "programme",
      retardMin: 0,
      motif: "",
    };
    setPointages([...pointages, newP]);
    setActiveModal(null);
    setFormState({});
    showToast("Pointage de cours configuré avec succès !");
  };

  const handleAddHistoryToTarget = (e) => {
    e.preventDefault();
    if (!targetStudent) return;
    const newH = {
      id: historiques.length + 1,
      studentId: targetStudent.id,
      type: formState.type || "Absence",
      detail: formState.detail || "08:00 - 10:00",
      raison: formState.raison || "Non justifié",
      author: `${currentUser.prenom} ${currentUser.nom} (${currentUser.role})`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      isRed: formState.type === "Absence" || formState.isRed === "true",
    };
    setHistoriques([newH, ...historiques]);
    setActiveModal(null);
    setFormState({});
    showToast("Événement d’historique ajouté au profil");
  };

  const handleAddRemarkToTarget = (e) => {
    e.preventDefault();
    if (!targetStudent) return;
    const newR = {
      id: remarques.length + 1,
      studentId: targetStudent.id,
      type: formState.type || "Avertissement",
      raison: formState.raison || "Comportement inadapté",
      author: `${currentUser.prenom} ${currentUser.nom} (${currentUser.role})`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      isRed: formState.type === "Avertissement",
    };
    setRemarques([newR, ...remarques]);
    setActiveModal(null);
    setFormState({});
    showToast("Remarque enregistrée sur la fiche de l’étudiant");
  };

  const handleAdminValidateSession = (sessionId) => {
    const session = gradeSessions.find((s) => s.id === sessionId);
    if (!session) return;

    const newResults = [...examResults];
    Object.entries(session.notesDraft).forEach(([studentIdStr, noteVal]) => {
      const studentId = parseInt(studentIdStr);
      const valNum = parseFloat(noteVal);
      if (!isNaN(valNum)) {
        newResults.push({
          id: newResults.length + 1,
          studentId,
          examName: "Trimestre 1",
          matiere: session.matiere,
          coeff: 3,
          note: valNum,
          noteCoeff: valNum * 3,
          moyenne: 12.0,
          mention:
            valNum >= 16 ? "Très Bien" : valNum >= 14 ? "Bien" : "Passable",
          rang: "3ème",
        });
      }
    });

    setExamResults(newResults);
    setGradeSessions(
      gradeSessions.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            statut: "valide",
            dateValidation: new Date()
              .toISOString()
              .replace("T", " ")
              .substring(0, 16),
          };
        }
        return s;
      }),
    );
    showToast(
      "Session de notes validée ! Injectée dans le bulletin des étudiants.",
    );
  };

  const handleSecretarySaveDraft = (sessionId, draftData) => {
    setGradeSessions(
      gradeSessions.map((s) => {
        if (s.id === sessionId) {
          return { ...s, notesDraft: draftData, statut: "brouillon" };
        }
        return s;
      }),
    );
    showToast("Brouillon sauvegardé localement !");
  };

  const handleSecretarySubmitToAdmin = (sessionId, draftData) => {
    setGradeSessions(
      gradeSessions.map((s) => {
        if (s.id === sessionId) {
          return { ...s, notesDraft: draftData, statut: "attente_validation" };
        }
        return s;
      }),
    );
    setActiveGradeSession(null);
    showToast("Notes soumises à l’administrateur pour validation !");
  };

  const handleTogglePointage = (
    pointageId,
    status,
    retardMin = 0,
    motif = "",
  ) => {
    setPointages(
      pointages.map((p) => {
        if (p.id === pointageId) {
          return { ...p, status, retardMin, motif };
        }
        return p;
      }),
    );
    showToast(`Pointage mis à jour : ${status.toUpperCase()}`);
  };

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, statut: u.statut === "active" ? "desactive" : "active" }
          : u,
      ),
    );
    showToast("Statut de l’utilisateur mis à jour");
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
    showToast("Utilisateur supprimé");
  };

  const handleSimulateExport = (type) => {
    showToast(`Document [${type}] généré et téléchargé en PDF/CSV !`);
  };

  const studentUsers = users.filter((u) => {
    if (u.role !== "student" && u.role !== "ancien") return false;
    if (selectedStudentFilter === "tout") return true;
    if (selectedStudentFilter === "ancien") return u.role === "ancien";
    return u.classe?.toLowerCase() === selectedStudentFilter.toLowerCase();
  });

  const staffUsers = users.filter((u) =>
    ["prof", "admin", "secretaire"].includes(u.role),
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans relative">
      {/* SIDEBAR FIXE */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setTargetStudent={setTargetStudent}
        handleSwitchUser={handleSwitchUser}
      />

      {/* TOPBAR FIXE */}
      <Topbar currentUser={currentUser} activeTab={activeTab} />

      {/* CONTENU PRINCIPAL */}
      <div className="flex-1 ml-64 pt-20 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950">
          <AppRouter
            currentUser={currentUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            users={users}
            studentUsers={studentUsers}
            staffUsers={staffUsers}
            announcements={announcements}
            subjects={subjects}
            examResults={examResults}
            gradeSessions={gradeSessions}
            historiques={historiques}
            remarques={remarques}
            pointages={pointages}
            selectedStudentFilter={selectedStudentFilter}
            setSelectedStudentFilter={setSelectedStudentFilter}
            targetStudent={targetStudent}
            setTargetStudent={setTargetStudent}
            activeGradeSession={activeGradeSession}
            setActiveGradeSession={setActiveGradeSession}
            setActiveModal={setActiveModal}
            handleAdminValidateSession={handleAdminValidateSession}
            toggleUserStatus={toggleUserStatus}
            deleteUser={deleteUser}
            handleSecretarySaveDraft={handleSecretarySaveDraft}
            handleSecretarySubmitToAdmin={handleSecretarySubmitToAdmin}
            handleTogglePointage={handleTogglePointage}
            handleSimulateExport={handleSimulateExport}
            setCurrentUser={setCurrentUser}
          />
        </main>
      </div>

      {/* MODAUX */}
      <UserModal
        isOpen={activeModal === "user"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleCreateUser}
        formState={formState}
        setFormState={setFormState}
      />
      <AnnouncementModal
        isOpen={activeModal === "announcement"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleCreateAnnouncement}
        formState={formState}
        setFormState={setFormState}
      />
      <SubjectModal
        isOpen={activeModal === "subject"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleCreateSubject}
        formState={formState}
        setFormState={setFormState}
        staffUsers={staffUsers}
      />
      <GradeSessionModal
        isOpen={activeModal === "grade_session"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleCreateGradeSession}
        formState={formState}
        setFormState={setFormState}
        subjects={subjects}
      />
      <PointageModal
        isOpen={activeModal === "pointage"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleCreatePointage}
        formState={formState}
        setFormState={setFormState}
        staffUsers={staffUsers}
      />
      <HistoryRemarkModal
        isOpen={
          activeModal === "target_history" || activeModal === "target_remark"
        }
        onClose={() => setActiveModal(null)}
        type={activeModal}
        onSubmit={
          activeModal === "target_history"
            ? handleAddHistoryToTarget
            : handleAddRemarkToTarget
        }
        formState={formState}
        setFormState={setFormState}
        targetStudent={targetStudent}
      />

      {/* TOAST */}
      <Toast message={toastMessage} />
    </div>
  );
}
