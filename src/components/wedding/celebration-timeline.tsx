import { CalendarHeart, Flame, MapPin } from "lucide-react";
import { eventsInOrder, formatIst } from "@/lib/wedding-config";
import { RoyalDivider } from "./temple-ornaments";

// Both celebrations in the order they happen; each stop glides to its full details below.
export function CelebrationTimeline() {
  return (
    <section className="celebration-timeline" aria-labelledby="timeline-title">
      <p className="eyebrow ornate-eyebrow" lang="en" data-reveal="">
        Two days of blessings
      </p>
      <h2 id="timeline-title" className="section-title" lang="en" data-reveal="">
        The Celebrations
      </h2>
      <RoyalDivider />
      <ol className="timeline" data-reveal="">
        {eventsInOrder.map((event, i) => {
          const Icon = i === 0 ? CalendarHeart : Flame;
          return (
            <li key={event.id} className="timeline-stop">
              <span className="timeline-dot" aria-hidden="true">
                <Icon size={16} />
              </span>
              <a href={"#" + event.id} className="timeline-card">
                <span className="timeline-when" lang="en">
                  {formatIst(event.date, { weekday: "short", day: "numeric", month: "short" })}
                  {" · "}
                  {formatIst(event.date, { hour: "numeric", minute: "2-digit", hour12: true })}
                </span>
                <strong lang="en">{event.englishTitle}</strong>
                <span className="timeline-tamil">{event.title}</span>
                <span className="timeline-time">{event.time}</span>
                <span className="timeline-venue">
                  <MapPin size={13} />
                  {event.venue}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
