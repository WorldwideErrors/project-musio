"use client";

import { useState } from "react";
import { MdPlaylistRemove } from "react-icons/md";
import { Event } from "@/shared/domain/event";
import { Request } from "@/shared/domain/request";
import { Titillium_Web } from "next/font/google";

interface Props {
  event: Event;
  requests: Event["queue"];
}

const titilium = Titillium_Web({
  subsets: ["latin"],
  weight: "700",
})

export default function MusicRequestsClient({ event, requests: initialRequests }: Props) {
  const [requests, setRequests] = useState<Event["queue"]>(initialRequests);

  const handleRequestPlayed = async (index: number) => {
    const response = await fetch("/api/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: event.eventId, requestIndex: index }),
    });

    if (response.ok) {
      setRequests((prev: Event["queue"]) =>
        prev.map((req: Request, i: number) => (i === index ? { ...req, played: true } : req))
      );
    }
  };

  const unplayedRequests = requests.filter(req => !req.played);
  return (
    <div className="mx-20 my-10">
      {requests.length > 0 ? (
        <div className="space-y-3">
          {unplayedRequests.map((request: Request, index: number) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 shadow-sm rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            >
              <span className="text-xl">{index + 1}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-gray-900 dark:text-orange-400 truncate ${titilium.className}`}>
                  {request.song.title.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {request.song.artist}
                </p>
              </div>
              <button
                className="btn px-4 py-2 bg-orange-500 dark:bg-gray-900 hover:bg-orange-600 dark:hover:bg-gray-800 cursor-pointer text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                onClick={() => handleRequestPlayed(index)}
                disabled={request.played}
              >
                <div className="relative group cursor-pointer">
                    <MdPlaylistRemove className="text-white dark:text-orange-500 text-3xl" />
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                    bg-gray-800 text-white text-sm rounded px-2 py-1
                                    opacity-0 group-hover:opacity-100 transition-opacity
                                    whitespace-nowrap pointer-events-none">
                    Set as played
                    </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No songs requested yet...
        </p>
      )}
    </div>
  );
}
