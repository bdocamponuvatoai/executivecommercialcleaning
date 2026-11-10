import Image from "next/image";
import { images, type ImageKey } from "@/content/images";

/**
 * A content image in a rounded frame. AI-generated images always carry a
 * visible "Illustrative image" label.
 */
export function SiteImage({
  image,
  className,
  sizes,
  eager = false,
}: {
  image: ImageKey;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const { src, alt, illustrative } = images[image];
  return (
    <div className={className ? `media ${className}` : "media"}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        placeholder="empty"
        {...(eager
          ? { loading: "eager", fetchPriority: "high" }
          : { loading: "lazy" })}
      />
      {illustrative ? (
        <span className="media-tag">Illustrative image</span>
      ) : null}
    </div>
  );
}
