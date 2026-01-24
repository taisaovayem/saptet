type Props = { remainMondays: number };

export function Banner({ remainMondays }: Props) {
  return (
    <div className="relative inline-block py-4">
      <img src="/dem-nguoc-den-tet.jpg" alt="Banner Image" width={500} height={300} />
      <div
        className="absolute font-patrick-hand text-black text-2xl sm:text-4xl transform -translate-x-1/2 italic"
        style={{ top: "26%", left: "30.5%" }}
      >
        {remainMondays}
      </div>
    </div>
  );
}
