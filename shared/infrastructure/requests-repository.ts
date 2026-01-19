import path from "path";
import fs from "fs/promises";
import { Event } from "../domain/event";
import { Request } from "../domain/request";
import { getEvents } from "./events-repository";

const filePath = path.join(process.cwd(), "shared/data/events.json");

async function writeEvents(events: Event[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify({ events }, null, 2), "utf-8");
}

export async function getOpenRequestsByEvent(event: Event): Promise<Request[] | null> {
  if (!event.queue || event.queue.length === 0) return null;

  const openRequests = event.queue.filter(q => !q.played);

  return openRequests.length > 0 ? openRequests : null;
}

export async function setRequestPlayed(
  event: Event,
  requestId: string
): Promise<Event> {
  const requestExists = event.queue.some(r => r.id === requestId);
  if (!requestExists) {
    throw new Error("Request not found: " + requestId);
  }

  const updatedEvent: Event = {
    ...event,
    queue: event.queue.map(req =>
      req.id === requestId ? { ...req, played: true } : req
    ),
  };

  const events = await getEvents();
  const eventIndex = events.findIndex(e => e.eventId === event.eventId);
  if (eventIndex === -1) throw new Error("Event not found");

  events[eventIndex] = updatedEvent;
  await writeEvents(events);

  return updatedEvent;
}
