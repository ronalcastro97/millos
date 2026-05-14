"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Correo o contraseña incorrectos");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#030912]">

      {/* Imagen de fondo desvanecida */}
      <div className="absolute inset-0 z-0">
        <Image src="/millonarios.webp" alt="bg" fill className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030912]/80 to-[#030912]" />
      </div>

      {/* Brillo de fondo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Escudo + título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <div className="relative overflow-hidden rounded-lg" style={{ width: 120, height: 86 }}>
              <Image
                src="/escudo-millos-hd.png"
                alt="Escudo Millonarios FC"
                fill
                sizes="120px"
                style={{
                  objectFit: "cover",
                  objectPosition: "top center",
                  filter: "drop-shadow(0 0 16px rgba(245,196,0,0.45))",
                }}
                priority
              />
            </div>
          </div>
          <h1 className="font-display text-white" style={{ fontSize: "3rem" }}>PANEL ADMIN</h1>
          <p className="font-heading text-[#6b8ab8] text-sm tracking-widest uppercase mt-1">Pasión Azul Antioquia</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(6,15,34,0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(245,196,0,0.15)",
            boxShadow: "0 0 40px rgba(37,99,235,0.1), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <h2 className="font-heading font-700 text-[#dce8ff] text-lg mb-6 text-center tracking-wide uppercase">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-heading text-[#6b8ab8] text-xs font-600 uppercase tracking-widest mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@pasionazul.com"
                className="login-input"
              />
            </div>

            <div>
              <label className="block font-heading text-[#6b8ab8] text-xs font-600 uppercase tracking-widest mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••••"
                className="login-input"
              />
            </div>

            {error && (
              <div
                className="rounded-xl px-4 py-3 text-sm text-center font-body"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#fca5a5",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-heading font-700 uppercase tracking-widest py-4 rounded-xl transition-all text-sm mt-2"
              style={{
                background: loading
                  ? "rgba(37,99,235,0.3)"
                  : "linear-gradient(135deg, #1a3a8f, #2563eb)",
                color: "#fff",
                border: "1px solid rgba(245,196,0,0.2)",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 4px 20px rgba(37,99,235,0.3)",
              }}
            >
              {loading ? "Verificando..." : "Ingresar"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="font-heading text-xs tracking-widest uppercase text-[#6b8ab8]/50 hover:text-[#f5c400]/70 transition-colors"
          >
            ← Volver a la tabla
          </Link>
        </div>
      </div>
    </main>
  );
}
