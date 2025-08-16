"use client";
import { useState } from "react";

type Props = {
  url: string;
  label: string;
};

export function CopyLink({ url, label }: Props) {
  const [copied, setCopied] = useState<boolean>(false);
  function copyUrl() {
    navigator.clipboard.writeText(url);
    setCopied(true);
  }
  return (
    <a className="text-blue-700 dark:text-blue-400 cursor-pointer" onClick={copyUrl}>
      {!copied ? label : "Đã copy"}
    </a>
  );
}

export function EmbedLink() {
  const [copied, setCopied] = useState<boolean>(false);
  function copyUrl() {
    const content = `<iframe width="640" height="300" src="https://saptet.taisaovayem.com/embed" title="Sắp Tết" frameborder="0" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    navigator.clipboard.writeText(content);
    setCopied(true);
  }
  return <a className="cursor-pointer" onClick={copyUrl}>{!copied ? "Nhúng vào web" : "Đã copy"}</a>;
}
