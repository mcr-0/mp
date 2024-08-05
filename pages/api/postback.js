import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { datetime, offer_id, payout, ip, aff_sub4, aff_sub5 } = req.query;

    // Simple validation
    if (!datetime || !offer_id || !payout || !ip) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const conversion = await prisma.conversion.create({
        data: {
          created_at: new Date(datetime),
          offer_id,
          payout: parseFloat(payout),
          ip,
          aff_sub4: aff_sub4 || "",
          aff_sub5: aff_sub5 || "",
        },
      });
      res.status(200).json(conversion);
    } catch (error) {
      res.status(500).json({ error: "Failed to save conversion" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
