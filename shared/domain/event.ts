import { Request } from "./request"

export interface Event {
    eventId: string
    queue: Request[]
}