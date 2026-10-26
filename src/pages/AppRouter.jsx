import React from "react";
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
}) => {
  const userRole = currentUser?.role?.toLowerCase() || "";

  // Student Views
  if (userRole === "student" || userRole === "ancien") {
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

  // Secretary Views
  if (userRole === "secretaire" || userRole === "secretary") {
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

  // Admin Views
  if (userRole === "admin") {
    if (activeTab === "dashboard") {
      return (
        <AdminDashboard
          currentUser={currentUser}
          users={users}
          subjects={subjects}
          gradeSessions={gradeSessions}
          announcements={announcements}
          setActiveModal={setActiveModal}
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

  // Shared Views (All roles)
  if (activeTab === "pointage") {
    return (
      <AdminPointage
        currentUser={currentUser}
        pointages={pointages}
        handleTogglePointage={handleTogglePointage}
        setActiveModal={setActiveModal}
      />
    );
  }
  if (activeTab === "personnel") {
    return <StaffList staffUsers={staffUsers} setActiveTab={setActiveTab} />;
  }
  if (activeTab === "annonces") {
    return (
      <Announcements
        currentUser={currentUser}
        announcements={announcements}
        setActiveModal={setActiveModal}
      />
    );
  }
  if (activeTab === "profil") {
    return <Profile currentUser={currentUser} />;
  }

  return <div className="text-white p-8">View not found.</div>;
};

export default AppRouter;
