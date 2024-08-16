import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        events: true, // assuming "events" is the name of the relation field in your User model
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Count the number of "clickedOffer" events
    const completedOffers = user.events.filter(
      (event) => event.event === "converted",
    ).length;

    return NextResponse.json({ user, completedOffers });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 },
    );
  }
}
