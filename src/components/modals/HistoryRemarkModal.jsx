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
  DATES_GRID,
} from "../../styles/HistoryRemarkModalStyles";
import {
  HISTORY_TYPE_LABELS,
  REMARK_CATEGORY_LABELS,
} from "../../utils/labels";
import { getFullName } from "../../utils/helpers";

const renderOptions = (labels) =>
  Object.entries(labels).map(([value, label]) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

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
              Ajouter un événement à {getFullName(targetStudent)}
            </h3>

            <div>
              <label className={FIELD_LABEL}>Type d'événement</label>
              <select
                value={formState.type || "ABSENCE"}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className={SELECT_INPUT}
              >
                {renderOptions(HISTORY_TYPE_LABELS)}
              </select>
            </div>

            <div className={DATES_GRID}>
              <div>
                <label className={FIELD_LABEL}>Date de début</label>
                <input
                  type="date"
                  value={formState.startDate || ""}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className={TEXT_INPUT}
                  required
                />
              </div>
              <div>
                <label className={FIELD_LABEL}>Date de fin</label>
                <input
                  type="date"
                  value={formState.endDate || ""}
                  min={formState.startDate || undefined}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className={TEXT_INPUT}
                />
              </div>
            </div>

            <div>
              <label className={FIELD_LABEL}>Motif</label>
              <textarea
                rows="2"
                minLength={3}
                placeholder="Saisir le motif..."
                value={formState.reason || ""}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                className={TEXTAREA_INPUT}
                required
              ></textarea>
            </div>

            <button type="submit" className={SUBMIT_BUTTON}>
              Enregistrer l'événement
            </button>
          </form>
        ) : (
          <form onSubmit={onSubmit} className={FORM_CONTAINER}>
            <h3 className={MODAL_TITLE}>
              Ajouter une remarque à {getFullName(targetStudent)}
            </h3>

            <div>
              <label className={FIELD_LABEL}>Catégorie</label>
              <select
                value={formState.category || "BEHAVIOR"}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={SELECT_INPUT}
              >
                {renderOptions(REMARK_CATEGORY_LABELS)}
              </select>
            </div>

            <div>
              <label className={FIELD_LABEL}>Description</label>
              <textarea
                rows="3"
                minLength={5}
                placeholder="Saisir la remarque..."
                value={formState.content || ""}
                onChange={(e) => handleInputChange("content", e.target.value)}
                className={TEXTAREA_INPUT}
                required
              ></textarea>
            </div>

            <button type="submit" className={SUBMIT_BUTTON}>
              Enregistrer la remarque
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HistoryRemarkModal;
