import { Embed } from "@/components";
import { countDown } from "@/helpers";
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

export default async function EmbedPage({ searchParams }: { searchParams: Promise<PostProps> }) {
  const { date } = await searchParams;
  const count = countDown(date);
  return <Embed count={count}/>;
}
