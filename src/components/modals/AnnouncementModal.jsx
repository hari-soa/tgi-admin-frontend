import React from "react";

const AnnouncementModal = ({
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
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <h3 className="text-base font-bold text-white mb-2">
            Publish New Announcement
          </h3>

          <div>
            <label className="block text-slate-400 mb-1">
              Announcement Title
            </label>
            <input
              type="text"
              placeholder="e.g. End of term schedule"
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">
              Context / Description
            </label>
            <textarea
              rows="3"
              placeholder="Enter announcement details here..."
              onChange={(e) => handleInputChange("context", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">
                Target Audience
              </label>
              <select
                onChange={(e) => handleInputChange("cible", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="tout">All</option>
                <option value="Seconde">Seconde</option>
                <option value="Première">Première</option>
                <option value="Terminale">Terminale</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Priority Level
              </label>
              <select
                onChange={(e) =>
                  handleInputChange("urgent", e.target.value === "true")
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="false">Normal</option>
                <option value="true">Urgent (Red)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
          >
            Publish Immediately
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementModal;
