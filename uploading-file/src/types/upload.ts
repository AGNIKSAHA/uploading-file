export type UploadStatus =
  | "uploading"
  | "completed"
  | "failed";

export interface UploadTask {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
}
