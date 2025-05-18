import React, { useState } from "react";

export default function ImageUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = e => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Оберіть файл для завантаження");
      return;
    }
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://your-backend-url/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Помилка завантаження");
      const data = await res.json();
      onUploaded(data.url); // url — посилання на картинку в S3
      setFile(null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />
      <button
        type="button"
        onClick={handleUpload}
        disabled={loading || !file}
      >
        {loading ? "Завантаження..." : "Завантажити фото"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}