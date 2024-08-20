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
    // const postback = await prisma.postback.create({
    //   data: {
    //     offer_id: parseInt(offer_id as string, 10), // Explicitly converting to integer
    //     offer_name: offer_name as string, // Ensure that offer_name is a string
    //     affiliate_id: parseInt(affiliate_id as string, 10), // Explicitly converting to integer
    //     source: source ?? undefined, // Can be undefined or a string
    //     session_ip: session_ip as string, // Ensure session_ip is a string
    //     payout: parseFloat(payout as string), // Explicitly converting to float
    //     aff_sub: aff_sub as string, // Ensure aff_sub is a string
    //     aff_sub2: aff_sub2 as string, // Ensure aff_sub2 is a string
    //     aff_sub3: aff_sub3 as string, // Ensure aff_sub3 is a string
    //     aff_sub4: aff_sub4 as string, // Can be undefined or a string
    //     aff_sub5: aff_sub5 ?? undefined, // Can be undefined or a string
    //     ran: ran ?? undefined, // Can be undefined or a string
    //   },
    // });
    // return NextResponse.json(postback);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save postback" },
      { status: 500 },
    );
  }
}
