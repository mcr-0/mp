import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      offer_id,
      offer_name,
      affiliate_id,
      source,
      session_ip,
      payout,
      date,
      time,
      datetime,
      session_timestamp,
      aff_sub,
      aff_sub2,
      aff_sub3,
      aff_sub4,
      aff_sub5,
      ran,
    } = req.body;

    // Simple validation
    if (
      !offer_id ||
      !session_ip ||
      !payout ||
      !date ||
      !time ||
      !datetime ||
      !session_timestamp
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const postback = await prisma.postback.create({
        data: {
          offer_id,
          offer_name,
          affiliate_id,
          source,
          session_ip,
          payout: parseFloat(payout),
          date: new Date(date),
          time,
          datetime: new Date(datetime),
          session_timestamp: parseInt(session_timestamp, 10),
          aff_sub,
          aff_sub2,
          aff_sub3,
          aff_sub4,
          aff_sub5,
          ran,
        },
      });
      res.status(200).json(postback);
    } catch (error) {
      res.status(500).json({ error: "Failed to save postback" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
