"use client"
import { baseUrl } from "@/shared/utils/config"
import { titilium } from "@/shared/utils/fonts"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateEventButton() {
    const router = useRouter()

    const handleClick = async () => {
        const res = await fetch(`${baseUrl}/api/events`, { method: "POST" })
        const { eventId } = await res.json()
        router.push(`/event/${eventId}/music-requests`)
    }

    return(
         <section className="relative py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto p-4 ">
                <button
                    onClick={handleClick}
                    className={`flex items-center justify-center mx-auto bg-gradient-to-r from-red-500 via-orange-500 to-orange-500 
                               hover:from-orange-500 hover:to-yellow-500 text-white font-bold text-4xl px-8 py-5 rounded-xl 
                               shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer ${titilium.className}`}
                >
                    
                    CREATE EVENT
                </button>
            </div>
            <div className="max-w-7xl mx-auto p-4 ">
                <Link href="/event/16012026-125501-a52fbc8b-8fd4-445a-ab14-8f3fc2e98db2/music-requests"
                    className={`flex items-center justify-center w-50 mx-auto bg-gradient-to-r from-red-500 via-orange-500 to-orange-500 
                               hover:from-orange-500 hover:to-yellow-500 text-white font-bold text-2xl px-4 py-2 rounded-xl 
                               shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer ${titilium.className}`}
                >
                    
                    GO TO DEMO
                </Link>
            </div>
         </section>
    )
}