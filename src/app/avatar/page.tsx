"use client";

import type { PutBlobResult } from "@vercel/blob";
import Link from "next/link";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Your Avatar</h1>

      {/* <form
        onSubmit={async (event) => {
          event.preventDefault();

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/avatar/upload?filename=${file.name}`,
            {
              method: "POST",
              body: file,
            }
          );

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form> */}
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
          <div className="flex justify-center mt-4">
            <img src={blob.url} alt="" className="h-32 w-32 rounded-full" />
          </div>
        </div>
      )}
    </>
  );
}
