import React from "react";

export default function Topbar({
  activeTab,
  selectedStudent,
  currentUser,
  handleLogin,
}) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-8 flex items-center justify-between z-20">
      <div className="flex items-center space-x-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Espace :
        </span>
        <span className="text-sm font-bold text-white capitalize">
          {selectedStudent
            ? `Profil : ${selectedStudent.prenom} ${selectedStudent.nom}`
            : activeTab}
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
          <span className="text-slate-500 font-medium">Changer Rôle:</span>
          <select
            value={currentUser.role}
            onChange={(e) => handleLogin(e.target.value)}
            className="bg-transparent text-blue-400 font-bold focus:outline-none cursor-pointer"
          >
            <option value="admin" className="bg-slate-900 text-white">
              Admin
            </option>
            <option value="secretaire" className="bg-slate-900 text-white">
              Secrétaire
            </option>
            <option value="student" className="bg-slate-900 text-white">
              Étudiant
            </option>
          </select>
        </div>

        <div className="flex items-center space-x-3 border-l border-slate-800/80 pl-6">
          <img
            src={currentUser.photo}
            alt="Avatar"
            className="w-9 h-9 rounded-xl object-cover border border-blue-500/30"
          />
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-white leading-tight">
              {currentUser.prenom} {currentUser.nom}
            </p>
            <span className="inline-block px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-extrabold uppercase tracking-widest">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
