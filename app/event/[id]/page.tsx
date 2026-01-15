import { Event } from "@/shared/domain/event"
import { titilium } from "@/shared/utils/fonts"
import { getEventQrCodeUrl } from "@/shared/infrastructure/events-repository"
import Image from "next/image"
import { notFound } from "next/navigation"
import { baseUrl } from "@/shared/utils/config"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EventPage({ params }: Props) {
  
  const { id } = await params

  if (!id) {
    return <div className="text-center text-gray-500 mt-10">No event ID provided</div>
  }

  const response = await fetch(`${baseUrl}/api/events?id=${id}`, { 
    method: 'GET',
    cache: 'no-store'
  })

 if (response.status === 404) {
    notFound()
  }

  const event: Event = await response.json()
  const qrUrl = getEventQrCodeUrl(event.eventId)

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-6">
        {/* QR Code Section */}
        <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40">
          <Image 
            src={`${qrUrl}&bgcolor=FFFFFF&color=000000`} 
            alt="Event QR Code" 
            width={300} 
            height={300}
            className="rounded-lg"
            priority={true}
          />
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40">
          <h1 className={`text-3xl font-bold mb-4 dark:text-orange-500 ${titilium.className}`}>
            REQUEST YOUR SONGS!
          </h1>
          <p className="text-lg dark:text-orange-400 text-center">
            Share this QR code to let others join the event and request songs!
          </p>
        </div>

        {/* Song Queue Section */}
        <div className="md:col-span-2 border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm dark:shadow-black/40">
          <h2 className={`${titilium.className} text-2xl font-bold mb-6 text-center dark:text-orange-500`}>
            RECENT SONG REQUESTS
          </h2>
          
          {event.queue?.length > 0 ? (
            <div className="space-y-3">
              {event.queue
              .slice(-5)
              .reverse()
              .map((request, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 
                  transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-50 dark:border-gray-600"
                >
                  <span className="text-2xl">🎵</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-gray-900 dark:text-orange-400 truncate ${titilium.className}`}>
                      {request.song.title.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {request.song.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500 dark:text-gray-400 py-8">
              No songs requested yet...
            </p>
          )}
          
        </div>
        <Link href={`/event/14012026-004159-10b53c54-d8c2-4ad9-b4a3-a4eeb725a111/music-requests`}
          className="btn text-center py-2 bg-orange-500 dark:bg-gray-900 hover:bg-orange-600 dark:hover:bg-gray-800 cursor-pointer text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">Go to Music Requests</Link>
      </div>
    </div>
  )
}