import { auth, signOut } from "@/lib/auth";
import { getTeams, updateTeam } from "@/actions/teams";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import EditTeamForm from "@/components/EditTeamForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const teams = await getTeams();

  return (
    <main className="min-h-screen bg-[#030912] py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative overflow-hidden rounded-md flex-shrink-0" style={{ width: 52, height: 37 }}>
              <Image src="/escudo-millos-hd.png" alt="Millonarios FC" fill sizes="52px"
                style={{ objectFit: "cover", objectPosition: "top center", filter: "drop-shadow(0 0 8px rgba(245,196,0,0.35))" }} />
            </div>
            <div>
              <h1 className="font-display text-white" style={{ fontSize: "clamp(1.5rem,6vw,2rem)", lineHeight: 1 }}>
                PANEL ADMIN
              </h1>
              <p className="font-heading text-[#6b8ab8] text-[10px] tracking-widest uppercase">Pasión Azul Antioquia</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="font-heading font-600 text-xs uppercase tracking-widest px-3 py-2 rounded-xl transition-all"
              style={{ border: "1px solid rgba(37,99,235,0.3)", color: "#dce8ff", background: "rgba(37,99,235,0.08)" }}>
              Ver tabla
            </Link>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
              <button type="submit" className="font-heading font-600 text-xs uppercase tracking-widest px-3 py-2 rounded-xl transition-all"
                style={{ border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", background: "rgba(239,68,68,0.08)" }}>
                Salir
              </button>
            </form>
          </div>
        </div>

        {/* Línea dorada */}
        <div className="gold-line mb-8" />

        {/* Info banner */}
        <div
          className="rounded-xl px-5 py-4 mb-8"
          style={{
            background: "rgba(37,99,235,0.08)",
            border: "1px solid rgba(37,99,235,0.2)",
          }}
        >
          <p className="font-body text-[#dce8ff]/70 text-sm">
            Edita los datos de cada equipo y presiona{" "}
            <span className="font-semibold text-[#f5c400]">Guardar</span>.
            Los cambios se reflejan inmediatamente en la tabla pública.
          </p>
        </div>

        {/* Lista de equipos */}
        <div className="space-y-4">
          {teams.map((team, i) => (
            <EditTeamForm key={team.id} team={team} position={i + 1} updateTeam={updateTeam} />
          ))}
        </div>

        <div className="text-center mt-10">
          <span className="font-body text-[#6b8ab8]/40 text-xs">
            {session.user?.email}
          </span>
        </div>
      </div>
    </main>
  );
}
