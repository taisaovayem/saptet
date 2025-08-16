"use client";
import { countDown } from "@/helpers";
import { Banner } from "./Banner";
import { useEffect } from "react";

export function Embed() {
  useEffect(() => {
    const interval = setInterval(() => {
      location.reload();
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Banner remainMondays={countDown()} />
    </div>
  );
}
