import { LUNAR_HOLIDAYS, REPEAT_HOLYDAYS } from "@/constants";
import { getLunarHolyDays, getRepeatHolyDays } from "@/helpers";

type CountHolyDaysProps = {
  date?: string;
};

export function CountHolydays({ date }: CountHolyDaysProps) {
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

  return (
    <div className="text-xs py-4">
      {/* hôm nay */}
      {todayHolydays.length > 0 && (
        <div>
          {todayHolydays
            .map((i) => `Hôm nay là ${i.name}`)
            .join(", ")}
        </div>
      )}
      {remainHolydays.length > 0 && (
        <div>
          Còn{" "}
          {remainHolydays
            .map((item) => `${item.day} ngày nữa là đến ${item.name}`)
            .join(", ")}
        </div>
      )}
    </div>
  );
}