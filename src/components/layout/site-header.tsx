"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contactHref, mainNav, site } from "@/config/site";
import { Brand } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

const DESKTOP_QUERY = "(min-width: 64rem)";

const normalize = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

export function SiteHeader() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onResize = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenOnPath(null);
    };
    document.documentElement.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const current = normalize(pathname);
  const isCurrent = (href: string) => normalize(href) === current;
  const inSection = (href: string) => current.startsWith(normalize(href));
  const close = () => setOpenOnPath(null);

  return (
    <header className="site-header" data-open={open || undefined}>
      <div className="container header-bar">
        <Brand />
        <nav className="header-nav" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              data-section={inSection(item.href) || undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={site.phone.href}>
            <Icon name="phone" />
            <span>{site.phone.display}</span>
          </a>
          <span className="header-cta">
            <ButtonLink href={contactHref} size="sm">
              Request a walkthrough
            </ButtonLink>
          </span>
          <a
            className="icon-button header-call"
            href={site.phone.href}
            aria-label={`Call ${site.phone.display}`}
          >
            <Icon name="phone" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenOnPath(open ? null : pathname)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
      >
        <div className="container">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={close}
                >
                  {item.label}
                  <Icon name="arrow-right" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-actions">
            <ButtonLink href={contactHref}>Request a walkthrough</ButtonLink>
            <ButtonLink
              href={site.phone.href}
              variant="secondary"
              leadingIcon="phone"
              icon={null}
            >
              {site.phone.display}
            </ButtonLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
