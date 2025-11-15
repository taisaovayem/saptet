"use client";
import { TimeLine } from "@/constants";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

type CountTimelineProps = {
  matchTimeLine?: TimeLine;
  timeMinues: number;
};

export function CountTimeline({
  matchTimeLine,
  timeMinues,
}: CountTimelineProps) {
  const [countDownMinues, setCountdownMinues] = useState(
    matchTimeLine ? matchTimeLine.end - timeMinues : 0
  );
  const message = matchTimeLine?.message.replaceAll(
    "{{count}}",
    countDownMinues.toString()
  );
  useEffect(() => {
    const initMinutes = dayjs().get('minutes');
    let previousMinutes = initMinutes;
    const interval = setInterval(() => {
        const currentMinutes = dayjs().get('minutes')
        if (currentMinutes !== previousMinutes) {
            setCountdownMinues(previous => previous - 1)
            previousMinutes = currentMinutes;
        }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (countDownMinues === 0) {
      window.location.reload();
    }
  }, [countDownMinues])
  if (!matchTimeLine) return null;
  return <div className="w-full text-center">{message}</div>;
}
