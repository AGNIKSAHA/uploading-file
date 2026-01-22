import type { UploadTask } from "../types/upload";
import { uploadManager } from "../services/uploadManager";

export default function UploadItem({ task }: { task: UploadTask }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="truncate">{task.file.name}</span>

        {/* ✕ Remove upload from UI */}
        <button
          onClick={() => uploadManager.remove(task.id)}
          className="text-gray-400 hover:text-gray-700"
          aria-label="Remove upload"
        >
          ✕
        </button>
      </div>

      <div className="h-1 bg-gray-200 rounded">
        <div
          className="h-1 bg-blue-600 rounded"
          style={{ width: `${task.progress}%` }}
        />
      </div>

      <div className="text-[10px] text-gray-500">
        {task.status}
      </div>
    </div>
  );
}
