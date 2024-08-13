import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { offerid, username, cid } = await request.json();

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      await prisma.event.create({
        data: {
          event: `clickedOffer`,
          offer_id: offerid,
          cid: cid,
          user: { connect: { id: user.id } },
        },
      });

      return NextResponse.json(
        { message: "Activity saved successfully" },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error saving activity:", error);
    return NextResponse.json(
      { message: "Error saving activity", error },
      { status: 500 },
    );
  }
}
