import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offer_id = searchParams.get("offer_id");
  const offer_name = searchParams.get("offer_name");
  const affiliate_id = searchParams.get("affiliate_id");
  const source = searchParams.get("source");
  const session_ip = searchParams.get("session_ip");
  const payout = searchParams.get("payout");

  const aff_sub = searchParams.get("aff_sub");
  const aff_sub2 = searchParams.get("aff_sub2");
  const aff_sub3 = searchParams.get("aff_sub3");
  const aff_sub4 = searchParams.get("aff_sub4");
  const aff_sub5 = searchParams.get("aff_sub5");
  const ran = searchParams.get("ran");

  // Prosta walidacja
  if (
    !aff_sub ||
    !aff_sub2 ||
    !offer_id ||
    !affiliate_id ||
    !session_ip ||
    !payout ||
    !offer_name
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const postback = await prisma.event.create({
      data: {
        event: "fsa",

        offer_id: parseInt(offer_id as string, 10), // Explicitly converting to integer
        userId: "test",
        payout: parseFloat(payout as string), // Explicitly converting to float
      },
    });

    return NextResponse.json(postback);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save postback" },
      { status: 500 },
    );
  }
}
