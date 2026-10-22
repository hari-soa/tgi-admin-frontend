import React from "react";

export default function PersonnelView({ users }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">
          Corps Professoral & Administratif
        </h2>
        <p className="text-slate-400 text-xs">
          Membres du personnel enseignant et encadrant
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users
          .filter(
            (u) =>
              u.role === "prof" ||
              u.role === "secretaire" ||
              u.role === "admin",
          )
          .map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={p.photo}
                  alt=""
                  className="w-12 h-12 rounded-2xl object-cover border border-blue-500/30"
                />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {p.prenom} {p.nom}
                  </h3>
                  <span className="bg-blue-500/10 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    {p.role}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <span className="text-slate-500">Email :</span> {p.email}
                </p>
                <p>
                  <span className="text-slate-500">Contact :</span> {p.contact}
                </p>
                {p.matieres && (
                  <div className="mt-3 pt-3 border-t border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">
                      Matières Enseignées :
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {p.matieres.map((m, i) => (
                        <span
                          key={i}
                          className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
