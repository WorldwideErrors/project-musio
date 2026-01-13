import RequestForm from "@/app/components/RequestForm"
import { Event } from "@/shared/domain/event"
import { baseUrl } from "@/shared/utils/config"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function RequestPage({ params }: Props) {
  const { id } = await params

  if (!id) return <div>No event ID provided</div>

  const response = await fetch(`${baseUrl}/api/events?id=${id}`, { 
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