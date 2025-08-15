import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { LUNAR_NEW_YEARS } from "../constants";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

const HCM_TIME_ZONE = "Asia/Ho_Chi_Minh";

export function countDown(): number {
  let startDate = dayjs().tz(HCM_TIME_ZONE).startOf("date");

  const targetDate = dayjs(
    LUNAR_NEW_YEARS.find((date) =>
      dayjs(date).tz(HCM_TIME_ZONE).isSameOrAfter(startDate)
    )
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
