import RequestForm from "@/app/components/RequestForm"
import { Event } from "@/shared/domain/event"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function RequestPage({ params }: Props) {
  const { id } = await params

  if (!id) return <div>No event ID provided</div>

  const response = await fetch(`http://localhost:3000/api/events?id=${id}`, { 
    method: 'GET',
    cache: 'no-store'
  })

  if (!response.ok) {
    return notFound();
  }

  const event: Event = await response.json()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <RequestForm />
    </div>
  )
}