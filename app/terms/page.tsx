import type { Metadata } from "next";
import {
  BulletList,
  DocumentFooter,
  DocumentHeader,
  Paragraph,
  SectionHeading,
  SubHeading,
  TableOfContents,
} from "@/components/legal/Document";
import { terms, shop, links } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms governing use of this website and the enquiry channels. Separate from the bill and warranty at the counter.",
  path: "/terms",
  type: "article",
  noindex: true,
});

export default function TermsPage() {
  // Noindex: no BreadcrumbList JSON-LD, no sitemap entry, footer-only link.
  return (
    <main className="bg-paper">
      <article className="mx-auto max-w-[760px] px-4 md:px-6 py-12 md:py-16">
        <DocumentHeader
          title={terms.title}
          effectiveDate={terms.effectiveDate}
          appliesTo={terms.applicableTo}
          contactHref={links.email}
          contactLabel={shop.email}
          intro={terms.intro}
        />

        <TableOfContents items={terms.toc} />

        {/* § 1. Scope */}
        <SectionHeading n={terms.scope.n} id={terms.scope.id} title={terms.scope.title} />
        <Paragraph>{terms.scope.intro}</Paragraph>
        <SubHeading>{terms.scope.covers.subtitle}</SubHeading>
        <BulletList items={terms.scope.covers.items} />
        <SubHeading>{terms.scope.doesNotCover.subtitle}</SubHeading>
        <BulletList items={terms.scope.doesNotCover.items} />

        {/* § 2. Who runs this website */}
        <SectionHeading n={terms.operator.n} id={terms.operator.id} title={terms.operator.title} />
        <Paragraph>{terms.operator.body}</Paragraph>
        <SubHeading>{terms.operator.contactSubtitle}</SubHeading>
        <ul className="mt-3 flex flex-col gap-2 font-sans text-base md:text-[17px] leading-relaxed text-ink-2 list-none pl-0">
          {terms.operator.contact.map((it, i) => (
            <li key={i} className="font-mono text-sm md:text-[15px] text-ink-2">
              {it}
            </li>
          ))}
        </ul>

        {/* § 3. Acceptable use */}
        <SectionHeading n={terms.use.n} id={terms.use.id} title={terms.use.title} />
        <Paragraph>{terms.use.intro}</Paragraph>
        <BulletList items={terms.use.items} />
        <Paragraph>{terms.use.outro}</Paragraph>

        {/* § 4. Enquiries, quotes, and forms */}
        <SectionHeading n={terms.enquiries.n} id={terms.enquiries.id} title={terms.enquiries.title} />
        <Paragraph>{terms.enquiries.intro}</Paragraph>
        <BulletList items={terms.enquiries.items} />

        {/* § 5. Off-site links */}
        <SectionHeading n={terms.offSite.n} id={terms.offSite.id} title={terms.offSite.title} />
        <Paragraph>{terms.offSite.intro}</Paragraph>
        <BulletList items={terms.offSite.items} />
        <Paragraph>{terms.offSite.outro}</Paragraph>

        {/* § 6. Intellectual property */}
        <SectionHeading n={terms.ip.n} id={terms.ip.id} title={terms.ip.title} />
        <Paragraph>{terms.ip.intro}</Paragraph>
        <BulletList items={terms.ip.items} />

        {/* § 7. Website availability */}
        <SectionHeading n={terms.availability.n} id={terms.availability.id} title={terms.availability.title} />
        <Paragraph>{terms.availability.intro}</Paragraph>
        <BulletList items={terms.availability.items} />

        {/* § 8. Limitation of liability */}
        <SectionHeading n={terms.liability.n} id={terms.liability.id} title={terms.liability.title} />
        <Paragraph>{terms.liability.intro}</Paragraph>
        <BulletList items={terms.liability.items} />

        {/* § 9. Governing law */}
        <SectionHeading n={terms.law.n} id={terms.law.id} title={terms.law.title} />
        <Paragraph>{terms.law.body}</Paragraph>
        <BulletList items={terms.law.items} />

        {/* § 10. Changes */}
        <SectionHeading n={terms.changes.n} id={terms.changes.id} title={terms.changes.title} />
        <Paragraph>{terms.changes.body}</Paragraph>

        {/* § 11. Contact */}
        <SectionHeading n={terms.contact.n} id={terms.contact.id} title={terms.contact.title} />
        <Paragraph>{terms.contact.body}</Paragraph>

        <DocumentFooter kind="Terms" effectiveDate={terms.effectiveDate} />
      </article>
    </main>
  );
}
