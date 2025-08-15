"use client";
import React, { useState } from "react";
import "../ui/globals.css";

// Example options for each attachment type
const ATTACHMENT_OPTIONS = {
  optic: ["none"],
  muzzle: [
    "Monolithic Suppressor",

    "Compensator",

    "Flash Hider",

    "Recoil Springs",

    "Suppressor",
  ],
  barrel: ["none"],
  underbarrel: ["none"],
  magazine: ["none"],
  reargrip: ["none"],
  stock: ["none"],
  laser: ["none"],
  firemods: ["none"],
};

const GUN_OPTIONS = [
  "--- Assault Rifles ---",
  "ABR A1",
  "FFAR 1",
  "Kilo 141",
  "CR-56 AMAX",
  "Cypher 091",
  "Krig C",
  "GPR 91",
  "Model L",
  "Goblin Mk2",
  "AS VAL",
  "AMES 85",
  "XM4",
  "AK-74",
  "--- Submachine Guns ---",
  "LC10",
  "Ladra",
  "PPSh-41",
  "Saug",
  "KSV",
  "PP-919",
  "Kompakt 92",
  "Jackal PDW",
  "Tanto .22",
  "C9",
  "--- Sniper Rifles ---",
  "HDR",
  "AMR Mod 4",
  "LW3A1 Frostline",
  "LR 7.62",
  "SVD",
];

export default function CreateLoadouts() {
  const [form, setForm] = useState({
    name: "",
    game: "",
    user: "",
    optic: [{ name: "" }],
    muzzle: [{ name: "" }],
    barrel: [{ name: "" }],
    underbarrel: [{ name: "" }],
    magazine: [{ name: "" }],
    reargrip: [{ name: "" }],
    stock: [{ name: "" }],
    laser: [{ name: "" }],
    firemods: [{ name: "" }],
  });
  const [message, setMessage] = useState("");

  function handleAttachmentChange(idx: number, field: string, value: string) {
    setForm((prev) => {
      const atts = [...prev.optic];
      atts[idx] = { ...atts[idx], [field]: value };
      return { ...prev, attachments: atts };
    });
  }

  function addAttachment() {
    setForm((prev) => ({
      ...prev,
      optic: [...prev.optic, { name: "" }],
      muzzle: [...prev.muzzle, { name: "" }],
      barrel: [...prev.barrel, { name: "" }],
      underbarrel: [...prev.underbarrel, { name: "" }],
      magazine: [...prev.magazine, { name: "" }],
      reargrip: [...prev.reargrip, { name: "" }],
      stock: [...prev.stock, { name: "" }],
      laser: [...prev.laser, { name: "" }],
      firemods: [...prev.firemods, { name: "" }],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("Loadout created!");
      setForm({
        name: "",
        game: "",
        user: "",
        optic: [{ name: "" }],
        muzzle: [{ name: "" }],
        barrel: [{ name: "" }],
        underbarrel: [{ name: "" }],
        magazine: [{ name: "" }],
        reargrip: [{ name: "" }],
        stock: [{ name: "" }],
        laser: [{ name: "" }],
        firemods: [{ name: "" }],
      });
    } else {
      setMessage("Error creating loadout.");
    }
  }

  return (
    <main>
      <div className="pt-25 flex justify-center">
        <div
          className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 ml-5 mr-5 mb-8 mt-8 rounded-lg w-2/4"
          style={{
            boxShadow:
              "10px 10px 20px rgba(0, 0, 0, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.1)",
          }}
        >
          <h2 className="text-3xl mb-4 text-white font-extrabold text-center">
            Create Loadout
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <select
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="p-2 rounded w-full text-black border border-white-500"
                required
              >
                <option value="">Select Gun</option>
                {GUN_OPTIONS.map((gun) => (
                  <option key={gun} value={gun}>
                    {gun}
                  </option>
                ))}
              </select>

              <select
                value={form.game}
                onChange={(e) =>
                  setForm((f) => ({ ...f, game: e.target.value }))
                }
                className="p-2 rounded w-full text-black border border-white-500"
                required
              >
                <option value="">Select Game</option>
                <option value="Black Ops 6">Black Ops 6</option>
                <option value="Modern Warfare 3">Modern Warfare 3</option>
                <option value="Modern Warfare 2">Modern Warfare 2</option>
              </select>
              <input
                placeholder="User"
                value={form.user}
                onChange={(e) =>
                  setForm((f) => ({ ...f, user: e.target.value }))
                }
                className="p-2 rounded w-full text-black border border-white-500"
                required
              />
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                Attachments
              </h3>
              {(
                [
                  "optic",
                  "muzzle",
                  "barrel",
                  "underbarrel",
                  "magazine",
                  "reargrip",
                  "stock",
                  "laser",
                  "firemods",
                ] as const
              ).map((type) => (
                <div key={type}>
                  <h4 className="text-white font-semibold capitalize">
                    {type}
                  </h4>
                  {(form[type] as { name: string }[]).map((att, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <select
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
                        className="p-2 rounded text-black flex-1"
                        required
                      >
                        <option value="">Select {type}</option>
                        {ATTACHMENT_OPTIONS[type].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="btn m-2 p-2 bg-red-500  text-white rounded-xl w-full mt-4"
            >
              Submit Loadout
            </button>
            {message && (
              <div className="mt-2 text-white text-center">{message}</div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
