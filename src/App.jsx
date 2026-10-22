import React, { useState } from "react";
import {
  INITIAL_USERS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_GRADES,
  INITIAL_HISTORY,
  INITIAL_NOTIFICATIONS,
  INITIAL_SUBJECTS,
  INITIAL_ALUMNI,
} from "./data/mockData";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import LoginView from "./views/LoginView";
import AdminDashboard from "./views/AdminDashboard";
import ProfileView from "./views/ProfileView";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [users, setUsers] = useState(INITIAL_USERS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [grades, setGrades] = useState(INITIAL_GRADES);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [alumni] = useState(INITIAL_ALUMNI);

  const [activeModal, setActiveModal] = useState(null);
  const [formState, setFormState] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleLogin = (role) => {
    const user = users.find((u) => u.role === role) || users[0];
    setCurrentUser(user);
    setActiveTab(role === "student" ? "accueil" : "dashboard");
    showToast(`Connexion réussie en tant que ${role.toUpperCase()}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab("dashboard");
    showToast("Déconnexion réussie");
  };

  if (!currentUser) {
    return <LoginView handleLogin={handleLogin} toastMessage={toastMessage} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          activeTab={activeTab}
          currentUser={currentUser}
          handleLogin={handleLogin}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950">
          {currentUser.role === "admin" && activeTab === "dashboard" && (
            <AdminDashboard
              currentUser={currentUser}
              notifications={notifications}
              alumni={alumni}
              subjects={subjects}
              setActiveModal={setActiveModal}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "profil" && <ProfileView currentUser={currentUser} />}
        </main>
      </div>

      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 text-sm font-medium animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
