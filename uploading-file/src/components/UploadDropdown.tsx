import { useRef, useState } from "react";
import { uploadManager } from "../services/uploadManager";

export default function UploadDropdown() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => uploadManager.upload(file));
  };

  return (
    <div className="relative">
      {/* Main button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow hover:bg-blue-700"
      >
        <span>+ New</span>
        <span className="text-xs">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-50"
          onMouseLeave={() => setOpen(false)}
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              inputRef.current?.click();
            }}
          >
            Upload files
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
