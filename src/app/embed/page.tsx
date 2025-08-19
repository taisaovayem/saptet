import { Embed } from "@/components";
import { countDown } from "@/helpers";
import { Mode } from "@/types";
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
  mode: Mode;
};

export default async function EmbedPage({ params }: { params: Promise<PostProps> }) {
  const { mode = "normal" } = await params;
  const count = countDown(mode);
  return <Embed count={count}/>;
}
