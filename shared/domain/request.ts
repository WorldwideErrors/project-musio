import { Song } from "./song"

export interface Request {
    song: Song
    createdAt: string
    played?: boolean
}