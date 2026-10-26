import { calendarFile, coupleNames, invitation } from "@/lib/wedding-config";

// One .ics file per event, built once at build time. Unknown events return 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return invitation.events.map((event) => ({ event: event.id }));
}

export async function GET(_request: Request, { params }: RouteContext<"/calendar/[event]">) {
  const { event: id } = await params;
  const event = invitation.events.find((item) => item.id === id);
  if (!event) return new Response("Not found", { status: 404 });
  const filename = (coupleNames + "-" + event.id).replace(/\W+/g, "-").toLowerCase() + ".ics";
  return new Response(calendarFile(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
