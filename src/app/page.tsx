import { countDown, countTimeline } from "@/helpers";
import { Banner, Search, Bookmark, EmbedLink, CountTimeline } from "@/components";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sắp Tết",
  description: "Còn bao nhiêu ngày nữa thì đến Tết?",
  openGraph: {
    title: "Sắp Tết",
    description: "Còn bao nhiêu ngày nữa thì đến Tết?",
    images: `https://${
      process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "saptet.taisaovayem.com"
    }/dem-nguoc-den-tet.jpg`,
  },
};

type PostProps = {
  date: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<PostProps>;
}) {
  const { date } = await searchParams;
  const count = countDown(date);
  const { matchTimeLine, timeMinues } = countTimeline();
  return (
    <div
      className="mx-auto w-full max-w-2xl text-center p-4"
      style={{ marginTop: "10vh" }}
    >
      <Banner remainMondays={count} />
      <Search />
      <Bookmark />
      <CountTimeline timeMinues={timeMinues} matchTimeLine={matchTimeLine}/>
      <div className="absolute right-4 bottom-4">
        <EmbedLink />&nbsp; | &nbsp;
        <Link href="/set-home">Đặt làm trang chủ</Link>
      </div>
    </div>
  );
}
