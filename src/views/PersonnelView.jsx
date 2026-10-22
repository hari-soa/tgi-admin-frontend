import React from "react";

export default function PersonnelView({ users }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Liste du Personnel & Enseignants
        </h2>
        <p className="text-slate-400 text-sm">
          Corps professoral et administratif du Lycée
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users
          .filter(
            (u) =>
              u.role === "personnel" ||
              u.role === "secretaire" ||
              u.role === "admin",
          )
          .map((pers) => (
            <div
              key={pers.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-base">
                  {pers.prenom[0]}
                  {pers.nom[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {pers.prenom} {pers.nom}
                  </h3>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    {pers.role}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <span className="text-slate-500">Email :</span> {pers.email}
                </p>
                <p>
                  <span className="text-slate-500">Contact :</span>{" "}
                  {pers.contact}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
