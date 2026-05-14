import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const db = new Database(dbPath);

db.exec(`DELETE FROM Team; DELETE FROM User;`);

const insertTeam = db.prepare(
  `INSERT INTO Team (name, logo, pj, gf, gc, points, position) VALUES (?, ?, ?, ?, ?, ?, ?)`
);

const teams = [
  ["Ballet Azul",       "🔵", 1, 21, 7,  3, 1],
  ["Imperio Azul",      "🔵", 1, 18, 8,  3, 2],
  ["Los Albiazul",      "🔵", 1, 12, 6,  3, 3],
  ["Azules Capitalinos","🔵", 1, 13, 33, 1, 4],
  ["Banda Azul",        "🔵", 1, 8,  18, 1, 5],
];

for (const t of teams) insertTeam.run(...t);

const hash = bcrypt.hashSync("pasionazul2024", 12);
db.prepare(`INSERT INTO User (id, email, password) VALUES (?, ?, ?)`).run(
  "admin-001",
  "admin@pasionazul.com",
  hash
);

db.close();
console.log("✅ Seed completado: 5 equipos + 1 admin creados.");
