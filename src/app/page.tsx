import { countDown } from "@/helpers";
import { Banner, Search, Bookmark, EmbedLink } from "@/components";
import Link from "next/link";
import { Metadata } from "next";
import { Mode } from "@/types";

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
  mode: Mode;
};

export default async function Home({
  params,
}: {
  params: Promise<PostProps>;
}) {
  const { mode = "normal" } = await params;
  const count = countDown(mode);
  return (
    <div
      className="mx-auto w-full max-w-2xl text-center p-4"
      style={{ marginTop: "10vh" }}
    >
      <Banner remainMondays={count} />
      <Search />
      <Bookmark />
      <div className="absolute right-4 bottom-4">
        <EmbedLink />&nbsp; | &nbsp;
        <Link href="/set-home">Đặt làm trang chủ</Link>
      </div>
    </div>
  );
}
