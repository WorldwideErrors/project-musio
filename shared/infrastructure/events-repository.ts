import fs from "fs/promises";
import { Event } from "../domain/event";
import { Request } from "../domain/request";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "shared/data/events.json"
)

export async function getEvents(): Promise<Event[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const parsed = JSON.parse(raw)
    // Handle either array or object with { events: [...] }
    if (Array.isArray(parsed)) return parsed
    if (Array.isArray(parsed.events)) return parsed.events
    return []
  } catch {
    return []
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  const events = await getEvents()
  return events.find(e => e.eventId === id) ?? null
}

export async function createEvent(event: Event): Promise<void> {
  const events = await getEvents()
  events.push(event)
  await fs.writeFile(filePath, JSON.stringify({ events }, null, 2))
}

export async function addRequestToEvent(
  eventId: string,
  requestData: Omit<Request, "requestId">
): Promise<Request | null> {
  const event = await getEventById(eventId);
  if (!event) {
    return null;
  }
  const request: Request = {
    ...requestData,
  }
  event.queue.push(request);

  return request;
}

const HOME_URL = "https://localhost:3000/";

export function getHomeQrCodeUrl(): string {
  const encodedUrl = encodeURIComponent(HOME_URL);

  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}&margin=10`;
}

const EVENT_BASE_URL = "https://localhost:3000/event";

export function getEventQrCodeUrl(eventId: string): string {
  const eventUrl = `${EVENT_BASE_URL}/${eventId}/request`;
  const encodedUrl = encodeURIComponent(eventUrl);

  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}&margin=10`;
}