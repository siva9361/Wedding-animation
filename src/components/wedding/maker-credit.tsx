import Image from "next/image";
import { Phone } from "lucide-react";
import { maker } from "@/lib/wedding-config";

// The Mecatronix mark on the dark bar that closes every page.
export function MakerCredit() {
  return (
    <div className="maker-credit" lang="en">
      <Image
        className="maker-logo"
        src="/images/mecatronix-logo.webp"
        alt="Mecatronix logo"
        width={155}
        height={192}
        sizes="48px"
      />
      <div className="maker-text">
        <span className="maker-eyebrow">Designed &amp; crafted by</span>
        <strong aria-label={maker.name}>{maker.brand}</strong>
        <span className="maker-company">
          Software Development<span className="maker-dot"> · </span>
          <span className="maker-city">{maker.city}</span>
        </span>
        <a className="maker-phone" href={"tel:" + maker.tel}>
          <Phone size={12} />
          {maker.phone}
        </a>
      </div>
    </div>
  );
}
