import React from "react";

const UserModal = ({ isOpen, onClose, onSubmit, formState, setFormState }) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const selectedRole = formState.role || "student";
  const isStudentOrAlumni =
    selectedRole === "student" || selectedRole === "ancien";

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <h3 className="text-base font-bold text-white mb-2">
            Create New User
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="e.g. Doe"
                onChange={(e) => handleInputChange("nom", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">First Name</label>
              <input
                type="text"
                placeholder="e.g. John"
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Gender</label>
              <select
                onChange={(e) => handleInputChange("genre", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Role</label>
              <select
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="prof">Professor</option>
                <option value="secretaire">Secretary</option>
                <option value="ancien">Alumni</option>
              </select>
            </div>
          </div>

          {/* Matricule Generation Section */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
            <p className="font-bold text-blue-400">
              Mandatory Matricule Generation (
              {isStudentOrAlumni ? "TGI-YYNNN" : "PRF-YYNNN"})
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500">
                  Entry Year (e.g. 25)
                </label>
                <input
                  type="text"
                  placeholder="25"
                  onChange={(e) =>
                    handleInputChange("anneeEntree", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-500">
                  Class Number (e.g. 020)
                </label>
                <input
                  type="text"
                  placeholder="020"
                  onChange={(e) =>
                    handleInputChange("numInClass", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="user@st-exupery.edu"
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Contact Phone</label>
              <input
                type="text"
                placeholder="+33 6 00 00 00 00"
                onChange={(e) => handleInputChange("contact", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Conditional inputs for students / alumni */}
          <div className="grid grid-cols-2 gap-3">
            {isStudentOrAlumni && (
              <div>
                <label className="block text-slate-400 mb-1">Class</label>
                <select
                  onChange={(e) => handleInputChange("classe", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Seconde">Seconde</option>
                  <option value="Première">Première</option>
                  <option value="Terminale">Terminale</option>
                </select>
              </div>
            )}
            <div className={isStudentOrAlumni ? "" : "col-span-2"}>
              <label className="block text-slate-400 mb-1">
                Place of Birth
              </label>
              <input
                type="text"
                placeholder="Paris"
                onChange={(e) =>
                  handleInputChange("lieuNaissance", e.target.value)
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all mt-2"
          >
            Save User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
