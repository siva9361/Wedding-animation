"use client";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { useRef, type Ref } from "react";
import { useInvitationMotion } from "@/lib/use-invitation-motion";
import {
  invitation,
  venueSearchUrl,
  type InvitationEvent,
  type InvitationPerson,
} from "@/lib/wedding-config";
import { RoyalDivider, Toran } from "./temple-ornaments";
import { Countdown } from "./countdown";

function PersonPortrait({ person, label }: { person: InvitationPerson; label: string }) {
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
            fill
            sizes="(max-width: 700px) 196px, 240px"
            style={{ objectPosition: person.photo.position || "50% 35%" }}
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
      <Toran />
      <div className="celebration-inner">
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
            src="/images/temple-mandap.webp"
            alt="Original illustration of a traditional Tamil wedding mandap with jasmine garlands and brass lamps"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 800px) 100vw, 900px"
          />
        </div>
        <div className="hero-heading">
          <p className="hero-blessing">{invitation.blessing}</p>
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
        <a href="#families" className="discover-link" lang="en">
          Discover our invitation <ArrowDown size={16} />
        </a>
      </section>
      <section className="families-scene" id="families">
        <Toran />
        <div className="families-content">
          <p className="eyebrow" lang="en" data-reveal="">
            With the blessings of
          </p>
          <h2 className="section-title" lang="en" data-reveal="">
            Our Families
          </h2>
          <RoyalDivider />
          <p className="families-welcome" data-reveal="">
            {invitation.message}
          </p>
          <div className="families">
            <section data-reveal="">
              <p className="eyebrow" lang="en">
                The groom
              </p>
              <PersonPortrait person={invitation.groom} label="Groom's photo" />
              <h3 lang="en">{invitation.groom.englishName}</h3>
              <p className="family-tamil-name">{invitation.groom.name}</p>
              <p className="qualification" lang="en">
                {invitation.groom.qualification}
              </p>
              <RoyalDivider />
              <p className="family-role" lang="en">
                Son of
              </p>
              {invitation.groom.parents.map((parent) => (
                <p className="parent-name" key={parent}>
                  {parent}
                </p>
              ))}
              <p className="family-address">{invitation.groom.address}</p>
            </section>
            <span className="families-and" lang="en">
              And
            </span>
            <section data-reveal="">
              <p className="eyebrow" lang="en">
                The bride
              </p>
              <PersonPortrait person={invitation.bride} label="Bride's photo" />
              <h3 lang="en">{invitation.bride.englishName}</h3>
              <p className="family-tamil-name">{invitation.bride.name}</p>
              <p className="qualification" lang="en">
                {invitation.bride.qualification}
              </p>
              <RoyalDivider />
              <p className="family-role" lang="en">
                Daughter of
              </p>
              {invitation.bride.parents.map((parent) => (
                <p className="parent-name" key={parent}>
                  {parent}
                </p>
              ))}
              <p className="family-address">{invitation.bride.address}</p>
            </section>
          </div>
        </div>
      </section>
      {wedding && <Celebration event={wedding} />}
      {reception && <Celebration event={reception} dark />}
      <footer className="royal-finale" data-reveal="">
        <p className="finale-tamil">{invitation.welcome}</p>
        <p className="finale-family">{invitation.closing}</p>
      </footer>
    </article>
  );
}
