"use client";
import React, { useState } from "react";
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

const GAMES = [
  "Black Ops 7",
  "Black Ops 6",
  "Modern Warfare 3",
  "Modern Warfare 2",
] as const;

export default function CreateAttachments() {
  const [attachmentForm, setAttachmentForm] = useState({ name: "", type: "" });
  const [gunForm, setGunForm] = useState({ name: "", game: "", username: "" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const inputStyle =
    "p-2 rounded w-full text-black bg-white border-2 border-gray-300 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400 transition";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function removeImage() {
    setFile(null);
    setPreview(null);
  }

  async function handleGunSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", gunForm.name);
      formData.append("game", gunForm.game);
      formData.append("username", gunForm.username);
      if (file) formData.append("image", file);

      const res = await fetch("/api/create/gun", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Gun created!");
        setGunForm({ name: "", game: "", username: "" });
        removeImage();
      } else {
        toast.error("Error: " + data.error);
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  async function handleAttachmentSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/create/attachment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attachmentForm),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Attachment created!");
        setAttachmentForm({ name: "", type: "" });
      } else {
        toast.error("Error: " + data.error);
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <main>
      <Navbar />

      {/* GUN FORM */}
      <div className="pt-25 pb-25 flex justify-center flex-col items-center">
        <h2 className="text-4xl mb-2 text-red-600 font-extrabold text-center">
          Create gun
        </h2>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 mt-4 rounded-lg w-2/4">
          <form onSubmit={handleGunSubmit} className="flex flex-col gap-4">
            <input
              placeholder="Gun name"
              value={gunForm.name}
              onChange={(e) =>
                setGunForm((f) => ({ ...f, name: e.target.value }))
              }
              className={inputStyle}
              required
            />
            <input
              placeholder="Username"
              value={gunForm.username}
              onChange={(e) =>
                setGunForm((f) => ({ ...f, username: e.target.value }))
              }
              className={inputStyle}
              required
            />
            <select
              value={gunForm.game}
              onChange={(e) =>
                setGunForm((f) => ({ ...f, game: e.target.value }))
              }
              className={inputStyle}
              required
            >
              <option value="">Select game</option>
              {GAMES.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>

            {!preview && (
              <div className="flex flex-col gap-2">
                <label className="text-white font-semibold">Upload image</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:border-red-500 transition bg-white/5">
                  <span className="text-white text-sm">
                    Click or drag image here
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>
            )}

            {preview && (
              <div className="relative mt-2">
                <h1 className="text-white font-semibold mb-2">
                  Uploaded image
                </h1>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border border-gray-400"
                />
                <Button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
                >
                  Remove image
                </Button>
                {file && (
                  <p className="text-sm text-gray-300 mt-2">{file.name}</p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full">
              Create gun
            </Button>
          </form>
        </div>
      </div>

      {/* ATTACHMENT FORM */}
      <div className="pb-25 flex justify-center flex-col items-center">
        <h2 className="text-4xl mb-2 text-red-600 font-extrabold text-center">
          Create attachment
        </h2>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 mt-4 rounded-lg w-2/4">
          <form
            onSubmit={handleAttachmentSubmit}
            className="flex flex-col gap-3"
          >
            <input
              placeholder="Attachment name"
              value={attachmentForm.name}
              onChange={(e) =>
                setAttachmentForm((f) => ({ ...f, name: e.target.value }))
              }
              className={inputStyle}
              required
            />
            <select
              value={attachmentForm.type}
              onChange={(e) =>
                setAttachmentForm((f) => ({ ...f, type: e.target.value }))
              }
              className={inputStyle}
              required
            >
              <option value="">Select type</option>
              {ATTACHMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Button type="submit" className="w-full">
              Create attachment
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
