import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * Internal paths ("/...") use next/link for client-side navigation.
 * tel:, mailto:, hash and external links render a plain <a>, keeping any target/rel as given.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
