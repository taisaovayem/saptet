type Props = { remainMondays: number };
import Image from "next/image";
import banner from "../assets/dem-nguoc-den-tet.jpg"; // Adjust the path as necessary

export function Banner({ remainMondays }: Props) {
  return (
    <div className="relative inline-block py-4">
      <Image src={banner} alt="Banner Image" width={500} height={300} />
      <div
        className="absolute font-patrick-hand text-black text-2xl md:text-4xl transform -translate-x-1/2 italic"
        style={{ top: "26%", left: "30.5%" }}
      >
        {remainMondays}
      </div>
    </div>
  );
}
