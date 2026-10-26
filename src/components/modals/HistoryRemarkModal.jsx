import React from "react";
import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  FIELD_LABEL,
  SELECT_INPUT,
  TEXT_INPUT,
  TEXTAREA_INPUT,
  SUBMIT_BUTTON,
} from "../../styles/HistoryRemarkModalStyles";

export const HistoryRemarkModal = ({
  isOpen,
  onClose,
  type,
  onSubmit,
  formState,
  setFormState,
  targetStudent,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const isHistoryType = type === "target_history";

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        {isHistoryType ? (
          <form onSubmit={onSubmit} className={FORM_CONTAINER}>
            <h3 className={MODAL_TITLE}>
              Add History Event to {targetStudent?.prenom} {targetStudent?.nom}
            </h3>

            <div>
              <label className={FIELD_LABEL}>Event Type</label>
              <select
                onChange={(e) => handleInputChange("type", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="Absence">Absence (Red)</option>
                <option value="Retard">Late Arrival</option>
                <option value="Infirmerie">Infirmary Visit</option>
                <option value="Permission de sortie">Exit Permit</option>
              </select>
            </div>

            <div>
              <label className={FIELD_LABEL}>Details (Duration, Time)</label>
              <input
                type="text"
                placeholder="e.g. 08:00 - 10:00 or 15 mins"
                onChange={(e) => handleInputChange("detail", e.target.value)}
                className={TEXT_INPUT}
                required
              />
            </div>

            <div>
              <label className={FIELD_LABEL}>Reason / Motive</label>
              <textarea
                rows="2"
                placeholder="Enter reason here..."
                onChange={(e) => handleInputChange("raison", e.target.value)}
                className={TEXTAREA_INPUT}
                required
              ></textarea>
            </div>

            <button type="submit" className={SUBMIT_BUTTON}>
              Save History Event
            </button>
          </form>
        ) : (
          <form onSubmit={onSubmit} className={FORM_CONTAINER}>
            <h3 className={MODAL_TITLE}>
              Add Remark to {targetStudent?.prenom} {targetStudent?.nom}
            </h3>

            <div>
              <label className={FIELD_LABEL}>Remark Type</label>
              <select
                onChange={(e) => handleInputChange("type", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="Avertissement">Warning (Red)</option>
                <option value="Encouragement">Encouragement</option>
                <option value="Académique">Academic</option>
                <option value="Autre">Other</option>
              </select>
            </div>

            <div>
              <label className={FIELD_LABEL}>Motive / Description</label>
              <textarea
                rows="3"
                placeholder="Enter remark description..."
                onChange={(e) => handleInputChange("raison", e.target.value)}
                className={TEXTAREA_INPUT}
                required
              ></textarea>
            </div>

            <button type="submit" className={SUBMIT_BUTTON}>
              Save Remark
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HistoryRemarkModal;
