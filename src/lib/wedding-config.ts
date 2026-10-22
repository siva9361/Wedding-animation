export interface InvitationPerson {
  name: string;
  englishName: string;
  qualification: string;
  parents: string[];
  address: string;
  photo: { src: string; alt: string; position?: string } | null;
}
export interface InvitationEvent {
  id: string;
  title: string;
  englishTitle: string;
  date: string;
  dateLabel: string;
  day: string;
  time: string;
  venue: string;
  address: string;
}
export interface InvitationConfig {
  title: string;
  blessing: string;
  welcome: string;
  message: string;
  closing: string;
  monogram: string;
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
  groom: {
    name: "N. விக்னேஷ்",
    englishName: "Vignesh",
    photo: null,
    qualification: "B.E. (Mech.)",
    parents: ["திரு. R. நாச்சிமுத்துக்கவுண்டர்", "திருமதி. N. தேவி"],
    address: "படியாண்டிபாளையம், காங்கயம்.",
  },
  bride: {
    name: "S. சந்தியா",
    englishName: "Sandhya",
    photo: null,
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
      dateLabel: "13.11.2026",
      day: "வெள்ளிக்கிழமை",
      time: "அதிகாலை 4.45 – 5.45 மணி",
      venue: "ஸ்ரீ பொன் அழகு நாச்சியம்மன் திருக்கோவில்",
      address: "வெள்ளியச்சல்.",
    },
  ],
};
export function venueSearchUrl(event: InvitationEvent) {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(event.venue + ", " + event.address)
  );
}
