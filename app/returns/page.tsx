import type { Metadata } from "next";
import {
  BulletList,
  DocumentFooter,
  DocumentHeader,
  LegalTokenText,
  Paragraph,
  SectionHeading,
  SubHeading,
  TableOfContents,
} from "@/components/legal/Document";
import { returns, shop, links } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Returns Policy",
  description:
    "No returns after handover at the counter. Warranty and manufacturer service cover post-sale defects.",
  path: "/returns",
  type: "article",
  noindex: true,
});

export default function ReturnsPolicyPage() {
  // Noindex: no BreadcrumbList JSON-LD, no sitemap entry, footer-only link.
  return (
    <main className="bg-paper">
      <article className="mx-auto max-w-[760px] px-4 md:px-6 py-12 md:py-16">
        <DocumentHeader
          title={returns.title}
          effectiveDate={returns.effectiveDate}
          appliesTo={returns.applicableTo}
          contactHref={links.email}
          contactLabel={shop.email}
          intro={returns.intro}
        />

        <TableOfContents items={returns.toc} />

        {/* § 1. The rule */}
        <SectionHeading n={returns.rule.n} id={returns.rule.id} title={returns.rule.title} />
        <Paragraph>{returns.rule.body}</Paragraph>
        <BulletList items={returns.rule.items} />

        {/* § 2. Why we do not accept returns */}
        <SectionHeading n={returns.why.n} id={returns.why.id} title={returns.why.title} />
        <Paragraph>{returns.why.intro}</Paragraph>
        <BulletList items={returns.why.items} />

        {/* § 3. What we check before you leave the counter */}
        <SectionHeading n={returns.check.n} id={returns.check.id} title={returns.check.title} />
        <Paragraph>{returns.check.intro}</Paragraph>
        <BulletList items={returns.check.items} />
        <Paragraph>{returns.check.outro}</Paragraph>

        {/* § 4. What remains available after every sale */}
        <SectionHeading n={returns.after.n} id={returns.after.id} title={returns.after.title} />
        <Paragraph>{returns.after.intro}</Paragraph>
        <dl className="mt-4 flex flex-col gap-6">
          {returns.after.subsections.map((s) => (
            <div key={s.subtitle}>
              <dt className="font-sans font-semibold text-ink text-base md:text-[17px] leading-snug flex gap-3">
                <span className="font-mono text-muted min-w-[2rem]">{s.n}</span>
                <span>{s.subtitle}</span>
              </dt>
              <dd className="mt-1.5 pl-[2.75rem] font-sans text-base md:text-[17px] leading-relaxed text-ink-2">
                <LegalTokenText text={s.body} />
              </dd>
            </div>
          ))}
        </dl>

        {/* § 5. Accessories and bundled items */}
        <SectionHeading n={returns.accessories.n} id={returns.accessories.id} title={returns.accessories.title} />
        <BulletList items={returns.accessories.items} />

        {/* § 6. Statutory consumer rights */}
        <SectionHeading n={returns.statutory.n} id={returns.statutory.id} title={returns.statutory.title} />
        <Paragraph>
          <LegalTokenText text={returns.statutory.body} />
        </Paragraph>

        {/* § 7. Contact and changes */}
        <SectionHeading n={returns.contact.n} id={returns.contact.id} title={returns.contact.title} />
        <Paragraph>
          <LegalTokenText text={returns.contact.body} />
        </Paragraph>
        <SubHeading>{returns.contact.changesTitle}</SubHeading>
        <Paragraph>{returns.contact.changesBody}</Paragraph>

        <DocumentFooter kind="Policy" effectiveDate={returns.effectiveDate} />
      </article>
    </main>
  );
}
