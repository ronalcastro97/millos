import { getTeams } from "@/actions/teams";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

/*
 * Escudo HD: la imagen ocupa el 68% superior del PNG (el resto es el texto).
 * Usamos overflow:hidden + object-position:top para recortar el texto.
 * El fondo oscuro nativo de la imagen (~#0d1e3b) se mezcla con el fondo de página.
 */
const MillonariosShield = ({ size = 180, showGlow = true }: { size?: number; showGlow?: boolean }) => {
  const h = Math.round(size * 0.72); // relación para mostrar solo el escudo
  return (
    <div className={`relative flex-shrink-0 ${showGlow ? "animate-glow" : ""}`} style={{ width: size }}>
      {/* Halo dorado radial detrás */}
      {showGlow && (
        <div
          className="absolute pointer-events-none z-0"
          style={{
            inset: "-30%",
            background: "radial-gradient(circle, rgba(245,196,0,0.22) 0%, rgba(37,99,235,0.1) 45%, transparent 70%)",
          }}
        />
      )}
      {/* Contenedor que recorta el texto inferior */}
      <div
        className="relative z-10 overflow-hidden"
        style={{ width: size, height: h, borderRadius: "8px" }}
      >
        <Image
          src="/escudo-millos-hd.png"
          alt="Escudo Millonarios FC"
          fill
          sizes={`${size}px`}
          style={{
            objectFit: "cover",
            objectPosition: "top center",
            filter: showGlow
              ? "drop-shadow(0 0 32px rgba(245,196,0,0.55)) drop-shadow(0 0 12px rgba(37,99,235,0.4))"
              : "drop-shadow(0 0 10px rgba(245,196,0,0.3))",
          }}
          priority
        />
      </div>
    </div>
  );
};

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

function PositionBadge({ pos }: { pos: number }) {
  const base = "w-9 h-9 rounded-full flex items-center justify-center font-heading font-black text-base";
  if (pos === 1) return <div className={`${base} pos-gold`}>{pos}</div>;
  if (pos === 2) return <div className={`${base} pos-silver`}>{pos}</div>;
  if (pos === 3) return <div className={`${base} pos-bronze`}>{pos}</div>;
  return <div className={`${base} bg-white/5 border border-white/10 text-white/60`}>{pos}</div>;
}

export default async function HomePage() {
  const teams = await getTeams();

  return (
    <main className="min-h-screen bg-[#030912] overflow-hidden">

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center scanlines">

        {/* Fondo: imagen + overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/millonarios.webp"
            alt="Millonarios FC"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030912]/65 via-[#060f22]/45 to-[#030912]/98" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030912]/75 via-transparent to-[#030912]/55" />
        </div>

        {/* Rayos de luz */}
        <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full opacity-[0.08]"
            style={{ background: "linear-gradient(180deg,transparent,#f5c400,transparent)", animation: "beamSweep 9s ease-in-out infinite" }} />
          <div className="absolute top-0 left-2/3 w-px h-full opacity-[0.06]"
            style={{ background: "linear-gradient(180deg,transparent,#3b82f6,transparent)", animation: "beamSweep 11s ease-in-out infinite 4s" }} />
        </div>

        {/* Partículas */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="particle" style={{
              width: `${5 + (i % 3) * 3}px`, height: `${5 + (i % 3) * 3}px`,
              background: i % 2 === 0 ? "rgba(245,196,0,0.35)" : "rgba(59,130,246,0.35)",
              left: `${8 + i * 14}%`, top: `${20 + (i % 4) * 15}%`,
              animationDuration: `${3.5 + i * 0.6}s`, animationDelay: `${i * 0.5}s`,
            }} />
          ))}
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-16 pb-10 w-full max-w-2xl mx-auto">

          {/* Badge LIVE */}
          <div className="flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border border-white/10 animate-fade-in"
            style={{ background: "rgba(3,9,18,0.65)", backdropFilter: "blur(10px)", animationDelay: "0.2s" }}>
            <span className="w-2 h-2 rounded-full bg-[#f5c400]" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
            <span className="font-heading text-[10px] font-700 tracking-[0.3em] uppercase text-[#f5c400]">
              Torneo en curso
            </span>
          </div>

          {/* ESCUDO REAL */}
          <div className="mb-5 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <MillonariosShield size={200} />
          </div>

          {/* Línea + nombre */}
          <div className="flex items-center gap-3 justify-center mb-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-transparent to-[#f5c400]" />
            <span className="font-heading font-700 text-[11px] tracking-[0.3em] uppercase text-[#f5c400] whitespace-nowrap">
              Pasión Azul Antioquia
            </span>
            <div className="h-px flex-1 max-w-[48px] bg-gradient-to-l from-transparent to-[#f5c400]" />
          </div>

          {/* Título gigante */}
          <h1 className="font-display leading-[0.9] animate-fade-up"
            style={{ fontSize: "clamp(3.8rem, 18vw, 10rem)", color: "#fff",
              textShadow: "0 0 80px rgba(37,99,235,0.35), 0 4px 30px rgba(0,0,0,0.9)",
              animationDelay: "0.5s" }}>
            MINI
          </h1>
          <h1 className="font-display text-shimmer leading-[0.9] animate-fade-up"
            style={{ fontSize: "clamp(3.8rem, 18vw, 10rem)", animationDelay: "0.55s" }}>
            TORNEO
          </h1>

          <p className="font-heading font-600 text-[#dce8ff]/75 tracking-[0.18em] uppercase text-xs sm:text-sm animate-fade-up mt-4"
            style={{ animationDelay: "0.65s" }}>
            Tabla Oficial de Posiciones
          </p>

          {/* Estrellas */}
          <div className="flex items-center gap-1.5 mt-5 text-[#f5c400] animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {[...Array(5)].map((_, i) => <span key={i} className="opacity-60"><StarIcon /></span>)}
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 animate-fade-in flex flex-col items-center gap-1" style={{ animationDelay: "1.1s" }}>
            <span className="text-white/25 text-[10px] tracking-widest uppercase font-heading">scroll</span>
            <div className="w-px h-7 bg-gradient-to-b from-[#f5c400]/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TABLA DE POSICIONES
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-14 px-3 sm:px-6">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto">

          {/* Encabezado */}
          <div className="text-center mb-10">
            <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-[#f5c400] mb-2 font-600">
              — Clasificación —
            </p>
            <h2 className="font-display text-white leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}>
              TABLA OFICIAL
            </h2>
            <div className="gold-line mx-auto w-36 sm:w-48" />
          </div>

          {/* Tarjeta tabla */}
          <div className="glass-card rounded-2xl overflow-hidden gold-glow" style={{ border: "1px solid rgba(245,196,0,0.2)" }}>

            {/* Header columnas — Desktop */}
            <div className="hidden sm:grid items-center py-3.5 px-5 border-b"
              style={{
                gridTemplateColumns: "52px 1fr 56px 60px 60px 88px",
                background: "linear-gradient(135deg,rgba(13,33,73,0.95),rgba(26,58,143,0.7))",
                borderColor: "rgba(245,196,0,0.2)",
              }}>
              <div className="font-heading font-700 text-[10px] tracking-[0.2em] uppercase text-[#f5c400]/80 text-center">#</div>
              <div className="font-heading font-700 text-[10px] tracking-[0.2em] uppercase text-[#f5c400]/80">Equipo</div>
              <div className="font-heading font-700 text-[10px] tracking-[0.2em] uppercase text-[#dce8ff]/60 text-center">PJ</div>
              <div className="font-heading font-700 text-[10px] tracking-[0.2em] uppercase text-[#4ade80]/70 text-center">GF</div>
              <div className="font-heading font-700 text-[10px] tracking-[0.2em] uppercase text-[#f87171]/70 text-center">GC</div>
              <div className="font-heading font-700 text-[10px] tracking-[0.2em] uppercase text-[#f5c400]/80 text-center">Puntos</div>
            </div>

            {/* Header columnas — Mobile */}
            <div className="grid sm:hidden items-center py-3 px-3 border-b"
              style={{
                gridTemplateColumns: "44px 1fr 44px 44px 80px",
                background: "linear-gradient(135deg,rgba(13,33,73,0.95),rgba(26,58,143,0.7))",
                borderColor: "rgba(245,196,0,0.2)",
              }}>
              <div className="font-heading font-700 text-[10px] uppercase text-[#f5c400]/80 text-center">#</div>
              <div className="font-heading font-700 text-[10px] uppercase text-[#f5c400]/80">Equipo</div>
              <div className="font-heading font-700 text-[10px] uppercase text-[#4ade80]/70 text-center">GF</div>
              <div className="font-heading font-700 text-[10px] uppercase text-[#f87171]/70 text-center">GC</div>
              <div className="font-heading font-700 text-[10px] uppercase text-[#f5c400]/80 text-center">Pts</div>
            </div>

            {/* Filas */}
            {teams.map((team, i) => (
              <div key={team.id} className="standings-row border-b"
                style={{ borderColor: "rgba(255,255,255,0.05)", background: i % 2 === 0 ? "rgba(6,15,34,0.4)" : "rgba(10,22,40,0.2)" }}>

                {/* Desktop row */}
                <div className="hidden sm:grid items-center py-4 px-5"
                  style={{ gridTemplateColumns: "52px 1fr 56px 60px 60px 88px" }}>
                  <div className="flex justify-center"><PositionBadge pos={i + 1} /></div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border text-[10px] font-heading font-800 text-white"
                      style={{ background: "linear-gradient(135deg,#0d2149,#1a3a8f)", borderColor: i === 0 ? "rgba(245,196,0,0.5)" : "rgba(37,99,235,0.3)" }}>
                      {team.name.split(" ").map(w => w[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <span className="font-heading font-700 uppercase tracking-wide text-sm block"
                        style={{ color: i === 0 ? "#ffe066" : "#dce8ff" }}>
                        {team.name}
                      </span>
                      {i === 0 && <span className="text-[9px] font-heading text-[#f5c400]/60 tracking-widest uppercase">Líder</span>}
                    </div>
                  </div>
                  <div className="text-center font-heading font-600 text-[#dce8ff]/60 text-sm">{team.pj}</div>
                  <div className="text-center font-heading font-700 text-[#4ade80]">{team.gf}</div>
                  <div className="text-center font-heading font-700 text-[#f87171]">{team.gc}</div>
                  <div className="text-center">
                    <span className="font-display leading-none block" style={{ fontSize: "1.8rem", color: i < 3 ? "#f5c400" : "#dce8ff", textShadow: i === 0 ? "0 0 16px rgba(245,196,0,0.6)" : "none" }}>{team.points}</span>
                    <span className="font-heading text-[9px] tracking-widest uppercase text-[#6b8ab8]">{team.points === 1 ? "pt" : "pts"}</span>
                  </div>
                </div>

                {/* Mobile row */}
                <div className="grid sm:hidden items-center py-3.5 px-3"
                  style={{ gridTemplateColumns: "44px 1fr 44px 44px 80px" }}>
                  <div className="flex justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-black text-sm ${i === 0 ? "pos-gold" : i === 1 ? "pos-silver" : i === 2 ? "pos-bronze" : "bg-white/5 border border-white/10 text-white/60"}`}>
                      {i + 1}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span className="font-heading font-700 uppercase text-xs block truncate"
                      style={{ color: i === 0 ? "#ffe066" : "#dce8ff" }}>
                      {team.name}
                    </span>
                    {i === 0 && <span className="text-[9px] font-heading text-[#f5c400]/60 tracking-widest uppercase">Líder</span>}
                  </div>
                  <div className="text-center font-heading font-700 text-[#4ade80] text-sm">{team.gf}</div>
                  <div className="text-center font-heading font-700 text-[#f87171] text-sm">{team.gc}</div>
                  <div className="text-center">
                    <span className="font-display leading-none" style={{ fontSize: "1.6rem", color: i < 3 ? "#f5c400" : "#dce8ff" }}>{team.points}</span>
                    <span className="font-heading text-[9px] tracking-widest uppercase text-[#6b8ab8] block">{team.points === 1 ? "pt" : "pts"}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Leyenda */}
            <div className="px-4 py-4 flex flex-wrap gap-3 sm:gap-6 justify-center" style={{ background: "rgba(3,9,18,0.6)" }}>
              <div className="flex items-center gap-1.5 text-[11px] font-body"><span className="w-2 h-2 rounded-full bg-[#4ade80]" /><span className="text-[#6b8ab8]">GF = Goles a Favor</span></div>
              <div className="flex items-center gap-1.5 text-[11px] font-body"><span className="w-2 h-2 rounded-full bg-[#f87171]" /><span className="text-[#6b8ab8]">GC = Goles en Contra</span></div>
              <div className="flex items-center gap-1.5 text-[11px] sm:flex font-body hidden"><span className="w-2 h-2 rounded-full bg-[#6b8ab8]" /><span className="text-[#6b8ab8]">PJ = Partidos Jugados</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          IMAGEN DECORATIVA
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-6 overflow-hidden">
        <div className="relative h-48 sm:h-72">
          <Image src="/millonarios.webp" alt="Millonarios FC - Pasión Azul" fill className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030912] via-transparent to-[#030912]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030912]/70 via-transparent to-[#030912]/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display text-white/8 text-center px-4"
              style={{ fontSize: "clamp(2rem, 10vw, 7rem)" }}>
              MILLONARIOS FC
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer className="relative py-12 px-4 text-center">
        <div className="gold-line w-40 sm:w-64 mx-auto mb-8" />
        <div className="flex justify-center mb-4">
          <MillonariosShield size={110} showGlow={false} />
        </div>
        <p className="font-heading font-400 italic text-[#dce8ff]/45 mt-5 px-4"
          style={{ fontSize: "clamp(0.9rem, 3vw, 1.3rem)", letterSpacing: "0.04em" }}>
          Pasión que nos une,{" "}
          <span className="font-700 not-italic text-shimmer" style={{ WebkitTextFillColor: "transparent" }}>
            AZUL
          </span>{" "}
          que nos define
        </p>
        <div className="mt-8">
          <Link href="/admin/login" className="admin-ghost-link font-heading text-[10px] tracking-[0.3em] uppercase">
            ◆ Admin
          </Link>
        </div>
      </footer>
    </main>
  );
}
