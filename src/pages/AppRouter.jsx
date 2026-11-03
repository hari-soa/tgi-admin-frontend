import StudentHome from "./student/StudentHome";
import StudentGrades from "./student/StudentGrades";
import StudentHistory from "./student/StudentHistory";
import SecretaryDashboard from "./secretary/SecretaryDashboard";
import SecretaryGrades from "./secretary/SecretaryGrades";
import AdminDashboard from "./admin/AdminDashboard";
import AdminStudents from "./admin/AdminStudents";
import AdminPointage from "./admin/AdminPointage";
import StaffList from "./shared/StaffList";
import Announcements from "./shared/Announcements";
import Profile from "./shared/Profile";

const AppRouter = ({
  currentUser,
  activeTab,
  setActiveTab,
  users,
  studentUsers,
  staffUsers,
  announcements,
  subjects,
  examResults,
  gradeSessions,
  historiques,
  remarques,
  pointages,
  selectedStudentFilter,
  setSelectedStudentFilter,
  targetStudent,
  setTargetStudent,
  activeGradeSession,
  setActiveGradeSession,
  setActiveModal,
  handleAdminValidateSession,
  toggleUserStatus,
  deleteUser,
  handleSecretarySaveDraft,
  handleSecretarySubmitToAdmin,
  handleTogglePointage,
  handleSimulateExport,
  setCurrentUser,
  onUpdateUser,
  onDeleteAnnouncement,
  onSelectAnnouncementToEdit,
  setFormState,
  onDeleteSubject,
  onDeleteSlot,
}) => {
  const userRole = currentUser?.role?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN";

  if (activeTab === "profil") {
    return (
      <Profile
        currentUser={targetStudent || currentUser}
        onUpdateUser={onUpdateUser}
        isAdmin={isAdmin}
        isThirdPartyView={
          !!targetStudent && targetStudent.id !== currentUser.id
        }
      />
    );
  }

  if (activeTab === "annonces") {
    return (
      <Announcements
        currentUser={currentUser}
        announcements={announcements}
        setActiveModal={setActiveModal}
        onDeleteAnnouncement={onDeleteAnnouncement}
        onSelectAnnouncementToEdit={onSelectAnnouncementToEdit}
      />
    );
  }

  if (activeTab === "pointage") {
    return (
      <AdminPointage
        currentUser={currentUser}
        pointages={pointages}
        handleTogglePointage={handleTogglePointage}
        setActiveModal={setActiveModal}
        setFormState={setFormState}
        onDeleteSlot={onDeleteSlot}
      />
    );
  }
  if (activeTab === "personnel") {
    return (
      <StaffList
        staffUsers={staffUsers}
        targetStudent={targetStudent}
        setTargetStudent={setTargetStudent}
        deleteUser={deleteUser}
        onUpdateUser={onUpdateUser}
        isAdmin={isAdmin}
        setActiveTab={setActiveTab}
      />
    );
  }

  if (userRole === "STUDENT" || userRole === "ANCIEN") {
    if (activeTab === "accueil") {
      return (
        <StudentHome
          currentUser={currentUser}
          announcements={announcements}
          historiques={historiques}
          remarques={remarques}
          setActiveTab={setActiveTab}
        />
      );
    }
    if (activeTab === "notes") {
      return (
        <StudentGrades
          currentUser={currentUser}
          examResults={examResults}
          handleSimulateExport={handleSimulateExport}
        />
      );
    }
    if (activeTab === "historique_remarque") {
      return (
        <StudentHistory
          currentUser={currentUser}
          historiques={historiques}
          remarques={remarques}
        />
      );
    }
  }

  if (userRole === "SECRETARY" || userRole === "SECRETAIRE") {
    if (activeTab === "dashboard") {
      return (
        <SecretaryDashboard
          gradeSessions={gradeSessions}
          setActiveGradeSession={setActiveGradeSession}
          setActiveTab={setActiveTab}
        />
      );
    }
    if (activeTab === "notes_secr") {
      return (
        <SecretaryGrades
          users={users}
          gradeSessions={gradeSessions}
          activeGradeSession={activeGradeSession}
          setActiveGradeSession={setActiveGradeSession}
          handleSecretarySaveDraft={handleSecretarySaveDraft}
          handleSecretarySubmitToAdmin={handleSecretarySubmitToAdmin}
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
          handleAdminValidateSession={handleAdminValidateSession}
        />
      );
    }

    if (activeTab === "etudiants") {
      return (
        <AdminStudents
          studentUsers={studentUsers}
          selectedStudentFilter={selectedStudentFilter}
          setSelectedStudentFilter={setSelectedStudentFilter}
          targetStudent={targetStudent}
          setTargetStudent={setTargetStudent}
          setActiveModal={setActiveModal}
          toggleUserStatus={toggleUserStatus}
          deleteUser={deleteUser}
          setCurrentUser={setCurrentUser}
          setActiveTab={setActiveTab}
          historiques={historiques}
          remarques={remarques}
        />
      );
    }
  }

  return <div className="text-white p-8">View not found.</div>;
};

export default AppRouter;
