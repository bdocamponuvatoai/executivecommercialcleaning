import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";
import { SmartLink } from "./smart-link";

type Variant = "primary" | "secondary" | "light" | "outline-light";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "arrow-right",
  leadingIcon,
  size,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: IconName | null;
  leadingIcon?: IconName;
  size?: "sm";
}) {
  const className = `btn btn-${variant}${size ? ` btn-${size}` : ""}`;
  return (
    <SmartLink href={href} className={className}>
      {leadingIcon ? <Icon name={leadingIcon} /> : null}
      <span>{children}</span>
      {icon ? <Icon name={icon} className="btn-arrow" /> : null}
    </SmartLink>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <SmartLink href={href} className="text-link">
      <span>{children}</span>
      <Icon name="arrow-right" />
    </SmartLink>
  );
}
