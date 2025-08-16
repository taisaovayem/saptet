import { CopyLink } from "../../components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cách đặt trang chủ",
  description: "Hướng dẫn đặt làm trang chủ",
  openGraph: {
    title: "Cách đặt trang chủ",
    description: "Hướng dẫn đặt làm trang chủ",
    images: `https://${
      process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "saptet.taisaovayem.com"
    }/dem-nguoc-den-tet.jpg`,
  },
};

export default function SetHome() {
  return (
    <div className="mt-8 mx-auto w-full max-w-2xl">
      <h1 className="text-2xl p-4">
        Các trình duyệt Chromium (Google Chrome, Edge, Cốc Cốc, Opera,...)
      </h1>
      <p className="p-4">
        Settings &gt; On startup &gt; Open a specific page or set of pages &gt;
        Add new page
      </p>
      <p className="p-4">
        Hoặc truy cập nhanh chrome://settings/onStartup (
        <CopyLink
          label="Ấn để copy rồi dán lên thanh địa chỉ"
          url="chrome://settings/onStartup"
        />
        )
      </p>
      <p className="p-4">
        Điền https://saptet.taisaovayem.com (
        <CopyLink label="Ấn để copy" url="https://saptet.taisaovayem.com" />)
      </p>
      <p className="p-4">Add</p>
      <p className="p-4">Tắt tab, tất cả đã xong</p>
      <h1 className="text-2xl p-4">Trình duyệt Firefox</h1>
      <p className="p-4">Settings &gt; Home</p>
      <p className="p-4">
        Hoặc truy cập nhanh about:preferences#home (
        <CopyLink
          label="Ấn để copy rồi dán lên thanh địa chỉ"
          url="about:preferences#home"
        />
        )
      </p>
      <p className="p-4">
        Tại mục Homepage and new windows chọn Custom URLS...{" "}
      </p>
      <p className="p-4">
        Điền https://saptet.taisaovayem.com (
        <CopyLink label="Ấn để copy" url="https://saptet.taisaovayem.com" />)
      </p>
      <p className="p-4">Tắt tab, tất cả đã xong!</p>
    </div>
  );
}
