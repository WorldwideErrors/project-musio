import { getEventById } from "@/shared/infrastructure/events-repository";
import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/shared/domain/event";
import { setRequestPlayed } from "@/shared/infrastructure/requests-repository";

export async function PATCH(request: NextRequest) {
  try {
    const { eventId, requestIndex } = await request.json();

    if (eventId === undefined || requestIndex === undefined) {
      return NextResponse.json({ error: "Missing eventId or requestIndex" }, { status: 400 });
    }

    const event: Event | null = await getEventById(eventId);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    if (!event.queue[requestIndex]) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const updatedEvent: Event = {
      ...event,
      queue: event.queue.map((req, i) =>
        i === requestIndex ? { ...req, played: true } : req
      ),
    };

    await setRequestPlayed(updatedEvent, requestIndex);

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}