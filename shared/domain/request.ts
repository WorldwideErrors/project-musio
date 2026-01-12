import { Song } from "./song"

export interface Request {
    song: Song
    createdAt: string
    createdBy: string
    played?: boolean
}