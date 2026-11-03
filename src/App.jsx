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
  getAllUsers,
  createStudent,
  createAdministrator,
  createSecretary,
  createTeacher,
  deleteUser as apiDeleteUser,
  updateUser,
} from "./services/userService";
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject as apiDeleteSubject,
} from "./services/subjectService";
import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement as apiDeleteAnnouncement,
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

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

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
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
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
          getAllUsers().catch(() => []),
          Promise.resolve([]),
          getDailyAttendance().catch(() => []),
        ]);

        setSubjects(subjectsData);
        setAnnouncements(announcementsData);
        setUsers(usersData);
        setGradeSessions(gradeSessionsData);
        setPointages(pointagesData);
      } catch (error) {
        console.error("Error loading application data details:", error);
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
          <p>Loading...</p>
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
    localStorage.removeItem("activeTab");
    showToast("Logged out successfully");
  };

  const handleSwitchUser = (role) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      setTargetStudent(null);
      if (
        role === "ADMIN" ||
        role === "SECRETARY" ||
        role === "admin" ||
        role === "secretaire"
      )
        setActiveTab("dashboard");
      else setActiveTab("accueil");
      showToast(
        `Logged in as ${found.firstName || found.prenom} ${found.lastName || found.nom} (${role.toUpperCase()})`,
      );
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const role = (formState.role || "STUDENT").toUpperCase();
      const gender = (formState.gender || "MALE").toUpperCase();

      const basePayload = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        matricule: formState.matricule,
        gender: gender,
      };

      let response;

      if (role === "STUDENT") {
        const payload = {
          ...basePayload,
          classRollNumber: parseInt(formState.classRollNumber, 10),
          classGroup: (formState.classGroup || "SECONDE").toUpperCase(),
        };
        response = await createStudent(payload);
      } else if (role === "SECRETARY") {
        response = await createSecretary(basePayload);
      } else if (role === "TEACHER") {
        response = await createTeacher(basePayload);
      } else {
        response = await createAdministrator({
          ...basePayload,
          role: role,
        });
      }

      setUsers([...users, response?.data?.user || response || basePayload]);
      setActiveModal(null);
      setFormState({});
      showToast("User created successfully on the server!");
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleUpdateUser = async (userId, updatedData) => {
    const previousUsers = [...users];
    const previousTarget = targetStudent ? { ...targetStudent } : null;

    setUsers(
      users.map((u) => (u.id === userId ? { ...u, ...updatedData } : u)),
    );
    if (targetStudent?.id === userId) {
      setTargetStudent({ ...targetStudent, ...updatedData });
    }

    showToast("Profile updated successfully!");

    try {
      await updateUser(userId, updatedData);
    } catch (error) {
      setUsers(previousUsers);
      if (targetStudent?.id === userId) {
        setTargetStudent(previousTarget);
      }
      showToast(`Failed to save changes to server: ${error.message}`);
    }
  };

  const handleFormSubmitAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formState.title,
        content: formState.content,
        targetScope: formState.targetScope || "ALL",
        priority: formState.priority || "NORMAL",
        targetClasses: formState.targetClasses,
      };

      const list = Array.isArray(announcements)
        ? announcements
        : announcements?.announcements ||
          announcements?.data?.announcements ||
          [];

      if (formState.id) {
        const response = await updateAnnouncement(formState.id, payload);
        const updated = response?.data?.announcement ||
          response || { id: formState.id, ...payload };

        setAnnouncements(
          list.map((a) => (a.id === formState.id ? { ...a, ...updated } : a)),
        );
        showToast("Announcement updated successfully!");
      } else {
        const response = await createAnnouncement(payload);
        const created = response?.data?.announcement || response || payload;

        setAnnouncements([created, ...list]);
        showToast("Announcement published successfully!");
      }

      setActiveModal(null);
      setFormState({});
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    const list = Array.isArray(announcements)
      ? announcements
      : announcements?.announcements ||
        announcements?.data?.announcements ||
        [];

    const previousAnnouncements = [...list];

    setAnnouncements(list.filter((a) => a.id !== announcementId));
    showToast("Announcement deleted successfully!");

    try {
      await apiDeleteAnnouncement(announcementId);
    } catch (error) {
      setAnnouncements(previousAnnouncements);
      showToast(`Failed to delete announcement: ${error.message}`);
    }
  };

  const handleFormSubmitSubject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formState.name,
        coefficient: parseFloat(formState.coefficient),
        description: formState.description || undefined,
        assignments: [
          {
            classGroup: (formState.classGroup || "SECONDE").toUpperCase(),
            teacherId: formState.teacherId,
          },
        ],
      };

      const list = Array.isArray(subjects)
        ? subjects
        : subjects?.subjects || subjects?.data?.subjects || [];

      if (formState.id) {
        const response = await updateSubject(formState.id, payload);
        const updated = response?.data?.subject ||
          response || { id: formState.id, ...payload };

        setSubjects(
          list.map((s) => (s.id === formState.id ? { ...s, ...updated } : s)),
        );
        showToast("Subject updated successfully!");
      } else {
        const response = await createSubject(payload);
        const created = response?.data?.subject || response || payload;

        setSubjects([created, ...list]);
        showToast("Subject created successfully!");
      }

      setActiveModal(null);
      setFormState({});
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    const list = Array.isArray(subjects)
      ? subjects
      : subjects?.subjects || subjects?.data?.subjects || [];

    const previousSubjects = [...list];

    setSubjects(list.filter((s) => s.id !== subjectId));
    showToast("Subject deleted successfully!");

    try {
      await apiDeleteSubject(subjectId);
    } catch (error) {
      setSubjects(previousSubjects);
      showToast(`Failed to delete subject: ${error.message}`);
    }
  };

  const handleCreateGradeSession = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        matiere: formState.matiere,
        classe: formState.classe,
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
        profName: formState.profName,
        matiere: formState.matiere,
        classe: formState.classe,
        jour: formState.jour,
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
        type: formState.type,
        detail: formState.detail,
        raison: formState.raison,
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
        type: formState.type,
        raison: formState.raison,
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
      showToast(`Attendance updated: ${status.toUpperCase()}`);
    } catch (error) {
      showToast(`Error: ${error.message}`);
    }
  };

  const toggleUserStatus = async (userId) => {
    const previousUsers = [...users];
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;

    const newStatus = targetUser.isActive !== false ? false : true;

    setUsers(
      users.map((u) => (u.id === userId ? { ...u, isActive: newStatus } : u)),
    );
    if (targetStudent?.id === userId) {
      setTargetStudent({ ...targetStudent, isActive: newStatus });
    }

    showToast(`User status updated to: ${newStatus ? "ACTIVE" : "INACTIVE"}`);

    try {
      await updateUser(userId, { isActive: newStatus });
    } catch (error) {
      setUsers(previousUsers);
      if (targetStudent?.id === userId) {
        setTargetStudent(targetUser);
      }
      showToast(`Status update reverted: ${error.message}`);
    }
  };

  const deleteUser = async (userId) => {
    const previousUsers = [...users];

    setUsers(users.filter((u) => u.id !== userId));
    if (targetStudent?.id === userId) {
      setTargetStudent(null);
    }
    showToast("User deleted successfully");

    try {
      await apiDeleteUser(userId);
    } catch (error) {
      setUsers(previousUsers);
      showToast(`Error: ${error.message}`);
    }
  };

  const handleSimulateExport = (type) => {
    showToast(`Document [${type}] generated and downloaded in PDF/CSV!`);
  };

  const studentUsers = users.filter((u) => {
    const role = (u.role || "").toUpperCase();
    if (role !== "STUDENT" && role !== "ANCIEN") return false;
    if (selectedStudentFilter === "tout") return true;
    if (selectedStudentFilter === "ancien") return role === "ANCIEN";
    return (
      (u.classGroup || "").toUpperCase() === selectedStudentFilter.toUpperCase()
    );
  });

  const staffUsers = users.filter((u) => {
    const role = (u.role || "").toUpperCase();
    return ["TEACHER", "ADMIN", "SECRETARY", "PROF", "SECRETAIRE"].includes(
      role,
    );
  });

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
            onUpdateUser={handleUpdateUser}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onSelectAnnouncementToEdit={setFormState}
            onDeleteSubject={handleDeleteSubject}
            setFormState={setFormState}
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
        onSubmit={handleFormSubmitAnnouncement}
        formState={formState}
        setFormState={setFormState}
      />
      <SubjectModal
        isOpen={activeModal === "subject"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleFormSubmitSubject}
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
