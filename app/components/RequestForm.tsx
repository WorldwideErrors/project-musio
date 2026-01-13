"use client"

import { Song } from "@/shared/domain/song"
import { Request } from "@/shared/domain/request"
import { useState } from "react"
import { titilium } from "@/shared/fonts/utils"

export default function RequestForm() {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const song: Song = {
      title,
      artist,
    }

    const request: Request = {
      song,
      createdAt: new Date().toISOString(),
      played: false,
    }

    console.log("Request created:", request)


    setTitle("")
    setArtist("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40"  
    >
      <h2 className={`text-4xl font-bold mb-4 px-10 dark:text-orange-500 ${titilium.className} text-center`}>
        QUEUE THE VIBES
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-orange-400">
          Song Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-orange-400 mt-4">
          Artist
        </label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-orange-500 transition-colors px-4 py-2 font-medium text-white transition hover:bg-orange-600 cursor-pointer mt-4"
      >
        SUBMIT REQUEST
      </button>
    </form>
  )
}
