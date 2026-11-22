import { CONNECTION_ERROR_MESSAGE } from "../../services/api";
import {
  ERROR_BANNER_BUTTON,
  ERROR_PANEL_BUTTON,
  ERROR_PANEL_HINT,
  ERROR_PANEL_TITLE,
  LOADING_PANEL,
  LOADING_PANEL_SPINNER,
  LOADING_PANEL_TEXT,
} from "../../styles/ResourceStatusStyles";

export const LoadingPanel = () => (
  <div className={LOADING_PANEL}>
    <div className={LOADING_PANEL_SPINNER}></div>
    <p className={LOADING_PANEL_TEXT}>Chargement...</p>
  </div>
);

export const ErrorPanel = ({ message, onRetry }) => (
  <button type="button" onClick={onRetry} className={ERROR_PANEL_BUTTON}>
    <span className={ERROR_PANEL_TITLE}>{message}</span>
    <span className={ERROR_PANEL_HINT}>Cliquez ici pour rafraîchir</span>
  </button>
);

export const ErrorBanner = ({ message, onRetry }) => (
  <button type="button" onClick={onRetry} className={ERROR_BANNER_BUTTON}>
    {message} — cliquez ici pour rafraîchir
  </button>
);

export const getDisplayedErrorMessage = (errorMessage) =>
  errorMessage === CONNECTION_ERROR_MESSAGE
    ? CONNECTION_ERROR_MESSAGE
    : `Une erreur est survenue : ${errorMessage}`;
