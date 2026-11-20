import { useState } from "react";
import { loginUser } from "../../services/authService";
import logoImage from "../../assets/logo-tgi.jpg";
import {
  CARD_BOX,
  CHECKBOX_INPUT,
  CHECKBOX_TEXT,
  CONTAINER_WRAPPER,
  CONTENT_WRAPPER,
  ERROR_BOX,
  FIELD_WRAPPER_LEFT,
  FOOTER_CONTAINER,
  FORM_CONTAINER,
  HEADER_CONTAINER,
  ICON_SIZE,
  INPUT_FIELD,
  LABEL_TEXT,
  LOGO_IMAGE,
  OPTIONS_CONTAINER,
  PASSWORD_FIELD_WRAPPER,
  PASSWORD_HELP_TEXT,
  PASSWORD_INPUT_FIELD,
  PASSWORD_TOGGLE_BTN,
  REMEMBER_ME_LABEL,
  SUBMIT_BUTTON,
  SUBTITLE_TEXT,
  TITLE_TEXT,
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

    try {
      const { user } = await loginUser(email, password);
      setCurrentUser(user);
      showToast(
        `Connecté en tant que ${user.firstName} ${user.lastName} (${user.role})`,
      );
    } catch (err) {
      setError(err.message || "E-mail ou mot de passe invalide.");
    }
  };

  return (
    <div className={CONTAINER_WRAPPER}>
      <div className={CONTENT_WRAPPER}>
        <div className={CARD_BOX}>
          <div className={HEADER_CONTAINER}>
            <img src={logoImage} alt="Logo" className={LOGO_IMAGE} />
            <div className={FIELD_WRAPPER_LEFT}>
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
                placeholder="Enter your e-mail"
                className={INPUT_FIELD}
              />
            </div>

            <div>
              <label className={LABEL_TEXT}>Password</label>
              <div className={PASSWORD_FIELD_WRAPPER}>
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
              <p className={PASSWORD_HELP_TEXT}>
                Le mot de passe est votre matricule.
              </p>
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
