import { countDown } from "../helpers";
import { Banner, Search, Bookmark } from "../components";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="mx-auto w-full max-w-2xl text-center p-4"
      style={{ marginTop: "10vh" }}
    >
      <Banner remainMondays={countDown()} />
      <Search />
      <Bookmark />
      <div className="absolute right-4 bottom-4">
        <Link href="/set-home">Đặt làm trang chủ</Link>
      </div>
    </div>
  );
}
