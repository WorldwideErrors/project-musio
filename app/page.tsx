import HeaderSection from "./components/HeaderSection";
import CreateEventButton from "./components/CreateEventButton";

export default function Home() {
  return (
   <main className="min-h-screen">
    <div className="p-4">
      <HeaderSection title="Discover MUSIO" subtitle="Scan a QR code, request your song, and help shape a dancefloor where every guest feels seen, heard, and included."/>
    </div>
    <div className="p-4">
      <CreateEventButton/>
    </div>
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40">
          <p>test</p>
        </div>
        <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40">
          <p>test</p>
        </div>
        <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40">
          <p>test</p>
        </div>
      </div>
    </div>
   </main>
  );
}
