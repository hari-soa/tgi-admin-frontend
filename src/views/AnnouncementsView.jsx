import React from "react";

export default function AnnouncementsView({
  announcements,
  currentUser,
  setActiveModal,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">
            Communications Officielles
          </h2>
          <p className="text-slate-400 text-xs">
            Annonces diffusées par l'administration du lycée
          </p>
        </div>
        {currentUser.role === "admin" && (
          <button
            onClick={() => setActiveModal("createAnnounce")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
          >
            + Publier une annonce
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-3xl border ${ann.urgent ? "bg-red-950/20 border-red-800/50" : "bg-slate-900 border-slate-800"}`}
          >
            <div className="flex items-center justify-between mb-3">
              {ann.urgent ? (
                <span className="bg-red-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Urgent
                </span>
              ) : (
                <span className="bg-blue-500/10 text-blue-400 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Information
                </span>
              )}
              <span className="text-xs text-slate-500">{ann.date}</span>
            </div>
            <h3 className="font-bold text-white text-base mb-2">{ann.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              {ann.context}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
