import Link from "next/link";
export default function NotFound() {
  return (
    <div className="missing-invitation">
      <p>இந்தப் பக்கம் இல்லை.</p>
      <Link href="/">அழைப்பிதழைக் காண்க →</Link>
    </div>
  );
}
