"use client"
import { useRouter } from "next/navigation"

export default function CreateEventButton() {
    const router = useRouter()

    const handleClick = async () => {
        const res = await fetch("/api/events", { method: "POST" })
        const { eventId } = await res.json()
        router.push(`/event/${eventId}`)
    }

    return(
         <section className="relative py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto p-4 ">
                <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-4 rounded cursor-pointer" onClick={handleClick}>Create Event</button>
            </div>
         </section>
    )
}