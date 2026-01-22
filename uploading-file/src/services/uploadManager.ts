import type { UploadTask } from "../types/upload";

class UploadManager {

  private uploads = new Map<string, UploadTask>();
  private listeners = new Set<() => void>();
  private completeListeners = new Set<() => void>();


  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  onComplete(fn: () => void) {
    this.completeListeners.add(fn);
    return () => {
      this.completeListeners.delete(fn);
    };
  }

  private notifyComplete() {
    this.completeListeners.forEach((fn) => fn());
  }


  getUploads(): UploadTask[] {
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
      if (xhr.status >= 200 && xhr.status < 300) {
        task.status = "completed";
        task.progress = 100;
        this.notify();
        this.notifyComplete(); // 🔑 refresh file list
      } else {
        task.status = "failed";
        this.notify();
      }
    };

    xhr.onerror = () => {
      task.status = "failed";
      this.notify();
    };

    // IMPORTANT: FastAPI requires multipart/form-data
    const formData = new FormData();
    formData.append("file", file);

    xhr.open("POST", "http://localhost:8000/upload");
    xhr.send(formData);
  }

 
  remove(id: string) {
    this.uploads.delete(id);
    this.notify();
  }
}


export const uploadManager = new UploadManager();
