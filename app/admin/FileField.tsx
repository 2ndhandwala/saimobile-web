"use client";
import { useRef, useState } from "react";

export function FileField({
  name,
  required,
}: {
  name: string;
  required?: boolean;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string | null>(null);

  // Only one input carries a value at a time — clearing the other keeps FormData
  // from carrying a stale empty entry that would confuse the server action.
  const onPick = (which: "camera" | "gallery") => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    setFilename(file?.name ?? null);
    if (file) {
      (which === "camera" ? galleryRef : cameraRef).current!.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <label className="btn btn-ghost cursor-pointer">
          Take photo
          <input
            ref={cameraRef}
            type="file"
            name={name}
            accept="image/*"
            capture="environment"
            required={required && !filename}
            onChange={onPick("camera")}
            className="sr-only"
          />
        </label>
        <label className="btn btn-ghost cursor-pointer">
          Choose from gallery
          <input
            ref={galleryRef}
            type="file"
            name={name}
            accept="image/*"
            required={required && !filename}
            onChange={onPick("gallery")}
            className="sr-only"
          />
        </label>
      </div>
      {filename ? (
        <span className="text-sm text-ink-2 truncate">{filename}</span>
      ) : null}
    </div>
  );
}
