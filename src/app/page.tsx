import Link from "next/link";
import "./ui/globals.css";
import { Button } from "./ui/button";

export default function Home() {
  return (
    <main className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src="/images/avalon.png"
        alt="Season 2"
        className="absolute inset-0 h-full w-full object-cover blur-[4px]"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="mr-5.5 text-9xl font-bold mb-2">
          Meta<span className="text-red-600">Load</span>
        </h1>

        <div className="flex justify-center gap-4">
          <Link href="/loadouts">
            <Button variant="default" size="lg">
              View Loadouts
            </Button>
          </Link>
          <Link href="/create">
            <Button variant="secondary" size="lg">
              Create Loadouts
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
