import path from "path";
import fs from "fs/promises";
import { Event } from "../domain/event";
import { Request } from "../domain/request";

const filePath = path.join(process.cwd(), "shared/data/events.json");

async function getEvents(): Promise<Event[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed.events)) return parsed.events;
    return [];
  } catch {
    return [];
  }
}

async function writeEvents(events: Event[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify({ events }, null, 2), "utf-8");
}

export async function getOpenRequestsByEvent(event: Event): Promise<Request[] | null> {
  if (!event.queue || event.queue.length === 0) return null;

  const openRequests = event.queue.filter(q => !q.played);

  return openRequests.length > 0 ? openRequests : null;
}

export async function setRequestPlayed(event: Event, index: number): Promise<Event> {
  if (!event.queue[index]) {
    throw new Error("Request not found at index " + index);
  }

  const updatedEvent: Event = {
    ...event,
    queue: event.queue.map((req, i) =>
      i === index ? { ...req, played: true } : req
    ),
  };

  const events = await getEvents();
  const eventIndex = events.findIndex(e => e.eventId === event.eventId);
  if (eventIndex === -1) throw new Error("Event not found in storage");

  events[eventIndex] = updatedEvent;

  await writeEvents(events);

  return updatedEvent;
}
