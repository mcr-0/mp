import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  // Sprawdź, czy użytkownik istnieje
  let user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    // Jeśli użytkownik nie istnieje, utwórz nowego
    user = await prisma.user.create({
      data: {
        username,
      },
    });
    const userId: string = user.id;

    await prisma.event.create({
      data: {
        event: `registered`,
        user: { connect: { id: userId } },
      },
    });
  } else {
    const userId: string = user.id;
    await prisma.event.create({
      data: {
        event: `logged_in`,
        user: { connect: { id: userId } },
      },
    });
  }

  return NextResponse.json({ user }, { status: 200 });
}
