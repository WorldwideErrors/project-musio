import { notFound } from "next/navigation";
import { Event } from "@/shared/domain/event";
import { getOpenRequestsByEvent } from "@/shared/infrastructure/requests-repository";
import MusicRequestsClient from "./MusicRequestsClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MusicRequestsPage({ params }: Props) {
  const { id } = await params;

  if (!id) return <div>No event ID provided</div>;

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events?id=${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) return notFound();

  const event: Event = await response.json();
  const requests = (await getOpenRequestsByEvent(event)) || [];

  return <MusicRequestsClient event={event} requests={requests} />;
}
