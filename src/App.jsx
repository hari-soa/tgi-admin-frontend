import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import AppRouter from "./pages/AppRouter";
import Toast from "./components/common/Toast";
import Login from "./components/auth/Login";

import UserModal from "./components/modals/UserModal";
import AnnouncementModal from "./components/modals/AnnouncementModal";
import SubjectModal from "./components/modals/SubjectModal";
import GradeSessionModal from "./components/modals/GradeSessionModal";
import AttendanceModal from "./components/modals/AttendanceModal";
import HistoryRemarkModal from "./components/modals/HistoryRemarkModal";

import { getCurrentUserProfile, logoutUser } from "./services/authService";
import {
  getAllUsers,
  getStaffUsers,
  createUser,
  updateUser,
  deleteUser as deleteUserOnServer,
} from "./services/userService";
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject as deleteSubjectOnServer,
} from "./services/subjectService";
import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement as deleteAnnouncementOnServer,
} from "./services/announcementService";
import {
  getGradeSessions,
  createGradeSession,
  saveGradeSessionDraft,
  submitGradeSession,
  validateGradeSession,
  getStudentResults,
  exportResultPdf,
} from "./services/gradeService";
import {
  getDailyAttendance,
  createAttendanceSlot,
  updateAttendanceSlot,
  deleteAttendanceSlot,
  checkAttendance,
  markAbsence,
} from "./services/attendanceService";
import {
  getStudentHistory,
  getStudentRemarks,
  createHistoryRecord,
  createRemark,
} from "./services/disciplinaryService";
import {
  getTodayIsoDate,
  getDayOfWeek,
  omitEmptyValues,
  toUserUpdatePayload,
} from "./utils/helpers";
import {
  APP_LAYOUT,
  APP_CONTENT,
  APP_MAIN,
  LOADING_SCREEN,
  LOADING_CONTENT,
  LOADING_SPINNER,
} from "./styles/AppStyles";

const TOAST_DURATION_MS = 4000;
const DEFAULT_TAB = "dashboard";
const DEFAULT_SLOT_START = "08:00";
const DEFAULT_SLOT_END = "10:00";
const STAFF_ROLES_WITH_GRADE_SESSIONS = ["ADMIN", "SECRETARY"];

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || DEFAULT_TAB,
  );

  const [users, setUsers] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [gradeSessions, setGradeSessions] = useState([]);
  const [attendanceCards, setAttendanceCards] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(getTodayIsoDate());

  const [historyRecords, setHistoryRecords] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [annualResults, setAnnualResults] = useState([]);

  const [selectedStudentFilter, setSelectedStudentFilter] = useState("all");
  const [targetStudent, setTargetStudent] = useState(null);
  const [activeGradeSession, setActiveGradeSession] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [formState, setFormState] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const userRole = currentUser?.role || "";
  const isAdmin = userRole === "ADMIN";

  // The student whose grades, history and remarks are displayed: the student
  // themself, or the one selected by an administrator or a secretary.
  const viewedStudent = userRole === "STUDENT" ? currentUser : targetStudent;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), TOAST_DURATION_MS);
  };

  const closeModal = () => {
    setActiveModal(null);
    setFormState({});
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const restoreSession = async () => {
      if (localStorage.getItem("token")) {
        try {
          setCurrentUser(await getCurrentUserProfile());
        } catch {
          logoutUser();
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  const refreshDirectory = useCallback(async () => {
    const canListUsers = STAFF_ROLES_WITH_GRADE_SESSIONS.includes(userRole);
    const [usersData, staffData] = await Promise.all([
      canListUsers ? getAllUsers() : Promise.resolve([]),
      getStaffUsers(),
    ]);
    setUsers(usersData);
    setStaffUsers(staffData);
  }, [userRole]);

  const refreshGradeSessions = useCallback(async () => {
    if (STAFF_ROLES_WITH_GRADE_SESSIONS.includes(userRole)) {
      setGradeSessions(await getGradeSessions());
    }
  }, [userRole]);

  useEffect(() => {
    if (!currentUser) return;

    const loadSharedData = async () => {
      try {
        const [subjectsData, announcementsData] = await Promise.all([
          getAllSubjects(),
          getAllAnnouncements(),
        ]);
        await Promise.all([refreshDirectory(), refreshGradeSessions()]);
        setSubjects(subjectsData);
        setAnnouncements(announcementsData);
      } catch (error) {
        showToast(`Erreur de chargement des données : ${error.message}`);
      }
    };

    loadSharedData();
  }, [currentUser, refreshDirectory, refreshGradeSessions]);

  const refreshAttendance = useCallback(async () => {
    const dayOfWeek = getDayOfWeek(attendanceDate);
    setAttendanceCards(
      dayOfWeek ? await getDailyAttendance(dayOfWeek, attendanceDate) : [],
    );
  }, [attendanceDate]);

  useEffect(() => {
    if (!isAdmin) return;
    refreshAttendance().catch((error) =>
      showToast(`Erreur de chargement du pointage : ${error.message}`),
    );
  }, [isAdmin, refreshAttendance]);

  const refreshStudentRecords = useCallback(async () => {
    if (!viewedStudent) {
      setHistoryRecords([]);
      setRemarks([]);
      setAnnualResults([]);
      return;
    }

    const [historyData, remarksData, resultsData] = await Promise.all([
      getStudentHistory(viewedStudent.id),
      getStudentRemarks(viewedStudent.id),
      getStudentResults(viewedStudent.id),
    ]);
    setHistoryRecords(historyData);
    setRemarks(remarksData);
    setAnnualResults(resultsData);
  }, [viewedStudent?.id]);

  useEffect(() => {
    refreshStudentRecords().catch((error) =>
      showToast(`Erreur de chargement du dossier élève : ${error.message}`),
    );
  }, [refreshStudentRecords]);

  /** Runs a server action, refreshes the data it changed, and reports the outcome. */
  const runAction = async (action, successMessage) => {
    try {
      await action();
      if (successMessage) showToast(successMessage);
      return true;
    } catch (error) {
      showToast(`Erreur : ${error.message}`);
      return false;
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setTargetStudent(null);
    setActiveTab(DEFAULT_TAB);
    showToast("Déconnexion réussie");
  };

  // ---------- Users ----------

  const handleCreateUser = async (event) => {
    event.preventDefault();
    const role = formState.role || "STUDENT";
    const basePayload = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      matricule: formState.matricule,
      gender: formState.gender || "MALE",
      email: formState.email,
      contactNumber: formState.contactNumber,
    };
    const rolePayloads = {
      STUDENT: {
        classRollNumber: Number(formState.classRollNumber),
        classGroup: formState.classGroup || "SECONDE",
      },
      TEACHER: { homeroomClass: formState.homeroomClass },
      SECRETARY: { department: formState.department },
      ADMIN: {},
    };

    const succeeded = await runAction(async () => {
      await createUser(
        role,
        omitEmptyValues({ ...basePayload, ...rolePayloads[role] }),
      );
      await refreshDirectory();
    }, "Utilisateur créé avec succès");

    if (succeeded) closeModal();
  };

  const handleUpdateUser = async (userId, userData) => {
    await runAction(async () => {
      const updatedUser = await updateUser(
        userId,
        toUserUpdatePayload(userData),
      );
      await refreshDirectory();
      if (currentUser.id === userId) setCurrentUser(updatedUser);
      if (targetStudent?.id === userId) setTargetStudent(updatedUser);
    }, "Profil mis à jour avec succès");
  };

  const toggleUserStatus = async (userId) => {
    const user = users.find((candidate) => candidate.id === userId);
    if (!user) return;
    const newStatus = user.isActive === false;

    await runAction(
      async () => {
        const updatedUser = await updateUser(userId, { isActive: newStatus });
        await refreshDirectory();
        if (targetStudent?.id === userId) setTargetStudent(updatedUser);
      },
      newStatus ? "Compte réactivé" : "Compte désactivé",
    );
  };

  const deleteUser = async (userId) => {
    await runAction(async () => {
      await deleteUserOnServer(userId);
      await refreshDirectory();
      if (targetStudent?.id === userId) setTargetStudent(null);
    }, "Utilisateur supprimé avec succès");
  };

  // ---------- Announcements ----------

  const handleSubmitAnnouncement = async (event) => {
    event.preventDefault();
    const payload = {
      title: formState.title,
      content: formState.content,
      targetScope: formState.targetScope || "ALL",
      priority: formState.priority || "NORMAL",
      targetClasses:
        formState.targetScope === "CLASS" ? formState.targetClasses : undefined,
    };
    const isEdition = Boolean(formState.id);

    const succeeded = await runAction(
      async () => {
        if (isEdition) {
          await updateAnnouncement(formState.id, payload);
        } else {
          await createAnnouncement(payload);
        }
        setAnnouncements(await getAllAnnouncements());
      },
      isEdition
        ? "Annonce modifiée avec succès"
        : "Annonce publiée avec succès",
    );

    if (succeeded) closeModal();
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    await runAction(async () => {
      await deleteAnnouncementOnServer(announcementId);
      setAnnouncements(await getAllAnnouncements());
    }, "Annonce supprimée avec succès");
  };

  // ---------- Subjects ----------

  const handleSubmitSubject = async (event) => {
    event.preventDefault();
    const payload = {
      name: formState.name,
      coefficient: Number(formState.coefficient),
      description: formState.description || undefined,
      assignments: [
        {
          classGroup: formState.classGroup || "SECONDE",
          teacherId: formState.teacherId,
        },
      ],
    };
    const isEdition = Boolean(formState.id);

    const succeeded = await runAction(
      async () => {
        if (isEdition) {
          await updateSubject(formState.id, payload);
        } else {
          await createSubject(payload);
        }
        setSubjects(await getAllSubjects());
      },
      isEdition ? "Matière modifiée avec succès" : "Matière créée avec succès",
    );

    if (succeeded) closeModal();
  };

  const handleDeleteSubject = async (subjectId) => {
    await runAction(async () => {
      await deleteSubjectOnServer(subjectId);
      setSubjects(await getAllSubjects());
    }, "Matière supprimée avec succès");
  };

  // ---------- Grade sessions ----------

  const handleCreateGradeSession = async (event) => {
    event.preventDefault();
    const succeeded = await runAction(async () => {
      await createGradeSession({
        classGroup: formState.classGroup,
        subjectId: formState.subjectId,
        examType: formState.examType || "TRIMESTER",
        term: formState.term || "FIRST_TRIMESTER",
      });
      await refreshGradeSessions();
    }, "Session de notes créée avec succès");

    if (succeeded) closeModal();
  };

  const handleSaveDraft = async (sessionId, grades) => {
    await runAction(async () => {
      await saveGradeSessionDraft(sessionId, grades);
      await refreshGradeSessions();
    }, "Brouillon enregistré");
  };

  const handleSubmitSession = async (sessionId, grades) => {
    const succeeded = await runAction(async () => {
      await submitGradeSession(sessionId, grades);
      await refreshGradeSessions();
    }, "Notes soumises à l'administrateur avec succès");

    if (succeeded) setActiveGradeSession(null);
  };

  const handleValidateSession = async (sessionId) => {
    await runAction(async () => {
      await validateGradeSession(sessionId);
      await Promise.all([refreshGradeSessions(), refreshStudentRecords()]);
    }, "Session validée : les notes sont publiées dans les bulletins");
  };

  const handleExportReportCard = async (resultId) => {
    await runAction(async () => {
      window.open(await exportResultPdf(resultId), "_blank", "noopener");
    });
  };

  // ---------- Teacher attendance ----------

  const handleSubmitSlot = async (event) => {
    event.preventDefault();
    const payload = {
      teacherId: formState.teacherId,
      subjectId: formState.subjectId,
      targetClass: formState.targetClass || "SECONDE",
      dayOfWeek: formState.dayOfWeek || "MONDAY",
      startTime: formState.startTime || DEFAULT_SLOT_START,
      endTime: formState.endTime || DEFAULT_SLOT_END,
      classroom: formState.classroom,
    };
    const isEdition = Boolean(formState.id);

    const succeeded = await runAction(
      async () => {
        if (isEdition) {
          await updateAttendanceSlot(formState.id, payload);
        } else {
          await createAttendanceSlot(payload);
        }
        await refreshAttendance();
      },
      isEdition ? "Créneau modifié avec succès" : "Créneau créé avec succès",
    );

    if (succeeded) closeModal();
  };

  const handleDeleteSlot = async (slotId) => {
    await runAction(async () => {
      await deleteAttendanceSlot(slotId);
      await refreshAttendance();
    }, "Créneau supprimé avec succès");
  };

  const handleCheckAttendance = async (slotId, date) => {
    await runAction(async () => {
      await checkAttendance(slotId, date);
      await refreshAttendance();
    }, "Présence enregistrée");
  };

  const handleMarkAbsence = async (slotId, date, motif) => {
    await runAction(async () => {
      await markAbsence(slotId, date, motif);
      await refreshAttendance();
    }, "Absence enregistrée");
  };

  // ---------- History and remarks of the selected student ----------

  const handleAddHistoryRecord = async (event) => {
    event.preventDefault();
    const succeeded = await runAction(async () => {
      await createHistoryRecord({
        studentId: targetStudent.id,
        type: formState.type || "ABSENCE",
        startDate: formState.startDate,
        endDate: formState.endDate || formState.startDate,
        reason: formState.reason,
      });
      await refreshStudentRecords();
    }, "Événement ajouté au dossier de l'élève");

    if (succeeded) closeModal();
  };

  const handleAddRemark = async (event) => {
    event.preventDefault();
    const succeeded = await runAction(async () => {
      await createRemark({
        studentId: targetStudent.id,
        category: formState.category || "BEHAVIOR",
        content: formState.content,
      });
      await refreshStudentRecords();
    }, "Remarque ajoutée au dossier de l'élève");

    if (succeeded) closeModal();
  };

  const studentUsers = users.filter((user) => {
    if (user.role !== "STUDENT") return false;
    if (selectedStudentFilter === "all") return true;
    return user.classGroup === selectedStudentFilter;
  });

  if (loading) {
    return (
      <div className={LOADING_SCREEN}>
        <div className={LOADING_CONTENT}>
          <div className={LOADING_SPINNER}></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <>
        <Login
          setCurrentUser={(user) => {
            setCurrentUser(user);
            setActiveTab(DEFAULT_TAB);
          }}
          showToast={showToast}
        />
        <Toast message={toastMessage} />
      </>
    );
  }

  return (
    <div className={APP_LAYOUT}>
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setTargetStudent={setTargetStudent}
        handleLogout={handleLogout}
      />

      <Topbar currentUser={currentUser} activeTab={activeTab} />

      <div className={APP_CONTENT}>
        <main className={APP_MAIN}>
          <AppRouter
            currentUser={currentUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            users={users}
            studentUsers={studentUsers}
            staffUsers={staffUsers}
            announcements={announcements}
            subjects={subjects}
            annualResults={annualResults}
            gradeSessions={gradeSessions}
            historyRecords={historyRecords}
            remarks={remarks}
            attendanceCards={attendanceCards}
            attendanceDate={attendanceDate}
            onAttendanceDateChange={setAttendanceDate}
            selectedStudentFilter={selectedStudentFilter}
            setSelectedStudentFilter={setSelectedStudentFilter}
            targetStudent={targetStudent}
            setTargetStudent={setTargetStudent}
            activeGradeSession={activeGradeSession}
            setActiveGradeSession={setActiveGradeSession}
            setActiveModal={setActiveModal}
            setFormState={setFormState}
            onValidateSession={handleValidateSession}
            onSaveDraft={handleSaveDraft}
            onSubmitSession={handleSubmitSession}
            onExportReportCard={handleExportReportCard}
            onCheckAttendance={handleCheckAttendance}
            onMarkAbsence={handleMarkAbsence}
            onDeleteSlot={handleDeleteSlot}
            toggleUserStatus={toggleUserStatus}
            deleteUser={deleteUser}
            onUpdateUser={handleUpdateUser}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onDeleteSubject={handleDeleteSubject}
          />
        </main>
      </div>

      <UserModal
        isOpen={activeModal === "user"}
        onClose={closeModal}
        onSubmit={handleCreateUser}
        formState={formState}
        setFormState={setFormState}
      />
      <AnnouncementModal
        isOpen={activeModal === "announcement"}
        onClose={closeModal}
        onSubmit={handleSubmitAnnouncement}
        formState={formState}
        setFormState={setFormState}
      />
      <SubjectModal
        isOpen={activeModal === "subject"}
        onClose={closeModal}
        onSubmit={handleSubmitSubject}
        formState={formState}
        setFormState={setFormState}
        staffUsers={staffUsers}
      />
      <GradeSessionModal
        isOpen={activeModal === "grade_session"}
        onClose={closeModal}
        onSubmit={handleCreateGradeSession}
        formState={formState}
        setFormState={setFormState}
        subjects={subjects}
      />
      <AttendanceModal
        isOpen={activeModal === "attendance"}
        onClose={closeModal}
        onSubmit={handleSubmitSlot}
        formState={formState}
        setFormState={setFormState}
        staffUsers={staffUsers}
        subjects={subjects}
      />
      <HistoryRemarkModal
        isOpen={
          activeModal === "target_history" || activeModal === "target_remark"
        }
        onClose={closeModal}
        type={activeModal}
        onSubmit={
          activeModal === "target_history"
            ? handleAddHistoryRecord
            : handleAddRemark
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
