import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Zakładając, że używasz pliku `prisma.ts` w `lib` jako klienta Prisma

export async function POST(req: Request) {
  try {
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

    let accountExists = !!user; // Zmienna określająca, czy konto już istnieje

    const userId: string =
      user?.id ||
      (
        await prisma.user.create({
          data: { username },
        })
      ).id;

    const eventType = user ? "logged_in" : "registered";

    await prisma.event.create({
      data: {
        event: eventType,
        user: { connect: { id: userId } },
      },
    });

    // Zwrot odpowiedzi, która zawiera informację, czy konto już istniało
    return NextResponse.json(
      {
        user: { id: userId, username },
        accountExists, // True jeśli konto już istniało, false jeśli zostało właśnie utworzone
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      {
        error: "An internal error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
