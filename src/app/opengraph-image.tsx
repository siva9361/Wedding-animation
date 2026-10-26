import { ImageResponse } from "next/og";
import { coupleNames, eventsInOrder, formatIst, invitation } from "@/lib/wedding-config";

// The preview card WhatsApp and other apps show when the invitation link is shared.
export const alt = coupleNames + " wedding invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 30%, #6d2639, #330c17 70%)",
        color: "#fff1d7",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 28,
          right: 28,
          bottom: 28,
          border: "2px solid #bd9658",
          borderRadius: 26,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 42,
          left: 42,
          right: 42,
          bottom: 42,
          border: "1px solid #bd965866",
          borderRadius: 18,
          display: "flex",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 24, letterSpacing: 10, color: "#d8b77a" }}>
          WITH ALL OUR HEARTS · YOU ARE INVITED
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 34, marginTop: 34 }}>
          <span style={{ fontSize: 104 }}>{invitation.groom.englishName}</span>
          <span style={{ fontSize: 56, color: "#d8b77a", fontStyle: "italic" }}>&amp;</span>
          <span style={{ fontSize: 104 }}>{invitation.bride.englishName}</span>
        </div>
        <div style={{ width: 260, height: 2, background: "#bd9658", margin: "34px 0" }} />
        <div style={{ display: "flex", gap: 70 }}>
          {eventsInOrder.map((event) => (
            <div
              key={event.id}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <span style={{ fontSize: 22, letterSpacing: 6, color: "#d8b77a" }}>
                {event.englishTitle.toUpperCase()}
              </span>
              <span style={{ fontSize: 38, marginTop: 10 }}>
                {formatIst(event.date, { weekday: "short", day: "numeric", month: "long" })}
              </span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 22, letterSpacing: 8, marginTop: 40, color: "#cdb48d" }}>
          {invitation.place.toUpperCase()}
        </div>
      </div>
    </div>,
    size,
  );
}
