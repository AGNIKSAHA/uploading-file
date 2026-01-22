import { useEffect, useState } from "react";
import { uploadManager } from "../services/uploadManager";
import type { FileItem } from "../types/file";

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBackendFiles = async (): Promise<FileItem[]> => {
    const res = await fetch("http://localhost:8000/files");
    const data = await res.json();

    return data.map((f: any) => ({
      id: f.name,
      name: f.name,
      size: f.size,
      status: "completed" as const,
    }));
  };

  const refresh = async () => {
    setLoading(true);

    const backendFiles = await fetchBackendFiles();
    const uploading = uploadManager.getUploads().map((u) => ({
      id: u.id,
      name: u.file.name,
      size: u.file.size,
      status: u.status,
    }));

    const merged = [
      ...uploading,
      ...backendFiles.filter(
        (bf) => !uploading.some((u) => u.name === bf.name)
      ),
    ];

    setFiles(merged);
    setLoading(false);
  };

  const deleteFile = async (file: FileItem) => {
    if (!confirm(`Delete "${file.name}"?`)) return;

    // Optimistic UI update
    setFiles((prev) => prev.filter((f) => f.name !== file.name));

    await fetch(`http://localhost:8000/files/${encodeURIComponent(file.name)}`, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    refresh();
    const unsub1 = uploadManager.subscribe(refresh);
    const unsub2 = uploadManager.onComplete(refresh);

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading files...</div>;
  }

  if (!files.length) {
    return <div className="text-sm text-gray-500">No files yet</div>;
  }

  return (
    <div className="mt-6 bg-white rounded-lg shadow border">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between px-4 py-2 border-b last:border-b-0 text-sm"
        >
          <div className="truncate">
            {file.name}
            <span
              className={`ml-2 text-xs ${
                file.status === "uploading"
                  ? "text-blue-600"
                  : file.status === "failed"
                  ? "text-red-600"
                  : "text-gray-400"
              }`}
            >
              {file.status}
            </span>
          </div>

          {/* Actions */}
          {file.status === "completed" && (
            <button
              onClick={() => deleteFile(file)}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
