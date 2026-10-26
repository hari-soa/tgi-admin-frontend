import React from "react";

const Announcements = ({ currentUser, announcements, setActiveModal }) => {
  return (
    <div className="space-y-6">
      {/* Header section with title and admin broadcast button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Annonces Diffusées</h2>
          <p className="text-slate-400 text-sm">
            Communications officielles archivées
          </p>
        </div>
        {currentUser?.role === "admin" && (
          <button
            onClick={() => setActiveModal("announcement")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/30"
          >
            + Diffuser une annonce
          </button>
        )}
      </div>

      {/* Announcements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-2xl border transition-all ${
              ann.urgent
                ? "bg-red-950/20 border-red-800/50"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  ann.urgent
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-blue-500/10 text-blue-400"
                }`}
              >
                {ann.urgent ? "Urgent" : "Général"}
              </span>
              <span className="text-xs text-slate-500">
                {ann.date || "Récemment"}
              </span>
            </div>
            <h3 className="font-bold text-white text-base mb-2">{ann.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {ann.context}
            </p>
            <span className="text-[10px] text-slate-500 block mt-4">
              Cible :{" "}
              <span className="text-slate-300 capitalize">
                {ann.cible || "tout"}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
