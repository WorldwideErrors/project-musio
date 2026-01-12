import path from "path";
import fs from "fs/promises";
import { Event } from "../domain/event";
import { Request } from "../domain/request";

const filePath = path.join(process.cwd(), "shared/data/events.json");

// Helper to read all events
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

// Helper to write all events
async function writeEvents(events: Event[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify({ events }, null, 2), "utf-8");
}

// Get unplayed requests
export async function getOpenRequestsByEvent(event: Event): Promise<Request[] | null> {
  if (!event.queue || event.queue.length === 0) return null;

  const openRequests = event.queue.filter(q => !q.played);

  return openRequests.length > 0 ? openRequests : null;
}

// Mark a request as played and persist
export async function setRequestPlayed(event: Event, index: number): Promise<Event> {
  if (!event.queue[index]) {
    throw new Error("Request not found at index " + index);
  }

  // 1️⃣ Update the request in memory
  const updatedEvent: Event = {
    ...event,
    queue: event.queue.map((req, i) =>
      i === index ? { ...req, played: true } : req
    ),
  };

  // 2️⃣ Load all events from file
  const events = await getEvents();

  // 3️⃣ Find the event in the array
  const eventIndex = events.findIndex(e => e.eventId === event.eventId);
  if (eventIndex === -1) throw new Error("Event not found in storage");

  // 4️⃣ Replace it with updatedEvent
  events[eventIndex] = updatedEvent;

  // 5️⃣ Save back to file
  await writeEvents(events);

  return updatedEvent;
}
