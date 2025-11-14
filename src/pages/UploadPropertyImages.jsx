import { useState } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function UploadPropertyImages() {
  const { id } = useParams();
  const nav = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleFiles(e) {
    const list = e.target.files;
    const arr = [];
    for (let i = 0; i < list.length; i++) arr.push(list[i]);
    setImages(arr);
  }

  async function upload() {
    if (images.length === 0) return alert("Select images first");

    setLoading(true);

    const formData = new FormData();
    formData.append("property", id);
    images.forEach(file => formData.append("images", file));

    try {
      await api.post("property-images/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Images uploaded successfully!");
      nav("/admin/dashboard");

    } catch (err) {
      console.error(err);
      alert("Failed to upload images");
    }

    setLoading(false);
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h3>Upload Images for Property #{id}</h3>

      <input type="file" multiple accept="image/*" className="form-control my-3"
        onChange={handleFiles} />

      {images.length > 0 && (
        <p>{images.length} images selected</p>
      )}

      <button className="btn btn-primary" disabled={loading} onClick={upload}>
        {loading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}
