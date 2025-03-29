"use client";
// This is the page for loadouts that is being rendered on the client side
import React, { useEffect, useState } from "react";
import "../ui/globals.css";

export default function Loads() {
  interface Attachment {
    name: string;
    type: string;
    id: string;
  }

  interface Gun {
    attachments: Attachment[];
    id: string;
    name: string;
    game: string;
    user: string;
  }

  // The state of the component
  const [guns, setGuns] = useState<Gun[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/query");
        const response = await data.json();
        setGuns(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (guns.length === 0) {
    return (
      <h1 className="pt-25 text-center font-4xl text-black-500">Loading...</h1>
    );
  }

  return (
    <main>
      <div className="pt-25 flex justify-center">
        <div>
          <h1 className="text-center text-2xl text-red-600 font-extrabold">
            BEST WARZONE LOADOUTS
          </h1>
          {guns.map((gun) => (
            <div
              className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-2 m-10 rounded-lg"
              style={{
                boxShadow:
                  "10px 10px 20px rgba(0, 0, 0, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.1)",
              }}
              key={gun.id}
            >
              <div className="flex items-center justify-between m-2">
                <div className="flex flex-col items-start space-y-1 text-center">
                  <div className="font-bold text-4xl text-center text-center">
                    {gun.name}
                  </div>
                  <div className="text-red-500">{gun.game}</div>
                </div>
                {/* Hier moet de foto komen */}
              </div>
              {/* Hier worden de attachments ingeladen voor elke gun */}
              {gun.attachments.map((attachment) => (
                <div className="flex justify-between p-4 bg-neutral-800 rounded-sm backdrop-blur-lg shadow-lg m-2">
                  <div className="pr-2 font-xs">{attachment.type}</div>
                  <div className="pl-2 font-xs">{attachment.name}</div>
                </div>
              ))}
              <div className="text-sm text-center">
                Class by: {gun.user}
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="text-center mt-100 pb-20">
        ©Strahinja Zoranovic 2025 | All rights reserved
      </footer>
    </main>
  );
}
