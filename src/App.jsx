import { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import AppRouter from "./pages/AppRouter";
import Toast from "./components/common/Toast";
import Login from "./components/auth/Login";

import UserModal from "./components/modals/UserModal";
import AnnouncementModal from "./components/modals/AnnouncementModal";
import SubjectModal from "./components/modals/SubjectModal";
import GradeSessionModal from "./components/modals/GradeSessionModal";
import PointageModal from "./components/modals/PointageModal";
import HistoryRemarkModal from "./components/modals/HistoryRemarkModal";

import { getCurrentUserProfile, logoutUser } from "./services/authService";
import {
  createStudent,
  createAdministrator,
  createSecretary,
  deactivateStudent,
  updateUser,
} from "./services/userService";
import {
  getAllSubjects,
  createSubject,
  deleteSubject,
} from "./services/subjectService";
import {
  getAllAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "./services/announcementService";
import {
  createGrade,
  submitGradeSession,
  reviewGrade,
  createAnnualResult,
  getStudentResults,
} from "./services/gradeService";
import {
  createAttendanceSlot,
  getDailyAttendance,
  checkAttendance,
  updateAttendanceMotif,
  createHistoryRecord,
  createRemarkRecord,
} from "./services/attendanceDisciplineService";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [gradeSessions, setGradeSessions] = useState([]);
  const [historiques, setHistoriques] = useState([]);
  const [remarques, setRemarques] = useState([]);
  const [pointages, setPointages] = useState([]);

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

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userProfile = await getCurrentUserProfile();
          setCurrentUser(userProfile);
        } catch (err) {
          console.error("Session expired or invalid token", err);
          localStorage.removeItem("token");
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      if (!currentUser) return;
      try {
        const [
          subjectsData,
          announcementsData,
          usersData,
          gradeSessionsData,
          pointagesData,
        ] = await Promise.all([
          getAllSubjects().catch(() => []),
          getAllAnnouncements().catch(() => []),
          Promise.resolve([]),
          Promise.resolve([]),
          getDailyAttendance().catch(() => []),
        ]);

        setSubjects(subjectsData);
        setAnnouncements(announcementsData);
        setUsers(usersData);
        setGradeSessions(gradeSessionsData);
        setPointages(pointagesData);
      } catch (error) {
        showToast("Error loading application data from server");
      }
    };

    fetchAppData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-slate-100 font-sans">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Chargement de Collège Saint Michel...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <>
        <Login setCurrentUser={setCurrentUser} showToast={showToast} />
        <Toast message={toastMessage} />
      </>
    );
  }

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setTargetStudent(null);
    showToast("Logged out successfully");
  };

  const handleSwitchUser = (role) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      if (role === "admin" || role === "secretaire") setActiveTab("dashboard");
      else setActiveTab("accueil");
      showToast(
        `Logged in as ${found.prenom} ${found.nom} (${role.toUpperCase()})`,
      );
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formState };
      let response;

      if (payload.role === "student" || payload.role === "ancien") {
        response = await createStudent(payload);
      } else if (payload.role === "secretaire") {
        response = await createSecretary(payload);
      } else {
        response = await createAdministrator(payload);
      }

      setUsers([...users, response || payload]);
      setActiveModal(null);
      setFormState({});
      showToast("User created successfully on server!");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formState.title || "Official Announcement",
        context: formState.context || "Details...",
        urgent: formState.urgent === true || formState.urgent === "true",
        cible: formState.cible || "tout",
      };

      const response = await createAnnouncement(payload);
      setAnnouncements([response || payload, ...announcements]);
      setActiveModal(null);
      setFormState({});
      showToast("Announcement published successfully!");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formState.name || formState.nom || "New Subject",
        coefficient: parseFloat(formState.coefficient || formState.coeff) || 2,
        description: formState.description || "",
        assignments: [
          {
            classGroup: formState.classGroup || formState.classe || "Seconde",
            teacherId:
              formState.teacherId || formState.prof || "default-teacher-id",
          },
        ],
      };

      const response = await createSubject(payload);
      setSubjects([...subjects, response || payload]);
      setActiveModal(null);
      setFormState({});
      showToast("Subject created successfully!");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleCreateGradeSession = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        matiere: formState.matiere || subjects[0]?.nom || "Mathematics",
        classe: formState.classe || "Terminale",
      };

      const response = await submitGradeSession(payload);
      setGradeSessions([response || payload, ...gradeSessions]);
      setActiveModal(null);
      setFormState({});
      showToast("Grade session created and assigned to secretary!");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleCreatePointage = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        profName: formState.profName || "",
        matiere: formState.matiere || "Mathematics",
        classe: formState.classe || "Terminale",
        jour: formState.jour || "Monday 08:00 - 10:00",
      };

      const response = await createAttendanceSlot(payload);
      setPointages([...pointages, response || payload]);
      setActiveModal(null);
      setFormState({});
      showToast("Teacher attendance slot created successfully!");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleAddHistoryToTarget = async (e) => {
    e.preventDefault();
    if (!targetStudent) return;
    try {
      const payload = {
        studentId: targetStudent.id,
        type: formState.type || "Absence",
        detail: formState.detail || "08:00 - 10:00",
        raison: formState.raison || "Unjustified",
      };

      const response = await createHistoryRecord(payload);
      setHistoriques([response || payload, ...historiques]);
      setActiveModal(null);
      setFormState({});
      showToast("History event added to student profile");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleAddRemarkToTarget = async (e) => {
    e.preventDefault();
    if (!targetStudent) return;
    try {
      const payload = {
        studentId: targetStudent.id,
        type: formState.type || "Warning",
        raison: formState.raison || "Inappropriate behavior",
      };

      const response = await createRemarkRecord(payload);
      setRemarques([response || payload, ...remarques]);
      setActiveModal(null);
      setFormState({});
      showToast("Remark added to student profile");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleAdminValidateSession = (sessionId) => {
    const session = gradeSessions.find((s) => s.id === sessionId);
    if (!session) return;

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
    showToast("Grade session validated and injected into student reports!");
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
    showToast("Draft saved locally!");
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
    showToast("Grades submitted to administrator for validation!");
  };

  const handleTogglePointage = async (
    pointageId,
    status,
    retardMin = 0,
    motif = "",
  ) => {
    try {
      await checkAttendance({ slotId: pointageId, status, retardMin, motif });
      setPointages(
        pointages.map((p) => {
          if (p.id === pointageId) {
            return { ...p, status, retardMin, motif };
          }
          return p;
        }),
      );
      showToast(`Pointage updated: ${status.toUpperCase()}`);
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const targetUser = users.find((u) => u.id === userId);
      const newStatus =
        targetUser?.statut === "active" ? "desactive" : "active";
      await updateUser(userId, { statut: newStatus });

      setUsers(
        users.map((u) => (u.id === userId ? { ...u, statut: newStatus } : u)),
      );
      showToast("User status updated");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await deactivateStudent(userId);
      setUsers(users.filter((u) => u.id !== userId));
      showToast("User deleted/deactivated");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleSimulateExport = (type) => {
    showToast(`Document [${type}] generated and downloaded in PDF/CSV!`);
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

  if (!currentUser) {
    return (
      <>
        <Login
          users={users}
          setCurrentUser={setCurrentUser}
          showToast={showToast}
        />
        <Toast message={toastMessage} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans relative">
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setTargetStudent={setTargetStudent}
        handleSwitchUser={handleSwitchUser}
        handleLogout={handleLogout}
      />

      <Topbar
        currentUser={currentUser}
        activeTab={activeTab}
        handleLogout={handleLogout}
      />

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
            handleLogout={handleLogout}
          />
        </main>
      </div>

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

      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
