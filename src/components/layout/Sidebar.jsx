import React from "react";

export default function Sidebar({
  currentUser,
  activeTab,
  setActiveTab,
  setTargetStudent,
  handleSwitchUser,
}) {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-30 select-none">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3 shrink-0">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
        </div>
        <div>
          <h2 className="font-bold text-sm tracking-tight text-white leading-tight">
            Lycée Saint-Exupéry
          </h2>
          <span className="text-[11px] text-blue-400 font-medium">
            Gestion Pédagogique
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {currentUser.role === "admin" && (
          <>
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setTargetStudent(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "dashboard" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("etudiants");
                setTargetStudent(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "etudiants" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Liste des étudiants</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("personnel");
                setTargetStudent(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "personnel" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Liste du personnel</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("pointage");
                setTargetStudent(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "pointage" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Pointage Professeurs</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("annonces");
                setTargetStudent(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "annonces" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Annonces</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("profil");
                setTargetStudent(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "profil" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Mon profil</span>
            </button>
          </>
        )}

        {currentUser.role === "secretaire" && (
          <>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "dashboard" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("notes_secr")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "notes_secr" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Gestion des Notes</span>
            </button>
            <button
              onClick={() => setActiveTab("personnel")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "personnel" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Liste du personnel</span>
            </button>
            <button
              onClick={() => setActiveTab("profil")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "profil" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Mon profil</span>
            </button>
          </>
        )}

        {(currentUser.role === "student" || currentUser.role === "ancien") && (
          <>
            <button
              onClick={() => setActiveTab("accueil")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "accueil" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Accueil</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "notes" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Notes & Bulletins</span>
            </button>
            <button
              onClick={() => setActiveTab("historique_remarque")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "historique_remarque" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Historique & Remarques</span>
            </button>
            <button
              onClick={() => setActiveTab("personnel")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "personnel" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Liste du personnel</span>
            </button>
            <button
              onClick={() => setActiveTab("annonces")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "annonces" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Annonces</span>
            </button>
            <button
              onClick={() => setActiveTab("profil")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "profil" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
            >
              <span>Mon profil</span>
            </button>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2 shrink-0">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
          Changer d'utilisateur
        </span>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => handleSwitchUser("admin")}
            className="bg-slate-800 hover:bg-blue-600/30 text-slate-300 text-[10px] py-1.5 rounded font-medium"
          >
            Admin
          </button>
          <button
            onClick={() => handleSwitchUser("secretaire")}
            className="bg-slate-800 hover:bg-blue-600/30 text-slate-300 text-[10px] py-1.5 rounded font-medium"
          >
            Secr.
          </button>
          <button
            onClick={() => handleSwitchUser("student")}
            className="bg-slate-800 hover:bg-blue-600/30 text-slate-300 text-[10px] py-1.5 rounded font-medium"
          >
            Élève
          </button>
        </div>
      </div>
    </aside>
  );
}
