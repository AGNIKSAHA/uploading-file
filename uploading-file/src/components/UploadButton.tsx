import { useRef } from "react";
import { uploadManager } from "../services/uploadManager";

export default function UploadButton() {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => ref.current?.click()}
      >
        + New Upload
      </button>

      <input
        ref={ref}
        type="file"
        multiple
        hidden
        onChange={(e) => {
          if (!e.target.files) return;

          Array.from(e.target.files).forEach((file) => {
            uploadManager.upload(file); 
          });

          e.target.value = "";
        }}
      />
    </>
  );
}
