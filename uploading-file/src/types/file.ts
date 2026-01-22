export type FileStatus = "uploading" | "completed" | "failed";

export interface FileItem {
  id: string;
  name: string;
  size: number;
  status: FileStatus;
}
