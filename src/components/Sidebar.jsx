import React from "react";

export default function Sidebar({
  currentUser,
  activeTab,
  setActiveTab,
  handleLogout,
}) {
  const roleNavItems = {
    admin: [
      { id: "dashboard", label: "Dashboard" },
      { id: "etudiants", label: "Liste des étudiants" },
      { id: "personnel", label: "Liste du personnel" },
      { id: "annonces", label: "Annonces" },
      { id: "profil", label: "Mon profil" },
    ],
    secretaire: [
      { id: "dashboard", label: "Dashboard" },
      { id: "etudiants", label: "Liste des étudiants" },
      { id: "personnel", label: "Liste du personnel" },
      { id: "profil", label: "Mon profil" },
    ],
    student: [
      { id: "accueil", label: "Accueil" },
      { id: "personnel", label: "Liste du personnel" },
      { id: "notes", label: "Notes" },
      { id: "historique", label: "Historique" },
      { id: "annonces", label: "Annonces" },
      { id: "profil", label: "Mon profil" },
    ],
  };

  const currentNav = roleNavItems[currentUser.role] || [];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 select-none hidden md:flex">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/30">
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
          <span className="text-xs text-blue-400 font-medium">
            Gestion Scolaire
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {currentNav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <span>Déconnecter</span>
        </button>
      </div>
    </aside>
  );
}
