import Link from "next/link";
import { serviceHref, services } from "@/content/services";
import { Icon } from "@/components/ui/icon";

/** Compact list of every service, or every service except `exclude`. */
export function ServiceIndex({ exclude }: { exclude?: string }) {
  return (
    <ul className="service-index">
      {services
        .filter((service) => service.slug !== exclude)
        .map((service) => (
          <li key={service.slug}>
            <Link href={serviceHref(service.slug)}>
              <h3>{service.name}</h3>
              <p>{service.short}</p>
              <span className="service-index-arrow">
                <Icon name="arrow-right" />
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
