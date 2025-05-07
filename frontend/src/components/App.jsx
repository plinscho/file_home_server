import { useEffect, useState } from "react";

export default function App() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Load file list from server
  const fetchFiles = async () => {
    try {
      const res = await fetch("/files");
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  // Upload handler
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("Uploaded successfully!");
        fetchFiles(); // refresh list
      } else {
        console.error("Upload failed.");
      }
    } catch (err) {
      console.error("Error uploading:", err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">📁 File Server</h1>

        {/* Upload input */}
        <div className="mb-4">
          <input type="file" onChange={handleUpload} disabled={uploading} />
        </div>

        {/* File list */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Available Files</h2>
          {files.length === 0 ? (
            <p className="text-gray-500">No files uploaded yet.</p>
          ) : (
            <ul className="space-y-2">
              {files.map((filename) => (
                <li key={filename} className="flex justify-between items-center">
                  <span>{filename}</span>
                  <a
                    href={`/files/${encodeURIComponent(filename)}`}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

