import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const payout = searchParams.get("payout");
  const offer_id = searchParams.get("offer_id");
  const offer_name = searchParams.get("offer_name");
  const affiliate_id = searchParams.get("affiliate_id");
  const session_ip = searchParams.get("session_ip");
  const aff_sub4 = searchParams.get("aff_sub4");
  const aff_sub5 = searchParams.get("aff_sub5");

  // const clickid = await prisma.event.findUnique({
  //   where: { cid: cid ?? undefined },
  // });

  try {
    const event = await prisma.event.create({
      data: {
        event: "converted",
        cid: aff_sub4 as string,
        offer_id: parseInt(offer_id as string, 10), // Explicitly converting to integer
        affiliate_id: parseInt(affiliate_id as string, 10), // Explicitly converting to integer
        session_ip: session_ip as string, // Ensure session_ip is a string
        offer_name: offer_name as string,
        payout: parseFloat(payout as string), // Explicitly converting to float
        user: { connect: { id: aff_sub5 as string } },
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save postback" },
      { status: 500 },
    );
  }
  // } else {
  //   return NextResponse.json({ message: "User not found" }, { status: 404 });
  // }
}
