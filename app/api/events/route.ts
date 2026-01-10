import { NextResponse } from "next/server"
import { createEvent, getEventById } from "@/shared/infrastructure/events-repository"
import { Event } from "@/shared/domain/event"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }
  
  const event = await getEventById(id)
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 })
  return NextResponse.json(event)
}

export async function POST() {
  const event: Event = {
    eventId: generateEventId(),
    queue: []
  }

  await createEvent(event)
  console.log(`Created event with ID: ${event.eventId}`)

  return NextResponse.json(
    { eventId: event.eventId },
    { status: 201 }
  )
}

function generateEventId(): string {
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, "0")
  const day = pad(now.getDate())
  const month = pad(now.getMonth() + 1)
  const year = now.getFullYear()
  const hours = pad(now.getHours())
  const minutes = pad(now.getMinutes())
  const seconds = pad(now.getSeconds())
  
  return `${day}${month}${year}-${hours}${minutes}${seconds}-${crypto.randomUUID()}`
}