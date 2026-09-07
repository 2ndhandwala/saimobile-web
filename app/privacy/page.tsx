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
import { privacy, shop, links } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How this website collects, uses, retains and protects your personal data, under India's DPDPA 2023.",
  path: "/privacy",
  type: "article",
  noindex: true,
});

export default function PrivacyPolicyPage() {
  // Noindex: no BreadcrumbList JSON-LD, no sitemap entry, footer-only link.
  return (
    <main className="bg-paper">
      <article className="mx-auto max-w-[760px] px-4 md:px-6 py-12 md:py-16">
        <DocumentHeader
          title={privacy.title}
          effectiveDate={privacy.effectiveDate}
          appliesTo={privacy.applicableTo}
          contactHref={links.emailPrivacy}
          contactLabel={shop.privacyEmail}
          intro={privacy.intro}
        />

        <TableOfContents items={privacy.toc} />

        {/* § 1. What we collect */}
        <SectionHeading n={privacy.collect.n} id={privacy.collect.id} title={privacy.collect.title} />
        <Paragraph>{privacy.collect.intro}</Paragraph>
        {privacy.collect.sources.map((s) => (
          <div key={s.title}>
            <SubHeading>{s.title}</SubHeading>
            <Paragraph>
              <LegalTokenText text={s.body} />
            </Paragraph>
          </div>
        ))}

        {/* § 2. What we do not do */}
        <SectionHeading n={privacy.no.n} id={privacy.no.id} title={privacy.no.title} />
        <Paragraph>{privacy.no.intro}</Paragraph>
        <BulletList items={privacy.no.items} />

        {/* § 3. Third parties and processors */}
        <SectionHeading n={privacy.processors.n} id={privacy.processors.id} title={privacy.processors.title} />
        <Paragraph>{privacy.processors.intro}</Paragraph>
        <dl className="mt-4 flex flex-col gap-5">
          {privacy.processors.items.map((p) => (
            <div key={p.title}>
              <dt className="font-sans font-semibold text-ink text-base md:text-[17px] leading-snug">
                {p.title}
              </dt>
              <dd className="mt-1.5 font-sans text-base md:text-[17px] leading-relaxed text-ink-2">
                <LegalTokenText text={p.body} />
              </dd>
            </div>
          ))}
        </dl>

        {/* § 4. Retention and security */}
        <SectionHeading n={privacy.retention.n} id={privacy.retention.id} title={privacy.retention.title} />
        <Paragraph>{privacy.retention.intro}</Paragraph>

        <SubHeading>{privacy.retention.retentionSubtitle}</SubHeading>
        <BulletList items={privacy.retention.retentionItems} />

        <SubHeading>{privacy.retention.securitySubtitle}</SubHeading>
        <BulletList items={privacy.retention.securityItems} />

        {/* § 5. Cookies and tracking */}
        <SectionHeading n={privacy.cookies.n} id={privacy.cookies.id} title={privacy.cookies.title} />
        <Paragraph>{privacy.cookies.intro}</Paragraph>
        <dl className="mt-4 flex flex-col gap-5">
          {privacy.cookies.items.map((c) => (
            <div key={c.title}>
              <dt className="font-sans font-semibold text-ink text-base md:text-[17px] leading-snug">
                {c.title}
              </dt>
              <dd className="mt-1.5 font-sans text-base md:text-[17px] leading-relaxed text-ink-2">
                {c.body}
              </dd>
            </div>
          ))}
        </dl>
        <Paragraph>
          <LegalTokenText text={privacy.cookies.consentNote} />
        </Paragraph>

        {/* § 6. Your rights under DPDPA 2023 */}
        <SectionHeading n={privacy.rights.n} id={privacy.rights.id} title={privacy.rights.title} />
        <Paragraph>
          <LegalTokenText text={privacy.rights.intro} />
        </Paragraph>
        <ol className="mt-4 flex flex-col gap-5 list-none pl-0">
          {privacy.rights.items.map((r, i) => (
            <li key={r.title}>
              <div className="flex gap-3 items-baseline">
                <span className="font-mono text-xs md:text-sm text-muted min-w-[1.75rem]">
                  6.{i + 1}
                </span>
                <span className="font-sans font-semibold text-ink text-base md:text-[17px] leading-snug">
                  {r.title}
                </span>
              </div>
              <p className="mt-1.5 pl-[2.75rem] font-sans text-base md:text-[17px] leading-relaxed text-ink-2">
                <LegalTokenText text={r.body} />
              </p>
            </li>
          ))}
        </ol>

        {/* § 7. Grievance Officer */}
        <SectionHeading n={privacy.grievance.n} id={privacy.grievance.id} title={privacy.grievance.title} />
        <Paragraph>
          <LegalTokenText text={privacy.grievance.body} />
        </Paragraph>

        {/* § 8. Contact and changes */}
        <SectionHeading n={privacy.contact.n} id={privacy.contact.id} title={privacy.contact.title} />
        <Paragraph>
          <LegalTokenText text={privacy.contact.body} />
        </Paragraph>
        <SubHeading>{privacy.contact.changesTitle}</SubHeading>
        <Paragraph>{privacy.contact.changesBody}</Paragraph>

        <DocumentFooter kind="Policy" effectiveDate={privacy.effectiveDate} />
      </article>
    </main>
  );
}
