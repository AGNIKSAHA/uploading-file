import { useEffect, useState } from "react";
import { uploadManager } from "../services/uploadManager";
import UploadItem from "./UploadItem";
import type { UploadTask } from "../types/upload";

export default function UploadPanel() {
  const [uploads, setUploads] = useState<UploadTask[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    return uploadManager.subscribe(() => {
      const list = uploadManager.getUploads();
      setUploads(list);


      if (list.length > 0) {
        setVisible(true);
      }
    });
  }, []);

  if (!uploads.length || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg border z-50">
      
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-2 border-b">
        <span className="text-sm font-medium">
          Uploading {uploads.length} item{uploads.length > 1 ? "s" : ""}
        </span>

        {/* ✕ Close */}
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-gray-700"
          aria-label="Close upload panel"
        >
          ✕
        </button>
      </div>

      {/* List */}
      <div className="p-3 space-y-3 max-h-64 overflow-y-auto">
        {uploads.map((u) => (
          <UploadItem key={u.id} task={u} />
        ))}
      </div>
    </div>
  );
}
