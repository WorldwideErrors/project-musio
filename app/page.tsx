import Image from "next/image";
import HeaderSection from "./components/HeaderSection";

export default function Home() {
  return (
   <main className="min-h-screen">
    <div className="p-4">
      <HeaderSection title="Discover MUSIO" subtitle="Scan a QR code, request your song, and help shape a dancefloor where every guest feels seen, heard, and included."/>
    </div>
    
   </main>
  );
}
