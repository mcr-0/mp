import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export async function GET() {
  const timeZone = "Europe/Warsaw";

  // Pobierz aktualną datę i czas w strefie czasowej Warsaw
  const nowInWarsaw = DateTime.now().setZone(timeZone);

  // Początek dnia dzisiejszego w Warsaw
  const startOfTodayWarsaw = nowInWarsaw.startOf("day");

  // Początek dnia jutrzejszego w Warsaw (czyli koniec dzisiejszego dnia)
  const startOfTomorrowWarsaw = startOfTodayWarsaw.plus({ days: 1 });

  // Początek dnia wczorajszego w Warsaw
  const startOfYesterdayWarsaw = startOfTodayWarsaw.minus({ days: 1 });

  // Zlicz użytkowników zarejestrowanych dzisiaj
  const todayCount = await prisma.user.count({
    where: {
      created_at: {
        gte: startOfTodayWarsaw.toJSDate(),
        lt: startOfTomorrowWarsaw.toJSDate(),
      },
    },
  });

  // Zlicz użytkowników zarejestrowanych wczoraj
  const yesterdayCount = await prisma.user.count({
    where: {
      created_at: {
        gte: startOfYesterdayWarsaw.toJSDate(),
        lt: startOfTodayWarsaw.toJSDate(),
      },
    },
  });

  // Sumuj payout z tabeli Postback dla dzisiaj
  const todayPayout = await prisma.postback.aggregate({
    _sum: {
      payout: true,
    },
    where: {
      created_at: {
        gte: startOfTodayWarsaw.toJSDate(),
        lt: startOfTomorrowWarsaw.toJSDate(),
      },
    },
  });

  // Sumuj payout z tabeli Postback dla wczoraj
  const yesterdayPayout = await prisma.postback.aggregate({
    _sum: {
      payout: true,
    },
    where: {
      created_at: {
        gte: startOfYesterdayWarsaw.toJSDate(),
        lt: startOfTodayWarsaw.toJSDate(),
      },
    },
  });

  return NextResponse.json({
    today: {
      count: todayCount,
      payout: todayPayout._sum.payout || 0,
      payoutPerUser:
        todayCount > 0 ? (todayPayout._sum.payout || 0) / todayCount : 0,
    },
    yesterday: {
      count: yesterdayCount,
      payout: yesterdayPayout._sum.payout || 0,
      payoutPerUser:
        yesterdayCount > 0
          ? (yesterdayPayout._sum.payout || 0) / yesterdayCount
          : 0,
    },
  });
}
