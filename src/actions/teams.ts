"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function updateTeam(id: number, data: {
  name: string;
  pj: number;
  gf: number;
  gc: number;
  points: number;
}) {
  const session = await auth();
  if (!session) throw new Error("No autorizado");

  await prisma.team.update({
    where: { id },
    data: {
      name: data.name,
      pj: Number(data.pj),
      gf: Number(data.gf),
      gc: Number(data.gc),
      points: Number(data.points),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function getTeams() {
  return prisma.team.findMany({ orderBy: [{ points: "desc" }, { gf: "desc" }] });
}
