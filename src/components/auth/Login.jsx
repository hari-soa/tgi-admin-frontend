import { useState } from "react";
import { loginUser, getCurrentUserProfile } from "../../services/authService";
import logoImage from "../../assets/logo-tgi.jpg";
import {
  CONTAINER_WRAPPER,
  CONTENT_WRAPPER,
  CARD_BOX,
  HEADER_CONTAINER,
  LOGO_IMAGE,
  TITLE_TEXT,
  SUBTITLE_TEXT,
  ERROR_BOX,
  FORM_CONTAINER,
  LABEL_TEXT,
  INPUT_FIELD,
  PASSWORD_INPUT_FIELD,
  PASSWORD_TOGGLE_BTN,
  ICON_SIZE,
  PASSWORD_HELP_TEXT,
  OPTIONS_CONTAINER,
  REMEMBER_ME_LABEL,
  CHECKBOX_INPUT,
  CHECKBOX_TEXT,
  SUBMIT_BUTTON,
  FOOTER_CONTAINER,
} from "../../styles/LoginStyles";

export const Login = ({ setCurrentUser, showToast }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const adminEmailEnv = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPasswordEnv = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmailEnv && password === adminPasswordEnv) {
      const superAdminUser = {
        id: 0,
        matricule: "ADM-00001",
        nom: "Super",
        prenom: "Admin",
        role: "ADMIN",
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

    try {
      const authResult = await loginUser(email, password);

      const token = authResult?.token || authResult?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      const userProfile = await getCurrentUserProfile();
      if (userProfile && userProfile.statut === "desactive") {
        setError(
          "This account has been disabled. Please contact the administrator.",
        );
        return;
      }

      setCurrentUser(userProfile);
      if (showToast) {
        showToast(
          `Successfully logged in as ${userProfile.firstName || userProfile.prenom || ""} ${userProfile.lastName || userProfile.nom || ""} (${(userProfile.role || "USER").toUpperCase()})`,
        );
      }
    } catch (err) {
      setError(err.message || "Invalid email or matricule.");
    }
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={CONTENT_WRAPPER}>
        <div className={CARD_BOX}>
          <div className={HEADER_CONTAINER}>
            <img src={logoImage} alt="Logo" className={LOGO_IMAGE} />
            <div className="text-left">
              <h1 className={TITLE_TEXT}>Collège Saint Michel Amparibe</h1>
              <p className={SUBTITLE_TEXT}>
                TGI - Technologie Générale Industriel
              </p>
            </div>
          </div>
          {error && <div className={ERROR_BOX}>{error}</div>}

          <form onSubmit={handleLoginSubmit} className={FORM_CONTAINER}>
            <div>
              <label className={LABEL_TEXT}>E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your eamil"
                className={INPUT_FIELD}
              />
            </div>

            <div>
              <label className={LABEL_TEXT}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={PASSWORD_INPUT_FIELD}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={PASSWORD_TOGGLE_BTN}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className={ICON_SIZE}
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
                    <svg
                      className={ICON_SIZE}
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
            </div>

            <div className={OPTIONS_CONTAINER}>
              <label className={REMEMBER_ME_LABEL}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={CHECKBOX_INPUT}
                />
                <span className={CHECKBOX_TEXT}>Remember me</span>
              </label>
            </div>

            <button type="submit" className={SUBMIT_BUTTON}>
              Sign In
            </button>
          </form>
        </div>
      </div>

      <footer className={FOOTER_CONTAINER}>
        © 2026 TGI - Technologie Générale Industriel. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
