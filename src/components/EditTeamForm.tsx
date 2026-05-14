"use client";

import { useState, useTransition } from "react";

type Team = {
  id: number; name: string; logo: string;
  pj: number; gf: number; gc: number; points: number; position: number;
};

type Props = {
  team: Team;
  position: number;
  updateTeam: (id: number, data: { name: string; pj: number; gf: number; gc: number; points: number }) => Promise<void>;
};

export default function EditTeamForm({ team, position, updateTeam }: Props) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [values, setValues] = useState({
    name: team.name, pj: team.pj, gf: team.gf, gc: team.gc, points: team.points,
  });

  function handleChange(field: keyof typeof values, value: string) {
    setValues(v => ({ ...v, [field]: field === "name" ? value : parseInt(value) || 0 }));
    setSaved(false);
  }

  function handleSave() {
    startTransition(async () => {
      await updateTeam(team.id, values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  const isTop3 = position <= 3;

  return (
    <div className="rounded-2xl p-4 sm:p-5 transition-all" style={{
      background: "rgba(6,15,34,0.7)",
      backdropFilter: "blur(12px)",
      border: `1px solid ${isTop3 ? "rgba(245,196,0,0.2)" : "rgba(37,99,235,0.15)"}`,
      boxShadow: isTop3 ? "0 0 20px rgba(245,196,0,0.04)" : "none",
    }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-lg flex-shrink-0"
          style={{
            background: position === 1 ? "linear-gradient(135deg,#f5c400,#c9960a)"
              : position === 2 ? "linear-gradient(135deg,#c0c8d8,#8899b0)"
              : position === 3 ? "linear-gradient(135deg,#8fb4e0,#5280b0)"
              : "rgba(37,99,235,0.2)",
            color: position <= 2 ? "#030912" : "#fff",
          }}>
          {position}
        </div>
        <span className="font-heading font-700 uppercase tracking-wide text-[#dce8ff] text-sm truncate flex-1">{team.name}</span>
        {position === 1 && (
          <span className="text-[10px] font-heading tracking-widest uppercase px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: "rgba(245,196,0,0.12)", color: "#f5c400", border: "1px solid rgba(245,196,0,0.25)" }}>
            Líder
          </span>
        )}
      </div>

      {/* Campos — 2 col en móvil, 5 en desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {/* Nombre — ocupa 2 cols en móvil */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-heading text-[#6b8ab8] text-[10px] font-600 uppercase tracking-widest mb-1">Nombre</label>
          <input type="text" value={values.name} onChange={e => handleChange("name", e.target.value)} className="admin-input" />
        </div>

        {[
          { field: "pj" as const, label: "PJ",   color: "#dce8ff" },
          { field: "gf" as const, label: "GF",   color: "#4ade80" },
          { field: "gc" as const, label: "GC",   color: "#f87171" },
          { field: "points" as const, label: "Pts", color: "#f5c400" },
        ].map(({ field, label, color }) => (
          <div key={field}>
            <label className="block font-heading text-[10px] font-600 uppercase tracking-widest mb-1" style={{ color }}>
              {label}
            </label>
            <input
              type="number" min={0} value={values[field]}
              onChange={e => handleChange(field, e.target.value)}
              className="admin-input text-center font-heading font-700"
              style={{ color, borderColor: `${color}30` }}
            />
          </div>
        ))}
      </div>

      {/* Botón */}
      <div className="flex justify-end mt-3.5">
        <button onClick={handleSave} disabled={isPending}
          className="font-heading font-700 uppercase tracking-widest text-xs px-5 py-2.5 rounded-xl transition-all"
          style={{
            background: saved ? "linear-gradient(135deg,#166534,#15803d)"
              : isPending ? "rgba(37,99,235,0.2)"
              : "linear-gradient(135deg,#1a3a8f,#2563eb)",
            color: "#fff",
            border: saved ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(245,196,0,0.15)",
            cursor: isPending ? "not-allowed" : "pointer",
            boxShadow: saved ? "0 0 10px rgba(74,222,128,0.2)" : "0 4px 12px rgba(37,99,235,0.2)",
          }}>
          {isPending ? "Guardando..." : saved ? "✓ Guardado" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
