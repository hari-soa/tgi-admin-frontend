import React, { useState } from "react";
import {
  INITIAL_USERS,
  INITIAL_SUBJECTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_GRADES,
  INITIAL_GRADE_SLOTS,
  INITIAL_HISTORIES,
  INITIAL_REMARQUES,
  INITIAL_NOTIFICATIONS,
} from "./data/mockData";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ModalManager from "./components/modals/ModalManager";

import LoginView from "./views/LoginView";
import StudentProfileDetail from "./views/StudentProfileDetail";
import NotesView from "./views/NotesView";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [users, setUsers] = useState(INITIAL_USERS);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [grades, setGrades] = useState(INITIAL_GRADES);
  const [gradeSlots, setGradeSlots] = useState(INITIAL_GRADE_SLOTS);
  const [histories, setHistories] = useState(INITIAL_HISTORIES);
  const [remarques, setRemarques] = useState(INITIAL_REMARQUES);
  const [notifications] = useState(INITIAL_NOTIFICATIONS);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState({});
  const [excelBuffer, setExcelBuffer] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleLogin = (role) => {
    const user = users.find((u) => u.role === role) || users[0];
    setCurrentUser(user);
    if (role === "admin" || role === "secretaire") setActiveTab("dashboard");
    else if (role === "student") {
      setActiveTab("accueil");
      setSelectedStudent(user);
    }
    triggerToast(`Espace connecté : ${user.prenom} ${user.nom}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedStudent(null);
    setActiveTab("dashboard");
    triggerToast("Déconnexion réussie");
  };

  const computeStudentStats = (studentId, filterExam = "ALL") => {
    const studentGrades = grades.filter(
      (g) => g.studentId === studentId && g.status === "PUBLISHED",
    );
    let totalWeighted = 0;
    let totalCoeff = 0;

    const rows = subjects.map((sub) => {
      let matchingGrades = studentGrades.filter((g) => g.subjectId === sub.id);
      if (filterExam !== "ALL") {
        matchingGrades = matchingGrades.filter(
          (g) => g.examCode === filterExam,
        );
      }

      const noteValue =
        matchingGrades.length > 0
          ? matchingGrades.reduce((acc, curr) => acc + curr.note, 0) /
            matchingGrades.length
          : null;

      if (noteValue !== null) {
        totalWeighted += noteValue * sub.coeff;
        totalCoeff += sub.coeff;
      }

      return {
        subject: sub,
        note: noteValue,
        weighted: noteValue !== null ? (noteValue * sub.coeff).toFixed(2) : "-",
      };
    });

    const average =
      totalCoeff > 0 ? (totalWeighted / totalCoeff).toFixed(2) : null;
    return { rows, average, totalCoeff };
  };

  if (!currentUser) {
    return <LoginView handleLogin={handleLogin} toastMessage={toastMessage} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex antialiased">
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSelectedStudent={setSelectedStudent}
        handleLogout={handleLogout}
      />

      <Topbar
        activeTab={activeTab}
        selectedStudent={selectedStudent}
        currentUser={currentUser}
        handleLogin={handleLogin}
      />

      <main className="flex-1 ml-64 pt-16 p-8 min-w-0 bg-slate-950">
        {selectedStudent ? (
          <StudentProfileDetail
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            currentUser={currentUser}
            setActiveModal={setActiveModal}
            computeStudentStats={computeStudentStats}
            histories={histories}
            remarques={remarques}
          />
        ) : (
          <>
            {activeTab === "notes" && (
              <NotesView
                currentUser={currentUser}
                computeStudentStats={computeStudentStats}
                modalData={modalData}
                setModalData={setModalData}
                setActiveModal={setActiveModal}
              />
            )}
          </>
        )}
      </main>

      <ModalManager
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        modalData={modalData}
        setModalData={setModalData}
        users={users}
        subjects={subjects}
        grades={grades}
        excelBuffer={excelBuffer}
        setExcelBuffer={setExcelBuffer}
        currentUser={currentUser}
        computeStudentStats={computeStudentStats}
        triggerToast={triggerToast}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl z-50 animate-bounce flex items-center space-x-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
