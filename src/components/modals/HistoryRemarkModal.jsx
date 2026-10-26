import React from "react";

const HistoryRemarkModal = ({
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
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        {isHistoryType ? (
          <form onSubmit={onSubmit} className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-white mb-2">
              Add History Event to {targetStudent?.prenom} {targetStudent?.nom}
            </h3>

            <div>
              <label className="block text-slate-400 mb-1">Event Type</label>
              <select
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Absence">Absence (Red)</option>
                <option value="Retard">Late Arrival</option>
                <option value="Infirmerie">Infirmary Visit</option>
                <option value="Permission de sortie">Exit Permit</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">
                Details (Duration, Time)
              </label>
              <input
                type="text"
                placeholder="e.g. 08:00 - 10:00 or 15 mins"
                onChange={(e) => handleInputChange("detail", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">
                Reason / Motive
              </label>
              <textarea
                rows="2"
                placeholder="Enter reason here..."
                onChange={(e) => handleInputChange("raison", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
            >
              Save History Event
            </button>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-white mb-2">
              Add Remark to {targetStudent?.prenom} {targetStudent?.nom}
            </h3>

            <div>
              <label className="block text-slate-400 mb-1">Remark Type</label>
              <select
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Avertissement">Warning (Red)</option>
                <option value="Encouragement">Encouragement</option>
                <option value="Académique">Academic</option>
                <option value="Autre">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">
                Motive / Description
              </label>
              <textarea
                rows="3"
                placeholder="Enter remark description..."
                onChange={(e) => handleInputChange("raison", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
            >
              Save Remark
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HistoryRemarkModal;
