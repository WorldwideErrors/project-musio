import { Song } from "./song"

export interface Request {
    requestId: number
    song: Song
    createdAt: string
    createdBy: string
}