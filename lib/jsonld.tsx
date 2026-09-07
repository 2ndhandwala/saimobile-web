import {
  BREADCRUMBS,
  buildBreadcrumbData,
  buildFaqData,
  buildLocalBusinessData,
  type BreadcrumbItem,
} from "./jsonld-payloads";

export { BREADCRUMBS };
export type { BreadcrumbItem };

function InlineJsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbListJsonLd({
  items,
}: {
  items: readonly BreadcrumbItem[];
}) {
  return <InlineJsonLd data={buildBreadcrumbData(items)} />;
}

export function LocalBusinessJsonLd() {
  return <InlineJsonLd data={buildLocalBusinessData()} />;
}

export function FaqJsonLd() {
  return <InlineJsonLd data={buildFaqData()} />;
}
