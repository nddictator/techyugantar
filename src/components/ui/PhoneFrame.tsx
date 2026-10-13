import Image from "next/image";
import { cx } from "./utils";

type PhoneFrameProps = {
  src: string;
  alt: string;
  /** CSS aspect ratio of the screenshot, e.g. "702/1522". */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** Minimal phone bezel around a portrait app screenshot. Width comes from the parent. */
export default function PhoneFrame({ src, alt, aspect = "720/1600", priority, sizes = "260px", className }: PhoneFrameProps) {
  return (
    <div
      className={cx(
        "relative rounded-[14%/6.5%] border border-white/10 bg-[#121316] p-[4%] shadow-[0_30px_70px_rgba(6,8,15,0.35)] ring-1 ring-black/10 dark:shadow-[0_40px_90px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[11%/5%]" style={{ aspectRatio: aspect }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  );
}
