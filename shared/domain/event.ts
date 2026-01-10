import { Request } from "./request"

export interface Event {
    eventId: string
    name: string
    description: string
    queue: Request[]
}