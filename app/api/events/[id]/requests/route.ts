import { Request as SongRequest } from "@/shared/domain/request"
import { addRequestToEvent } from "@/shared/infrastructure/events-repository";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
  { params }: { params: { id: string } }
) {
    const { id } = params;
    if(!id) {
        return NextResponse.json(
            { error: "No event ID provided" },
            { status: 400 }
        )
    }

    const body = await req.json()
    const { song, createdBy } = body

    if (!song || !createdBy) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const newRequest: SongRequest = {
        song,
        createdAt: new Date().toISOString(),
        played: false
    }

    await addRequestToEvent(id, newRequest);

    return NextResponse.json(
        { message: "Request added successfully" },
        { status: 201 }
    )
}