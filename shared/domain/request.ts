import { Song } from "./song"

export interface Request {
    id: string
    song: Song
    createdAt: string
    played?: boolean
}