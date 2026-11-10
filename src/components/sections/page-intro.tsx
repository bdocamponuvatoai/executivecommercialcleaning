import type { ReactNode } from "react";

export function PageIntro({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      {children}
    </section>
  );
}
