"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Navbar from "../ui/navbar";
import { toast } from "sonner";
import "../ui/globals.css";

const ATTACHMENT_TYPES = [
  "Optic",
  "Muzzle",
  "Barrel",
  "Underbarrel",
  "Magazine",
  "Reargrip",
  "Stock",
  "Laser",
] as const;

interface Gun {
  id: string;
  name: string;
  game: string;
}

export default function CreateLoadouts() {
  const [form, setForm] = useState({
    name: "",
    game: "",
    username: "",
    Optic: [{ name: "" }],
    Muzzle: [{ name: "" }],
    Barrel: [{ name: "" }],
    Underbarrel: [{ name: "" }],
    Magazine: [{ name: "" }],
    Reargrip: [{ name: "" }],
    Stock: [{ name: "" }],
    Laser: [{ name: "" }],
  });

  const [guns, setGuns] = useState<Gun[]>([]);
  const [attachments, setAttachments] = useState<Record<string, string[]>>({});

  // Input style for all inputs
  const inputStyle =
    "p-2 rounded w-full text-black bg-white border-2 border-gray-300 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400 transition";

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch guns
        const gunRes = await fetch("/api/fetch/guns/noAttachments");
        const gunData = await gunRes.json();
        setGuns(gunData);

        const attachmentData: Record<string, string[]> = {};

        // Fetch attachments per type
        for (const type of ATTACHMENT_TYPES) {
          const res = await fetch(`/api/fetch/attachments?type=${type}`);
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

    // Count filled attachments
    let filledCount = 0;
    ATTACHMENT_TYPES.forEach((type) => {
      const attArray = form[type] as { name: string }[];
      attArray.forEach((att) => {
        if (att.name.trim() !== "") filledCount++;
      });
    });

    // Require at least 5 attachments
    if (filledCount < 5) {
      toast.error("Please select at least 5 attachments.");
      return;
    }

    // Collect attachments
    const formattedAttachments: { name: string; type: string }[] = [];
    ATTACHMENT_TYPES.forEach((type) => {
      const attArray = form[type] as { name: string }[];
      attArray.forEach((att) => {
        if (att.name.trim() !== "") {
          formattedAttachments.push({ name: att.name, type });
        }
      });
    });

    // Prepare payload
    const payload = {
      name: form.name,
      game: form.game, // fetched from selected gun
      username: form.username,
      attachments: formattedAttachments,
    };

    try {
      const res = await fetch("/api/create/loadout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Loadout created!");
        setForm({
          name: "",
          game: "",
          username: "",
          Optic: [{ name: "" }],
          Muzzle: [{ name: "" }],
          Barrel: [{ name: "" }],
          Underbarrel: [{ name: "" }],
          Magazine: [{ name: "" }],
          Reargrip: [{ name: "" }],
          Stock: [{ name: "" }],
          Laser: [{ name: "" }],
        });
      } else {
        const errData = await res.json();
        toast.error("Error creating loadout: " + (errData.error || ""));
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating loadout.");
    }
  }

  return (
    <main>
      <Navbar />
      <div className="pt-25 pb-25 flex justify-center flex-col items-center">
        <h2 className="text-4xl mb-2 text-red-600 font-extrabold text-center">
          Create a Loadout
        </h2>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 mt-4 rounded-lg w-2/4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              {/* Gun select */}
              <select
                value={form.name}
                onChange={(e) => {
                  const selectedGun = guns.find(
                    (g) => g.name === e.target.value,
                  );
                  setForm((f) => ({
                    ...f,
                    name: e.target.value,
                    game: selectedGun ? selectedGun.game : "",
                  }));
                }}
                className={inputStyle}
                required
              >
                <option value="">Select a gun</option>
                {guns.map((gun) => (
                  <option key={gun.id} value={gun.name}>
                    {gun.name} ({gun.game})
                  </option>
                ))}
              </select>

              {/* Username */}
              <input
                placeholder="Username"
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
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
          </form>
        </div>
      </div>
    </main>
  );
}
