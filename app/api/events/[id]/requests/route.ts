import { Request as SongRequest } from "@/shared/domain/request";
import { addRequestToEvent } from "@/shared/infrastructure/events-repository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {

  const { id: eventId, song } = await request.json();

  if (!song?.title || !song?.artist) {
    return NextResponse.json(
      { error: "Invalid song data" },
      { status: 400 }
    );
  }

  const newRequest: SongRequest = {
    song,
    createdAt: new Date().toISOString(),
    played: false,
  };

  await addRequestToEvent(eventId, newRequest);

  return NextResponse.json(newRequest, { status: 201 });
}
