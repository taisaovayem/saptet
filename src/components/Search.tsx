"use client";
import { useEffect, useRef, useState } from "react";

export function Search() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form action="https://www.google.com/search" method="GET">
      <input
        ref={inputRef}
        autoComplete="off"
        type="text"
        name="q"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full h-10 border-gray-300 dark:border-gray-600 border rounded-4xl placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 outline-none"
        placeholder="Tìm với Google"
      />
    </form>
  );
}
