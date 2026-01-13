import { Request as SongRequest } from "@/shared/domain/request";
import { addRequestToEvent } from "@/shared/infrastructure/events-repository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "No event ID provided" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { song, createdBy } = body;

  if (!song || !createdBy) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const newRequest: SongRequest = {
    song,
    createdAt: new Date().toISOString(),
    played: false,
  };

  await addRequestToEvent(id, newRequest);

  return NextResponse.json(
    { message: "Request added successfully" },
    { status: 201 }
  );
}
