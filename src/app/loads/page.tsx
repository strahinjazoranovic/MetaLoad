"use client";
// This is the page for loadouts
import React, { useEffect, useState } from "react";

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
  return (
    <main className="p-20 text-white">
      <table className="">
        {guns.map((gun) => (
          <div>
            <div>{gun.id}</div>
            <div>{gun.name}</div>
            {gun.attachments.map((attachment) => (
              <>
                <div>{attachment.type} - {attachment.name}</div>
                
              </>
            ))}
          </div>
        ))}
      </table>
    </main>
  );
}
