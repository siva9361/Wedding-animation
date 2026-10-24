"use client";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { useRef, type CSSProperties, type Ref } from "react";
import { useInvitationMotion } from "@/lib/use-invitation-motion";
import {
  invitation,
  maker,
  venueSearchUrl,
  type InvitationEvent,
  type InvitationPhoto,
  type InvitationPerson,
} from "@/lib/wedding-config";
import { HomaFire, Mandala, RoyalDivider } from "./temple-ornaments";
import { SwayingToran } from "./swaying-toran";
import { Countdown } from "./countdown";
import { CoupleCartoon } from "./couple-cartoon";

// Watercolor corners cut from the family's floral card by scripts/extract-floral-art.ts.
const floralCorners = [
  { name: "top-left", width: 500, height: 580 },
  { name: "top-right", width: 536, height: 660 },
  { name: "bottom-left", width: 470, height: 620 },
  { name: "bottom-right", width: 466, height: 460 },
];

// Scales and offsets the photo so only its crop box fills the frame.
function cropStyle({ width, height, crop }: InvitationPhoto): CSSProperties {
  return {
    width: `${(width / crop.width) * 100}%`,
    height: `${(height / crop.height) * 100}%`,
    left: `${(-crop.x / crop.width) * 100}%`,
    top: `${(-crop.y / crop.height) * 100}%`,
    position: "absolute",
    maxWidth: "none",
    objectFit: "cover",
    transformOrigin: `${((crop.x + crop.width / 2) / width) * 100}% ${((crop.y + crop.height / 2) / height) * 100}%`,
  };
}

function PersonPortrait({ person, label }: { person: InvitationPerson; label: string }) {
  const zoom = person.photo ? person.photo.width / person.photo.crop.width : 1;
  return (
    <div
      className="person-portrait"
      role={person.photo ? undefined : "img"}
      aria-label={person.photo ? undefined : `${person.englishName}'s photo will be added here`}
    >
      <div className="person-portrait-inner">
        {person.photo ? (
          <Image
            src={person.photo.src}
            alt={person.photo.alt}
            width={person.photo.width}
            height={person.photo.height}
            sizes={`(max-width: 700px) ${Math.round(196 * zoom)}px, ${Math.round(240 * zoom)}px`}
            style={cropStyle(person.photo)}
          />
        ) : (
          <div className="portrait-placeholder" aria-hidden="true" lang="en">
            <span className="portrait-initial">{person.englishName.charAt(0)}</span>
            <span className="portrait-caption">{label}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function FamilyCard({ person, side }: { person: InvitationPerson; side: "groom" | "bride" }) {
  return (
    <section data-reveal="">
      <div className="family-card">
        <p className="eyebrow" lang="en">
          {side === "groom" ? "The groom" : "The bride"}
        </p>
        <PersonPortrait
          person={person}
          label={side === "groom" ? "Groom's photo" : "Bride's photo"}
        />
        <h3 lang="en">{person.englishName}</h3>
        <p className="family-tamil-name">{person.name}</p>
        <p className="qualification" lang="en">
          {person.qualification}
        </p>
        <RoyalDivider />
        <p className="family-role" lang="en">
          {side === "groom" ? "Son of" : "Daughter of"}
        </p>
        {person.parents.map((parent) => (
          <p className="parent-name" key={parent}>
            {parent}
          </p>
        ))}
        <p className="family-address">{person.address}</p>
      </div>
    </section>
  );
}

function Celebration({ event, dark = false }: { event: InvitationEvent; dark?: boolean }) {
  const date = new Date(event.date);
  const month = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
  const day = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone: "Asia/Kolkata",
  }).format(date);
  return (
    <section
      id={event.id}
      className={
        "celebration event-" + event.id + " " + (dark ? "celebration-dark" : "celebration-light")
      }
    >
      <SwayingToran />
      <div className="celebration-inner">
        {!dark && (
          <div className="couple-cartoon-wrap" data-reveal="">
            <CoupleCartoon />
          </div>
        )}
        <h2 className="section-title" lang="en" data-reveal="">
          {dark ? "The Reception" : "The Wedding"}
        </h2>
        <p className="tamil-section-title" data-reveal="">
          {event.title}
        </p>
        <RoyalDivider light={dark} />
        <div className="occasion-card" data-reveal="">
          <div className="occasion-calendar" lang="en">
            <span>
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                timeZone: "Asia/Kolkata",
              }).format(date)}
            </span>
            <strong>{month}</strong>
            <small>{date.getFullYear()}</small>
          </div>
          <div className="occasion-time">
            <p lang="en">{event.englishTitle}</p>
            <span className="occasion-day" lang="en">
              {day}
            </span>
            <span className="printed-date" lang="en">
              {event.dateLabel}
            </span>
            <p className="tamil-time">
              <Clock3 size={15} />
              {event.time}
            </p>
            <span className="occasion-tamil-day">{event.day} · IST</span>
          </div>
        </div>
        {event.note && (
          <p className="occasion-note" data-reveal="">
            {event.note}
          </p>
        )}
        <div className="venue-card" data-reveal="">
          <p className="eyebrow" lang="en">
            {dark ? "Reception venue" : "Wedding venue"}
          </p>
          <h3>{event.venue}</h3>
          <p className="venue-address">
            <MapPin size={16} />
            {event.address}
          </p>
          <a
            href={venueSearchUrl(event)}
            target="_blank"
            rel="noreferrer"
            className="directions"
            aria-label={event.venue + " — வரைபடத்தில் தேடுக"}
          >
            <span lang="en">Find the venue</span>
            <ArrowUpRight size={16} />
          </a>
          <p className="map-caption">வரைபடத்தில் தேடுக</p>
        </div>
      </div>
    </section>
  );
}

export function InvitationDetails({
  headingRef,
  active,
}: {
  headingRef: Ref<HTMLHeadingElement>;
  active: boolean;
}) {
  const article = useRef<HTMLElement>(null);
  useInvitationMotion(article, active);
  const wedding = invitation.events.find((event) => event.id === "wedding");
  const reception = invitation.events.find((event) => event.id === "reception");
  return (
    <article
      ref={article}
      className="royal-invitation"
      aria-label="Vignesh and Sandhya wedding invitation"
    >
      <section className="royal-hero" aria-label="The beginning of our forever">
        <div className="hero-art">
          <Image
            src="/images/wedding-homa-mandap.webp"
            alt="Traditional Tamil wedding mandap with flower garlands, brass lamps and a glowing sacred fire in a homa kundam"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 800px) 100vw, 900px"
          />
          <HomaFire />
        </div>
        <div className="hero-content">
          <Image
            className="hero-vinayagar"
            src="/images/vinayagar.webp"
            alt="விநாயகர்"
            width={190}
            height={255}
            loading="eager"
            sizes="70px"
          />
          <p className="hero-blessing">{invitation.blessing}</p>
          <div className="hero-heading">
            <h1 ref={headingRef} tabIndex={-1} className="royal-names" lang="en">
              <span>{invitation.groom.englishName}</span>
              <em>Weds</em>
              <span>{invitation.bride.englishName}</span>
            </h1>
            <p className="hero-tamil-names">
              {invitation.groom.name} <span>&</span> {invitation.bride.name}
            </p>
            <p className="hero-date" lang="en">
              12 NOVEMBER 2026 · KANGEYAM
            </p>
            {reception && <Countdown date={reception.date} />}
          </div>
        </div>
        <a href="#families" className="discover-link" lang="en">
          Discover our invitation <ArrowDown size={16} />
        </a>
      </section>
      <section className="families-scene floral-scene" id="families">
        <div className="floral-corners" aria-hidden="true">
          {floralCorners.map((corner) => (
            <Image
              key={corner.name}
              className={"floral-corner floral-" + corner.name}
              src={"/images/floral-" + corner.name + ".webp"}
              alt=""
              width={corner.width}
              height={corner.height}
              sizes="(max-width: 700px) 46vw, 32vw"
            />
          ))}
        </div>
        <div className="families-content">
          <Image
            className="families-couple"
            src="/images/floral-couple.webp"
            alt="Cartoon of the groom and bride holding hands inside a floral wreath"
            width={400}
            height={300}
            sizes="134px"
            data-reveal=""
          />
          <p className="eyebrow ornate-eyebrow" lang="en" data-reveal="">
            With the blessings of
          </p>
          <h2 className="section-title shimmer-title" lang="en" data-reveal="">
            Our Families
          </h2>
          <RoyalDivider />
          <p className="families-welcome" data-reveal="">
            {invitation.message}
          </p>
          <div className="families">
            <FamilyCard person={invitation.groom} side="groom" />
            <span className="families-and" lang="en">
              <span>And</span>
            </span>
            <FamilyCard person={invitation.bride} side="bride" />
          </div>
        </div>
      </section>
      {wedding && <Celebration event={wedding} />}
      {reception && <Celebration event={reception} dark />}
      <section className="invitation-verses" aria-labelledby="welcome-verses-title">
        <SwayingToran />
        <Mandala className="scene-mandala" />
        <div className="verses-panel">
          <p className="eyebrow ornate-eyebrow" lang="en" data-reveal="">
            With love, from all of us
          </p>
          <h2 id="welcome-verses-title" data-reveal="">
            {invitation.welcomeVerses.title}
          </h2>
          <RoyalDivider />
          <div className="verses-layout">
            <figure className="couple-photo">
              <Image
                src="/images/couple.webp"
                alt="Vignesh and Sandhya in wedding attire with jasmine and rose garlands, greeting with folded hands before a golden flower-decked mandap"
                width={1024}
                height={1536}
                sizes="(max-width: 900px) min(100vw, 400px), 460px"
              />
            </figure>
            <blockquote>
              {invitation.welcomeVerses.lines.map((line, i) => (
                <div
                  className="verse-chip"
                  key={line}
                  data-reveal=""
                  style={{ "--i": i } as CSSProperties}
                >
                  <p>{line}</p>
                </div>
              ))}
            </blockquote>
          </div>
        </div>
      </section>
      <footer className="royal-finale" data-reveal="">
        <p className="finale-tamil">{invitation.welcome}</p>
        <p className="finale-family">{invitation.closing}</p>
      </footer>
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
    </article>
  );
}
