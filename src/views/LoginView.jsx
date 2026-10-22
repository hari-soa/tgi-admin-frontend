import React from "react";

export default function LoginView({ handleLogin, toastMessage }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-slate-100">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4 text-white">
            <svg
              className="w-10 h-10"
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
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Lycée Saint-Exupéry
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Portail de Gestion de Scolarité
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin("admin");
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Email ou Matricule
            </label>
            <input
              type="text"
              defaultValue="admin@st-exupery.edu"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              defaultValue="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2"
          >
            <span>Se connecter</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs text-center text-slate-400 mb-3 font-medium uppercase tracking-wider">
            Accès Rapide par Rôle (Test)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleLogin("admin")}
              className="bg-slate-800 hover:bg-blue-600/30 border border-slate-700 hover:border-blue-500 text-slate-200 text-xs font-medium py-2 px-3 rounded-lg transition-all"
            >
              Admin
            </button>
            <button
              onClick={() => handleLogin("secretaire")}
              className="bg-slate-800 hover:bg-blue-600/30 border border-slate-700 hover:border-blue-500 text-slate-200 text-xs font-medium py-2 px-3 rounded-lg transition-all"
            >
              Secrétaire
            </button>
            <button
              onClick={() => handleLogin("student")}
              className="bg-slate-800 hover:bg-blue-600/30 border border-slate-700 hover:border-blue-500 text-slate-200 text-xs font-medium py-2 px-3 rounded-lg transition-all"
            >
              Étudiant
            </button>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-xl z-50 text-sm font-medium animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
