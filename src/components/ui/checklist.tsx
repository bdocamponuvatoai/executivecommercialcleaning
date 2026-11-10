import { Icon } from "./icon";

export function Checklist({
  items,
  columns,
}: {
  items: string[];
  columns?: 2;
}) {
  return (
    <ul className={columns ? "checklist checklist-2" : "checklist"}>
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" />
          {item}
        </li>
      ))}
    </ul>
  );
}
