import fetch from "node-fetch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/(home)/api/auth/authConfig"; // Upewnij się, że ścieżka jest poprawna
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const apiKey = process.env.API_KEY; // Ensure you set this in your environment variables
const endpoint = process.env.ENDPOINT; // Ensure you set this in your environment variables
type Offer = {
  offerid: string;
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

export async function GET(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  // const ip = "23.83.131.27";
  // const session = await getServerSession(authOptions);
  // const userId = session?.user?.id || "defaultUsername"; // Fallback to a default value if username is not available

  // console.log("Session:", session);

  const userAgent = req.headers.get("user-agent");
  if (!userAgent) {
    return NextResponse.json({ error: "Missing User Agent" }, { status: 400 });
  }
  if (!ip) {
    return NextResponse.json({ error: "Missing IP Address" }, { status: 400 });
  }

  const data = {
    ip: ip.toString(), // Dynamic IP address
    user_agent: userAgent,
    aff_sub: "v1",
    // max: 5,
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
      return NextResponse.json({ offers: content.offers }, { status: 200 });
    } else {
      console.error("API Error:", content.error);
      return NextResponse.json({ error: content.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Fetch Error:", (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
