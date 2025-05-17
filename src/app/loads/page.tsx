"use client";
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
    photos: string;
  }

  const [guns, setGuns] = useState<Gun[]>([]);
  const [visibleAttachments, setVisibleAttachments] = useState<Set<string>>(
    new Set()
  );

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
      <h1 className="pt-25 text-center font-4xl text-black-500">
        Loading guns...
      </h1>
    );
  }

  function toggleAttachments(id: string) {
    setVisibleAttachments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  return (
    <main>
      <div className="pt-25 flex justify-center">
        <div>
          <h1 className="text-center text-4xl text-red-600 font-extrabold">
            WARZONE LOADOUTS
          </h1>

          {guns.map((gun) => (
            <div
              key={gun.id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-2 ml-5 mr-5 mb-8 mt-8 rounded-lg"
              style={{
                boxShadow:
                  "10px 10px 20px rgba(0, 0, 0, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                className="flex items-center justify-between m-2 cursor-pointer"
                onClick={() => toggleAttachments(gun.id)}
              >
                <div className="flex flex-col items-start space-y-1 text-center">
                  <div className="font-bold text-3xl text-center">
                    {gun.name}
                  </div>
                  <div className="text-red-500">{gun.game}</div>
                </div>

                <img
                  src={`/images/${gun.photos}`}
                  alt={gun.name}
                  className="w-3/7 h-auto rounded-lg"
                />
              </div>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  visibleAttachments.has(gun.id)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {gun.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-4 bg-neutral-800 rounded-sm backdrop-blur-lg shadow-lg m-2"
                  >
                    <div className="pr-2 font-xl">{attachment.type}</div>
                    <div className="pl-2 font-xl">{attachment.name}</div>
                  </div>
                ))}
                <div className="text-base text-center text-white mt-2">
                  Class made by: {gun.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center mt-100 pb-20 text-white">
        ©Strahinja Zoranovic 2025 | All rights reserved
      </footer>
    </main>
  );
}
