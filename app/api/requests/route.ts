import { getEventById } from "@/shared/infrastructure/events-repository";
import { setRequestPlayed } from "@/shared/infrastructure/requests-repository";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { eventId, requestId } = await request.json();

    if (!eventId || !requestId) {
      return NextResponse.json(
        { error: "Missing eventId or requestId" },
        { status: 400 }
      );
    }

    const event = await getEventById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const updatedEvent = await setRequestPlayed(event, requestId);

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
