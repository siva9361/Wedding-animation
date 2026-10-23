"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { invitation } from "@/lib/wedding-config";
import { PortalGarlandSway, PortalLampFlames, RoyalDivider } from "./temple-ornaments";

export function InvitationCover({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  const reception =
    invitation.events.find((event) => event.id === "reception") ?? invitation.events[0];
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(reception.date));
  return (
    <section
      className={"gate-world " + (opening ? "gate-opening" : "")}
      aria-label="Wedding invitation cover"
    >
      <div className="gate-backdrop" aria-hidden="true" />
      <div className="gate-side-mark" aria-hidden="true">
        <span>{invitation.monogram}</span>
        <p>A BEAUTIFUL BEGINNING</p>
      </div>
      <div className="gate-scene">
        <div className="gate-door gate-door-left" aria-hidden="true">
          <div className="gate-art">
            <Image
              src="/images/temple-portal.webp"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 650px) 100vw, 670px"
            />
            <PortalGarlandSway />
            <PortalLampFlames />
          </div>
        </div>
        <div className="gate-door gate-door-right" aria-hidden="true">
          <div className="gate-art">
            <Image
              src="/images/temple-portal.webp"
              alt=""
              fill
              loading="eager"
              sizes="(max-width: 650px) 100vw, 670px"
            />
            <PortalGarlandSway />
            <PortalLampFlames />
          </div>
        </div>
        <div className="gate-vinayagar">
          <Image
            src="/images/vinayagar.webp"
            alt="விநாயகர்"
            width={190}
            height={255}
            loading="eager"
            sizes="80px"
          />
        </div>
        <div className="gate-copy">
          <RoyalDivider light />
          <p className="eyebrow" lang="en">
            With all our hearts
          </p>
          <h1 lang="en">You are invited</h1>
          <p className="gate-subtitle" lang="en">
            to celebrate with us
          </p>
          <p className="gate-tamil">{invitation.welcome}</p>
          <p className="gate-date" lang="en">
            {date}
          </p>
          <button className="open-invitation" onClick={onOpen} disabled={opening}>
            <span lang="en">{opening ? "Opening your invitation…" : "Open invitation"}</span>
            <ArrowRight size={16} />
          </button>
          <p className="gate-couple" lang="en">
            {invitation.groom.englishName} & {invitation.bride.englishName}
          </p>
        </div>
      </div>
      <p className="gate-outside-date" lang="en">
        KANGEYAM · TAMIL NADU · {date}
      </p>
    </section>
  );
}
