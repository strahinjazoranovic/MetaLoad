"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Navbar from "../ui/navbar";
import "../ui/globals.css";


const ATTACHMENT_TYPES = [
  "Optic",
  "Muzzle",
  "Barrel",
  "Underbarrel",
  "Magazine",
  "Reargrip",
  // "Stock",
  // "Laser",
  // "Firemods",
] as const;

export default function CreateLoadouts() {
  const [form, setForm] = useState({
    name: "",
    game: "",
    user: "",
    Optic: [{ name: "" }],
    Muzzle: [{ name: "" }],
    Barrel: [{ name: "" }],
    Underbarrel: [{ name: "" }],
    Magazine: [{ name: "" }],
    Reargrip: [{ name: "" }],
    // Stock: [{ name: "" }],
    // Laser: [{ name: "" }],
    // Firemods: [{ name: "" }],
  });

  const [guns, setGuns] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");

  // Input style for all inputs
  const inputStyle =
    "p-2 rounded w-full text-black bg-white border-2 border-gray-300 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400 transition";

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch guns
        const gunRes = await fetch("/api/guns");
        const gunData = await gunRes.json();
        setGuns(gunData);

        const attachmentData: Record<string, string[]> = {};

        // Fetch attachments per type
        for (const type of ATTACHMENT_TYPES) {
          const res = await fetch(`/api/attachments?type=${type}`);
          const data = await res.json();
          attachmentData[type] = data;
        }

        setAttachments(attachmentData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    // Collect attachments in a type way
    const formattedAttachments: { name: string; type: string }[] = [];

    // Loop through each attachment type and collect non-empty attachments
    ATTACHMENT_TYPES.forEach((type) => {
      const attArray = form[type] as { name: string }[];
      attArray.forEach((att) => {
        if (att.name.trim() !== "") {
          formattedAttachments.push({ name: att.name, type });
        }
      });
    });

    // Prepare payload with name, game, user and formatted attachments
    const payload = {
      name: form.name,
      game: form.game,
      user: form.user,
      attachments: formattedAttachments,
    };

    // Try fetching API to create loadout
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // If the response is ok, show success message and reset form otherwise show an error message
      if (res.ok) {
        setMessage("Loadout created!");
        // Reset form after successful submission
        setForm({
          name: "",
          game: "",
          user: "",
          Optic: [{ name: "" }],
          Muzzle: [{ name: "" }],
          Barrel: [{ name: "" }],
          Underbarrel: [{ name: "" }],
          Magazine: [{ name: "" }],
          Reargrip: [{ name: "" }],
        });
      } else {
        const errData = await res.json();
        setMessage("Error creating loadout: " + (errData.error || ""));
      }
    } catch (err) {
      console.error(err);
      setMessage("Error creating loadout.");
    }
  }

  return (
    <main>
      <Navbar />
      <div className="pt-25 flex justify-center flex-col items-center">
        <h2 className="text-4xl mb-2 text-red-600 font-extrabold text-center">
          Create an loadout
        </h2>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 mt-4 rounded-lg w-2/4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              {/* Gun select */}
              <select
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className={inputStyle}
                required
              >
                <option value="">Select an gun</option>
                {guns.map((gun: any) => (
                  <option key={gun.id} value={gun.name}>
                    {gun.name}
                  </option>
                ))}
              </select>

              {/* Game */}
              <select
                value={form.game}
                onChange={(e) =>
                  setForm((f) => ({ ...f, game: e.target.value }))
                }
                className={inputStyle}
                required
              >
                <option value="">Select an game</option>
                <option value="Black Ops 7">Black Ops 7</option>
                <option value="Black Ops 6">Black Ops 6</option>
                <option value="Modern Warfare 3">Modern Warfare 3</option>
                <option value="Modern Warfare 2">Modern Warfare 2</option>
              </select>

              {/* User */}
              <input
                placeholder="Username"
                value={form.user}
                onChange={(e) =>
                  setForm((f) => ({ ...f, user: e.target.value }))
                }
                className={inputStyle}
                required
              />
            </div>

            {/* Attachments */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-red-500 mb-4 text-left">
                Attachments
              </h3>

              {ATTACHMENT_TYPES.map((type) => (
                <div key={type} className="mb-4">
                  <h4 className="text-white font-semibold capitalize mb-1">
                    {type}
                  </h4>

                  {(form[type] as { name: string }[]).map((att, idx) => (
                    <select
                      key={idx}
                      value={att.name}
                      onChange={(e) =>
                        setForm((prev) => {
                          const updated = [
                            ...(prev[type] as { name: string }[]),
                          ];
                          updated[idx] = {
                            ...updated[idx],
                            name: e.target.value,
                          };
                          return { ...prev, [type]: updated };
                        })
                      }
                      className={`${inputStyle} mb-2`}
                      required
                    >
                      <option value="">Select {type}</option>
                      {attachments[type]?.map((option: any) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
              ))}
            </div>

            <Button variant="default" type="submit" className="w-full">
              Submit Loadout
            </Button>

            {message && (
              <div className="mt-3 text-white text-center font-medium">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
