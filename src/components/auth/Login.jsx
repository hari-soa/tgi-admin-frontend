import React, { useState } from "react";

const Login = ({ users, setCurrentUser, showToast }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    const adminEmailEnv =
      import.meta.env.VITE_ADMIN_EMAIL || "superadmin@tgi.edu";
    const adminPasswordEnv =
      import.meta.env.VITE_ADMIN_PASSWORD || "superadmin2026";

    // 1. Check if login matches Super Admin from .env
    if (email === adminEmailEnv && password === adminPasswordEnv) {
      const superAdminUser = {
        id: 0,
        matricule: "ADM-00001",
        nom: "Super",
        prenom: "Admin",
        role: "admin",
        email: adminEmailEnv,
        contact: "+33 6 00 00 00 00",
        genre: "male",
        statut: "active",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      };
      setCurrentUser(superAdminUser);
      if (showToast) showToast("Welcome back, Super Admin !");
      return;
    }

    // 2. Otherwise, check in database users (email + matricule as password)
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.matricule === password,
    );

    if (foundUser) {
      if (foundUser.statut === "desactive") {
        setError(
          "This account has been disabled. Please contact the administrator.",
        );
        return;
      }
      setCurrentUser(foundUser);
      if (showToast)
        showToast(
          `Successfully logged in as ${foundUser.prenom} ${foundUser.nom} (${foundUser.role.toUpperCase()})`,
        );
    } else {
      setError("Invalid email or password (password is your matricule).");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 font-sans">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* School Header & Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-2xl font-bold mb-2">
              TGI
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Lycée Saint-Exupéry
            </h1>
            <p className="text-sm text-slate-400">Academic Management System</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. user@st-exupery.edu"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Password (Matricule)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your matricule or admin password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-4 pr-10 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // Eye off icon
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                * For staff/students, your password is your unique matricule
                (e.g. TGI-25020).
              </p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-600/20"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Footer / All rights reserved */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-900">
        © 2026 Lycée Saint-Exupéry. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
