import { titilium } from "@/shared/utils/fonts"
import { getHomeQrCodeUrl } from "@/shared/infrastructure/events-repository"
import Image from "next/image"
import Link from "next/link"


export default async function EventPage() {
  const qrUrl = getHomeQrCodeUrl()

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <Image 
            src={`${qrUrl}&bgcolor=ea580c&color=000000`} 
            alt="Event QR Code" 
            width={200} 
            height={200}
            className="rounded-lg"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl font-bold dark:text-orange-500">
            OOPSIE WOOPSIE!
          </h1>
          <p className="text-lg dark:text-orange-400 text-center">
            This event does not exist. Please check the link or create a new event.
          </p>
          <Link 
            href="/"
            className={`rounded-lg bg-orange-500 transition-colors px-4 py-2 font-medium text-white transition hover:bg-orange-600 cursor-pointer mt-4" ${titilium.className}`}
          >
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  )
}