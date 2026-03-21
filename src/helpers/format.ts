export function formatTimeUnit(value: number) {
  if (value < 10) return `0${value}`;
  return value;
}

export function boxText(lines: string[]) {
  if (!lines.length) return "";

  const maxLen = Math.max(...lines.map(l => l.length));

  const top =
    "┌" + "─".repeat(maxLen + 2) + "┐";

  const bottom =
    "└" + "─".repeat(maxLen + 2) + "┘";

  const content = lines.map(
    l => "│ " + l.padEnd(maxLen, " ") + " │"
  );

  return [top, ...content, bottom].join("\n");
}
