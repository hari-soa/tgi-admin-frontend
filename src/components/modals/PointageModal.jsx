import React from "react";

const PointageModal = ({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
  staffUsers,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const professorList = staffUsers
    ? staffUsers.filter((s) => s.role === "prof")
    : [];

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
            Create Schedule Pointage
          </h3>

          <div>
            <label className="block text-slate-400 mb-1">Professor</label>
            <select
              onChange={(e) => handleInputChange("profName", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a professor...</option>
              {professorList.map((p) => (
                <option key={p.id} value={`${p.prenom} ${p.nom}`}>
                  {p.prenom} {p.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. Mathematics"
                onChange={(e) => handleInputChange("matiere", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Class</label>
              <select
                onChange={(e) => handleInputChange("classe", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Terminale">Terminale</option>
                <option value="Première">Première</option>
                <option value="Seconde">Seconde</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">
              Time Slot (e.g. Monday 08:00 - 10:00)
            </label>
            <input
              type="text"
              placeholder="Monday 08:00 - 10:00"
              onChange={(e) => handleInputChange("jour", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
          >
            Save Pointage Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default PointageModal;
