"use client"
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
  return <a className="text-blue-700 dark:text-blue-400" onClick={copyUrl}>{!copied ? label : "Đã copy"}</a>;
}
