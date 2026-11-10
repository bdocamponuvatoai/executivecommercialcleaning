import Image from "next/image";
import Link from "next/link";
import mark from "@/assets/images/executive-mark.webp";

export function Brand() {
  return (
    // The accessible name is the visible wordmark: "Executive Commercial Cleaning".
    <Link href="/" className="brand">
      <Image
        src={mark}
        alt=""
        className="brand-mark"
        width={36}
        height={39}
        loading="eager"
      />
      <span className="brand-name">
        {"Executive "}
        <span>Commercial Cleaning</span>
      </span>
    </Link>
  );
}

/** Three vertical bars in the logo's accent colours (the building edges in the mark). */
export function Stripes() {
  return (
    <span className="stripes" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
