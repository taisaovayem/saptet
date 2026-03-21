import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { boxText, countDown, getHolyDayText } from "@/helpers";

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 100;

export async function proxy(request: NextRequest) {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for") ??
    "anonymous";

  const now = Date.now();

  const data = rateLimitMap.get(ip);

  if (!data) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  } else {
    if (now - data.timestamp < WINDOW_SIZE) {
      data.count += 1;

      if (data.count > MAX_REQUESTS) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }
  }

  const ua = request.headers.get("user-agent") || "";
  const accept = request.headers.get("accept") || "";

  const cliAgents = [
    "curl",
    "wget",
    "httpie",
    "node-fetch",
    "python-requests",
    "go-http-client",
  ];

  const isCli =
    cliAgents.some((x) => ua.toLowerCase().includes(x)) ||
    !accept.includes("text/html");

  if (isCli && request.nextUrl.pathname === "/") {
    const date = request.nextUrl.searchParams.get("date") ?? undefined;

    const count = countDown(date);
    const { remainHolydayText, todayHolydayText } = getHolyDayText(date);
    const messages = [`Còn ${count} cái thứ hai nữa là đến tết`];
    if (todayHolydayText.length) {
      messages.push(todayHolydayText);
    }
    if (remainHolydayText.length) {
      messages.push(remainHolydayText);
    }

    try {
      const lichResponse = await fetch("https://lich.day", {
        headers: {
          "User-Agent": "curl",
        },
        cache: "no-store",
      });
      const lichText = await lichResponse.text();
      return new NextResponse(
        "\n\n\n" +
          boxText(messages) +
          "\n\n\n\n\n Âm lịch (nguồn: lich.day): \n\n\n" +
          lichText +
          "\n",
        {
          headers: {
            "Content-Type": "text/plain",
          },
        },
      );
    } catch {
      return new NextResponse(boxText(messages) + "\n");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
