"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { images } from "@/content/images";
import { work } from "@/content/work";
import { Icon } from "@/components/ui/icon";

export function WorkGallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (active !== null && dialog && !dialog.open) dialog.showModal();
  }, [active]);

  const move = (step: number) =>
    setActive((index) =>
      index === null ? 0 : (index + step + work.length) % work.length,
    );
  const close = () => dialogRef.current?.close();
  const photo = active === null ? null : work[active];

  return (
    <>
      <ul className="gallery">
        {work.map((item, index) => (
          <li key={item.image}>
            <button
              type="button"
              className="gallery-open"
              aria-label={`View larger: ${item.title}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActive(index);
              }}
            >
              <Image
                src={images[item.image].src}
                alt={images[item.image].alt}
                sizes="(min-width: 48rem) 33vw, 100vw"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <span className="gallery-zoom">
                <Icon name="plus" />
              </span>
            </button>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Work photographs"
        onClose={() => {
          setActive(null);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
        }}
      >
        {photo && active !== null ? (
          <div className="lightbox-inner">
            <div className="lightbox-bar">
              <p>
                <strong>{photo.title}</strong>
                <span>{`${active + 1} / ${work.length}`}</span>
              </p>
              <button
                type="button"
                className="icon-button"
                aria-label="Close"
                onClick={close}
              >
                <Icon name="close" />
              </button>
            </div>
            <Image
              src={images[photo.image].src}
              alt={images[photo.image].alt}
              sizes="90vw"
            />
            <div className="lightbox-bar">
              <p>{photo.description}</p>
              <div className="lightbox-nav">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Previous photograph"
                  onClick={() => move(-1)}
                >
                  <Icon name="arrow-left" />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Next photograph"
                  onClick={() => move(1)}
                >
                  <Icon name="arrow-right" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
