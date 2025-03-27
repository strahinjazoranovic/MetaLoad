"use client";
// This is the page for loadouts
import React, { useEffect, useState } from "react";
import "../ui/globals.css";
import Image from "next/image";
import img from "/public/images/ames85.avif";

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

  function GunList() {
    const getTextColor = (game: string) => {
      if (game === "Black Ops 6") return "text-orange-500";
      if (game === "Modern Warfare 3") return "text-red-500";
      return "text-gray-200"; // Default color
    };
  }

  return (
    <main>
      <div className="pl-40 pr-40 pt-25 flex justify-center">
        <div>
          {guns.map((gun) => (
            <div
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-4 m-10 rounded-lg"
              style={{
                boxShadow:
                  "10px 10px 20px rgba(0, 0, 0, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.1)",
              }}
              key={gun.id}
            >
              <div className="flex items-center justify-between m-4">
                <div className="flex flex-col items-start space-y-1 text-center">
                  <div className="font-bold text-4xl">{gun.name}</div>
                  <div className="text-red-500">{gun.game}</div>
                </div>
                {/* Hier moet de foto komen */}
              </div>
              {/* Hier worden de attachments ingeladen voor elke gun */}
              {gun.attachments.map((attachment) => (
                <div className="hidden flex justify-between p-5 pl-20 pr-20 bg-neutral-800 rounded-sm backdrop-blur-lg shadow-lg m-2">
                  <div>{attachment.type}</div>
                  <div>{attachment.name}</div>
                </div>
              ))}
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
