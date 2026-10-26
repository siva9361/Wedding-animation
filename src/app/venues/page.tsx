import type { Metadata } from "next";
import { ArrowUpRight, CalendarPlus, Clock3, MapPin } from "lucide-react";
import { SubpageShell } from "@/components/wedding/subpage-shell";
import {
  calendarFileUrl,
  eventsInOrder,
  formatIst,
  googleCalendarUrl,
  venueEmbedUrl,
  venueSearchUrl,
} from "@/lib/wedding-config";

export const metadata: Metadata = {
  title: "Venues & maps",
  description: eventsInOrder.map((event) => event.venue + ", " + event.address).join(" · "),
};

export default function VenuesPage() {
  return (
    <SubpageShell eyebrow="Finding your way" title="Venues & Maps" tamilTitle="இடங்களும் வழிகளும்">
      <div className="venue-list">
        {eventsInOrder.map((event, i) => (
          <article key={event.id} className="venue-detail" id={event.id}>
            <div className="venue-detail-text">
              <p className="eyebrow" lang="en">
                {(i === 0 ? "First · " : "Next · ") + event.englishTitle}
              </p>
              <h2>{event.title}</h2>
              <p className="venue-detail-date" lang="en">
                {formatIst(event.date, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="tamil-time">
                <Clock3 size={15} />
                {event.day} · {event.time}
              </p>
              <h3>{event.venue}</h3>
              <p className="venue-address">
                <MapPin size={16} />
                {event.address}
              </p>
              <div className="venue-actions">
                <a
                  href={venueSearchUrl(event)}
                  target="_blank"
                  rel="noreferrer"
                  className="directions"
                >
                  <span lang="en">Open in Google Maps</span>
                  <ArrowUpRight size={16} />
                </a>
                <div className="venue-calendar" lang="en">
                  <CalendarPlus size={15} />
                  <a href={calendarFileUrl(event)} download>
                    Apple / Outlook
                  </a>
                  <span aria-hidden="true">·</span>
                  <a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
                    Google Calendar
                  </a>
                </div>
              </div>
            </div>
            <div className="venue-map">
              <iframe
                src={venueEmbedUrl(event)}
                title={"Map: " + event.venue + ", " + event.address}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </article>
        ))}
      </div>
      <p className="venue-footnote">
        நேரங்கள் அனைத்தும் இந்திய நேரப்படி (IST). வரைபடங்கள் அழைப்பிதழில் உள்ள முகவரிகளைத்
        தேடுகின்றன.
      </p>
    </SubpageShell>
  );
}
