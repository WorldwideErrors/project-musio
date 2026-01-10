import { Event } from "@/shared/domain/event"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EventPage({ params }: Props) {
  const { id } = await params

  if (!id) return <div>No event ID provided</div>

  const response = await fetch(`http://localhost:3000/api/events?id=${id}`, { 
    method: 'GET',
    cache: 'no-store'
  })

  if (!response.ok) {
    return <div>Error: Event not found</div>
  }

  const event: Event = await response.json()

  return (
    <div>
      <h1>Event ID: {event.eventId}</h1>
      <p>Queue length: {event.queue.length}</p>
    </div>
  )
}