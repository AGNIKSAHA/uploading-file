import UploadDropdown from "../components/UploadDropdown";
import FileList from "../components/FileList";
export default function Upload() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Drive</h1>

      <UploadDropdown />

      {/* Uploaded files */}
      <FileList />
    </div>
  );
}
