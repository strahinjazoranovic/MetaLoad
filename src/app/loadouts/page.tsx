"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../ui/navbar";
import "../ui/globals.css";

export default function Loadouts() {
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
  const [loading, setLoading] = useState(true);
  const [visibleAttachments, setVisibleAttachments] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/guns");
        const response = await data.json();
        setGuns(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <Navbar />
      <div className="pt-25 flex justify-center">
        <div>
          <h1 className="text-center text-4xl text-red-600 font-extrabold">
            Loadouts
          </h1>

          {/* Loading skeletons */}
          {loading &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-2 ml-5 mr-5 mb-8 mt-8 rounded-lg animate-pulse"
              >
                <div className="flex items-center justify-between m-2">
                  <div className="flex flex-col items-start space-y-2">
                    {/* Title gun skeleton */}
                    <div className="h-7 w-40 bg-gray-300 rounded"></div>
                    {/* Title game name skeleton */}
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>

                  {/*  Image skeleton */}
                  <div className="w-250.5 ml-10 h-39 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            ))}

          {/* If there are no guns found show this text */}
          {!loading && guns.length === 0 && (
            <div className="text-center text-red-600 mt-10 text-3xl font-bold">
              No guns found.
            </div>
          )}

          {/* If its not loading and guns array is more than 0 show this part */}
          {!loading &&
            guns.length > 0 &&
            guns.map((gun) => (
              <div
                key={gun.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-2 ml-5 mr-5 mb-8 mt-8 rounded-lg"
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
                  <div className="text-white m-3 flex justify-center items-center px-8">
                    <span>
                      Class made by:{" "}
                      <span className="font-bold">{gun.user}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
