import HeaderSection from "./components/HeaderSection";
import CreateEventButton from "./components/CreateEventButton";

export default function Home() {
  return (
   <main className="min-h-screen bg-gradient-to-b dark:from-black dark:via-black dark:to-gray-900">
    <div className="p-4">
      <HeaderSection title="Discover MUSIO" subtitle="Scan a QR code, request your song, and help shape a dancefloor where every guest feels seen, heard, and included."/>
    </div>
    <div className="p-4">
      <CreateEventButton/>
    </div>
    <div className="p-4">
      
    </div>
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40">
          <h2 className="text-2xl font-bold mb-2">REQUEST A SONG</h2>
          <p className="text-gray-500 text-lg dark:text-gray-400">
            Submit a song you want to hear and help shape the vibe.
          </p>
        </div>
        <div className="flex flex-col items-center text-center rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40">
          <h2 className="text-2xl font-bold mb-2">MUSIC REQUESTS</h2>
          <p className="text-gray-500 text-lg dark:text-gray-400">
            Scan the QR code and see the 5 most recent song requests in real time.
          </p>
        </div>
        <div className="flex flex-col items-center text-center rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40">
          <h2 className="text-2xl font-bold mb-2">DJ DASHBOARD</h2>
          <p className="text-gray-500 text-lg dark:text-gray-400">
            View incoming requests, manage the queue, and control what plays next.
          </p>
        </div>
      </div>
    </div>
   </main>
  );
}
