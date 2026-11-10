"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { spaces } from "@/content/spaces";
import { TextLink } from "@/components/ui/button-link";
import { Checklist } from "@/components/ui/checklist";
import { SiteImage } from "@/components/ui/site-image";

/** WAI-ARIA tabs: arrow keys move between tabs, Home/End jump to the ends. */
export function SpaceExplorer() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = spaces.length - 1;
    const following = index === last ? 0 : index + 1;
    const previous = index === 0 ? last : index - 1;
    const targets: Record<string, number> = {
      ArrowRight: following,
      ArrowDown: following,
      ArrowLeft: previous,
      ArrowUp: previous,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="explorer">
      <div className="explorer-tabs" role="tablist" aria-label="Spaces">
        {spaces.map((space, index) => (
          <button
            key={space.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`space-tab-${space.id}`}
            aria-selected={selected === index}
            aria-controls={`space-panel-${space.id}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {space.name}
          </button>
        ))}
      </div>
      {spaces.map((space, index) => (
        <div
          key={space.id}
          role="tabpanel"
          id={`space-panel-${space.id}`}
          aria-labelledby={`space-tab-${space.id}`}
          className="explorer-panel"
          hidden={selected !== index}
        >
          <SiteImage
            image={space.image}
            className="explorer-media"
            sizes="(min-width: 64rem) 50vw, 100vw"
          />
          <div className="explorer-copy">
            <h3>{space.title}</h3>
            <p>{space.text}</p>
            <Checklist items={space.items} />
            <TextLink
              href={`/contact/?space=${encodeURIComponent(space.name)}`}
            >
              Let’s talk about your space
            </TextLink>
          </div>
        </div>
      ))}
    </div>
  );
}
