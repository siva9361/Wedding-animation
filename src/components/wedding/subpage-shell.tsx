import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { coupleNames, invitation } from "@/lib/wedding-config";
import { MakerCredit } from "./maker-credit";
import { RoyalDivider } from "./temple-ornaments";

// The frame shared by the pages that sit beside the invitation (venues, sharing).
export function SubpageShell({
  eyebrow,
  title,
  tamilTitle,
  children,
}: {
  eyebrow: string;
  title: string;
  tamilTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="subpage">
      <header className="subpage-header">
        <Link href="/" className="subpage-back">
          <ArrowLeft size={16} />
          <span lang="en">Back to the invitation</span>
        </Link>
        <span className="subpage-monogram" lang="en" aria-label={coupleNames}>
          {invitation.monogram}
        </span>
      </header>
      <section className="subpage-hero">
        <Image
          className="subpage-vinayagar"
          src="/images/vinayagar.webp"
          alt="விநாயகர்"
          width={190}
          height={255}
          sizes="56px"
          loading="eager"
        />
        <p className="eyebrow" lang="en">
          {eyebrow}
        </p>
        <h1 className="section-title" lang="en">
          {title}
        </h1>
        <p className="subpage-tamil">{tamilTitle}</p>
        <RoyalDivider />
      </section>
      <div className="subpage-body">{children}</div>
      <footer className="royal-finale">
        <p className="finale-tamil">{invitation.welcome}</p>
        <p className="finale-family">{invitation.closing}</p>
      </footer>
      <MakerCredit />
    </div>
  );
}
