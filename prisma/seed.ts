import "dotenv/config";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  await pool.query(`DELETE FROM "Team"; DELETE FROM "User";`);

  const teams = [
    ["Ballet Azul",        "🔵", 1, 21, 7,  3, 1],
    ["Imperio Azul",       "🔵", 1, 18, 8,  3, 2],
    ["Los Albiazul",       "🔵", 1, 12, 6,  3, 3],
    ["Azules Capitalinos", "🔵", 1, 13, 33, 1, 4],
    ["Banda Azul",         "🔵", 1, 8,  18, 1, 5],
  ];

  for (const [name, logo, pj, gf, gc, points, position] of teams) {
    await pool.query(
      `INSERT INTO "Team" (name, logo, pj, gf, gc, points, position) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [name, logo, pj, gf, gc, points, position]
    );
  }

  const hash = bcrypt.hashSync("pasionazul2024", 12);
  await pool.query(
    `INSERT INTO "User" (id, email, password) VALUES ($1,$2,$3)`,
    ["admin-001", "admin@pasionazul.com", hash]
  );

  await pool.end();
  console.log("Seed completado: 5 equipos + 1 admin creados.");
}

main().catch(e => { console.error(e); process.exit(1); });
