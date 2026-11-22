import StudentHome from "./student/StudentHome";
import StudentGrades from "./student/StudentGrades";
import StudentHistory from "./student/StudentHistory";
import SecretaryDashboard from "./secretary/SecretaryDashboard";
import SecretaryGrades from "./secretary/SecretaryGrades";
import AdminDashboard from "./admin/AdminDashboard";
import AdminStudents from "./admin/AdminStudents";
import AdminAttendance from "./admin/AdminAttendance";
import StaffList from "./shared/StaffList";
import Announcements from "./shared/Announcements";
import Profile from "./shared/Profile";
import { NOT_FOUND_VIEW } from "../styles/AppStyles";

const AppRouter = ({
  currentUser,
  activeTab,
  setActiveTab,
  users,
  studentUsers,
  staffUsers,
  announcements,
  subjects,
  annualResults,
  gradeSessions,
  historyRecords,
  remarks,
  attendanceCards,
  attendanceDate,
  onAttendanceDateChange,
  selectedStudentFilter,
  setSelectedStudentFilter,
  targetStudent,
  setTargetStudent,
  activeGradeSession,
  setActiveGradeSession,
  setActiveModal,
  setFormState,
  onValidateSession,
  onReviseSession,
  onSaveDraft,
  onSubmitSession,
  onExportReportCard,
  onCheckAttendance,
  onMarkAbsence,
  onDeleteSlot,
  toggleUserStatus,
  deleteUser,
  onUpdateUser,
  onDeleteAnnouncement,
  onDeleteSubject,
}) => {
  const userRole = currentUser?.role || "";
  const isAdmin = userRole === "ADMIN";
  const isSecretary = userRole === "SECRETARY";
  const isStudent = userRole === "STUDENT";

  if (activeTab === "profile") {
    return (
      <Profile
        currentUser={currentUser}
        onUpdateUser={onUpdateUser}
        isAdmin={isAdmin}
      />
    );
  }

  if (activeTab === "announcements") {
    return (
      <Announcements
        currentUser={currentUser}
        announcements={announcements}
        setActiveModal={setActiveModal}
        onDeleteAnnouncement={onDeleteAnnouncement}
        setFormState={setFormState}
      />
    );
  }

  if (activeTab === "staff") {
    return (
      <StaffList
        staffUsers={staffUsers}
        deleteUser={deleteUser}
        onUpdateUser={onUpdateUser}
        isAdmin={isAdmin}
      />
    );
  }

  if (isStudent) {
    if (activeTab === "home") {
      return (
        <StudentHome
          currentUser={currentUser}
          announcements={announcements}
          historyRecords={historyRecords}
          remarks={remarks}
          annualResults={annualResults}
          setActiveTab={setActiveTab}
        />
      );
    }

    if (activeTab === "grades") {
      return (
        <StudentGrades
          student={currentUser}
          annualResults={annualResults}
          onExportReportCard={onExportReportCard}
        />
      );
    }

    if (activeTab === "history") {
      return (
        <StudentHistory
          student={currentUser}
          historyRecords={historyRecords}
          remarks={remarks}
        />
      );
    }
  }

  if (isSecretary) {
    if (activeTab === "dashboard") {
      return (
        <SecretaryDashboard
          gradeSessions={gradeSessions}
          setActiveGradeSession={setActiveGradeSession}
          setActiveTab={setActiveTab}
        />
      );
    }
    if (activeTab === "grade-sessions") {
      return (
        <SecretaryGrades
          users={users}
          gradeSessions={gradeSessions}
          activeGradeSession={activeGradeSession}
          setActiveGradeSession={setActiveGradeSession}
          onSaveDraft={onSaveDraft}
          onSubmitSession={onSubmitSession}
        />
      );
    }
  }

  if (isAdmin) {
    if (activeTab === "dashboard") {
      return (
        <AdminDashboard
          currentUser={currentUser}
          users={users}
          subjects={subjects}
          gradeSessions={gradeSessions}
          announcements={announcements}
          setActiveModal={setActiveModal}
          setFormState={setFormState}
          onDeleteSubject={onDeleteSubject}
          onValidateSession={onValidateSession}
          onReviseSession={onReviseSession}
        />
      );
    }

    if (activeTab === "students") {
      return (
        <AdminStudents
          studentUsers={studentUsers}
          selectedStudentFilter={selectedStudentFilter}
          setSelectedStudentFilter={setSelectedStudentFilter}
          targetStudent={targetStudent}
          setTargetStudent={setTargetStudent}
          setActiveModal={setActiveModal}
          setFormState={setFormState}
          toggleUserStatus={toggleUserStatus}
          deleteUser={deleteUser}
          onUpdateUser={onUpdateUser}
          historyRecords={historyRecords}
          remarks={remarks}
          annualResults={annualResults}
          onExportReportCard={onExportReportCard}
        />
      );
    }

    if (activeTab === "attendance") {
      return (
        <AdminAttendance
          attendanceCards={attendanceCards}
          attendanceDate={attendanceDate}
          onAttendanceDateChange={onAttendanceDateChange}
          onCheckAttendance={onCheckAttendance}
          onMarkAbsence={onMarkAbsence}
          onDeleteSlot={onDeleteSlot}
          setActiveModal={setActiveModal}
          setFormState={setFormState}
        />
      );
    }
  }

  return <div className={NOT_FOUND_VIEW}>Page introuvable.</div>;
};

export default AppRouter;
