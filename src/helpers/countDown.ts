import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { LUNAR_NEW_YEARS, TIME_LINE } from "../constants";

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
