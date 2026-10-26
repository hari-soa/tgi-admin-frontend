import React from "react";
import {
  MODAL_BACKDROP,
  MODAL_CONTAINER,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  MODAL_TITLE,
  FIELD_LABEL,
  TEXT_INPUT,
  TEXTAREA_INPUT,
  GRID_TWO_COLS,
  SELECT_INPUT,
  SUBMIT_BUTTON,
} from "../../styles/AnnouncementModalStyles";

export const AnnouncementModal = ({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>Publish New Announcement</h3>

          <div>
            <label className={FIELD_LABEL}>Announcement Title</label>
            <input
              type="text"
              placeholder="e.g. End of term schedule"
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={TEXT_INPUT}
              required
            />
          </div>

          <div>
            <label className={FIELD_LABEL}>Context / Description</label>
            <textarea
              rows="3"
              placeholder="Enter announcement details here..."
              onChange={(e) => handleInputChange("context", e.target.value)}
              className={TEXTAREA_INPUT}
              required
            ></textarea>
          </div>

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Target Audience</label>
              <select
                onChange={(e) => handleInputChange("cible", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="tout">All</option>
                <option value="Seconde">Seconde</option>
                <option value="Première">Première</option>
                <option value="Terminale">Terminale</option>
              </select>
            </div>
            <div>
              <label className={FIELD_LABEL}>Priority Level</label>
              <select
                onChange={(e) =>
                  handleInputChange("urgent", e.target.value === "true")
                }
                className={SELECT_INPUT}
              >
                <option value="false">Normal</option>
                <option value="true">Urgent (Red)</option>
              </select>
            </div>
          </div>

          <button type="submit" className={SUBMIT_BUTTON}>
            Publish Immediately
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementModal;
