"use client";
import { Banner } from "./Banner";
import { useEffect } from "react";

type Props = {
  count: number;
};

export function Embed({ count }: Props) {
  useEffect(() => {
    const interval = setInterval(() => {
      location.reload();
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Banner remainMondays={count} />
    </div>
  );
}
