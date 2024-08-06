import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import getIp from "../../middlewares/ip";
import { getSession } from "next-auth/react";

type Offer = {
  offerid: number;
  name: string;
  name_short: string;
  description: string;
  adcopy: string;
  picture: string;
  payout: string;
  country: string;
  device: string;
  link: string;
  epc: string;
  boosted: boolean;
  ctype: string;
  cvr: string;
};

type ApiResponse = {
  success: boolean;
  offers?: Offer[];
  error?: string;
};

type Data = {
  offers?: Offer[];
  error?: string;
};

const apiKey = process.env.API_KEY; // Ensure you set this in your environment variables
const endpoint = process.env.ENDPOINT; // Ensure you set this in your environment variables

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await new Promise((resolve) => getIp(req, res, resolve)); // Apply the middleware

  const userAgent = req.headers["user-agent"];
  const ip = req.clientIp;

  if (!userAgent) {
    res.status(400).json({ error: "Missing User Agent" });
    return;
  }

  if (!ip) {
    res.status(400).json({ error: "Missing IP Address" });
    return;
  }

  const session = await getSession({ req });
  const username = session?.user?.username || "defaultUsername"; // Fallback to a default value if username is not available

  const data = {
    // ip: "23.83.132.153",
    ip: ip.toString(), // Dynamic IP address
    user_agent: userAgent,
    // Enter other optional vars here (ctype, max, etc)
    aff_sub5: username,
  };

  const url = `${endpoint}?${new URLSearchParams(data as any).toString()}`;
  console.log("Request URL:", url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      console.error("Response Error:", response.statusText);
      throw new Error(`Error: ${response.statusText}`);
    }

    // Explicitly declare response type
    const content: ApiResponse = (await response.json()) as ApiResponse;
    console.log("Response Content:", content);

    if (content.success) {
      res.status(200).json({ offers: content.offers });
    } else {
      console.error("API Error:", content.error);
      res.status(500).json({ error: content.error });
    }
  } catch (error) {
    console.error("Fetch Error:", (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
}
