// `crop` is the part of the photo, in source pixels, that fills the 3:4 portrait frame.
// Both crops match shoulder width, eye line and headroom so the two portraits read as a pair.
export interface InvitationPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  crop: { x: number; y: number; width: number; height: number };
}
export interface InvitationPerson {
  name: string;
  englishName: string;
  qualification: string;
  parents: string[];
  address: string;
  photo: InvitationPhoto | null;
}
export interface InvitationEvent {
  id: string;
  title: string;
  englishTitle: string;
  date: string;
  // When the printed time window closes; used by the countdown and calendar files.
  end: string;
  dateLabel: string;
  day: string;
  time: string;
  venue: string;
  address: string;
  note?: string;
}
export interface InvitationConfig {
  title: string;
  blessing: string;
  welcome: string;
  message: string;
  closing: string;
  monogram: string;
  place: string;
  welcomeVerses: { title: string; lines: string[] };
  groom: InvitationPerson;
  bride: InvitationPerson;
  events: InvitationEvent[];
}
// Details transcribed from the family's supplied invitation. No fictional events.
export const invitation: InvitationConfig = {
  title: "திருமண வரவேற்பு விழா அழைப்பிதழ்",
  blessing: "ஸ்ரீ பொன் அழகு நாச்சியம்மன் துணை",
  welcome: "அன்புடன் அழைக்கிறோம்",
  message:
    "தாங்கள் தங்கள் சுற்றமும் நட்பும் சூழ வருகைதந்து மணமக்களை வாழ்த்தியருள அன்புடன் அழைக்கிறோம்.",
  closing: "இரு இல்லம் இணையும் இனிய அழைப்பு",
  monogram: "V & S",
  place: "Kangeyam · Tamil Nadu",
  welcomeVerses: {
    title: "தங்கள் நல்வரவை அன்புடன் விரும்பும்",
    lines: [
      "நல்வழி காட்டிய தாத்தாக்கள், பாட்டிகள்",
      "அடையாளம் காட்டிய அப்பா, அம்மா",
      "அறம் காட்டிய ஆசான்கள்",
      "அக்கறைகொண்ட அண்ணன்கள், அண்ணிகள்",
      "பாசம்கொண்ட அக்காக்கள், தம்பிகள்",
      "அரவணைக்கும் பெரியப்பாக்கள், பெரியம்மாக்கள்",
      "அன்புகாட்டும் சித்தப்பாக்கள், சித்திகள்",
      "மகிழவைக்கும் மாமாக்கள், அத்தைகள்",
      "பண்பு படைத்த சம்பந்திகள்",
      "மனம் நிறைந்த மச்சான்கள்",
      "நெஞ்சிற்கினிய நண்பர்கள்",
    ],
  },
  groom: {
    name: "N. விக்னேஷ்",
    englishName: "Vignesh",
    photo: {
      src: "/images/groom.webp",
      alt: "மணமகன் N. விக்னேஷ்",
      width: 1043,
      height: 1508,
      crop: { x: 89, y: -95, width: 938, height: 1250 },
    },
    qualification: "B.E. (Mech.)",
    parents: ["திரு. R. நாச்சிமுத்துக்கவுண்டர்", "திருமதி. N. தேவி"],
    address: "படியாண்டிபாளையம், காங்கயம்.",
  },
  bride: {
    name: "S. சந்தியா",
    englishName: "Sandhiya",
    photo: {
      src: "/images/bride.webp",
      alt: "மணமகள் S. சந்தியா",
      width: 1024,
      height: 1536,
      crop: { x: 217, y: -68, width: 623, height: 830 },
    },
    qualification: "B.C.A.",
    parents: ["திரு. T. சுரேஷ்", "தெய்வத்திருமதி. S. சரோஜினி"],
    address: "காஞ்சி நகர், காங்கயம் ரோடு, திருப்பூர்.",
  },
  events: [
    {
      id: "reception",
      title: "திருமண வரவேற்பு",
      englishTitle: "Wedding reception",
      date: "2026-11-12T18:00:00+05:30",
      end: "2026-11-12T19:00:00+05:30",
      dateLabel: "12.11.2026",
      day: "வியாழக்கிழமை",
      time: "மாலை 6.00 – 7.00 மணி",
      venue: "காயத்ரி ஹோட்டல்",
      address: "திருப்பூர் ரோடு, காங்கயம்.",
    },
    {
      id: "wedding",
      title: "சுபமுகூர்த்தம்",
      englishTitle: "Wedding ceremony",
      date: "2026-11-13T04:45:00+05:30",
      end: "2026-11-13T05:45:00+05:30",
      dateLabel: "13.11.2026",
      day: "வெள்ளிக்கிழமை",
      time: "அதிகாலை 4.45 – 5.45 மணி",
      venue: "ஸ்ரீ பொன் அழகு நாச்சியம்மன் திருக்கோவில்",
      address: "வள்ளியரச்சல்.",
      note: "ஐப்பசி மாதம் 27-ஆம் நாள் (13.11.2026) வெள்ளிக்கிழமை அதிகாலை 4.45 மணிக்குமேல் 5.45 மணிக்குள் வள்ளியரச்சல், ஸ்ரீ பொன்அழகு நாச்சியம்மன் திருக்கோவிலில் நடைபெறும்.",
    },
  ],
};
// The company credited at the bottom of the page.
export const maker = {
  brand: "MECATRONIX",
  name: "Mecatronix Software Development",
  city: "Coimbatore",
  phone: "+91 83004 54800",
  tel: "+918300454800",
};
// Songs that play once the doors open, tried in order: the first file that exists is used.
// Put the family's "Idicha Pacharisi" MP3 at public/audio/idicha-pacharisi.mp3; until then
// the site is silent and the music button stays hidden.
export const weddingSongs = ["/audio/idicha-pacharisi.mp3"];
export const coupleNames = invitation.groom.englishName + " & " + invitation.bride.englishName;

// Events in the order they happen: the reception evening, then the dawn muhurtham.
export const eventsInOrder = [...invitation.events].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
);

// The first event that has not yet ended, so the countdown moves on after the reception.
export function upcomingEvent(now = Date.now()) {
  return eventsInOrder.find((event) => new Date(event.end).getTime() > now) ?? null;
}

// Every date on the invitation is shown in Indian Standard Time, wherever the guest is.
export function formatIst(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", ...options }).format(
    new Date(date),
  );
}

export function venueSearchUrl(event: InvitationEvent) {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(event.venue + ", " + event.address)
  );
}
export function venueEmbedUrl(event: InvitationEvent) {
  return (
    "https://www.google.com/maps?output=embed&q=" +
    encodeURIComponent(event.venue + ", " + event.address)
  );
}

// The message sent with the link from the share page, in the card's own Tamil wording.
export function shareMessage(url: string) {
  return [
    "💐 " + invitation.welcome + " 💐",
    coupleNames,
    ...eventsInOrder.map(
      (event) =>
        event.title +
        ": " +
        event.dateLabel +
        " · " +
        event.time +
        " · " +
        event.venue +
        ", " +
        event.address,
    ),
    url,
  ].join("\n");
}

// The .ics file is served by src/app/calendar/[event]/route.ts.
export function calendarFileUrl(event: InvitationEvent) {
  return "/calendar/" + event.id;
}
const utcStamp = (date: string) =>
  new Date(date)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
const calendarTitle = (event: InvitationEvent) => coupleNames + " — " + event.englishTitle;
export function googleCalendarUrl(event: InvitationEvent) {
  const query = new URLSearchParams({
    action: "TEMPLATE",
    text: calendarTitle(event),
    dates: utcStamp(event.date) + "/" + utcStamp(event.end),
    details: event.title + " · " + event.day + " · " + event.time,
    location: event.venue + ", " + event.address,
  });
  return "https://calendar.google.com/calendar/render?" + query;
}
export function calendarFile(event: InvitationEvent) {
  // Text values escape backslashes, semicolons, commas and newlines (RFC 5545 §3.3.11).
  const text = (value: string) => value.replace(/[\\;,]/g, "\\$&").replace(/\n/g, "\\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mecatronix//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:" + event.id + "-" + utcStamp(event.date) + "@vignesh-sandhiya.wedding",
    "DTSTAMP:" + utcStamp(event.date),
    "DTSTART:" + utcStamp(event.date),
    "DTEND:" + utcStamp(event.end),
    "SUMMARY:" + text(calendarTitle(event) + " (" + event.title + ")"),
    "LOCATION:" + text(event.venue + ", " + event.address),
    "DESCRIPTION:" + text(event.note ?? event.title + " · " + event.day + " · " + event.time),
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:" + text(calendarTitle(event)),
    "TRIGGER:-PT3H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
// Calendar lines fold at 75 bytes without splitting a Tamil character.
function foldLine(line: string) {
  const encoder = new TextEncoder();
  let result = "";
  let width = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (width + size > 75) {
      result += "\r\n ";
      width = 1;
    }
    result += char;
    width += size;
  }
  return result;
}
