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
  CLASS_CHECKBOX_LIST,
  CLASS_CHECKBOX_LABEL,
} from "../../styles/AnnouncementModalStyles";
import { CLASS_GROUP_LABELS } from "../../utils/labels";

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

  const isEditing = Boolean(formState.id);
  const selectedClasses = formState.targetClasses || [];

  const toggleTargetClass = (classGroup) => {
    const updatedClasses = selectedClasses.includes(classGroup)
      ? selectedClasses.filter((selected) => selected !== classGroup)
      : [...selectedClasses, classGroup];
    handleInputChange("targetClasses", updatedClasses);
  };

  return (
    <div className={MODAL_BACKDROP}>
      <div className={MODAL_CONTAINER}>
        <button onClick={onClose} className={CLOSE_BUTTON}>
          ✕
        </button>

        <form onSubmit={onSubmit} className={FORM_CONTAINER}>
          <h3 className={MODAL_TITLE}>
            {isEditing ? "Modifier l'annonce" : "Diffuser une nouvelle annonce"}
          </h3>

          <div>
            <label className={FIELD_LABEL}>Titre de l'annonce</label>
            <input
              type="text"
              placeholder="Titre..."
              minLength={3}
              value={formState.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={TEXT_INPUT}
              required
            />
          </div>

          <div>
            <label className={FIELD_LABEL}>Contenu</label>
            <textarea
              rows="4"
              minLength={10}
              placeholder="Contenu de l'annonce (minimum 10 caractères)..."
              value={formState.content || ""}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className={TEXTAREA_INPUT}
              required
            ></textarea>
          </div>

          <div className={GRID_TWO_COLS}>
            <div>
              <label className={FIELD_LABEL}>Portée cible</label>
              <select
                value={formState.targetScope || "ALL"}
                onChange={(e) =>
                  handleInputChange("targetScope", e.target.value)
                }
                className={SELECT_INPUT}
              >
                <option value="ALL">Tout le monde</option>
                <option value="CLASS">Par classe</option>
              </select>
            </div>

            <div>
              <label className={FIELD_LABEL}>Niveau de priorité</label>
              <select
                value={formState.priority || "NORMAL"}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                className={SELECT_INPUT}
              >
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          {formState.targetScope === "CLASS" && (
            <div>
              <label className={FIELD_LABEL}>Classes concernées</label>
              <div className={CLASS_CHECKBOX_LIST}>
                {Object.entries(CLASS_GROUP_LABELS).map(
                  ([classGroup, label]) => (
                    <label key={classGroup} className={CLASS_CHECKBOX_LABEL}>
                      <input
                        type="checkbox"
                        checked={selectedClasses.includes(classGroup)}
                        onChange={() => toggleTargetClass(classGroup)}
                      />
                      <span>{label}</span>
                    </label>
                  ),
                )}
              </div>
            </div>
          )}
          <button type="submit" className={SUBMIT_BUTTON}>
            {isEditing ? "Enregistrer les modifications" : "Publier"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementModal;
