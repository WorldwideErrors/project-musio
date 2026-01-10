import { events } from "../data/eventsData";
import { Event } from "../domain/event";
import { Request } from "../domain/request";

export function getEventById(id: string): Event | null {
  return events.find(e => e.eventId === id) ?? null
}

export function createEvent(event: Event): void {
  events.push(event);
}

export function addRequestToEvent(eventId: string, request: Request): boolean {
  const event = getEventById(eventId);
  if (!event) {
    return false;
  }
  event.queue.push(request);
  return true;
}