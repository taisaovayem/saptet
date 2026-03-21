export function formatTimeUnit(value: number) {
  if (value < 10) return `0${value}`;
  return value;
}

export function boxText(lines: string[], maxWidth = 50) {
  if (!lines.length) return "";

  function wrapLine(line: string) {
    const words = line.split(" ");
    const result: string[] = [];

    let current = "";

    for (const w of words) {
      if ((current + " " + w).trim().length > maxWidth) {
        result.push(current.trim());
        current = w;
      } else {
        current += " " + w;
      }
    }

    if (current.trim()) {
      result.push(current.trim());
    }

    return result;
  }

  // wrap tất cả dòng
  const wrapped = lines.flatMap(wrapLine);

  const maxLen = Math.max(...wrapped.map((l) => l.length));

  const top = "┌" + "─".repeat(maxLen + 2) + "┐";

  const bottom = "└" + "─".repeat(maxLen + 2) + "┘";

  const content = wrapped.map((l) => "│ " + l.padEnd(maxLen, " ") + " │");

  return [top, ...content, bottom].join("\n");
}
