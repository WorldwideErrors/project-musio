"use client"

import { Song } from "@/shared/domain/song"
import { useState } from "react"
import { titilium } from "@/shared/utils/fonts"
import { baseUrl } from "@/shared/utils/config"

export default function RequestForm(props : { event: { eventId: string } }) {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const song: Song = { title, artist };

    fetch(`${baseUrl}/api/events/${props.event.eventId}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.event.eventId, song }),
    });

    // Bevestig dat aanvraag is verzonden (optioneel)
    alert(`Your request for "${title}" by ${artist} has been submitted!`)

    setTitle("")
    setArtist("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40 sm:max-w-md mx-auto mt-10"  
    >
      <h2 className={`text-4xl font-bold mb-12 px-10 dark:text-orange-500 ${titilium.className} text-center`}>
        QUEUE THE VIBES
      </h2>

      <div>
        <label aria-label="label title" className="block text-xl font-medium text-gray-700 dark:text-orange-400">
          Song Title
        </label>
        <input
          aria-label="input title"
          placeholder="Born this Way"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 mb-6 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <div>
        <label aria-label="label artist" className="block text-xl font-medium text-gray-700 dark:text-orange-400 mt-6">
          Artist
        </label>
        <input
          aria-label="input artist"
          placeholder="Lady Gaga"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
          className="mt-2 mb-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-orange-500 transition-colors px-4 py-2  text-lg text-black transition hover:bg-orange-600 cursor-pointer mt-16 mb-12"
      >
        SUBMIT REQUEST
      </button>
    </form>
  )
}
