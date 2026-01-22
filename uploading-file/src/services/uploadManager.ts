import type { UploadTask } from "../types/upload";

class UploadManager {
  private uploads = new Map<string, UploadTask>();
  private listeners = new Set<() => void>();

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  getUploads() {
    return Array.from(this.uploads.values());
  }

  upload(file: File) {
    const id = crypto.randomUUID();
    const task: UploadTask = {
      id,
      file,
      progress: 0,
      status: "uploading",
    };

    this.uploads.set(id, task);
    this.notify();

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        task.progress = Math.round((e.loaded / e.total) * 100);
        this.notify();
      }
    };

    xhr.onload = () => {
      task.status = "completed";
      task.progress = 100;
      this.notify();
    };

    xhr.onerror = () => {
      task.status = "failed";
      this.notify();
    };

    xhr.open("POST", "http://localhost:8000/upload");
    xhr.send(file);
  }

  remove(id: string) {
    this.uploads.delete(id);
    this.notify();
  }
}

export const uploadManager = new UploadManager();
