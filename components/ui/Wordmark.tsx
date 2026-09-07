import Link from "next/link";
import Image from "next/image";
import { shop } from "@/content";

/** Logo link used in the header. Only the logo-only variant is in use;
 * a text wordmark can be added back when a second call site needs it. */
export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 md:gap-3 group">
      <span className="relative h-20 w-20 md:h-24 md:w-24 shrink-0">
        <Image
          src="/images/logo.png"
          alt={`${shop.legalName} logo`}
          fill
          priority
          sizes="(min-width: 768px) 96px, 80px"
          className="object-contain"
        />
      </span>
    </Link>
  );
}
