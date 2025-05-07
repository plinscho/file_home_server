import { useState } from "react";

export default function GetFiles() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    setError("");
    try {
      const url = "http://192.168.0.10/files/list"
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch files");

      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error(err);
      setError("Could not load files.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 bg-white shadow rounded">
      <button
        onClick={fetchFiles}
        className="mb-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Load Files
      </button>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {files.map((file, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border-b py-1 text-gray-800"
          >
            <span>{file}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

