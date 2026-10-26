import React from "react";

const GradeSessionModal = ({
  isOpen,
  onClose,
  onSubmit,
  formState,
  setFormState,
  subjects,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const subjectList = subjects || [];

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
            Create Grade Session (For Secretary)
          </h3>

          <div>
            <label className="block text-slate-400 mb-1">Target Subject</label>
            <select
              onChange={(e) => handleInputChange("matiere", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a subject...</option>
              {subjectList.map((s) => (
                <option key={s.id} value={s.nom}>
                  {s.nom} ({s.classe})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Target Class</label>
            <select
              onChange={(e) => handleInputChange("classe", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Terminale">Terminale</option>
              <option value="Première">Première</option>
              <option value="Seconde">Seconde</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
          >
            Assign to Secretary
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeSessionModal;
