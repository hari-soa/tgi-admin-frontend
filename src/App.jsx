import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import AppRouter from "./pages/AppRouter";
import Toast from "./components/common/Toast";
import Login from "./components/auth/Login";
import {
  ErrorBanner,
  ErrorPanel,
  LoadingPanel,
  getDisplayedErrorMessage,
} from "./components/common/ResourceStatus";

import UserModal from "./components/modals/UserModal";
import AnnouncementModal from "./components/modals/AnnouncementModal";
import SubjectModal from "./components/modals/SubjectModal";
import GradeSessionModal from "./components/modals/GradeSessionModal";
import AttendanceModal from "./components/modals/AttendanceModal";
import HistoryRemarkModal from "./components/modals/HistoryRemarkModal";

import { ConnectionError } from "./services/api";
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
  reviseGradeSession,
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
  sortStudentsByClassAndMatricule,
  toUserUpdatePayload,
} from "./utils/helpers";
import {
  RESOURCE_STATUS,
  notifyDataChanged,
  useLiveResource,
} from "./utils/useLiveResource";
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
const STAFF_ROLES = ["ADMIN", "SECRETARY"];
const EMPTY_STUDENT_RECORDS = { history: [], remarks: [], results: [] };

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionStatus, setSessionStatus] = useState(RESOURCE_STATUS.LOADING);
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || DEFAULT_TAB,
  );

  const [attendanceDate, setAttendanceDate] = useState(getTodayIsoDate());
  const [selectedStudentFilter, setSelectedStudentFilter] = useState("all");
  const [targetStudentId, setTargetStudentId] = useState(null);
  const [activeGradeSession, setActiveGradeSession] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [formState, setFormState] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const userRole = currentUser?.role || "";
  const isAdmin = userRole === "ADMIN";
  const isStaff = STAFF_ROLES.includes(userRole);
  const isLoggedIn = Boolean(currentUser);

  const usersResource = useLiveResource(getAllUsers, {
    initialValue: [],
    enabled: isLoggedIn && isStaff,
  });
  const staffResource = useLiveResource(getStaffUsers, {
    initialValue: [],
    enabled: isLoggedIn,
  });
  const subjectsResource = useLiveResource(getAllSubjects, {
    initialValue: [],
    enabled: isLoggedIn,
  });
  const announcementsResource = useLiveResource(getAllAnnouncements, {
    initialValue: [],
    enabled: isLoggedIn,
  });
  const gradeSessionsResource = useLiveResource(getGradeSessions, {
    initialValue: [],
    enabled: isLoggedIn && isStaff,
  });

  const users = usersResource.data;
  const staffUsers = staffResource.data;
  const targetStudent =
    users.find((user) => user.id === targetStudentId) || null;
  const setTargetStudent = (student) => setTargetStudentId(student?.id ?? null);
  const viewedStudent = userRole === "STUDENT" ? currentUser : targetStudent;

  const attendanceResource = useLiveResource(
    async () => {
      const dayOfWeek = getDayOfWeek(attendanceDate);
      return dayOfWeek ? getDailyAttendance(dayOfWeek, attendanceDate) : [];
    },
    {
      initialValue: [],
      enabled: isLoggedIn && isAdmin,
      dependencies: [attendanceDate],
    },
  );

  const studentRecordsResource = useLiveResource(
    async () => {
      const [history, remarks, results] = await Promise.all([
        getStudentHistory(viewedStudent.id),
        getStudentRemarks(viewedStudent.id),
        getStudentResults(viewedStudent.id),
      ]);
      return { history, remarks, results };
    },
    {
      initialValue: EMPTY_STUDENT_RECORDS,
      enabled: isLoggedIn && Boolean(viewedStudent),
      dependencies: [viewedStudent?.id],
    },
  );

  const resources = [
    usersResource,
    staffResource,
    subjectsResource,
    announcementsResource,
    gradeSessionsResource,
    attendanceResource,
    studentRecordsResource,
  ];
  const isLoadingData = resources.some(
    (resource) => resource.status === RESOURCE_STATUS.LOADING,
  );
  const failedResource = resources.find(
    (resource) => resource.status === RESOURCE_STATUS.ERROR,
  );
  const reloadEverything = () =>
    resources.forEach((resource) => resource.reload());

  const announcements = announcementsResource.data;
  const subjects = subjectsResource.data;
  const gradeSessions = gradeSessionsResource.data;
  const attendanceCards = attendanceResource.data;
  const historyRecords = studentRecordsResource.data.history;
  const remarks = studentRecordsResource.data.remarks;
  const annualResults = studentRecordsResource.data.results;

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

  const restoreSession = useCallback(async () => {
    setSessionStatus(RESOURCE_STATUS.LOADING);

    if (!localStorage.getItem("token")) {
      setSessionStatus(RESOURCE_STATUS.READY);
      return;
    }

    try {
      setCurrentUser(await getCurrentUserProfile());
    } catch (error) {
      if (error instanceof ConnectionError) {
        setSessionStatus(RESOURCE_STATUS.ERROR);
        return;
      }
      logoutUser();
    }
    setSessionStatus(RESOURCE_STATUS.READY);
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const runAction = async (action, successMessage) => {
    try {
      await action();
      notifyDataChanged();
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
    setTargetStudentId(null);
    setActiveTab(DEFAULT_TAB);
    showToast("Déconnexion réussie");
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    const role = formState.role || "STUDENT";
    const basePayload = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      matricule: formState.matricule,
      gender: formState.gender || "MALE",
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
    }, "Utilisateur créé avec succès");

    if (succeeded) closeModal();
  };

  const handleUpdateUser = async (userId, userData) => {
    await runAction(async () => {
      const updatedUser = await updateUser(
        userId,
        toUserUpdatePayload(userData),
      );
      if (currentUser.id === userId) setCurrentUser(updatedUser);
    }, "Profil mis à jour avec succès");
  };

  const toggleUserStatus = async (userId) => {
    const user = users.find((candidate) => candidate.id === userId);
    if (!user) return;
    const newStatus = user.isActive === false;

    await runAction(
      async () => {
        await updateUser(userId, { isActive: newStatus });
      },
      newStatus ? "Compte réactivé" : "Compte désactivé",
    );
  };

  const deleteUser = async (userId) => {
    await runAction(async () => {
      await deleteUserOnServer(userId);
      if (targetStudentId === userId) setTargetStudentId(null);
    }, "Utilisateur supprimé avec succès");
  };

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
    }, "Annonce supprimée avec succès");
  };

  const handleSubmitSubject = async (event) => {
    event.preventDefault();
    const payload = {
      name: formState.name,
      coefficient: Number(formState.coefficient),
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
      },
      isEdition ? "Matière modifiée avec succès" : "Matière créée avec succès",
    );

    if (succeeded) closeModal();
  };

  const handleDeleteSubject = async (subjectId) => {
    await runAction(async () => {
      await deleteSubjectOnServer(subjectId);
    }, "Matière supprimée avec succès");
  };

  const handleCreateGradeSession = async (event) => {
    event.preventDefault();
    const succeeded = await runAction(async () => {
      await createGradeSession({
        classGroup: formState.classGroup,
        subjectId: formState.subjectId,
        examType: formState.examType || "TRIMESTER",
        term: formState.term || "FIRST_TRIMESTER",
      });
    }, "Session de notes créée avec succès");

    if (succeeded) closeModal();
  };

  const handleSaveDraft = async (sessionId, grades) => {
    await runAction(async () => {
      await saveGradeSessionDraft(sessionId, grades);
    }, "Brouillon enregistré");
  };

  const handleSubmitSession = async (sessionId, grades) => {
    const succeeded = await runAction(async () => {
      await submitGradeSession(sessionId, grades);
    }, "Notes soumises à l'administrateur avec succès");

    if (succeeded) setActiveGradeSession(null);
  };

  const handleReviseSession = async (sessionId, grades, absences) =>
    runAction(async () => {
      await reviseGradeSession(sessionId, grades, absences);
    }, "Notes corrigées avec succès");

  const handleValidateSession = async (sessionId) => {
    await runAction(async () => {
      await validateGradeSession(sessionId);
    }, "Session validée : les notes sont publiées dans les bulletins");
  };

  const handleExportReportCard = async (resultId) => {
    await runAction(async () => {
      window.open(await exportResultPdf(resultId), "_blank", "noopener");
    });
  };

  const handleSubmitSlot = async (event) => {
    event.preventDefault();
    const payload = {
      teacherId: formState.teacherId,
      subjectId: formState.subjectId,
      targetClass: formState.targetClass || "SECONDE",
      dayOfWeek: formState.dayOfWeek || "MONDAY",
      startTime: formState.startTime || DEFAULT_SLOT_START,
      endTime: formState.endTime || DEFAULT_SLOT_END,
    };
    const isEdition = Boolean(formState.id);

    const succeeded = await runAction(
      async () => {
        if (isEdition) {
          await updateAttendanceSlot(formState.id, payload);
        } else {
          await createAttendanceSlot(payload);
        }
      },
      isEdition ? "Créneau modifié avec succès" : "Créneau créé avec succès",
    );

    if (succeeded) closeModal();
  };

  const handleDeleteSlot = async (slotId) => {
    await runAction(async () => {
      await deleteAttendanceSlot(slotId);
    }, "Créneau supprimé avec succès");
  };

  const handleCheckAttendance = async (slotId, date) => {
    await runAction(async () => {
      await checkAttendance(slotId, date);
    }, "Présence enregistrée");
  };

  const handleMarkAbsence = async (slotId, date, motif) => {
    await runAction(async () => {
      await markAbsence(slotId, date, motif);
    }, "Absence enregistrée");
  };

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
    }, "Remarque ajoutée au dossier de l'élève");

    if (succeeded) closeModal();
  };

  const studentUsers = sortStudentsByClassAndMatricule(
    users.filter((user) => {
      if (user.role !== "STUDENT") return false;
      if (selectedStudentFilter === "all") return true;
      return user.classGroup === selectedStudentFilter;
    }),
  );

  if (sessionStatus === RESOURCE_STATUS.LOADING) {
    return (
      <div className={LOADING_SCREEN}>
        <div className={LOADING_CONTENT}>
          <div className={LOADING_SPINNER}></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (sessionStatus === RESOURCE_STATUS.ERROR) {
    return (
      <div className={LOADING_SCREEN}>
        <ErrorPanel
          message={getDisplayedErrorMessage(new ConnectionError().message)}
          onRetry={restoreSession}
        />
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
          {isLoadingData ? (
            <LoadingPanel />
          ) : (
            <>
              {failedResource && (
                <ErrorBanner
                  message={getDisplayedErrorMessage(failedResource.errorMessage)}
                  onRetry={reloadEverything}
                />
              )}
              {failedResource && !failedResource.hasData ? null : (
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
            onReviseSession={handleReviseSession}
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
              )}
            </>
          )}
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
