import { getHolyDayText } from "@/helpers";

type CountHolyDaysProps = {
  date?: string;
};

export function CountHolydays({ date }: CountHolyDaysProps) {
  const { remainHolydayText, todayHolydayText } = getHolyDayText(date);

  return (
    <div className="text-xs py-4 text-gray-600 dark:text-gray-300">
      {todayHolydayText.length > 0 && <div>{todayHolydayText}</div>}
      {remainHolydayText.length > 0 && <div>{remainHolydayText}</div>}
    </div>
  );
}
