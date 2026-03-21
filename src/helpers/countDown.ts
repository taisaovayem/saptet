import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {
  LUNAR_NEW_YEARS,
  HolyDay,
  TIME_LINE,
  REPEAT_HOLYDAYS,
  LUNAR_HOLIDAYS,
} from "../constants";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
const HCM_TIME_ZONE = "Asia/Ho_Chi_Minh";

export function countDown(date?: string): number {
  let startDate = dayjs(date, "YYYY-MM-DD").tz(HCM_TIME_ZONE).startOf("date");

  const targetDate = dayjs(
    LUNAR_NEW_YEARS.find((date) =>
      dayjs(date).tz(HCM_TIME_ZONE).isSameOrAfter(startDate),
    ),
  )
    .tz(HCM_TIME_ZONE)
    .startOf("date");

  let count = 0;
  if (startDate.isSame(targetDate, "week")) {
    if (startDate.day() < 1) {
      return 1;
    }
    return 0;
  }
  while (startDate.isBefore(targetDate)) {
    if (startDate.day() === 1) {
      count++;
    }
    startDate = startDate.add(1, "day");
  }
  return count;
}

export function getCurrentTimeMinutes(): number {
  const current = dayjs().tz(HCM_TIME_ZONE);
  const hours = current.get("hours");
  const minues = current.get("minutes");
  const timeMinutes = hours * 60 + minues;
  return timeMinutes;
}

export function countTimeline() {
  const timeMinutes = getCurrentTimeMinutes();
  const matchTimeLine = TIME_LINE.find(
    (item) => item.start <= timeMinutes && item.end > timeMinutes,
  );
  return { timeMinutes, matchTimeLine };
}

export function countRemainDays(
  targetDate: dayjs.Dayjs,
  date?: dayjs.Dayjs,
): number {
  const startDate = date
    ? date.startOf("day")
    : dayjs().tz(HCM_TIME_ZONE).startOf("day");

  const endDate = targetDate.startOf("day");

  return endDate.diff(startDate, "day");
}

export function getRepeatHolyDays(
  holidays: HolyDay[],
  date?: string,
): { day: number; monday: number; name: string }[] {
  const now = date
    ? dayjs(date).tz(HCM_TIME_ZONE).startOf("day")
    : dayjs().tz(HCM_TIME_ZONE).startOf("day");

  const result: {
    day: number;
    monday: number;
    name: string;
  }[] = [];

  for (const h of holidays) {
    let target = dayjs()
      .tz(HCM_TIME_ZONE)
      .year(now.year())
      .month(h.month)
      .date(h.day)
      .startOf("day");

    if (target.isBefore(now)) {
      target = target.add(1, "year");
    }

    const remainDays = countRemainDays(target, now);

    if (remainDays >= 0 && remainDays <= 30) {
      const mondayCount = countDown(target.format("YYYY-MM-DD"));

      result.push({
        day: remainDays,
        monday: mondayCount,
        name: h.name,
      });
    }
  }

  result.sort((a, b) => a.day - b.day);

  return result;
}

const lunarFormatter = new Intl.DateTimeFormat("vi-VN-u-ca-chinese", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

function getLunarParts(date: Date) {
  const parts = lunarFormatter.formatToParts(date);

  const day = Number(parts.find((p) => p.type === "day")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const year = Number(parts.find((p) => p.type === "year")?.value);

  return { day, month, year };
}

function getSolarDateFromLunar(
  lunarDay: number,
  lunarMonth: number,
  year: number,
) {
  const start = dayjs().tz(HCM_TIME_ZONE).year(year).startOf("year");

  const end = start.endOf("year");

  let d = start;

  while (d.isBefore(end)) {
    const { day, month } = getLunarParts(d.toDate());

    if (day === lunarDay && month === lunarMonth) {
      return d.startOf("day");
    }

    d = d.add(1, "day");
  }

  return null;
}

export function getLunarHolyDays(
  holidays: HolyDay[],
  date?: string,
): { day: number; monday: number; name: string }[] {
  const now = date
    ? dayjs(date).tz(HCM_TIME_ZONE).startOf("day")
    : dayjs().tz(HCM_TIME_ZONE).startOf("day");

  const result: {
    day: number;
    monday: number;
    name: string;
  }[] = [];

  for (const h of holidays) {
    let target = getSolarDateFromLunar(h.day, h.month, now.year());

    if (!target) continue;

    // nếu đã qua → sang năm sau
    if (target.isBefore(now)) {
      target = getSolarDateFromLunar(h.day, h.month, now.year() + 1);
    }

    if (!target) continue;

    const remainDays = countRemainDays(target, now);

    if (remainDays >= 0 && remainDays <= 30) {
      const mondayCount = countDown(target.format("YYYY-MM-DD"));

      result.push({
        day: remainDays,
        monday: mondayCount,
        name: h.name,
      });
    }
  }

  result.sort((a, b) => a.day - b.day);

  return result;
}

export function getHolyDayText(date?: string) {
  const repeatHolydays = getRepeatHolyDays(REPEAT_HOLYDAYS, date);
  const lunarHolydays = getLunarHolyDays(LUNAR_HOLIDAYS, date);

  const all = [
    ...lunarHolydays.map((i) => ({ ...i, isLunar: true })),
    ...repeatHolydays.map((i) => ({ ...i, isLunar: false })),
  ];

  const sorted = all.sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;

    if (a.isLunar && !b.isLunar) return -1;
    if (!a.isLunar && b.isLunar) return 1;

    return 0;
  });

  const todayHolydays = sorted.filter((i) => i.day === 0);
  const remainHolydays = sorted.filter((i) => i.day !== 0);

  const todayHolydayText = todayHolydays.length
    ? todayHolydays.map((i) => `Hôm nay là ${i.name}`).join(", ")
    : "";
  const remainHolydayText = remainHolydays.length
    ? `Còn ${remainHolydays
        .map((item) => `${item.day} ngày nữa là đến ${item.name}`)
        .join(", ")}`
    : "";
  return {
    todayHolydayText,
    remainHolydayText,
  };
}
