// pages/api/prisma-data.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await prisma.postback.findMany({
      select: {
        offer_name: true,
        offer_id: true,
      },
    });
    console.log("Prisma data:", data); // Dodaj logowanie
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Prisma data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
