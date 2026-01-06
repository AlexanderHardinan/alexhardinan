import Link from 'next/link';

export type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="breadcrumbs__list">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;

          return (
            <li key={`${c.label}-${i}`} className="breadcrumbs__item">
              {c.href && !isLast ? (
                <Link href={c.href} className="breadcrumbs__link">
                  {c.label}
                </Link>
              ) : (
                <span className="breadcrumbs__current" aria-current={isLast ? 'page' : undefined}>
                  {c.label}
                </span>
              )}

              {!isLast && <span className="breadcrumbs__sep">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
